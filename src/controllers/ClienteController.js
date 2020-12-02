const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async index(request, response) {
        try {
            const cliente = await connection('cliente').select('*');
            return response.json(cliente);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível consultar os clientes!");
            return response.json({ mensagem: "Não foi possível consultar os clientes!" })
        }
    },

    async getById(request, response) {
        try {
            const { idcliente } = request.params;  
            const cliente = await connection('cliente').where('idcliente', idcliente).select('*').first();
            return response.json(cliente);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível consultar os clientes!");
            return response.json({ mensagem: "Não foi possível consultar os clientes!" })
        }
    },

    async create(request, response) {
        try {
            const { nomecliente, datNascimento, telcliente, RGcliente, CPFcliente, ruacliente, bairro, numcliente } = request.body;
            const idcliente = crypto.randomBytes(4).toString('HEX');
            await connection('cliente').insert({
                idcliente,
                nomecliente,
                datNascimento,
                telcliente,
                RGcliente,
                CPFcliente,
                ruacliente,
                bairro,
                numcliente,

            })

            return response.json({ idcliente });
        } catch (e) {
            console.log(e);
            console.log("Não foi possível cadastrar cliente!");
            return response.json({ mensagem: "Não foi possível cadastrar cliente!" })
        }
    },

    async delete(request, response) {
        const { idcliente } = request.params;// eu vou pegar o id que vem da minha routa de parametros

        const cliente = await connection('cliente').where('idcliente', idcliente).select("*");
        if (cliente.length == 0) {
            return response.status(401).json({ error: "Operação não permitida." })
        }

        await connection('cliente').where('idcliente', idcliente).delete("*");

        return response.status(204).send();
    },
    
    async update(request, response) {
        try {
            const { idcliente } = request.params;// eu vou pegar o id que vem da minha routa de parametros
            const { nomecliente, datNascimento, telcliente, RGcliente, CPFcliente, ruacliente, bairro, numcliente } = request.body;

            const cliente = await connection('cliente').where('idcliente ', idcliente).select("*");
            if (cliente.length == 0) {
                return response.status(401).json({ error: "Operação não permitida." })
            }

            await connection('cliente').where('idcliente ', idcliente)
                .update({
                    idcliente,
                    nomecliente,
                    datNascimento,
                    telcliente,
                    RGcliente,
                    CPFcliente,
                    ruacliente,
                    bairro,
                    numcliente,
                });
            return response.json(cliente);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível alterar o cliente!");
            return response.json({ mensagem: "Não foi possível alterar o cliente!" })
        }
    },


};