var appointment_model = require('../models/Appointment');

class Appointments{
    async appointment(req, res){
        let getAppointment = await appointment_model.getAllAppointment();
        res.render('partials/appointment', {app: getAppointment});
    }

    async search_app(req, res){
        let getAppointment = await appointment_model.searchApp(req.body);
        res.render('partials/appointment', {app: getAppointment});
    }

    async validate_appointment(req, res){
        let result = await appointment_model.validateAppointment(req.body);
        if(result.length > 0){
            res.json(result);
        }else if(result == ''){
            let result = await appointment_model.addAppointment(req.body, req.params.id);
            res.json('clear');
        }
    }

    async delete_appointment(req, res){
        let result = await appointment_model.deleteAppointment(req.params.id);
        res.redirect('/');
    }

    async get_notification(req, res){
        let result = await appointment_model.getNotif();

        res.render('partials/notification.ejs', {clients: result});
    }

    async send_notification(req, res){
        let result = await appointment_model.sendNotif(req.params.day);
        res.json("/");
    }
}

module.exports = new Appointments();