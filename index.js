const cors = require('cors');
const restify = require('restify');

const app = require('./package.json');
const log = require('./utils/logger');
const router = require('./bin/server');
const response = require('./utils/response');
const { CODE, OPTIONS } = require('./utils/commons');

/** @description: Server and apply router instance **/
const server = restify.createServer({ name: app.name });

server.pre(cors(OPTIONS.CORS));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.authorizationParser());
server.use(restify.plugins.bodyParser(OPTIONS.PARSER));
server.use(restify.plugins.acceptParser(server.acceptable));

router.applyRoutes(server, '/docs');
server.get('/', (req, res) => response.data(res, 'Home', 'Hello world!', CODE.SUCCESS));

/** @description: Server port **/
const PORT = 9000;

server.listen(PORT, async (err) => {
  if (err) {
    log(app.name, err);
    return process.exit(1);
  }

  log(`Connected to port:${PORT}`, app.name);
});
