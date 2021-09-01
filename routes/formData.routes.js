import { Router } from 'express';

import * as formDataController from '../controllers/formData.controllers.js';

import { uploadtempfile } from "../configs/multer.js";

import { validationMiddleware } from "../middleware/validation.middleware.js";
import { schemas } from "../services/validation.js";

const routes = Router();

routes.post('/', uploadtempfile, formDataController.fileUpload);

routes.get('/', formDataController.readAllData);

routes.get('/:id', validationMiddleware(schemas.blogId, "params"), formDataController.readDataWithId);

routes.put('/:id', validationMiddleware(schemas.blogId, "params"),validationMiddleware(schemas.blogFormData), formDataController.updateDataWithId);

routes.delete('/:id', validationMiddleware(schemas.blogId, "params"), formDataController.deleteDataWithId);

export default routes;