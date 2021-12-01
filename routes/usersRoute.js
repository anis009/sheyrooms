const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
	const user = new User(req.body);

	try {
		await user.save();
		return res.send("User registered successfully!");
	} catch (error) {
		return res.status(400).json({ error });
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

module.exports = router;
