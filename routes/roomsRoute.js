const express = require("express");
const router = new express.Router();

const Room = require("../models/room");

//route api/rooms/

router.get("/getallrooms", async (req, res) => {
	const pageSize = 4;

	const page = Number(req.query.pageNumber) || 1;
	try {
		const rooms = await Room.find()
			.sort({ createdAt: -1 })
			.limit(pageSize)
			.skip(pageSize * (page - 1));
		const total = await Room.countDocuments();
		const pages = Math.ceil(total / pageSize);

		return res.json({ rooms, page, pages, pageSize });
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

router.delete("/:id", async (req, res) => {
	try {
		const room = await Room.findById(req.params.id);
		const isDeleted = await room.delete();
		res.json({
			message: "delete successfully",
		});
	} catch (err) {
		res.status(400).json({
			message: "delete failed!",
		});
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
		const { name, rentperday, description, maxcount, phonenumber, imageurls } =
			req.body;
		const room = await Room.findById(req.params.id);
		if (!room) {
			res.json({ message: "room doesnot found !" });
		}
		room.name = name || room.name;
		room.description = description || room.description;
		room.rentperday = rentperday || room.rentperday;
		room.maxcount = maxcount || room.maxcount;
		room.phonenumber = phonenumber || room.phonenumber;
		room.imageurls = imageurls || room.imageurls;
		await room.save();
		res.json(room);
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
});

module.exports = router;
