var user_model = require('../models/User');
// const sgMail = require("@sendgrid/mail");
// sgMail.setApiKey("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");

class Users{
    async index(req, res){
        let client = await user_model.countClient();
        let app = await user_model.countApp();

        // const msg = {
        //     to: "cedricksupan@yahoo.com",
        //     from: "supancj18@gmail.com",
        //     subject: "testing email from node",
        //     text: "here's the email",
        //     html: "<p>this is email too</p>"
        // };

        // sgMail.send(msg).then(() => {
        //     console.log('email has been sent');
        // }).catch((error) => {
        //     console.log(error);
        // });

        res.render('index', {clients: client, app: app});
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
        let result = await user_model.getNotif();
        console.log(result);
        res.render('partials/notification.ejs', {clients: result});
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