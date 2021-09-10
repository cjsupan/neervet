var connection = require('../config/database');
const main_model = require('./Main');
var mysql = require('mysql');

class Pet extends main_model{
    constructor(){super()}
    executeQuery(query){
        return new Promise((resolve, reject)=>{
            connection.query(query, function (err, result) {         
                if(result){
                    resolve(result);
                }else{
                    reject(err);
                }
            });
        });
    }

    async getAllPet(id){
        let query = mysql.format("SELECT *, DATE_FORMAT(birthdate, '%b %e, %Y') as birthday FROM pets WHERE client_id=? ORDER BY updated_at DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async validatePet(details){
        let errors = [];
        if(this.empty(details.name)){
            errors.push("Patient's name should not be blank");
        }
        if(this.empty(details.datetime)){
            errors.push("Date and time should not be blank");
        }
        if(this.empty(details.species)){
            errors.push("Species should not be blank");
        }
        if(this.empty(details.color)){
            errors.push("Color should not be blank");
        }
        return errors;
    }

    async addPet(details, id){
        
        let date = new Date();
        var name = details.name.charAt(0).toUpperCase() + details.name.slice(1);
        var color = details.color.charAt(0).toUpperCase() + details.color.slice(1);
        var examvet = details.examvet.charAt(0).toUpperCase() + details.examvet.slice(1);

        let pets = mysql.format("INSERT INTO pets (client_id, name, species, breed, sex, altered, color, birthdate, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[id, name, details.species, details.breed, details.sex, details.altered, color, details.birthdate, details.datetime, date]);
        let petresult = await this.executeQuery(pets);
            
        let petid = petresult.insertId;

        let systems = mysql.format("INSERT INTO systems (pet_id, pet_client_id, exam_vet, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petid, id, examvet, details.generalApp, details.teethmouth, details.eyes, details.ears, details.skincoat, details.heartlungs, details.digestive, details.musculoskeletal, details.nervous, details.lymph, details.urogenitals, details.datetime, date]);
        let systemresult = await this.executeQuery(systems);

        let systemid = systemresult.insertId;

        let vitalsign = mysql.format("INSERT INTO vitalsigns (system_id, system_pet_id, system_pet_client_id, weight, temp, respiratory_rate, heart_rate, crt, mm, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petid, id, details.weight, details.temp, details.resprate, details.heartrate, details.crt, details.mm, details.datetime, date]);
        let vitalsignresult = await this.executeQuery(vitalsign); 
        
        let findings = mysql.format("INSERT INTO findings (system_id, system_pet_id, system_pet_client_id, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petid, id, details.genappfindings, details.teethmouthfindings, details.eyesfindings, details.earsfindings, details.skincoatfindings, details.heartlungsfindings, details.digestivefindings, details.musculoskeletalfindings, details.nervousfindings, details.lymphfindings, details.urogenitalsfindings, details.datetime, date]);
        let findingsresult = await this.executeQuery(findings);

        let laboratory = mysql.format("INSERT INTO laboratory (system_id, system_pet_id, system_pet_client_id, heartworm, skin_scrape, ear_mites, cdv, cpv, fiv, vaginal_smear, urinalysis, fecalysis, xray, differential, definitive, treatment, comments, created_at, updated_at) VALUES(?, ?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, ?)", [systemid, petid, id, date, date]);
        let labresult = await this.executeQuery(laboratory);

        let history = mysql.format("INSERT INTO history (system_id, system_pet_id, system_pet_client_id, complaint, current_med, physical_exam, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",[systemid, petid, id, details.complainthistory, details.currentmed, details.physicalexam, details.datetime, date]);
        let historyresult = await this.executeQuery(history);
        return history;
    }

    async deletePet(id){
        let query = mysql.format("DELETE FROM pets WHERE id=?", id);
        let result = await this.executeQuery(query);

        let system = mysql.format("DELETE FROM systems WHERE pet_id =?", id);
        let systemresult = await this.executeQuery(system);

        let history = mysql.format("DELETE FROM history WHERE system_pet_id =?", id);
        let historyresult = await this.executeQuery(history);

        let vitalsign = mysql.format("DELETE FROM vitalsigns WHERE system_pet_id =?", id);
        let vitalresult = await this.executeQuery(vitalsign);

        let findings = mysql.format("DELETE FROM findings WHERE system_pet_id =?", id);
        let findingsresult = await this.executeQuery(findings);

        let lab = mysql.format("DELETE FROM laboratory WHERE system_pet_id =?", id);
        let labresult = await this.executeQuery(lab);

        return lab;
    }

    async pet_info(id){
        let petInfo = mysql.format("SELECT clients.id as clientId, pets.id as petId, CONCAT(clients.first_name, ' ', clients.last_name) as owner, clients.address, clients.contact, pets.name, pets.species, pets.breed, pets.sex, pets.altered, pets.color, DATE_FORMAT(pets.birthdate, '%c/%e/%Y') AS birthdate, timestampdiff(YEAR, pets.birthdate, now()) as age FROM clients LEFT JOIN pets ON clients.id = pets.client_id WHERE pets.id = ?", id);
        let result = await this.executeQuery(petInfo);
        return JSON.parse(JSON.stringify(result));
    }

    async get_health_record(id){
        let query = mysql.format("SELECT systems.id as systemId, pet_id, pet_client_id, exam_vet,  DATE_FORMAT(systems.created_at, '%c/%e/%Y') as created_date FROM systems WHERE pet_id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async pet_system(petid, systemid){
        let query = mysql.format("SELECT pets.id as petId, systems.id as systemId, systems.exam_vet as examvet, systems.general_appearance, systems.teeth_mouth, systems.eyes, systems.ears, systems.skin_coat, systems.heart_lungs, systems.digestive, systems.musculoskeletal, systems.nervous, systems.lymph, systems.urogenitals,  DATE_FORMAT(findings.created_at, '%c/%e/%Y') as created_date, findings.general_appearance as findings_genapp, findings.teeth_mouth as findings_teeth, findings.eyes as findings_eyes, findings.ears as findings_ears, findings.skin_coat as findings_skin, findings.heart_lungs as findings_heart, findings.digestive as findings_digestive, findings.musculoskeletal as findings_muscu, findings.nervous as findings_nervous, findings.lymph as findings_lymph, findings.urogenitals as findings_uro FROM pets LEFT JOIN systems ON pets.id = systems.pet_id LEFT JOIN findings ON systems.id = findings.system_id WHERE pets.id = ? AND systems.id = ? ORDER BY systems.created_at DESC", [petid, systemid]);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_vitalsign(petid, systemid){
        let query = mysql.format("SELECT * FROM vitalsigns WHERE system_pet_id = ? AND system_id = ? ORDER BY created_at DESC", [petid, systemid]);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_history(petid, systemid){
        let query = mysql.format("SELECT * FROM history WHERE system_pet_id = ? AND system_id = ? ORDER BY created_at DESC", [petid, systemid]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
        
    }

    async pet_lab(petid, systemid){
        let query = mysql.format("SELECT * FROM laboratory WHERE system_pet_id = ? AND system_id = ? ORDER BY system_id DESC", [petid, systemid]);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async addPetRecord(details, clientId, petId){

        let date = new Date();
        var examvet = details.examvet.charAt(0).toUpperCase() + details.examvet.slice(1);

        let systems = mysql.format("INSERT INTO systems (pet_id, pet_client_id, exam_vet, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petId, clientId, examvet, details.generalApp, details.teethmouth, details.eyes, details.ears, details.skincoat, details.heartlungs, details.digestive, details.musculoskeletal, details.nervous, details.lymph, details.urogenitals, details.datetime, date]);
        let systemsresult = await this.executeQuery(systems);

        let systemid = systemsresult.insertId;
        console.log(systemid);

        let vitalsigns = mysql.format("INSERT INTO vitalsigns (system_id, system_pet_id, system_pet_client_id, weight, temp, respiratory_rate, heart_rate, crt, mm, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petId, clientId, details.weight, details.temp, details.resprate, details.heartrate, details.crt, details.mm, details.datetime, date]);
        let vitalsignresult = await this.executeQuery(vitalsigns);

        let findings = mysql.format("INSERT INTO findings (system_id, system_pet_id, system_pet_client_id, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petId, clientId, details.genappfindings, details.teethmouthfindings, details.eyesfindings, details.earsfindings, details.skincoatfindings, details.heartlungsfindings, details.digestivefindings, details.musculoskeletalfindings, details.nervousfindings, details.lymphfindings, details.urogenitalsfindings, details.datetime, date]);
        let findingsresult = await this.executeQuery(findings);

        let lab = mysql.format("INSERT INTO laboratory (system_id, system_pet_id, system_pet_client_id, heartworm, skin_scrape, ear_mites, cdv, cpv, fiv, vaginal_smear, urinalysis, fecalysis, xray, differential, definitive, treatment, comments, created_at, updated_at) VALUES(?, ?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, ?)", [systemid, petId, clientId, date, date]);
        let labresult = await this.executeQuery(lab);

        let history = mysql.format("INSERT INTO history (system_id, system_pet_id, system_pet_client_id, complaint, current_med, physical_exam, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",[systemid, petId, clientId, details.complainthistory, details.currentmed, details.physicalexam, details.datetime, date]);
        let historyresult = await this.executeQuery(history);


        return historyresult;
    }

    async deletePetRecord(systemid, vitalid, historyid){
        let system = mysql.format("DELETE FROM systems WHERE id = ?", systemid);
        let systemresult = await this.executeQuery(system);

        let findings = mysql.format("DELETE FROM findings WHERE system_id = ?", systemid);
        let findingsresult = await this.executeQuery(findings);

        let vital = mysql.format("DELETE FROM vitalsigns WHERE id = ?", vitalid);
        let vitalresult = await this.executeQuery(vital);

        let history = mysql.format("DELETE FROM history WHERE id = ? ", historyid);
        let historyresult = await this.executeQuery(history);

        return historyresult;
    }

    async updateLab(details, id, clientId){

        let newdetails = {};
        newdetails.heartworm = details.heartworm;
        newdetails.skin_scrape = details.skin_scrape;
        newdetails.ear_mites = details.ear_mites;
        newdetails.cdv = details.cdv ;
        newdetails.cpv = details.cpv ;
        newdetails.fiv = details.fiv ;
        newdetails.urinalysis = details.urinalysis ;
        newdetails.fecalysis = details.fecalysis ;
        newdetails.vaginal_smear = details.vaginal_smear ;
        newdetails.xray = details.xray ;
        newdetails.differential = details.differential ;
        newdetails.definitive = details.definitive ;
        newdetails.treatment = details.treatment ;
        newdetails.comments = details.comments;

        let title = details.title.charAt(0).toUpperCase() + details.title.slice(1);
        let appointment = mysql.format("INSERT INTO appointments (client_id, title, date_and_time) VALUES(?, ?, ?)", [clientId, title, details.next_app]);
        let addApp = await this.executeQuery(appointment);

        let query = mysql.format("UPDATE laboratory SET ? WHERE id = ? ", [ newdetails, id]);
        let result = await this.executeQuery(query);
        return result;
    }

    async getLab(id){
        let query = mysql.format("SELECT * FROM laboratory WHERE id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    // async getRecord(petid, systemid){
    //     let query = mysql.format("SELECT pets.name, pets.species, pets.breed, pets.sex, pets.altered, pets.color, DATE_FORMAT(pets.birthdate, '%c/%e/%Y') AS birthdate, timestampdiff(YEAR, pets.birthdate, now()) as age, CONCAT(clients.first_name, ' ', clients.last_name) as owner_name, clients.email, clients.address, clients.contact, systems.exam_vet, systems.general_appearance, systems.teeth_mouth, systems.eyes, systems.ears, systems.skin_coat, systems.heart_lungs, systems.digestive, systems.musculoskeletal, systems.nervous, systems.lymph, systems.urogenitals, DATE_FORMAT(systems.created_at, '%c/%e/%Y') as addate, findings.general_appearance as find_gen_app, findings.teeth_mouth as findings_teeth, findings.eyes as findings_eyes, findings.ears as findings_ears, findings.skin_coat as findings_skin, findings.heart_lungs as findings_heart, findings.digestive as findings_digestive, findings.musculoskeletal as findings_muscu, findings.nervous as findings_nervous, findings.lymph as findings_lymph, findings.urogenitals as findings_uro, vitalsigns.weight, vitalsigns.temp, vitalsigns.respiratory_rate, vitalsigns.heart_rate, vitalsigns.crt, vitalsigns.mm, history.complaint, history.current_med, history.physical_exam, laboratory.heartworm, laboratory.skin_scrape, laboratory.ear_mites, laboratory.cdv, laboratory.cpv, laboratory.fiv, laboratory.vaginal_smear, laboratory.urinalysis, laboratory.fecalysis, laboratory.xray, laboratory.differential, laboratory.definitive, laboratory.treatment, laboratory.comments FROM pets LEFT JOIN clients ON pets.client_id = clients.id LEFT JOIN systems ON clients.id = systems.pet_client_id LEFT JOIN findings ON systems.id = findings.system_id LEFT JOIN vitalsigns ON pets.id = vitalsigns.pet_id LEFT JOIN history ON vitalsigns.pet_id = history.pet_id LEFT JOIN laboratory ON systems.id = laboratory.system_id WHERE pets.id = ? AND systems.id = ? GROUP BY systems.id", [petid, systemid]);
    //     let result = await this.executeQuery(query);
        
    //     return JSON.parse(JSON.stringify(result));
    // }
}

module.exports = new Pet();