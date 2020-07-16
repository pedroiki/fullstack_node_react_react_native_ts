import express from 'express';
import PointsController from "./controllers/PointsController";
import ItemsController from "./controllers/ItemsController";
import multer from "multer";
import multerConfig from "./config/multer";
import {celebrate, Joi} from "celebrate"; // Validações

const pointsController = new PointsController();
const itemsController = new ItemsController();
// Declarando fora do arquivo principal
const routes = express.Router();
const upload = multer(multerConfig);

routes.get('/items', itemsController.index);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);
routes.post('/points',
    upload.single('image'),
    celebrate({
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.string().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required(),
            })
        }, {
            abortEarly: false // Verifique todos os campos e retorna em uma unica mensagem
        }
    ),
    pointsController.create
);

// Convenção
// index    = listagem
// show     = unico registro
// create
// update
// delete

export default routes;
