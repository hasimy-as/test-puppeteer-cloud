const Router = require('restify-router').Router;

const router = new Router();

/** @module: Upload Image **/
const { generateDocuments } = require('./generateDocuments');
router.post('/generate', generateDocuments);

module.exports = router;
