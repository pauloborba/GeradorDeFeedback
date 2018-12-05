import dotenv from "dotenv";
import * as fs from "fs";

if (fs.existsSync(".env")) {
    console.log("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    console.log("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
export const MONGODB_URI = process.env["MONGODB_URI"];
export const MONGODB_NAME = process.env["MONGODB_NAME"];
export const JWT_LOGIN_SECRET = process.env.JWT_LOGIN_SECRET;

if (!MONGODB_URI) {
    console.error("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}