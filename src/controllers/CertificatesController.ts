import { Request, Response } from 'express';
//Importando conexão com o banco de dados
import knex from '../database/connection';

class CertificatesController {

    async index(request: Request, response: Response) {
        try {
            const certificates = await knex('Certificate').select('*');
            return response.json(certificates);
        } catch (error){
            return response.status(400);
        }
    }

    async show(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const certificate = await knex('Certificate').where('ID',id).first();

            if(!certificate){
                return response.status(400).json({ message: "Certificate not found."});
            }    
            
            return response.json(certificate);

        } catch (error){
            return response.status(400);
        }
    }

    async create(request: Request, response: Response) {
        const {
           Institution,
           CourseName,
           Date,
           Description,
           Image
        } = request.body;
   
        const trx = await knex.transaction();

        const certificates = {
            Institution,
            CourseName,
            Date,
            Description,
            Image
        };
   
        const insertedCertificate = await trx('Certificate').insert(certificates);

        const certificate_id = insertedCertificate[0];

        await trx.commit();
   
        return response.json({ 
            inserted_id: certificate_id,
            ...certificates
        });
    }

    async delete(request: Request, response: Response){
        const id = request.params.id;

        try{
            const trx = await knex.transaction();

            await trx('Certificate')
            .where('ID', id)
            .del();

            await trx.commit();

            return response.json({
                message: "the data with ID "+ id +" was deleted successfully."
            })
        } catch(error) {
            return response.status(400);
        }
    }

    async put(request: Request, response: Response) {
        
        const { id } = request.params;

        const {
            Institution,
            CourseName,
            Date,
            Description,
            Image
        } = request.body;
    
        try {
            const trx = await knex.transaction();
        
            await trx('Certificate')
            .where('ID', id)
            .update({ 
                Institution,
                CourseName,
                Date,
                Description,
                Image 
            });

            await trx.commit();
        
            return response.json({ message: "Certificate updated successfully." });

        } catch(error){
            return response.status(404).json({ message: "Something went wrong." });
        }
    }
}

export default CertificatesController;