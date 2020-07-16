import express from 'express';

const port = 3333;
const users = ['Gustavo', 'Michelle', 'Duda', 'Davi'];
const app = express();

// KNEX
// SELECT * FROM users WHERE name = 'Gustavo';
// knex('users').where('name', 'Gustavo').select('*');

// Para entender o body json
app.use(express.json());

// Query param - http://localhost:3333/users?search=gustavo
app.get('/users', (request, response) => {
    const search = String(request.query.search);
    const filteredUsers = users ? users.filter(user => user.includes(search)) : users;
    return response.json(filteredUsers);
});

// Request param - http://localhost:3333/users/1
app.get('/users/:id', (request, response) => {
    const id = request.params.id;
    response.json(users[Number(id)]);
});

app.post('/users', (request, response) => {
    const user = request.body;
    return response.json(user);
});

console.log(`Running on the port ${port}`);
app.listen(port);
