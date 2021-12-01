const express = require("express");
const cors = require("cors");
const app = express();
const roomRouter = require("./routes/roomsRoute");
const userRouter = require("./routes/usersRoute");
const bookingRouter = require("./routes/bookingRoute");

require("./db");
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api/rooms", roomRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
