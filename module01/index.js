const express = require('express');

const server = express();

server.use(express.json());


const products = ['Pen', 'Mobile Phone', 'TV']


/**
 * Query params = url?name={value}
 * Routte params = url/product/{value}
 * Request body = Json that is sendind as object in the body
**/

/*Query params**/
server.get('/getInfo', (req, res) => {
    const name = req.query.name;
    return res.json(({ 'message': `Hi Mate ${name}` }));
});
/**
 * CRUD:
 */

/*Routte params*/
server.get('/product/:index', (req, res) => {
    const { index } = req.params;
    //return res.json(({ 'message': `Hi Mate your product id is ${id}` }));
    return res.json(products[index]);
});

server.get('/products/', (req, res) => {
    return res.json(products);
});

/*Request body*/
//add a new product
server.post('/product', (req, res) => {
    const { name } = req.body;
    products.push(name);
    return res.json(products);
});

/**
 * Edit
 */
server.put('/product/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    products[index] = name;
    return res.json(products);
});
/**
 * Delete product by the index
 */
server.delete('/product/:index', (req, res) => {
    const { index } = req.body;
    products.pop(products[index]);
    //products.splice(index,1);
    return res.send();
});


/**
 * Hello World
 */
server.get('/test', (req, res) => {

    //text
    //  return res.send('Hi Mate');

    //json
    return res.json(({ 'message': 'Hi Mate' }));
});


server.listen(3000);

