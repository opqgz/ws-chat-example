const WebSocket = require('ws');
const Collection = require('@discordjs/collection');

module.exports = class Gateway {
    constructor(server, path = 'gateway') {
        this.server = new WebSocket.Server({
            server: server,
            path: path
        });
        
        this.connected = new Collection();

        this.server.on('connection', async (socket, request) => {
            console.log(`A user connected: ${request.connection.remoteAddress || 'Unknown'}`);

            let id = this.connected.size;
            this.connected.set(id, socket);

            socket.on('message', async (message) => {
                console.log(message);
            });

            socket.on('close', () => {
                this.connected.delete(id);
                connection.log(`${request.connection.remoteAddress} disconnected`);
            });
        });
    }
}