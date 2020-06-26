// Toda vez que for especificar um tipo de uma variavel utilizando uma importação, é boas praticas deixa-la como maiscula
import Knex from 'knex';

// Estamos informando o tipo da variavel que esta sendo passada como argumento, assim, podemos ver todos os metodos disponiveis dentro dessa variavel, ao digita-la
export async function up(knex: Knex){
    return knex.schema.createTable('Skills', table => {
        table.increments('ID').primary().notNullable();
        table.string('SkillName', 255).notNullable();
        table.integer('Percentage').notNullable();
    });
}

//Volta atras com o que foi feito no método up
export async function down(knex: Knex){
    return knex.schema.dropTable('Skills');
}