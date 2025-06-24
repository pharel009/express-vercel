import { Router } from 'express';
import * as shelfController from '../controllers/shelf.controller.js';

const shelfRouter = Router();


shelfRouter.post('/create', shelfController.createShelf);
shelfRouter.get('/', shelfController.getAllShelves);

export default shelfRouter;
