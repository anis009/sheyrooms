const express = require("express");
const router = new express.Router();
const User = require("../models/user");

// Route  /api/users/register
// desc register
// public

router.post("/register", async (req, res) => {
	const { email, name, password, confirmpassword } = req.body;
	const user = new User(req.body);
	try {
		const existRoom = await User.findOne({ email: email });
		console.log(existRoom);
		if (existRoom) {
			throw new Error("User already exists😂😂😂");
		}
		await user.save();
		return res.send("User registered successfully!");
	} catch (error) {
		return res.status(400).json({ message: error.message });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email, password });

		if (user) {
			const us = {
				_id: user._id,
				name: user.name,
				email: user.email,
				isAdmin: user.isAdmin,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			};
			res.send(us);
		} else {
			throw new Error("Inavlid user");
		}
	} catch (error) {
		return res.status(400).json({ error });
	}
});

router.get("/getallusers", async (req, res) => {
	try {
		const users = await User.find({}).sort({ createdAt: -1 });
		//console.log(users);
		res.json({ users });
	} catch (err) {
		res.status(400).json({ message: "Something went to wrong!" });
	}
});

module.exports = router;
