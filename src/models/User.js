const connection = require('../config/database');
const main_model = require('./Main');
const mysql = require('mysql');

const formidable = require("formidable");
const fs = require('fs');
const path = require('path');

const mysqldump = require('mysqldump');

const host = 'localhost';
const user = 'root';
const password = '';
const database = 'neervet';


const Importer = require('mysql-import');
const importer = new Importer({host, user, password, database});

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

    async validateProfile(details, id){
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

        let user = mysql.format("SELECT * FROM users WHERE username = ?", details.username);
        let userresult = await this.executeQuery(user);
        let name1 = JSON.parse(JSON.stringify(userresult));
        console.log(name1);
       
        let query = mysql.format("SELECT * FROM users WHERE id = ?", id);
        let result = await this.executeQuery(query);
        let name2 = JSON.parse(JSON.stringify(result));
        console.log(name2);

        if(name1.length > 0 && name1[0].id != name2[0].id){
            errors.push('Username is already taken');
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
        var firstname = details.first_name.charAt(0).toUpperCase() + details.first_name.slice(1);
        var lastname = details.last_name.charAt(0).toUpperCase() + details.last_name.slice(1);
        
        let newdetails = {};
        
        details.updated_at = date;
        details.first_name = firstname;
        details.last_name = lastname;

        newdetails.first_name = details.first_name;
        newdetails.last_name = details.last_name;
        newdetails.username = details.username;
        newdetails.updated_at = details.updated_at;

        let query = mysql.format("UPDATE users SET ? WHERE id = ?", [newdetails, id]);
        let result = await this.executeQuery(query);
    }
    
    async getAllUser(){
        let query = mysql.format("SELECT id, CONCAT(first_name, ' ', last_name) as name, username, user_level, password FROM users WHERE NOT user_level = 'Admin' ORDER BY user_level ASC");
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
        let query = mysql.format("SELECT COUNT(id) as apps FROM appointments WHERE DATE_FORMAT(date_and_time, '%b %e %Y') = DATE_FORMAT(now(), '%b %e %Y') AND complete = 0");
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async countSubadmin(){
        let query = mysql.format("SELECT COUNT(id) as staff FROM users WHERE user_level = 'Staff'");
        let result = await this.executeQuery(query);
        return JSON.parse(JSON.stringify(result));
    }

    async validate_backup(details){
        let errors = [];

        if(this.empty(details.filename)){
            errors.push('Filename should not be blank');
        }

        return errors;
    }

    async getFiles(){
        const files = await fs.promises.readdir('database/');

        return files
            .map(fileName => ({
            name: fileName,
            time: fs.statSync(`${'database'}/${fileName}`).mtime.getTime(),
            }))
            .sort((a, b) => b.time - a.time)
            .map(file => file.name);
    }

    async backup(){
        
        var filepath = "database/Neervet.sql";
        mysqldump({
            connection: {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'neervet',
            },
            dumpToFile: "./database/Neervet.sql",
        });

        return filepath;
    }

    async saveFile(req){
        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        // form.uploadDir = path.join(__dirname + '../../../database');
        
        form.parse(req, function asd(err, fields, files){
            // console.log(files.file.name);
            var oldPath = files.file.path;
            var newPath = path.join(__dirname + '../../../database') +"/"+ files.file.name;

            var rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData,function(err){
                if(err) console.log(err)
                console.log("Successfully uploaded")
            });

            name = files.file.name;
        });
    }

    async truncate(){
        console.log('truncate start');

        // let check0 = mysql.format("SET FOREIGN_KEY_CHECKS = 0;");
        // let ckech0res = await this.executeQuery(check0);
        // console.log('check0');
        let users = mysql.format("DELETE FROM users WHERE user_level = 'Admin' OR user_level = 'Staff'");
        let usersresult = await this.executeQuery(users);

        // let check1 = mysql.format("SET FOREIGN_KEY_CHECKS = 1;");
        // let check1res = await this.executeQuery(check1);
        console.log('check1');
        let clients = mysql.format("TRUNCATE TABLE clients");
        let clientresult = await this.executeQuery(clients);
        
        let appointments = mysql.format("TRUNCATE TABLE appointments");
        let appointmentresult = await this.executeQuery(appointments);
        
        let findings = mysql.format("TRUNCATE TABLE findings");
        let findingsresult = await this.executeQuery(findings);
       
        let pets = mysql.format("TRUNCATE TABLE pets");
        let petsresult = await this.executeQuery(pets);
       
        let vitalsigns = mysql.format("TRUNCATE TABLE vitalsigns");
        let vitalsignsresult = await this.executeQuery(vitalsigns);
        
        let history = mysql.format("TRUNCATE TABLE history");
        let historyresult = await this.executeQuery(history);
        
        let laboratory = mysql.format("TRUNCATE TABLE laboratory");
        let laboratoryresult = await this.executeQuery(laboratory);
       
        let systems = mysql.format("TRUNCATE TABLE systems");
        let systemsresult = await this.executeQuery(systems);
       
        console.log('truncate done');
        return;
    }

    async restore(req){

        var form = new formidable.IncomingForm();
        form.keepExtensions = true;
        // form.uploadDir = path.join(__dirname + '../../../database');
        
        form.parse(req, function(err, fields, files){
            // console.log(files.file.name);
            var oldPath = files.file.path;
            var newPath = path.join(__dirname + '../../../database') +"/"+ files.file.name;

            var rawData = fs.readFileSync(oldPath)
            fs.writeFile(newPath, rawData,function(err){
                if(err) console.log(err)
                console.log("Successfully uploaded")
            });

            let errors = [];
        console.log("import start");
        var filepath = "database/"+files.file.name+"";
        // var filename = path.parse(details.filename).name;

        // New onProgress method, added in version 5.0!
        importer.onProgress(progress=>{
            var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
            console.log(`${percent}% Completed`);
        });
        
        importer.import(filepath).then(()=>{
            var files_imported = importer.getImported();

            console.log('files imported', files_imported);

            console.log(`${files_imported.length} SQL file(s) imported.`);
            }).catch(err=>{
                console.log(err);
                errors.push('error');
        });
        console.log('import done');
        return errors;
        });

    }
}

module.exports = new User();