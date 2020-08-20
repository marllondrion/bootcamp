const express = require('express');

const server = express();
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

/*Routte params*/
server.get('/product/:id', (req, res) => {
    const { id } = req.params;
    return res.json(({ 'message': `Hi Mate your product id is ${id}` }));
});


/*Request body*/

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

