const mongoose = require("mongoose");

const replaySchema = {
	message: {
		type: String,
	},
};

const messageSchema = new mongoose.Schema(
	{
		message: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		replay: [replaySchema],
	},
	{
		timestamps: true,
	}
);
