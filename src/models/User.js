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
        if(!this.match(details.password, details.confirmpassword)){
            errors.push("Password do not match");
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

    async countSubadmin(){
        let query = mysql.format("SELECT COUNT(id) as subadmin FROM users WHERE user_level = 'Subadmin'");
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }
}

module.exports = new User();