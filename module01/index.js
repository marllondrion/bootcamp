const express = require('express');

const server = express();

server.use(express.json());

//List of products
const products = ['Pen', 'Mobile Phone', 'TV']


/**
 * Middleware functions are functions that have access to 
 * the request object (req), the response object (res), and 
 * the next middleware function in the application’s 
 * request-response cycle. These functions are used to 
 * modify req and res objects for tasks like parsing 
 * request bodies, adding response headers, etc.
 */

/**
 * Global middleware
 */
server.use((req, res, next) => {
    console.log(`${Date()} - method: ${req.method} - url: ${req.url} - body: ${JSON.stringify(req.JSON)}`);

    next();

    console.info("end")
})

/**
 * writing-middleware
 */
function checkProductExists(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'product not found on request body' });
    }
    return next();
}

function checkProductInArray(req, res, next) {
    const product = products[req.params.index]
    if (!product) {
        return res.status(400).json({ error: 'product does not found in the DB' });
    }
    req.product = product;
    return next();
}



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
server.get('/product/:index', checkProductInArray, (req, res) => {

    //return res.json(({ 'message': `Hi Mate your product id is ${id}` }));
    //before checkProductInArray: 
    //const { index } = req.params;
    //return res.json(products[index]);
    return res.json(req.product);
});

server.get('/products/', (req, res) => {
    return res.json(products);
});

/*Request body*/
//add a new product
server.post('/product', checkProductExists, (req, res) => {
    const { name } = req.body;
    products.push(name);

    return res.json(products);
});

/**
 * Edit
 */
server.put('/product/:index', checkProductExists, checkProductInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    products[index] = name;
    return res.json(products);
});
/**
 * Delete product by the index
 */
server.delete('/product/:index', checkProductInArray, (req, res) => {
    //Before checkProductInArray:
    //const { index } = req.body;
    //products.pop(products[index]);
    //products.splice(index,1);

    products.pop(req.product);
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

