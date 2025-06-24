import { Router } from 'express';
import * as shelfController from '../controllers/shelf.controller.js';

const shelfRouter = Router();


shelfRouter.post('/create', shelfController.createShelf);
shelfRouter.get('/', shelfController.getAllShelves);
shelfRouter.get('/:id', shelfController.getShelf);
shelfRouter.patch('/:id', shelfController.updateShelf);
shelfRouter.delete('/:id', shelfController.deleteShelf);

export default shelfRouter;
