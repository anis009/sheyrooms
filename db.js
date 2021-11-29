const mongoose = require("mongoose");

mongoose
	.connect(
		"mongodb+srv://anis:anis@devconnector.z7qho.mongodb.net/mern-rooms?retryWrites=true&w=majority"
	)
	.then(() => console.log("Connected to mongoDB"))
	.catch((err) => {
		console.log(err);
	});
