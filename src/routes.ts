import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import SkillsController from './controllers/SkillsController';
import CertificatesController from './controllers/CertificatesController';

const routes = express.Router();
const skillsController = new SkillsController();
const certificatesController = new CertificatesController();

//Rota de arquivos estaticos
routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//Rota do Swagger
routes.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Funcionalidades
routes.get('/skills', skillsController.index);
routes.get('/skills/:id', skillsController.show);
routes.post('/skills', skillsController.create);
routes.delete('/skills/:id', skillsController.delete);
routes.put('/skills/:id', skillsController.put);

routes.get('/certificate', certificatesController.index);
routes.get('/certificate/:id', certificatesController.show);
routes.post('/certificate', certificatesController.create);
routes.delete('/certificate/:id', certificatesController.delete);
routes.put('/certificate/:id', certificatesController.put);

export default routes;