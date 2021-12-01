const express = require("express");
const router = express.Router();
const moment = require("moment");
const Booking = require("../models/booking");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");

const stripe = require("stripe")(
	"sk_test_51I6DRFCNUaJFevFCp91SBDCXcWNgLwryUvk3Zq0vPHumyrsAkjCSiXQvcQBqaW8xzjHmwwWSDehMPHVIdrY9MuIC00dpnnR41i"
);
router.post("/bookroom", async (req, res) => {
	const { room, userid, fromdate, todate, totalamount, totaldays, token } =
		req.body;
	// console.log(req.body);
	try {
		const customer = await stripe.customers.create({
			email: token.email,
			source: token.id,
		});

		const payment = await stripe.charges.create(
			{
				amount: totalamount * 100,
				customer: customer.id,
				currency: "BDT",
				receipt_email: token.email,
			},
			{
				idempotencyKey: uuidv4(),
			}
		);

		if (payment) {
			const roomBooking = new Booking({
				room: room.name,
				roomid: room._id,
				userid,
				fromdate,
				todate,
				totaldays,
				totalamount,
				transactionId: "1234",
			});
			const booking = await roomBooking.save();
			const updateRoom = await Room.findById(room._id);
			updateRoom.currentbookings.push({
				bookingid: booking._id,
				fromdate,
				todate,
				userid,
				status: booking.status,
			});
			await updateRoom.save();
			// res.send(booking);
		}

		res.send("Payment successfull,you room is booked!");
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
});

router.get("/:userid", async (req, res) => {
	try {
		const books = await Booking.find({ userid: req.params.userid });
		if (!books) {
			res.json({ message: "there is no booking" });
		}
		res.json({ books });
	} catch (err) {
		res.status(404).json({ message: err });
	}
});

router.post("/cancelbookings", async (req, res) => {
	const { roomid, bookid } = req.body;
	try {
		const book = await Booking.findOne({ _id: bookid });

		book.status = "cancelled";
		await book.save();
		const room = await Room.findOne({ _id: roomid });
		const temp = room.currentbookings.filter(
			(rom) => rom.bookingid.toString() !== bookid
		);
		room.currentbookings = temp;
		await room.save();
		res.send("Cancel booking successfully");
	} catch (err) {
		res.status(400).send("something went wrong!");
	}
});

module.exports = router;
