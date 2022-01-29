const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.get("/allbookings", async (req, res) => {
	try {
		const books = await Booking.find({})
			.populate("userid", "name")
			.sort({ createdAt: -1 });
		res.json({ books });
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err.message });
	}
});

module.exports = router;
