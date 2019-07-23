



//Blocking, synchronous way
 const fs = require('fs');
 const http = require('http');
 const url = require('url');
 const replaceTemplate = require('./modules/replaceTemplate');

 /////////////////////////////////////////
 //FILES
// //Synchronous way of reading and writting data 
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
// //console.log(textIn);
// const textOut = `This is all I know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
// fs.writeFileSync('./txt/input.txt', textOut);
// //console.log('File Updated!');

//None-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'UTF-8', (err, data1) => {
//     if(err) return console.log('ERROR!!!');
//     fs.readFile(`./txt/${data1}.txt`, 'UTF-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'UTF-8', (err, data3) => {
//             console.log(data3);
//             fs.writeFile(`./txt/final.txt`, `${data2}\n${data3}`, 'UTF-8', err => {
//                 console.log('Written');
//             });
//         });
//     });
// });

 /////////////////////////////////////////
 //SERVER
//  fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
//     const productData = JSON.parse(data);
//     res.writeHead(200, {'Content-type': 'application/json'});
//     res.end(data); //Sending a response to the client
// });

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    const { query, pathname} = url.parse(req.url, true);

    //Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const cardHtml = dataObj.map(el => replaceTemplate(tempCard, el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardHtml);
        res.end(output); //Sending a response to the client

    //Product page    
    }else if(pathname === '/product'){
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct, product);
        res.end(output); //Sending a response to the client

    //API page    
    }else if(pathname === '/api'){
            res.writeHead(200, {'Content-type': 'application/json'});
            res.end(data); //Sending a response to the client
    //Not fount page        
    }else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-header': 'Hello'
        });
        res.end('<h1>Page Not Found!</h1>'); //Sending a response to the client
    }
   
});

//Listening to the server responces and requests
server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to requests on port 8000');
})
/////////////////////////////////////////
 //URLs







