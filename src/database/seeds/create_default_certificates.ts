import Knex from 'knex';

export async function seed(knex: Knex){
    await knex('Certificate').insert([
        { 
            Institution: 'Senac', 
            CourseName: "Computer Technician", 
            Date: "2016 - 2017", 
            Description: "Course finished in 2017 in one of the best institutions of  brazilian open professional education, covering the entire area of computer education.", 
            Image: "https://henriquecavalcanteapi.herokuapp.com/uploads/certificateSenac.png" 
        },
        { 
            Institution: 'Centro Universitário das Faculdades Metropolitanas Unidas', 
            CourseName: "Analysis and Systems Development", 
            Date: "2018 - 2020", 
            Description: "On going.", 
            Image: "https://henriquecavalcanteapi.herokuapp.com/uploads/certificateSenac.png" 
        },
    ]);
}