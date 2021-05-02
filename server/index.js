import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from "socket.io";

const app = express();
const server = createServer(app);

import playerHandler from './player';
import adminHandler from './admin';

const io = new SocketServer(server);
io.on('connection', (socket) => {
    if (socket.handshake.headers.type == 'player') playerHandler(socket, io);
    else if (socket.handshake.headers.type == 'admin') adminHandler(socket, io);
    else console.log("invalid connection type");
})


app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf.toString();
    }
}));

import fileUpload from 'express-fileupload';
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.set('trust proxy', 1);

app.use(express.static('app'));
app.use('/uploaded', express.static('../uploaded'));

import api from './endpoints';
app.use('/api', api);

const index = (_, res) => res.sendFile('app/index.html', {root : '.'});
app.get('*', index);

const begin = () => ("Now listening on https://localhost:3000");
server.listen(3000, begin);
