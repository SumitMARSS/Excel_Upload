// Importing necessary modules and packages
const express = require("express");
const app = express();
const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const candidateRoute = require("./routes/candidateRoutes");

// Setting up port number
const PORT = process.env.PORT || 5000;

// Loading environment variables from .env file
dotenv.config();

// Connecting to database
database.connect();

 
// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

//routes
app.use("/api/candidates", candidateRoute);


// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

