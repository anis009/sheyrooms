const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

router.get("/allbookings", async (req, res) => {
	try {
		const books = await Booking.find({});
		res.json({ books });
	} catch (err) {
		res.status(400).json({ message: "something went to wrong!" });
	}
});

module.exports = router;
