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

        if(this.empty(details.exam_vet)){
            errors.push("Examining vet should not be blank");
        }
        if(this.hasnumber(details.examvet) || this.symbol(details.examvet)){
            errors.push("Invalid Examining Vet");
        }

        if(this.empty(details.name)){
            errors.push("Patient's name should not be blank");
        }
        if(this.hasnumber(details.name) || this.symbol(details.name)){
            errors.push("Invalid Name");
        }

        if(this.empty(details.datetime)){
            errors.push("Date and time should not be blank");
        }

        if(this.empty(details.birthdate)){
            errors.push("Date of Birth should not be blank");
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

    async validate_info(details){
        
        let errors = [];

        if(this.empty(details.name)){
            errors.push('Name Should not be blank');
        }else if(this.hasnumber(details.name) || this.symbol(details.name)){
            errors.push('Invalid name');
        }

        return errors;
    }

    async update_info(details, id){
        let query = mysql.format("UPDATE pets SET ? WHERE id = ? ", [details, id]);
        let result = await this.executeQuery(query);

        return result;
    }

    async validaterecord(details){
        let errors = [];

        if(this.empty(details.created_at)){
            errors.push('Date and time should not be blank');
        }

        return errors;
    }

    async pet_info(id){
        let petInfo = mysql.format("SELECT clients.id as clientId, pets.id as petId, CONCAT(clients.first_name, ' ', clients.last_name) as owner, clients.address, clients.contact, pets.name, pets.species, pets.breed, pets.sex, pets.altered, pets.color, DATE_FORMAT(pets.birthdate, '%Y-%m-%d') AS birthdate, timestampdiff(YEAR, pets.birthdate, now()) as age FROM clients LEFT JOIN pets ON clients.id = pets.client_id WHERE pets.id = ?", id);
        let result = await this.executeQuery(petInfo);
        return JSON.parse(JSON.stringify(result));
    }

    async get_health_record(id){
        let query = mysql.format("SELECT systems.id as systemId, pet_id, pet_client_id, exam_vet,  DATE_FORMAT(systems.created_at, '%b %e, %Y %h:%i %p') as created_date FROM systems WHERE pet_id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async pet_system(petid, systemid){
        let query = mysql.format("SELECT pets.id as petId, systems.id as systemId, systems.exam_vet as examvet, systems.record_type, systems.general_appearance, systems.teeth_mouth, systems.eyes, systems.ears, systems.skin_coat, systems.heart_lungs, systems.digestive, systems.musculoskeletal, systems.nervous, systems.lymph, systems.urogenitals,  DATE_FORMAT(systems.created_at, '%c/%e/%Y') as created_date, findings.general_appearance as findings_genapp, findings.teeth_mouth as findings_teeth, findings.eyes as findings_eyes, findings.ears as findings_ears, findings.skin_coat as findings_skin, findings.heart_lungs as findings_heart, findings.digestive as findings_digestive, findings.musculoskeletal as findings_muscu, findings.nervous as findings_nervous, findings.lymph as findings_lymph, findings.urogenitals as findings_uro FROM pets LEFT JOIN systems ON pets.id = systems.pet_id LEFT JOIN findings ON systems.id = findings.system_id WHERE pets.id = ? AND systems.id = ? ORDER BY systems.created_at DESC", [petid, systemid]);
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

    async pet_lab(petid){
        let query = mysql.format("SELECT * FROM laboratory WHERE system_pet_id = ? ORDER BY created_at DESC", petid);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async get_pet_lab(petid, systemid){
        let query = mysql.format("SELECT * FROM laboratory WHERE system_pet_id = ? AND system_id = ? ORDER BY system_id DESC", [petid, systemid]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async addPetRecord(details, clientId, petId){

        let date = new Date();
        var examvet = details.exam_vet.charAt(0).toUpperCase() + details.exam_vet.slice(1);

        let systems = mysql.format("INSERT INTO systems (pet_id, pet_client_id, exam_vet, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petId, clientId, examvet, details.generalApp, details.teethmouth, details.eyes, details.ears, details.skincoat, details.heartlungs, details.digestive, details.musculoskeletal, details.nervous, details.lymph, details.urogenitals, details.created_at, date]);
        let systemsresult = await this.executeQuery(systems);

        let systemid = systemsresult.insertId;

        let vitalsigns = mysql.format("INSERT INTO vitalsigns (system_id, system_pet_id, system_pet_client_id, weight, temp, respiratory_rate, heart_rate, crt, mm, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petId, clientId, details.weight, details.temp, details.resprate, details.heartrate, details.crt, details.mm, details.created_at, date]);
        let vitalsignresult = await this.executeQuery(vitalsigns);

        let findings = mysql.format("INSERT INTO findings (system_id, system_pet_id, system_pet_client_id, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petId, clientId, details.genappfindings, details.teethmouthfindings, details.eyesfindings, details.earsfindings, details.skincoatfindings, details.heartlungsfindings, details.digestivefindings, details.musculoskeletalfindings, details.nervousfindings, details.lymphfindings, details.urogenitalsfindings, details.created_at, date]);
        let findingsresult = await this.executeQuery(findings);

        let lab = mysql.format("INSERT INTO laboratory (system_id, system_pet_id, system_pet_client_id, heartworm, skin_scrape, ear_mites, cdv, cpv, fiv, vaginal_smear, urinalysis, fecalysis, xray, differential, definitive, treatment, prescribed_med, comments, created_at, updated_at) VALUES(?, ?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, ?)", [systemid, petId, clientId, date, date]);
        let labresult = await this.executeQuery(lab);

        let history = mysql.format("INSERT INTO history (system_id, system_pet_id, system_pet_client_id, complaint, current_med, physical_exam, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?)",[systemid, petId, clientId, details.complaint, details.current_med, details.physical_exam, details.created_at, date]);
        let historyresult = await this.executeQuery(history);

        return historyresult;
    }

    async updateLab(details, clientid, petid, systemid){
        var date = new Date();
        let system = {};
        system.record_type = details.record_type;
        system.exam_vet = details.exam_vet;
        system.general_appearance = details.general_appearance;
        system.teeth_mouth = details.teeth_mouth;
        system.eyes = details.eyes;
        system.ears = details.ears;
        system.skin_coat = details.skin_coat;
        system.heart_lungs = details.heart_lungs;
        system.digestive = details.digestive;
        system.musculoskeletal = details.musculoskeletal;
        system.nervous = details.nervous;
        system.lymph = details.lymph;
        system.urogenitals = details.urogenitals
        system.created_at = details.created_at;
        system.updated_at = date;

        let systemquery = mysql.format("UPDATE systems SET ? WHERE id = ? AND pet_id = ?", [system, systemid, petid]);
        let systemqueryresult = await this.executeQuery(systemquery);

        let history = {};
        history.complaint = details.complaint;
        history.current_med = details.current_med;
        history.physical_exam = details.physical_exam;

        let historyquery = mysql.format("UPDATE history SET ? WHERE system_pet_id = ? AND system_id = ?", [history, petid, systemid]);
        let historyqueryresult = await this.executeQuery(historyquery);

        let vitalsign = {};
        vitalsign.weight = details.weight;
        vitalsign.temp = details.temp;
        vitalsign.respiratory_rate = details.respiratory_rate;
        vitalsign.heart_rate = details.heart_rate;
        vitalsign.crt = details.crt;
        vitalsign.mm = details.mm;

        let vitalsignquery = mysql.format("UPDATE vitalsigns SET ? WHERE system_pet_id = ? AND system_id = ?", [vitalsign, petid, systemid]);
        let vitalsignqueryresult = await this.executeQuery(vitalsignquery);

        let findings = {};
        findings.general_appearance = details.findings_genapp;
        findings.teeth_mouth = details.findings_teeth;
        findings.eyes = details.findings_eyes;
        findings.ears = details.findings_ears;
        findings.skin_coat = details.findings_skin;
        findings.heart_lungs = details.findings_heart;
        findings.digestive = details.findings_digestive;
        findings.musculoskeletal = details.findings_muscu;
        findings.nervous = details.findings_nervous;
        findings.lymph = details.findings_lymph;
        findings.urogenitals = details.findings_uro;

        let findingsquery = mysql.format("UPDATE findings SET ? WHERE system_pet_id = ? AND system_id = ? ", [findings, petid, systemid]);
        let findingsqueryresult = await this.executeQuery(findingsquery);

        let lab = {};
        lab.heartworm = details.heartworm;
        lab.skin_scrape = details.skin_scrape;
        lab.ear_mites = details.ear_mites;
        lab.cdv = details.cdv ;
        lab.cpv = details.cpv ;
        lab.fiv = details.fiv ;
        lab.urinalysis = details.urinalysis ;
        lab.fecalysis = details.fecalysis ;
        lab.vaginal_smear = details.vaginal_smear ;
        lab.xray = details.xray ;
        lab.diagnosis_procedure = details.diagnosis_procedure;
        lab.differential = details.differential ;
        lab.definitive = details.definitive ;
        lab.treatment = details.treatment;
        lab.prescribed_med = details.prescribed;
        lab.comments = details.comments;
        
        let labquery = mysql.format("UPDATE laboratory SET ? WHERE system_pet_id = ? AND system_id = ? ", [ lab, petid, systemid]);
        let labresult = await this.executeQuery(labquery);

        return labresult;
    }

    async getLab(id){
        let query = mysql.format("SELECT * FROM laboratory WHERE id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async getReport(petid, systemid){
        
        let query = mysql.format("SELECT CONCAT(clients.first_name, ' ', clients.last_name) as owner, clients.address, clients.contact, pets.name, pets.sex, pets.breed, DATE_FORMAT(pets.birthdate, '%Y-%m-%d') as birthdate, pets.color, systems.id as systemid, systems.exam_vet, vitalsigns.weight, vitalsigns.temp, vitalsigns.respiratory_rate, vitalsigns.heart_rate, vitalsigns.crt, vitalsigns.mm , history.complaint, laboratory.diagnosis_procedure, laboratory.definitive, laboratory.treatment, laboratory.prescribed_med ,DATE_FORMAT(laboratory.created_at, '%M %d, %Y') as exam_date FROM clients LEFT JOIN pets ON clients.id = pets.client_id LEFT JOIN systems ON pets.id = systems.pet_id LEFT JOIN vitalsigns ON systems.pet_id = vitalsigns.system_pet_id LEFT JOIN history  ON vitalsigns.system_pet_id = history.system_pet_id LEFT JOIN laboratory ON history.system_pet_id = laboratory.system_pet_id WHERE pets.id = ? AND systems.id = ? AND laboratory.system_id = ? AND history.system_id = ? AND vitalsigns.system_id = ?", [petid, systemid, systemid, systemid, systemid]);
        let result = await this.executeQuery(query);
        let info = JSON.parse(JSON.stringify(result));

        var years = new Date(new Date() - new Date(info[0].birthdate)).getFullYear() - 1970;

        if(years <= 0){
            let newdate = info[0].birthdate;
            let newnewdate = newdate.split('-');

            var start_date = new Date(newnewdate[0], newnewdate[1], newnewdate[2]);
            var year = new Date().getFullYear();
            var month = new Date().getMonth();
            var day = new Date().getDay();

            var end_date = new Date(new Date(year, month, day));
            var total_months = (end_date.getFullYear() - start_date.getFullYear())*12 + (end_date.getMonth() - start_date.getMonth());
            
            if(total_months > 1){
                info[0].age = total_months.toString() + ' Months Old';
            }else if(total_months < 0){
                info[0].age =  '0 Month Old';
            }
            
        }else{
            if(years > 1 ){
                info[0].age = years.toString() + " years old";
            }
            else{
                info[0].age = years.toString() + " year old";
            }
        }

        return info;
    }

    // async getRecord(petid, systemid){
    //     let query = mysql.format("SELECT pets.name, pets.species, pets.breed, pets.sex, pets.altered, pets.color, DATE_FORMAT(pets.birthdate, '%c/%e/%Y') AS birthdate, timestampdiff(YEAR, pets.birthdate, now()) as age, CONCAT(clients.first_name, ' ', clients.last_name) as owner_name, clients.email, clients.address, clients.contact, systems.exam_vet, systems.general_appearance, systems.teeth_mouth, systems.eyes, systems.ears, systems.skin_coat, systems.heart_lungs, systems.digestive, systems.musculoskeletal, systems.nervous, systems.lymph, systems.urogenitals, DATE_FORMAT(systems.created_at, '%c/%e/%Y') as addate, findings.general_appearance as find_gen_app, findings.teeth_mouth as findings_teeth, findings.eyes as findings_eyes, findings.ears as findings_ears, findings.skin_coat as findings_skin, findings.heart_lungs as findings_heart, findings.digestive as findings_digestive, findings.musculoskeletal as findings_muscu, findings.nervous as findings_nervous, findings.lymph as findings_lymph, findings.urogenitals as findings_uro, vitalsigns.weight, vitalsigns.temp, vitalsigns.respiratory_rate, vitalsigns.heart_rate, vitalsigns.crt, vitalsigns.mm, history.complaint, history.current_med, history.physical_exam, laboratory.heartworm, laboratory.skin_scrape, laboratory.ear_mites, laboratory.cdv, laboratory.cpv, laboratory.fiv, laboratory.vaginal_smear, laboratory.urinalysis, laboratory.fecalysis, laboratory.xray, laboratory.differential, laboratory.definitive, laboratory.treatment, laboratory.comments FROM pets LEFT JOIN clients ON pets.client_id = clients.id LEFT JOIN systems ON clients.id = systems.pet_client_id LEFT JOIN findings ON systems.id = findings.system_id LEFT JOIN vitalsigns ON pets.id = vitalsigns.pet_id LEFT JOIN history ON vitalsigns.pet_id = history.pet_id LEFT JOIN laboratory ON systems.id = laboratory.system_id WHERE pets.id = ? AND systems.id = ? GROUP BY systems.id", [petid, systemid]);
    //     let result = await this.executeQuery(query);
        
    //     return JSON.parse(JSON.stringify(result));
    // }
}

module.exports = new Pet();