const mongoose = require("mongoose");
const bookingSchema = mongoose.Schema(
	{
		room: {
			type: String,
			required: true,
		},
		roomid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "rooms",
			required: true,
		},
		userid: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		fromdate: {
			type: String,
			required: true,
		},
		todate: {
			type: String,
			required: true,
		},
		totaldays: {
			type: Number,
			required: true,
		},
		totalamount: {
			type: Number,
			required: true,
		},
		transactionId: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			required: true,
			default: "booked",
		},
	},
	{
		timeStamps: true,
	}
);

const Book = mongoose.model("books", bookingSchema);

module.exports = Book;
