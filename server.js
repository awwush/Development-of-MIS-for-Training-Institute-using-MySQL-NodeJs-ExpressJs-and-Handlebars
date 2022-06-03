require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const PORT = process.env.PORT || 8080;
const cors = require("cors");
const notFoundController = require("./controllers/404Controller");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
// const fileUpload = require("express-fileupload");
const publicDirec = path.join(__dirname, "./public");
const viewsPath = path.join(__dirname, "./templates/views");
const partialsPath = path.join(__dirname, "./templates/partials");
require("./helpers/handlebars");
const mysql = require("./models/db/mysql");

app.use(cookieParser());
app.set("view engine", "hbs");
app.use(cors());
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirec));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



/// Testing connection
mysql.authenticateConnection();

app.get("/", (req, res) => {
	if (req.cookies.jwt) {
		jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
			if (user) {
				res.redirect(`/users/dashboard/${user.email}`);
			}
		});
	} else {
		res.render("index", { title: "Master-Class" }); // This is to  render the home page of the Portal.}
	}
});


// Auth middleware definition

// Authorization should be done in the respective routes as authentication cant be generalized!!!
// for ex :- if the authenticate function makes us go to login page if no jwt is found than, for a new login it wont go to the login func but to the login page again

app.use("/users", require("./routes/User")); // user route goes here !

app.use("/admin", require("./routes/admin")); // admin routes

app.get(
	"/sendToDashboard",
	(req, res, next) => {
		if (req.cookies.jwt) {
			jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN, (err, user) => {
				if (user) {
					next();
				}
				if (err) {
					// console.log(`JWT cookie : ${req.cookies.jwt} couldn't be processed`);
					res.redirect(`/users/logout`);
				}
			});
		} else {
			// console.log("authenticate!!!");
			res.render("login", { title: "Login" });
		}
	},
	async (req, res) => {
		const user = await jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN);
		res.redirect(`/users/dashboard/${user.email}`);
	},
);

app.use("/public",  require("./routes/public"));

app
	.route("*")
	.get(notFoundController)
	.post(notFoundController)
	.put(notFoundController)
	.delete(notFoundController);

app.listen(PORT, () => {
	console.log(`Env PORT ${process.env.PORT}`);
	console.log("lisenting @ " + PORT);

});
