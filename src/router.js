const express = require('express');
const ContaController = require('./controllers/ContaController');
//const contaController = require('./controllers/contaController');

//desacoplando o modo de Rotas no express em uma nova variavel
const routes = express.Router();


routes.post('/conta', ContaController.create);
routes.get('/conta', ContaController.index);
routes.get('/conta/:idconta', ContaController.getById);
routes.delete('/conta/:idconta', ContaController.delete);
routes.put('/conta/:idconta', ContaController.update);

/*routes.post('/conta', contaController.create);
routes.get('/conta', contaController.index);
routes.get('/conta/:idconta', contaController.getById);
routes.delete('/conta/:idconta', contaController.delete);
routes.put('/conta/:idconta', contaController.update);
*/
module.exports = routes;