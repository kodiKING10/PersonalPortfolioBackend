import express from 'express';
import path from 'path';
import SkillsController from './controllers/SkillsController';
import CertificatesController from './controllers/CertificatesController';

const routes = express.Router();
const skillsController = new SkillsController();
const certificatesController = new CertificatesController();

//Rota de arquivos estaticos
routes.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

//Rota de Home
routes.get('/', (request, response) => {
    return response.json({
        Project: "Portfolio v2",
        Author: "Henrique Cavalcante Veiga"
    });
});

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