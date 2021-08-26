var user_model = require('../models/User');

class Users{

    async login(req, res){
       
        let result = [];
        res.render('login', {errors: result});
    }

    async validate_login(req, res){
        let result = await user_model.validateLogin(req.body);
        
        if(result.length != 0){
            res.render('login', {errors: result});
        }else if(result.length === 0){
            
            res.redirect('/home');
        }
    }

    async home(req, res){
        let client = await user_model.countClient();
        let app = await user_model.countApp();

        res.render('home', {clients: client, app: app});
       
    }
    async appointment(req, res){
        let getAppointment = await user_model.getAllAppointment();
        res.render('partials/appointment', {app: getAppointment});
    }

    async search_app(req, res){
        let getAppointment = await user_model.searchApp(req.body);
        res.render('partials/appointment', {app: getAppointment});
    }

    async client(req, res){
        let getclient = await user_model.getAllClient();
        res.render('partials/client.ejs', {client: getclient});
    }

    async search_client(req, res){
        let getclient = await user_model.searchClient(req.body);
        res.render('partials/client.ejs', {client: getclient});
    }

    async validate_client(req, res){
        let result = await user_model.validateClient(req.body);
        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let add = await user_model.addClient(req.body);
            res.json({url: '/'});
        }
    }

    async delete_client(req, res){
        let result = await user_model.deleteClient(req.params.id);
        res.redirect('/');
    }

    async view_client(req, res){
        let client = await user_model.viewClient(req.params.id);
        let pet = await user_model.getAllPet(req.params.id);
        res.render('partials/clientpage.ejs', {client: client, pet: pet});
    }

    async validate_appointment(req, res){
        let result = await user_model.validateAppointment(req.body);
        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let result = await user_model.addAppointment(req.body, req.params.id);
            res.json('clear');
        }
    }

    async delete_appointment(req, res){
        let result = await user_model.deleteAppointment(req.params.id);
        res.redirect('/');
    }

    async get_notification(req, res){
        let result = await user_model.getNotif(req.params.number);

        res.render('partials/notification.ejs', {clients: result});
    }

    async send_notification(req, res){
        let result = await user_model.sendNotif(req.params.day);
        res.json("/");
    }

    async validate_pet(req, res){
        let result = await user_model.validatePet(req.body);
        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let result = await user_model.addPet(req.body, req.params.id);
            let clientid= req.params.id;
            res.json(parseInt(clientid));
        }
    }

    async delete_pet(req, res){
        let result = await user_model.deletePet(req.params.id);
        res.redirect('/');
    }

    async view_pet(req, res){
       
        let petInfo = await user_model.pet_info(req.params.petid);

        let petSystem = await user_model.pet_system(petInfo[0].petId);

        let petVitalsign = await user_model.pet_vitalsign(petInfo[0].petId);

        let petHistory = await user_model.pet_history(petInfo[0].petId);

        let petLab = await user_model.pet_lab(petInfo[0].petId);

        res.render('partials/petpage.ejs', {client: req.params.clientid, pet: petInfo, system: petSystem, vitalsign: petVitalsign, history: petHistory, lab: petLab});

    }

    async add_pet_record(req, res){
        let result = await user_model.addPetRecord(req.body, req.params.clientid, req.params.petid);
        res.redirect('/');
    }

    async delete_pet_record(req, res){
        let result = await user_model.deletePetRecord(req.params.systemid, req.params.vitalid, req.params.historyid);
        res.redirect('/');
    }

    async update_lab(req, res){
        let result = await user_model.updateLab(req.body, req.params.id);
        res.redirect('/');
    }

    async get_lab(req, res){
        let result = await user_model.getLab(req.params.id);
        res.json(result);
    }
}

module.exports = new Users();