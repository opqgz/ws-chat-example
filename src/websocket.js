const WebSocket = require('ws');
const Collection = require('@discordjs/collection');

module.exports = class Gateway {
    constructor(server) {
        this.server = new WebSocket.Server({
            server: server
        });
        
        this.connected = new Collection();
        this.messages = new Collection();

        this.server.on('connection', async (socket, request) => {
            console.log(`- A user connected: ${request.connection.remoteAddress || 'Unknown'}`);

            let id = this.connected.size;
            this.connected.set(id, { socket: socket, ip: request.connection.remoteAddress || 'Unknown' });

            this.broadcast({
                action: 'users',
                users: this.connected.map(user => user.ip)
            });

            this.broadcast({
                action: 'messages',
                messages: this.messages.map(msg => ({ author: msg.author, content: msg.content }))
            });

            socket.on('message', async (message) => {
                let data = JSON.parse(message);
                if(data.action == 'message') {
                    this.messages.set(this.messages.size, { author: request.connection.remoteAddress || 'Unknown', content: data.content });

                    this.broadcast({
                        action: 'message',
                        message: this.messages.get(this.messages.size - 1)
                    });
                }
            });

            socket.on('close', () => {
                console.log(`- ${request.connection.remoteAddress} disconnected`);

                this.connected.delete(id);
                this.broadcast({
                    action: 'users',
                    users: this.connected.map(user => user.ip)
                });
            });
        });
    }

    broadcast(json) {
        this.connected.forEach(user => {
            user.socket.send(JSON.stringify(json))
        });
    }
}