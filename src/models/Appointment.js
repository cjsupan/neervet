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
        let query = mysql.format("SELECT appointments.id, title, appointments.is_active, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p') as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE appointments.complete = 0 AND clients.is_active = 1 ORDER BY appointments.is_active DESC, appointments.date_and_time ASC");
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async countNotif(){
        let notifdate = new Date();
        let current = new Date();
        let num = parseInt(1);

        var datenow = current.getFullYear()+ "-" + (current.getMonth() + num) + '-' + (current.getDate() + num) + " 00:00:00";
        
        notifdate.setDate(notifdate.getDate() + num);
        var notif = notifdate.getFullYear()+ "-" + (notifdate.getMonth() + num) + '-' + (notifdate.getDate() + num) + " 00:00:00";

        let query = mysql.format("SELECT COUNT(notification) as notif FROM appointments WHERE notification = 0 AND is_active = 1 AND date_and_time BETWEEN ? AND ?", [datenow,notif]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async deactive_appointment(){
        var notifdate = new Date();
        var hh = notifdate.getHours();
        var mm = notifdate.getMinutes();
        var ss = notifdate.getSeconds();
        var notif = notifdate.getFullYear()+ "-" + (notifdate.getMonth() + 1) + '-' + (notifdate.getDate() - 1) + hh + ':' + mm + ':' + ss;
        console.log(notif);
        let query = mysql.format("UPDATE appointments SET is_active = 0 WHERE date_and_time < ?", notif);
        let result = await this.executeQuery(query);

        return result;
    }

    async getAppointmentsToday(){
       
        let query = mysql.format('SELECT appointments.id, title, complete, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, " ", clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, "%b %e %Y %l:%i %p" ) as date FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE appointments.is_active = 1 AND day(date_and_time) = day(now()) AND month(date_and_time) = month(now()) AND year(date_and_time) = year(now()) ORDER BY appointments.created_at DESC');
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
            query = mysql.format("SELECT appointments.id, title, appointments.is_active, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date, clients.is_active FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE clients.is_active = 1 AND CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' AND date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.date_and_time ASC");
        }else{
            query = mysql.format("SELECT appointments.id, title, appointments.is_active, clients.email as email, clients.id as clientId, CONCAT(clients.first_name, ' ', clients.last_name) as name, clients.address, clients.contact, DATE_FORMAT(appointments.date_and_time, '%b %e %Y %l:%i %p' ) as date, clients.is_active FROM appointments INNER JOIN clients ON appointments.client_id = clients.id WHERE clients.is_active = 1 AND CONCAT(clients.first_name, '', clients.last_name) LIKE '%"+details.search+"%' OR date_and_time BETWEEN '"+from+"' AND '"+to+"' ORDER BY appointments.date_and_time ASC");
        }
    
        let result = await this.executeQuery(query);
        return result;
    }
    
    async getNotif(){
        let notifdate = new Date();
        let num = parseInt(1);
        notifdate.setDate(notifdate.getDate() + num);
    
        let query = mysql.format("SELECT CONCAT(clients.first_name, ' ', clients.last_name) AS name, clients.email, clients.address, clients.contact, DATE_FORMAT(date_and_time, '%b %e %Y %l:%i %p') AS datetime FROM appointments LEFT JOIN clients ON appointments.client_id = clients.id WHERE DATE_FORMAT(date_and_time, '%Y %m %e') = DATE_FORMAT(?, '%Y %m %e') AND notification = 0 AND appointments.is_active = 1", notifdate);
        let result = await this.executeQuery(query);
    
        return JSON.parse(JSON.stringify(result));
    }
    
    async sendNotif(){
        
        let notifdate = new Date();
       
        notifdate.setDate(notifdate.getDate() + 1);
    
        let query = mysql.format("SELECT appointments.id as id ,appointments.client_id as client_id, appointments.title , CONCAT(clients.first_name, ' ', clients.last_name) AS name, clients.email, clients.address, clients.contact, DATE_FORMAT(date_and_time, '%b %e %Y') AS date, DATE_FORMAT(date_and_time, '%l:%i %p') as time FROM appointments LEFT JOIN clients ON appointments.client_id = clients.id WHERE appointment.is_active = 1 AND clients.is_active = 1 AND DATE_FORMAT(date_and_time, '%Y %m %e') = DATE_FORMAT(?, '%Y %m %e')", notifdate);
        let result = await this.executeQuery(query);
        
        let client = JSON.parse(JSON.stringify(result));
        let message = [];
        for(var i=0; i<client.length; i++){
    
            var html = "<h1>Neervet Animal Clinic</h1>";
                html += "<p>Hi "+client[i].name+"</p><p>This is a reminder for your appointment</p>";
                html += "<ul><li>Title: "+ client[i].title +"</li>";
                html += "<li>Date: "+ client[i].date +"</li>";
                html += "<li>Time: "+ client[i].time +"</li></ul>";
                html += "<br><br>";
                html += "<p>09564926029 / 0946855</p>";
        
            const msg = {
                    to: client[i].email,
                    from: "supancj18@gmail.com",
                    subject: "Appointment - Neervet Animal Clinic",
                    text: "here's the email",
                    html: html
                };
                var id = client[i].id;
                var clientId = client[i].client_id;
                sgMail.send(msg).then(async () => {
                    console.log("email has been sent");
                    
                    let update = mysql.format("UPDATE appointments SET notification = 1 WHERE id = ? AND client_id = ?", [id, clientId]);
                    let updateresult = await this.executeQuery(update);
                }).catch((error) => {
                    message.push("some message");
                });
        }
        return message;
    }
    
    async validateAddAppointment(details, id){
        let errors = [];
        if(this.empty(details.title)){
            errors.push('Title should not be blank');
        }

        if(this.empty(details.date_and_time)){
            errors.push('Date and time should not be blank');
        }

        let query = mysql.format("SELECT is_active FROM clients WHERE id = ?", id);
        let result = await this.executeQuery(query);

        var client =  JSON.parse(JSON.stringify(result));
        if(client[0].is_active == 0){
            errors.push('Client is not active');
        }

        return errors;
    }

    async validateEditAppointment(details, id){
        let errors = [];
        if(this.empty(details.title)){
            errors.push('Title should not be blank');
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
        let is_active = 1;
        var title = details.title.charAt(0).toUpperCase() + details.title.slice(1);
    
        let query = mysql.format('INSERT INTO appointments (client_id, title, date_and_time, notification, complete, is_active, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?, ?, ?)', [id, title, details.date_and_time, notify, complete, is_active, date, date]);
        let result = await this.executeQuery(query);
        return result;
    }

    async completeAppointment(id){

        let update = {};
        update.complete = 1;

        let query = mysql.format("UPDATE appointments SET ? WHERE id = ?", [update, id]);
        let result = await this.executeQuery(query);
    }

    async getAppInfo(id, clientid){
        let query = mysql.format("SELECT *, DATE_FORMAT(date_and_time, '%b %e %Y') AS date, DATE_FORMAT(date_and_time, '%Y-%m-%dT%h:%i') as datetime FROM appointments WHERE id = ?", [id, clientid]);
        let result = await this.executeQuery(query);

        return JSON.parse(JSON.stringify(result));
    }

    async updateAppointment(details, id, clientid){
        details.notification = 0;
       
        details.updated_at = new Date(); 

        let query = mysql.format("UPDATE appointments SET ? WHERE id = ? AND client_id", [details, id, clientid]);
        let result = await this.executeQuery(query);
        return result;
    }
    
}

module.exports = new Appointment();