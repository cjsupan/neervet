var connection = require('../config/database');
const main_model = require('./Main');
var mysql = require('mysql');
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey("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");

class Appointment extends main_model{
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

    async getAllAppointment(){
        let query = mysql.format('SELECT appointments.id, title, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, " ", clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, "%b %e %Y %l:%i %p" ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id ORDER BY appointments.created_at DESC');
        let result = await this.executeQuery(query);
        return result;
    }

    async getAppointmentsToday(){
       
        let query = mysql.format('SELECT appointments.id, title, complete, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, " ", clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, "%b %e %Y %l:%i %p" ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE day(date_and_time) = day(now()) AND month(date_and_time) = month(now()) AND year(date_and_time) = year(now()) ORDER BY appointments.created_at DESC');
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
            query = mysql.format("SELECT appointments.id, title, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' AND date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.created_at DESC");
        }else{
            query = mysql.format("SELECT appointments.id, title, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' OR date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.created_at DESC");
        }
    
        let result = await this.executeQuery(query);
        return result;
    }
    
    async getNotif(){
        let notifdate = new Date();
        let num = parseInt(1);
        notifdate.setDate(notifdate.getDate() + num);
    
        let query = mysql.format("SELECT CONCAT(clients.first_name, ' ', clients.last_name) AS name, clients.email, clients.address, clients.contact, DATE_FORMAT(date_and_time, '%b %e %Y %l:%i %p') AS datetime FROM appointments LEFT JOIN clients ON appointments.client_id = clients.id WHERE DATE_FORMAT(date_and_time, '%Y %m %e') = DATE_FORMAT(?, '%Y %m %e')", notifdate);
        let result = await this.executeQuery(query);
    
        return JSON.parse(JSON.stringify(result));
    }
    
    async sendNotif(){
        
        let notifdate = new Date();
       
        notifdate.setDate(notifdate.getDate() + 1);
    
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
        if(this.empty(details.title)){
            errors.push('Title should not be blank');
        }
        if(this.empty(details.datetime)){
            errors.push('Date and time should not be blank');
        }
        
        if(this.empty(details.date_and_time)){
            errors.push('Date and time should not be blank');
        }

        return errors;
    }
    
    async addAppointment(details, id){
        let date = new Date();
        let notify = 0;
        let complete = 0;
        var title = details.title.charAt(0).toUpperCase() + details.title.slice(1);
    
        let query = mysql.format('INSERT INTO appointments (client_id, title, date_and_time, notification, complete, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?)', [id, title, details.datetime, notify, complete,date, date]);
        let result = await this.executeQuery(query);
        return result;
    }

    async completeAppointment(id){

        let update = {};
        update.complete = 1;

        let query = mysql.format("UPDATE appointments SET ? WHERE id = ?", [update, id]);
        let result = await this.executeQuery(query);
    }

    async updateAppointment(details, id){

        let query = mysql.format("UPDATE appointments SET ? WHERE id = ?", [details, id]);
        let result = await this.executeQuery(query);

        return result;
    }

    async deleteAppointment(id){
        let query = mysql.format('DELETE FROM appointments WHERE id = ?', id);
        let result = await this.executeQuery(query);
        return result;
    }
    
}

module.exports = new Appointment();