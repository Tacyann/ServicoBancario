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
    },


    async depositarValor(request, response){
        try {
        const { idconta } = request.params;
        const { valor } = request.body;

        const depoisto = await connection('conta').where('idconta ', idconta).select("*");
      
        if (depoisto.length == 0) {
            return response.status(401).json({ error: "Operação não permitida." })
        }

        await connection('deposito').where('idconta ', idconta)
                .insert({
                    valor,    
                });
            return response.json(deposito);
        } catch (e) {
            console.log(e);
            console.log("Não foi possível realizar deposito!");
            return response.json({ mensagem: "Não foi possível realizar deposito!" })
        }
    },

    async sacarValor(request, response){
        try {
        const {idconta } = request.params;  
        var account = _context.Accounts.Find(id);
        if (account == null) return NotFound();
    
        account.Balance += model.Amount;
    
        await _context.SaveChangesAsync();
    
        return Accepted(account);
    } catch (e) {
        console.log(e);
        console.log("Não foi possível criar a conta!");
        return response.json({ mensagem: "Não foi possível realizar deposito!" })
    }
    }

};