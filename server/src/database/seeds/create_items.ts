import Knex from 'knex';

export async function seed(knex: Knex) {
    // Delete
    await knex('items').delete();

    // Massa de dados
    await knex('items').insert([
        {title: 'Pizza', image: 'pizza.svg'},
        {title: 'Pasta', image: 'pasta.svg'},                //https://www.flaticon.com/
        {title: 'sobremesas', image: 'dessert.svg'},
        {title: 'Comida Chinesa', image: 'chinese.svg'},
        {title: 'Comida Indiana', image: 'indianFood.svg'},
        {title: 'Bebidas', image: 'drinks.svg'},
    ])
}


// C:\Users\PedroZ\Desktop\Ecoleta - best\next-level-week-master\server\uploads

