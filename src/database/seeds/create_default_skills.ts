import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('Skills').insert([
        { SkillName: 'C#', Percentage: 75 },
        { SkillName: 'HTML & CSS', Percentage: 85 },
        { SkillName: 'Javascript', Percentage: 75 },
        { SkillName: 'Node.js', Percentage: 65 },
        { SkillName: 'React', Percentage: 70 },
        { SkillName: 'React Native', Percentage: 67 },
    ]);
}