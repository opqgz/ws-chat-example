const Gateway = require('./websocket');
const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

console.log('Configuring...');
app.use(express.json());
app.use(express.static(__dirname + '/../public'));

app.get('/', async (req, res) => {
    res.sendFile(
        require('path').resolve('public/index.html')
    );
});

console.log('Setting up gateway...');
new Gateway(server, 'gateway');

console.log('Starting server...');
app.listen(8080, '0.0.0.0', () => {
    console.log('Listening on *:8080');
});