const express = require("express");
const app = express();
require("./db");
const port = process.env.PORT || 8000;

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
