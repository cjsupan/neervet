var pet_model = require('../models/Pet');

class Pets{
    async validate_pet(req, res){
        let result = await pet_model.validatePet(req.body);
        if(result.length != 0){
            res.json(result);
        }else if(result.length === 0 ){
            let result = await pet_model.addPet(req.body, req.params.id);
            let clientid= req.params.id;
            res.json([]);
        }
    }

    async delete_pet(req, res){
        let result = await pet_model.deletePet(req.params.id);
        res.redirect('/');
    }

    async get_report(req, res){
        let report = await pet_model.getReport(req.params.petid, req.params.systemid);
        
        res.render('partials/report', {report: report});
    }

    async view_pet(req, res){
        let petInfo = await pet_model.pet_info(req.params.petid);

        let petLab = await pet_model.pet_lab(req.params.petid);

        let petSystem = await pet_model.get_health_record(req.params.petid);

        res.render('partials/petpage', {client: req.params.clientid, pet: petInfo, system: petSystem, lab: petLab});
    }

    async add_pet_record(req, res){
        let result = await pet_model.addPetRecord(req.body, req.params.clientid, req.params.petid);
        res.redirect('/');
    }

    async edit_pet_info(req, res){
        let validate = await pet_model.validate_info(req.body);

        if(validate.length != 0){
            res.json(validate);
        }else{
            let update = await pet_model.update_info(req.body, req.params.id);
            res.json([]);
        }
    }

    async delete_pet_record(req, res){
        let result = await pet_model.deletePetRecord(req.params.petid, req.params.systemid);
        res.redirect('/');
    }

    async update_lab(req, res){
        let validate = await pet_model.validaterecord(req.body);

        if(validate.length != 0){
            res.json(validate);
        }else if(validate.length === 0){
            let result = await pet_model.updateLab(req.body, req.params.clientid, req.params.petid, req.params.systemid);
            res.json([]);
        }
        
    }

    async get_lab(req, res){
        let petInfo = await pet_model.pet_info(req.params.petid);
       
        let petSystem = await pet_model.pet_system(req.params.petid, req.params.systemid);
        
        let petVitalsign = await pet_model.pet_vitalsign(req.params.petid, req.params.systemid);
        
        let petHistory = await pet_model.pet_history(req.params.petid, req.params.systemid);
        
        let petLab = await pet_model.get_pet_lab(req.params.petid, req.params.systemid);
        
        res.render('partials/editrecord', {pet: petInfo, system: petSystem, vitalsign: petVitalsign, history: petHistory, lab: petLab});
    }

    async get_health(req, res){
       
        let petInfo = await pet_model.pet_info(req.params.petid);

        let petSystem = await pet_model.pet_system(req.params.petid, req.params.systemid);
        
        let petVitalsign = await pet_model.pet_vitalsign(req.params.petid, req.params.systemid);
        
        let petHistory = await pet_model.pet_history(req.params.petid, req.params.systemid);
        
        let petLab = await pet_model.get_pet_lab(req.params.petid, req.params.systemid);

        res.render('partials/healthrecord', {pet: petInfo, system: petSystem, vitalsign: petVitalsign, history: petHistory, lab: petLab ,user: req.session.name});
    }
}

module.exports = new Pets();