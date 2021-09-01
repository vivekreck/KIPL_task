import dotenv from "dotenv";
dotenv.config();

export const constants = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI
}