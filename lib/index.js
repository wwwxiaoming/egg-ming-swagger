const swagger = require('./swagger')
// class Index {
//   constructor(app) {
//   }
//   swaggerInit(router,header,app) {
//     new swagger(router,header,app).initSwagger();
//   }
// }
function index(router,header,app) {
  new swagger(router,header,app).initSwagger();
}
module.exports = index;