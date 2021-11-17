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
        let query = mysql.format('SELECT id, CONCAT(first_name, " ",last_name) as name, email, address, contact, is_active FROM clients ORDER BY is_active DESC,created_at DESC');
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async searchClient(details){
        let query = mysql.format("SELECT id, CONCAT(first_name, ' ',last_name) as name, email, address, contact , is_active FROM clients WHERE CONCAT(first_name, ' ',last_name) LIKE '%"+details.search+"%' ORDER BY created_at DESC");
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
        }else if(!this.hasnumber(details.contact) || this.symbol(details.contact) || !this.contact(details.contact)){
            errors.push('Invalid Contact Number');
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
        var firstname = details.first_name.charAt(0).toUpperCase() + details.first_name.slice(1);
        var lastname = details.last_name.charAt(0).toUpperCase() + details.last_name.slice(1);
        let query = mysql.format('INSERT INTO clients (first_name, last_name, email, contact, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)', [firstname, lastname, details.email, details.contact, details.address, date, date]);
        let result = await this.executeQuery(query);
        return result;
    }

    async updateClient(details, id){
        let query = mysql.format("UPDATE clients SET ? WHERE id = ?", [details, id]);
        let result = await this.executeQuery(query);

        return result;
    }

    async viewClient(id){
        let query = mysql.format('SELECT id, first_name, last_name,  CONCAT(first_name, " ",last_name) as name, email, address, contact  FROM clients WHERE id = ?', id);
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async activate(id){
        let details = {is_active : 1};
        let query = mysql.format("UPDATE clients SET ? WHERE id = ?",[details, id]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async deactivate(id){
        let details = {is_active : 0};
        let query = mysql.format("UPDATE clients SET ? WHERE id = ?",[details, id]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }
}

module.exports = new Client();