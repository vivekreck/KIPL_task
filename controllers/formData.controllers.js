import csvtojson from "csvtojson";

import { deletetempfile } from "../configs/multer.js";

import { FormData } from "../models/formData.models.js";

import { getPaginatedData } from "../services/pagination.js";

export const fileUpload = async (req, res, next) => {
    try {
        if (!req.file) { return res.error(`Wrong format`, null, `File must be in type of csv fromat!`); }

        const formData = await csvtojson().fromFile(req.file.path);
        await FormData.insertMany(formData);

        deletetempfile(req.file.path);
        res.successfullyCreated(`Data Saved`, null, `Data Saved Successfully`);
    } catch (err) {
        deletetempfile(req.file.path);
        res.error(err, null, `Something went wrong!`);
    }
}

export const readAllData = async (req, res, next) => {
    const { page, limit } = req.query;
    try {
        const paginatedData = await getPaginatedData(FormData, page, limit, {}, "", "userName email firstName lastName");
        if (!paginatedData.data) { return res.error(paginatedData.message, null, paginatedData.displayMessage) }

        res.success(`Data fetch`, paginatedData, `All Data fetched!`);
    } catch (err) {
        res.error(err, null, `Something went wrong!`);
    }
}

export const readDataWithId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await FormData.findById(id.toString()).select("userName email firstName lastName");
        if (!data) { return res.warning(`Wrong Id`, null, `No data found with this Id!`) }

        res.success(`Data fetch`, data, `All Data fetched!`);
    } catch (err) {
        res.error(err, null, `Something went wrong!`);
    }
}

export const updateDataWithId = async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await FormData.findById(id.toString());
        if (!data) { return res.warning(`Wrong Id`, null, `No data found with this Id!`) }

        const userName = req.body.userName || data.userName;
        const email = req.body.email || data.email;
        const firstName = req.body.firstName || data.firstName;
        const lastName = req.body.lastName || data.lastName;

        await FormData.findByIdAndUpdate(id.toString(), { userName, email, firstName, lastName });
        res.success(`Form update!`, null, `Form updated successfully!`);
    } catch (err) {
        res.error(err, null, `Something went wrong!`);
    }
}

export const deleteDataWithId = async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await FormData.findByIdAndDelete(id.toString());
        if (!data) { return res.warning(`Wrong Id`, null, `No data found with this Id!`) }

        res.success(`Data deleted!`, null, `Data deleted successfully!`);
    } catch (err) {
        res.error(err, null, `Something went wrong!`);
    }
}