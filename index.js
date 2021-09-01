import express from "express";
import chalk from 'chalk';
import mongoose from "mongoose";


import middlewaresConfig, { responseMiddleware, requestError } from "./configs/middlewares.js";
import { constants } from "./configs/constants.js";

import formDataRouter from "./routes/formData.routes.js"

const app = express();

middlewaresConfig(app);

app.use('/form', formDataRouter); 

responseMiddleware(app);
requestError(app);

app.listen(constants.PORT, async () => {
    await mongoose.connect(constants.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(
        chalk.blueBright.bold(`
        App listen on port: ${constants.PORT} 🍕
      `,),
    );
});