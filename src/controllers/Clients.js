var client_model = require('../models/Client');
var pet_model = require('../models/Pet');

class Clients{

    async client(req, res){
        let getclient = await client_model.getAllClient();
        res.render('partials/client.ejs', {client: getclient});
    }

    async search_client(req, res){
        let getclient = await client_model.searchClient(req.body);
        res.render('partials/client.ejs', {client: getclient});
    }

    async validate_client(req, res){
        let result = await client_model.validateClient(req.body);

        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let add = await client_model.addClient(req.body);
            res.json({url: '/'});
        }
    }

    async update_client(req, res){
        let validate = await client_model.validateClient(req.body);
        
        if(validate.length != 0){
            res.json(validate);
        }else{
            let update = await client_model.updateClient(req.body, req.params.id);
            res.json([]);
        }
    }

    async delete_client(req, res){
        let result = await client_model.deleteClient(req.params.id);
        res.redirect('/');
    }

    async view_client(req, res){
        let client = await client_model.viewClient(req.params.id);
        let pet = await pet_model.getAllPet(req.params.id);
        res.render('partials/clientpage.ejs', {client: client, pet: pet});
    }

}

module.exports = new Clients();