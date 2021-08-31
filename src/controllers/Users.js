var user_model = require('../models/User');

class Users{
    async login(req, res){
       
        if(req.session.user_id === undefined || req.session.user_id === ''  && req.session.user_level === undefined || req.session.user_level === '' ){
            req.session.errors = [];
            res.render('index');
        }else{
            res.redirect('/home');
        }
    }

    async logout(req, res){
        req.session.user_id = undefined;
        req.session.user_level = undefined;
        req.session.user_name = undefined;
        res.redirect('/');
    }

    async validate_login(req, res){

        let result = await user_model.validateLogin(req.body);

        if(result.length != 0){
            res.json(result);

        }else{
            
            let getUserLevel = await user_model.getUserLevel(req.body);

            let userID = getUserLevel[0].id;
            let userLevel = getUserLevel[0].user_level;
            let username = getUserLevel[0].username;

            req.session.user_level = userLevel;
            req.session.user_id = userID;
            req.session.user_name = username;

            res.json([]);
        }
    }

    async home(req, res){
        
        let client = await user_model.countClient();
        let app = await user_model.countApp();

        if(req.session.user_level === 'admin'){
            res.render('adminhome', {clients: client, app: app, user: req.session.user_name});

        }else if(req.session.user_level === 'subadmin'){
            res.render('home', {clients: client, app: app, user: req.session.user_name});

        }
    }

    async edit_profile(req, res){
        let result = await user_model.getUser(req.session.user_id);

        res.render('partials/editprofile', {user: result, id: req.session.user_id});
    }

    async edit_user(req, res){

        let result = await user_model.validateProfile(req.body);
        if(result.length != 0){
            res.json(result);
        }else{
            let updateUser = await user_model.editUser(req.body, req.params.id);
            req.session.user_name = req.body.username;
            res.json([]);
        }
    }

    async add_user_page(req, res){
        res.render('partials/adduser');
    }

    async validate_user(req, res){
        let result = await user_model.validateUser(req.body);
        
        if(result.length != 0){
            res.json(result);
        }else{
            res.json([]);
        }
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
        console.log(result);
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