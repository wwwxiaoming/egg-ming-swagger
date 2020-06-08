const swagger = require('./lib/swagger')
const file = require('./lib/fileInput')
const index = require('./lib/index')
module.exports = app => {
  new file(app).fileWriter();
  app.swagger = index;
}