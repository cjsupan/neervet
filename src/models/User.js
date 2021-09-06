const connection = require('../config/database');
const main_model = require('./Main');
const mysql = require('mysql');

const fs = require('fs');
var spawn = require('child_process').spawn;
const dbfolder = fs.readdirSync('database/');
const path = require('path');

const mysqldump = require('mysqldump');

const sqlite3 = require("sqlite3").verbose();


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
        
        let newdetails = {};
        
        details.updated_at = date;
        details.username = username;
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

    async backup(details){

        var wstream = fs.createWriteStream("database/"+details.filename+".sql");

        var mysqldump = spawn('mysqldump', [
            '-u',
            'root',
            'neervet',
        ]);
        
        mysqldump
            .stdout
            .pipe(wstream)
            .on('finish', function () {
                console.log('Completed')
            })
            .on('error', function (err) {
                console.log(err)
            });
        
        // mysqldump({
        //     connection: {
        //         host: 'localhost',
        //         user: 'root',
        //         password: '',
        //         database: 'neervet',
        //     },
        //     dump: { schema: { table: { dropIfExist: true } } },
        //     dumpToFile: "./database/"+details.filename+".sql",
        // });
    }

    async restore(details){
        // var filepath = "database/"+details.filename+"";
        // var filename = path.parse(details.filename).name;

        // const dataSql = fs.readFileSync("database/"+details.filename+"").toString();

        // let db = new sqlite3.Database("mydatabase", err => {
        //     if (err) {
        //       return console.error(err.message);
        //     }
        //     console.log("Connected to the in-memory SQLite database.");
        //   });
            
        //     const dataArr = dataSql.toString().split("");
        //   // db.serialize ensures that your queries are one after the other depending on which one came first in your `dataArr`
        //   db.serialize(() => {
              
        //     // db.run runs your SQL query against the DB
        //     db.run("PRAGMA foreign_keys=OFF;");
        //     db.run("BEGIN TRANSACTION;");
            
            
        //     // Loop through the `dataArr` and db.run each query
        //     dataArr.forEach(query => {
        //       if (query) {
        //         // Add the delimiter back to each query before you run them
        //         // In my case the it was `);`
        //         query += ");";
                
        //         db.run(query, err => {
                    
        //           if (err) throw err;
        //         });
        //       }
        //     });
        //     db.run("COMMIT;");
        //   });
          
        //   // Close the DB connection
        //   db.close(err => {
        //     if (err) {
        //       return console.error(err.message);
        //     }
        //     console.log("Closed the database connection.");
        //   });



        // // // New onProgress method, added in version 5.0!
        // // importer.onProgress(progress=>{
        // //     var percent = Math.floor(progress.bytes_processed / progress.total_bytes * 10000) / 100;
        // //     console.log(`${percent}% Completed`);
        // // });
        

        // // importer.import(filepath).then(()=>{
        // //     var files_imported = importer.getImported();

        // //     console.log('files imported', files_imported);

        // //     console.log(`${files_imported.length} SQL file(s) imported.`);
        // //     }).catch(err=>{
        // //     console.error(err);
        // // });
    }
}

module.exports = new User();