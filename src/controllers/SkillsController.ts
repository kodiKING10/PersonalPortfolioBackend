import { Request, Response } from 'express';
//Importando conexão com o banco de dados
import knex from '../database/connection';

class SkillsController {

    async index(request: Request, response: Response) {
        try {
            const skills = await knex('Skills').select('*');
            return response.json(skills);
        } catch (error){
            return response.status(400);
        }
    }

    async show(request: Request, response: Response) {
        const id = request.params.id;

        try {
            const skill = await knex('Skills').where('ID',id).first();

            if(!skill){
                return response.status(204).json({ message: "Skill not found."});
            }    
            
            return response.json(skill);

        } catch (error){
            return response.status(400);
        }
    }

    async create(request: Request, response: Response) {
        const {
           SkillName,
           Percentage
        } = request.body;
    
        const trx = await knex.transaction();

        const skill = {
            SkillName,
            Percentage
        };
    
        const insertedSkills = await trx('Skills').insert(skill);

        const skill_id = insertedSkills[0];

        await trx.commit();
    
        return response.json({ 
            id: skill_id,
            ...skill
        });
    }

    async delete(request: Request, response: Response){
        const id = request.params.id;

        try{
            const trx = await knex.transaction();

            await trx('Skills')
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
           SkillName,
           Percentage
        } = request.body;
    
        try {
            const trx = await knex.transaction();
        
            await trx('Skills')
            .where('ID', id)
            .update({ SkillName: SkillName, Percentage: Percentage });

            await trx.commit();
        
            return response.json({ message: "Skill updated successfully." });

        } catch(error){
            return response.status(204).json({ message: "Not found." });
        }
    }
}

export default SkillsController;