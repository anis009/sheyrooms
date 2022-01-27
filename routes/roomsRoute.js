const express = require("express");
const router = new express.Router();

const Room = require("../models/room");

router.get("/getallrooms", async (req, res) => {
	try {
		const rooms = await Room.find().sort({ createdAt: -1 });
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
		// console.log(err);
		res.status(400).json({ message: err });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { name, rentperday, description, maxcount, phonenumber } = req.body;
		const room = await Room.findById(req.params.id);
		if (!room) {
			res.json({ message: "room doesnot found !" });
		}
		room.name = name || room.name;
		room.description = description || room.description;
		room.rentperday = rentperday || room.rentperday;
		room.maxcount = maxcount || room.maxcount;
		room.phonenumber = phonenumber || room.phonenumber;
		await room.save();
		res.json(room);
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

module.exports = router;
