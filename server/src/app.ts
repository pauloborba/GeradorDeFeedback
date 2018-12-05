import express from "express";
import compression from "compression";
import * as bodyParser from "body-parser";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import passport from "passport";
import expressValidator from "express-validator";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env.example" });
// Create Express server
const app = express();

// Express configuration
app.use(express.static(__dirname + "/../client/dist/client"));
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(passport.initialize());
app.use(passport.session());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

export default app;