const express = require('express');
const actionRouter = require('./resources/actions/actionRoutes');
const projectRouter = require('./resources/projects/projectRoutes');

const server = express();

server.use('/actions', logger, actionRouter);
server.use('/projects', logger, projectRouter);


server.get('/', (req, res) => {
    res.send("You found me!")
});

//custom middleware
function logger(req, res, next) {
    console.log(
        `${req.method} request to route: ${req.originalUrl} at [${new Date().toISOString()}]`
    );
    next();
};

module.exports = server;