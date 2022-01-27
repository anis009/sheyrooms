const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const roomRouter = require("./routes/roomsRoute");
const userRouter = require("./routes/usersRoute");
const bookingRouter = require("./routes/bookingRoute");
const adminRouter = require("./routes/adminRoute");

require("./db");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);

// const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client/build")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
