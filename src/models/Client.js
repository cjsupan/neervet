var connection = require('../config/database');
const main_model = require('./Main');
var mysql = require('mysql');

class Client extends main_model{
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
        if(this.hasnumber(details.first_name) || this.symbol(details.first_name)){
            errors.push('Invalid First name');
        }

        if(this.hasnumber(details.last_name) || this.symbol(details.last_name)){
            errors.push('Invalid Last name');
        }

        if(this.empty(details.first_name)){
            errors.push('First name should not be blank');
        }

        if(this.empty(details.last_name)){
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

    async updateClient(details, id){
        let query = mysql.format("UPDATE clients SET ? WHERE id = ?", [details, id]);
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
        let query = mysql.format('SELECT id, first_name, last_name,  CONCAT(first_name, " ",last_name) as name, email, address, contact  FROM clients WHERE id = ?', id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }
}

module.exports = new Client();