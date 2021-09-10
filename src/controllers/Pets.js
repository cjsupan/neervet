var pet_model = require('../models/Pet');

class Pets{
    async validate_pet(req, res){
        let result = await pet_model.validatePet(req.body);
        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let result = await pet_model.addPet(req.body, req.params.id);
            let clientid= req.params.id;
            res.json(parseInt(clientid));
        }
    }

    async delete_pet(req, res){
        let result = await pet_model.deletePet(req.params.id);
        res.redirect('/');
    }

    async view_pet(req, res){
        let petInfo = await pet_model.pet_info(req.params.petid);

        // let petSystem = await pet_model.pet_system(petInfo[0].petId);

        // let petVitalsign = await pet_model.pet_vitalsign(petInfo[0].petId);

        // let petHistory = await pet_model.pet_history(petInfo[0].petId);

        // let petLab = await pet_model.pet_lab(petInfo[0].petId);

        // res.render('partials/petpage.ejs', {client: req.params.clientid, pet: petInfo, system: petSystem, vitalsign: petVitalsign, history: petHistory, lab: petLab});
        let petSystem = await pet_model.get_health_record(req.params.petid);

        res.render('partials/petpage', {client: req.params.clientid, pet: petInfo, system: petSystem});
    }

    async add_pet_record(req, res){
        let result = await pet_model.addPetRecord(req.body, req.params.clientid, req.params.petid);
        res.redirect('/');
    }

    async delete_pet_record(req, res){
        let result = await pet_model.deletePetRecord(req.params.systemid, req.params.vitalid, req.params.historyid);
        res.redirect('/');
    }

    async update_lab(req, res){

        let result = await pet_model.updateLab(req.body, req.params.id, req.params.clientId);
        res.redirect('/');
    }

    async get_lab(req, res){
        let result = await pet_model.getLab(req.params.id);
        res.json(result);
    }

    async get_health(req, res){
       
        let petInfo = await pet_model.pet_info(req.params.petid);
        // console.log('pet Info', petInfo);

        let petSystem = await pet_model.pet_system(req.params.petid, req.params.systemid);
        // console.log('pet system', petSystem);
        let petVitalsign = await pet_model.pet_vitalsign(req.params.petid, req.params.systemid);
        // console.log('pet vitalsign', petVitalsign);
        let petHistory = await pet_model.pet_history(req.params.petid, req.params.systemid);
        // console.log('pet history', petHistory);
        let petLab = await pet_model.pet_lab(req.params.petid, req.params.systemid);
        // console.log('pet lab', petLab);

        res.render('printpage', {pet: petInfo, system: petSystem, vitalsign: petVitalsign, history: petHistory, lab: petLab ,user: req.session.name});
    }
}

module.exports = new Pets();