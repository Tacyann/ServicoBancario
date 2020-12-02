const crypto = require('crypto');
const connection = require('../database/connection');


module.exports = {
    async index(request, response) {
        try {
            const conta = await connection('conta').select('*');
            return response.json(conta);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível consultar a conta!");
            return response.json({ mensagem: "Não foi possível consultar a conta!" })
        }
    },

    async getById(request, response) {
        try {
            const { idconta } = request.params;  
            const conta = await connection('conta').where('idconta', idconta).select('*').first();
            return response.json(conta);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível consultar a conta!");
            return response.json({ mensagem: "Não foi possível consultar a conta!" })
        }
    },

    async create(request, response) {
        try {
            const { nome, numconta, valor } = request.body;
            const idconta = crypto.randomBytes(4).toString('HEX');
            await connection('conta').insert({
                idconta,
                nome,
                numconta,
                valor,
            })

            return response.json({ idconta });
        } catch (e) {
            console.log(e);
            console.log("Não foi possível criar a conta!");
            return response.json({ mensagem: "Não foi possível criar conta!" })
        }
    }




};