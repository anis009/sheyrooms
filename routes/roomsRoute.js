const express = require("express");
const router = new express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
	try {
		const rooms = await Room.find({});
		return res.json({ rooms });
	} catch (err) {
		return res.status(400).json({ message: err });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		return res.json({ room });
	} catch (err) {
		return res.status(400).json({ message: err });
	}
});

router.post("/", async (req, res) => {
	try {
		const room = new Room(req.body);
		await room.save();
		res.json(room);
	} catch (err) {
		console.log(err);
		res.status(400).json({ message: err });
	}
});
module.exports = router;
