import mongoose from "mongoose";
const Schema = mongoose.Schema;

const formSchema = new Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        }
    }
);

export const FormData = mongoose.model('formdata', formSchema);