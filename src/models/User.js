var connection = require('../config/database');
const main_model = require('./Main');
var mysql = require('mysql');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

class User extends main_model{
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

    async validateLogin(details){
        let errors = [];

        if(this.empty(details.username)){
            errors.push('Username should not be blank');
        }
        if(this.empty(details.password)){
            errors.push('Password should not be blank');
        }

        if(!this.empty(details.username) && !this.empty(details.password)){
            let query = mysql.format("SELECT * FROM users WHERE username = ? AND password = ?", [details.username, details.password]);
            let result = await this.executeQuery(query);
            let auth = JSON.parse(JSON.stringify(result));
            
            if(auth.length === 0){
                errors.push("User record doesn't exist");
            }
        }
        return errors;
    }

    async getUserLevel(details){
        let query = mysql.format("SELECT id, username, CONCAT(first_name, ' ', last_name) as name, user_level FROM users WHERE username = ? AND password = ?", [details.username, details.password]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async getUser(id){
        let query = mysql.format("SELECT * FROM users WHERE id = ?", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async validateProfile(details){
        let errors = [];

        if(this.empty(details.first_name)){
            errors.push('First name should not be blank');
        }
        if(this.hasnumber(details.first_name) || this.symbol(details.first_name)){
            errors.push('Invalid first name');
        }
        if(this.empty(details.last_name)){
            errors.push('Last name should not be blank');
        }
        if(this.hasnumber(details.lastname) || this.symbol(details.last_name)){
            errors.push('Invalid last name');
        }
        if(this.empty(details.username)){
            errors.push('Username should not be blank');
        }
        if(this.empty(details.password)){
            errors.push('Password should not be blank');
        }

        return errors;

    }

    async editUser(details, id){
        let date = new Date();
        let username = details.username.charAt(0).toUpperCase() + details.username.slice(1);
        var firstname = details.first_name.charAt(0).toUpperCase() + details.first_name.slice(1);
        var lastname = details.last_name.charAt(0).toUpperCase() + details.last_name.slice(1);
        details.updated_at = date;
        details.username = username;
        details.first_name = firstname;
        details.last_name = lastname;
        let query = mysql.format("UPDATE users SET ? WHERE id = ?", [details, id]);
        let result = await this.executeQuery(query);
    }
    
    async getAllUser(){
        let query = mysql.format("SELECT id, CONCAT(first_name, ' ', last_name) as name, username, user_level FROM users ORDER BY user_level ASC");
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async validateUser(details){
        let errors = [];

        if(this.empty(details.firstname)){
            errors.push('First name should not be blank');
        }
        if(this.hasnumber(details.firstname) || this.symbol(details.firstname)){
            errors.push('Invalid first name');
        }
        if(this.empty(details.lastname)){
            errors.push('Last name should not be blank');
        }
        if(this.hasnumber(details.lastname) || this.symbol(details.lastname)){
            errors.push('Invalid last name');
        }
        if(this.empty(details.username)){
            errors.push('Username should not be blank');
        }
        if(this.empty(details.password)){
            errors.push('Password should not be blank');
        }
        if(this.empty(details.confirmpassword)){
            errors.push('Confirm password should not be blank');
        }
        if(!this.match(details.password, details.confirmpassword)){
            errors.push("Password do not match");
        }
        let query = mysql.format("SELECT * FROM users WHERE username = ?", details.username);
        let result = await this.executeQuery(query);

        if(result.length != 0){
            errors.push('Username already taken');
        }

        return errors;
    }

    async addUser(details){

        let date = new Date();
        var firstname = details.firstname.charAt(0).toUpperCase() + details.firstname.slice(1);
        var lastname = details.lastname.charAt(0).toUpperCase() + details.lastname.slice(1);

        let query = mysql.format("INSERT INTO users (username, password, first_name, last_name, user_level, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)",[details.username, details.password, firstname, lastname, details.userlevel, date, date]);
        let result = await this.executeQuery(query);

        return result;
    }

    async deleteUser(id){
        let query = mysql.format("DELETE FROM users WHERE id = ?", id);
        let result = await this.executeQuery(query);

        return result;
    }

    async countClient(){
        let query = mysql.format("SELECT COUNT(id) as clients FROM clients");
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async countApp(){
        let query = mysql.format("SELECT COUNT(id) as apps FROM appointments WHERE DATE_FORMAT(date_and_time, '%b %e %Y') = DATE_FORMAT(now(), '%b %e %Y')");
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async getAllAppointment(){
        let query = mysql.format('SELECT appointments.id, clients.email ,clients.id as clientId, CONCAT(clients.first_name, " ", clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, "%b %e %Y %l:%i %p" ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id ORDER BY appointments.created_at DESC');
        let result = await this.executeQuery(query);
        return result;
    }

    async searchApp(details){
        let from = '';
        let to = '';

        let query;
        if(details.from != '' && details.to != ''){
            from = new Date(details.from).toISOString().slice(0, 19).replace('T', ' ');
            to = new Date(details.to).toISOString().slice(0, 19).replace('T', ' ');
            query = mysql.format("SELECT appointments.id, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' AND date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.created_at DESC");
        }else{
            query = mysql.format("SELECT appointments.id, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' OR date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.created_at DESC");
        }

        let result = await this.executeQuery(query);
        return result;
    }

    async getNotif(number){
        let notifdate = new Date();
        let num = parseInt(number);
        notifdate.setDate(notifdate.getDate() + num);

        let query = mysql.format("SELECT CONCAT(clients.first_name, ' ', clients.last_name) AS name, clients.email, clients.address, clients.contact, DATE_FORMAT(date_and_time, '%b %e %Y %l:%i %p') AS datetime FROM appointments LEFT JOIN clients ON appointments.client_id = clients.id WHERE DATE_FORMAT(date_and_time, '%Y %m %e') = DATE_FORMAT(?, '%Y %m %e')", notifdate);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async sendNotif(day){
        let notifdate = new Date();
        let num = parseInt(day);
        notifdate.setDate(notifdate.getDate() + num);

        let query = mysql.format("SELECT appointments.client_id as id, appointments.title , CONCAT(clients.first_name, ' ', clients.last_name) AS name, clients.email, clients.address, clients.contact, DATE_FORMAT(date_and_time, '%b %e %Y') AS date, DATE_FORMAT(date_and_time, '%l:%i %p') as time FROM appointments LEFT JOIN clients ON appointments.client_id = clients.id WHERE DATE_FORMAT(date_and_time, '%Y %m %e') = DATE_FORMAT(?, '%Y %m %e')", notifdate);
        let result = await this.executeQuery(query);
        
        let client = JSON.parse(JSON.stringify(result));

        for(var i=0; i<client.length; i++){

            var html = "<h1>Neervet Animal Clinic</h1>";
                html += "<p>Hi "+client[i].name+"</p><p>This is a reminder for your appointment</p>";
                html += "<ul><li>Title: "+ client[i].title +"</li>";
                html += "<li>Date: "+ client[i].date +"</li>";
                html += "<li>Time: "+ client[i].time +"</li></ul>";
        
            const msg = {
                    to: client[i].email,
                    from: "supancj18@gmail.com",
                    subject: "Appointment - Neervet Animal Clinic",
                    text: "here's the email",
                    html: html
                };
                var id = client[i].id;
                sgMail.send(msg).then(() => {
                    console.log('email has been sent');
                    
                    let update = mysql.format("UPDATE appointments SET notification = 1 WHERE client_id = ?", id);
                    let updateresult = this.executeQuery(update);
                }).catch((error) => {
                    console.log(error);
                });
        }
        return client;
    }

    async validateAppointment(details){
        let errors = [];
        if(this.empty(details.datetime)){
            errors.push('Date and time should not be blank');
        }
        return errors;
    }

    async addAppointment(details, id){
        let date = new Date();
        let notify = 0;
        var title = details.title.charAt(0).toUpperCase() + details.title.slice(1);

        let query = mysql.format('INSERT INTO appointments (client_id, title, date_and_time, notification, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)', [id, title, details.datetime, notify, date, date]);
        let result = await this.executeQuery(query);
        return result;
    }

    async getAllClient(){
        let query = mysql.format('SELECT id, CONCAT(first_name, " ",last_name) as name, email, address, contact  FROM clients ORDER BY created_at DESC');
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async searchClient(details){
        let query = mysql.format("SELECT id, CONCAT(first_name, ' ',last_name) as name, address, contact  FROM clients WHERE CONCAT(first_name, ' ',last_name) LIKE '%"+details.search+"%' ORDER BY created_at DESC");
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async validateClient(details){
        let errors = [];
        if(this.hasnumber(details.firstname) || this.symbol(details.firstname)){
            errors.push('Invalid First name');
        }

        if(this.hasnumber(details.lastname) || this.symbol(details.lastname)){
            errors.push('Invalid Last name');
        }

        if(this.empty(details.firstname)){
            errors.push('First name should not be blank');
        }

        if(this.empty(details.lastname)){
            errors.push('Last name should not be blank');
        }

        if(this.empty(details.contact)){
            errors.push('Contact number should not be blank');
        }else if(!this.hasnumber(details.contact)){
            errors.push('Invalid Contact No.');
        }

        if(this.empty(details.address)){
            errors.push('Address should not be blank');
        }
        
        if(this.empty(details.email)){
            errors.push('Email should not be blank');
        }else if(!this.email(details.email)){
            errors.push('Email is not valid');
        }
        
        return errors;
    }

    async addClient(details){

        let date = new Date();
        var firstname = details.firstname.charAt(0).toUpperCase() + details.firstname.slice(1);
        var lastname = details.lastname.charAt(0).toUpperCase() + details.lastname.slice(1);
        let query = mysql.format('INSERT INTO clients (first_name, last_name, email, contact, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, details.email, details.contact, details.address, date, date]);
        let result = await this.executeQuery(query);
        return result;
    }

    async deleteClient(id){
        let query = mysql.format('DELETE FROM clients WHERE id = ?', id);
        let result = await this.executeQuery(query);

        let app = mysql.format('DELETE FROM appointments WHERE client_id = ?', id);
        let appresult = await this.executeQuery(app);

        let pets = mysql.format('DELETE FROM pets WHERE client_id = ?', id);
        let petresult = await this.executeQuery(pets);
        
        let vitalsign = mysql.format('DELETE FROM vitalsigns WHERE pet_client_id = ?', id);
        let vitalresult = await this.executeQuery(vitalsign);

        let history = mysql.format('DELETE FROM history WHERE pet_client_id = ?', id );
        let historyresult = await this.executeQuery(history);

        let system = mysql.format('DELETE FROM systems WHERE pet_client_id = ?', id);
        let systemresult = await this.executeQuery(system);

        let findings = mysql.format('DELETE FROM findings WHERE system_client_id = ?', id);
        let findingsresult = await this.executeQuery(findings);

        return result;
    }

    async viewClient(id){
        let query = mysql.format('SELECT id, CONCAT(first_name, " ",last_name) as name, address, contact  FROM clients WHERE id=?', id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async getAllPet(id){
        let query = mysql.format("SELECT *, DATE_FORMAT(birthdate, '%b %e, %Y') as birthday FROM pets WHERE client_id=? ORDER BY updated_at DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async deleteAppointment(id){
        let query = mysql.format('DELETE FROM appointments WHERE id = ?', id);
        let result = await this.executeQuery(query);
        return result;
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

        let vitalsign = mysql.format("INSERT INTO vitalsigns (pet_id, pet_client_id, weight, temp, respiratory_rate, heart_rate, crt, mm, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petid, id, details.weight, details.temp, details.resprate, details.heartrate, details.crt, details.mm, details.datetime, date]);
        let vitalsignresult = await this.executeQuery(vitalsign); 

        let systems = mysql.format("INSERT INTO systems (pet_id, pet_client_id, exam_vet, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petid, id, examvet, details.generalApp, details.teethmouth, details.eyes, details.ears, details.skincoat, details.heartlungs, details.digestive, details.musculoskeletal, details.nervous, details.lymph, details.urogenitals, details.datetime, date]);
        let systemresult = await this.executeQuery(systems);

        let systemid = systemresult.insertId;
            
        let findings = mysql.format("INSERT INTO findings (system_id, system_pet_id, system_client_id, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petid, id, details.genappfindings, details.teethmouthfindings, details.eyesfindings, details.earsfindings, details.skincoatfindings, details.heartlungsfindings, details.digestivefindings, details.musculoskeletalfindings, details.nervousfindings, details.lymphfindings, details.urogenitalsfindings, details.datetime, date]);
        let findingsresult = await this.executeQuery(findings);

        let laboratory = mysql.format("INSERT INTO laboratory (system_id, system_pet_id, system_pet_client_id, heartworm, skin_scrape, ear_mites, cdv, cpv, fiv, vaginal_smear, urinalysis, fecalysis, xray, differential, definitive, treatment, comments, next_app, created_at, updated_at) VALUES(?, ?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, ?)", [systemid, petid, id, date, date]);
        let labresult = await this.executeQuery(laboratory);

        let history = mysql.format("INSERT INTO history (pet_id, pet_client_id, complaint, current_med, physical_exam, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)",[petid, id, details.complainthistory, details.currentmed, details.physicalexam, details.datetime, date]);
        let historyresult = await this.executeQuery(history);
        return history;
    }

    async deletePet(id){
        let query = mysql.format("DELETE FROM pets WHERE id=?", id);
        let result = await this.executeQuery(query);

        let system = mysql.format("DELETE FROM systems WHERE pet_id =?", id);
        let systemresult = await this.executeQuery(system);

        let history = mysql.format("DELETE FROM history WHERE pet_id =?", id);
        let historyresult = await this.executeQuery(history);

        let vitalsign = mysql.format("DELETE FROM vitalsigns WHERE pet_id =?", id);
        let vitalresult = await this.executeQuery(vitalsign);

        let findings = mysql.format("DELETE FROM findings WHERE system_pet_id =?", id);
        let findingsresult = await this.executeQuery(findings);

        let lab = mysql.format("DELETE FROM laboratory WHERE system_pet_id =?", id);
        let labresult = await this.executeQuery(lab);

        return lab;
    }

    async pet_info(id){
        let petInfo = mysql.format("SELECT clients.id as clientId, pets.id as petId, CONCAT(clients.first_name, ' ', clients.last_name) as owner, pets.name, pets.species, pets.breed, pets.sex, pets.altered, pets.color, DATE_FORMAT(pets.birthdate, '%c/%e/%Y') AS birthdate, timestampdiff(YEAR, pets.birthdate, now()) as age FROM clients LEFT JOIN pets ON clients.id = pets.client_id WHERE pets.id = ?", id);
        let result = await this.executeQuery(petInfo);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_system(id){
        let query = mysql.format("SELECT pets.id as petId, systems.id as systemId, systems.exam_vet as examvet, systems.general_appearance, systems.teeth_mouth, systems.eyes, systems.ears, systems.skin_coat, systems.heart_lungs, systems.digestive, systems.musculoskeletal, systems.nervous, systems.lymph, systems.urogenitals,  DATE_FORMAT(systems.created_at, '%c/%e/%Y') as created_date, findings.general_appearance as findings_genapp, findings.teeth_mouth as findings_teeth, findings.eyes as findings_eyes, findings.ears as findings_ears, findings.skin_coat as findings_skin, findings.heart_lungs as findings_heart, findings.digestive as findings_digestive, findings.musculoskeletal as findings_muscu, findings.nervous as findings_nervous, findings.lymph as findings_lymph, findings.urogenitals as findings_uro FROM pets LEFT JOIN systems ON pets.id = systems.pet_id LEFT JOIN findings ON systems.id = findings.system_id WHERE pets.id = ? ORDER BY systems.created_at DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_vitalsign(id){
        let query = mysql.format("SELECT * FROM vitalsigns WHERE pet_id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_history(id){
        let query = mysql.format("SELECT * FROM history WHERE pet_id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async pet_lab(id){
        let query = mysql.format("SELECT * FROM laboratory WHERE system_pet_id = ? ORDER BY system_id DESC", id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async addPetRecord(details, clientId, petId){

        let date = new Date();
        var examvet = details.examvet.charAt(0).toUpperCase() + details.examvet.slice(1);

        let systems = mysql.format("INSERT INTO systems (pet_id, pet_client_id, exam_vet, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petId, clientId, examvet, details.generalApp, details.teethmouth, details.eyes, details.ears, details.skincoat, details.heartlungs, details.digestive, details.musculoskeletal, details.nervous, details.lymph, details.urogenitals, details.datetime, date]);
        let systemsresult = await this.executeQuery(systems);

        let systemid = systemsresult.insertId;

        let vitalsigns = mysql.format("INSERT INTO vitalsigns (pet_id, pet_client_id, weight, temp, respiratory_rate, heart_rate, crt, mm, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [petId, clientId, details.weight, details.temp, details.resprate, details.heartrate, details.crt, details.mm, details.datetime, date]);
        let vitalsignresult = await this.executeQuery(vitalsigns);

        let findings = mysql.format("INSERT INTO findings (system_id, system_pet_id, system_client_id, general_appearance, teeth_mouth, eyes, ears, skin_coat, heart_lungs, digestive, musculoskeletal, nervous, lymph, urogenitals, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [systemid, petId, clientId, details.genappfindings, details.teethmouthfindings, details.eyesfindings, details.earsfindings, details.skincoatfindings, details.heartlungsfindings, details.digestivefindings, details.musculoskeletalfindings, details.nervousfindings, details.lymphfindings, details.urogenitalsfindings, details.datetime, date]);
        let findingsresult = await this.executeQuery(findings);

        let lab = mysql.format("INSERT INTO laboratory (system_id, system_pet_id, system_pet_client_id, heartworm, skin_scrape, ear_mites, cdv, cpv, fiv, vaginal_smear, urinalysis, fecalysis, xray, differential, definitive, treatment, comments, next_app, created_at, updated_at) VALUES(?, ?, ?, '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ?, ?)", [systemid, petId, clientId, date, date]);
        let labresult = await this.executeQuery(lab);

        let history = mysql.format("INSERT INTO history (pet_id, pet_client_id, complaint, current_med, physical_exam, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)",[petId, clientId, details.complainthistory, details.currentmed, details.physicalexam, details.datetime, date]);
        let historyresult = await this.executeQuery(history);


        return historyresult;
    }

    async deletePetRecord(systemid, vitalid, historyid){
        let system = mysql.format("DELETE FROM systems WHERE id = ?", systemid);
        let systemresult = await this.executeQuery(system);

        let findings = mysql.format("DELETE FROM findings WHERE system_id = ?", systemid);
        let findingsresult = await this.executeQuery(findings);

        let vital = mysql.format("DELETE FROM vitalsigns WHERE id =?", vitalid);
        let vitalresult = await this.executeQuery(vital);

        let history = mysql.format("DELETE FROM history WHERE id = ? ", historyid);
        let historyresult = await this.executeQuery(history);

        return historyresult;
    }

    async updateLab(details, id){
        
        let query = mysql.format("UPDATE laboratory SET ? WHERE id = ? ", [ details, id]);
        let result = await this.executeQuery(query);
        return result;
    }

    async getLab(id){
        let query = mysql.format("SELECT * FROM laboratory WHERE id = ? ORDER BY created_at DESC", id);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }
}

module.exports = new User();