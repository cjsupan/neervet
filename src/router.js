const Express = require("express");
const Router = Express.Router();

const UserController = require(`./controllers/Users`);
const AppointmentController = require(`./controllers/Appointments`);
const ClientController = require(`./controllers/Clients`);
const PetController = require(`./controllers/Pets`);

// USER ROUTER
Router.get("/", UserController.login);
Router.post("/login", UserController.validate_login);
Router.get("/logout", UserController.logout);

Router.get("/home", UserController.home);

Router.get("/editProfile", UserController.edit_profile);
Router.post("/editUser/:id", UserController.edit_user);
Router.get("/manageUser", UserController.manage_user);

Router.get("/addUserPage", UserController.add_user_page);
Router.post("/addUser", UserController.validate_user);
Router.get("/deleteuser/:id", UserController.delete_user);

Router.get("/backuprestore", UserController.backuprestore);
Router.get("/backup", UserController.backup);
Router.post("/restore", UserController.restore);

// APPOINTMENT ROUTER
Router.get("/appointment", AppointmentController.appointment);
Router.post("/addAppointment/:id", AppointmentController.validate_appointment);
Router.get("/appointmentsToday", AppointmentController.appointments_today);
Router.get("/completeAppointment/:id", AppointmentController.complete_appointment);
Router.get("/getAppInfo/:id", AppointmentController.get_app_info);
Router.post("/editAppointment/:id", AppointmentController.edit_appointment);
Router.get("/deleteAppointment/:id", AppointmentController.delete_appointment);
Router.post("/searchApp", AppointmentController.search_app);

// CLIENT ROUTER
Router.get("/client", ClientController.client);
Router.post("/searchClient", ClientController.search_client);
Router.post("/addClient", ClientController.validate_client);
Router.post("/editClientProfile/:id", ClientController.update_client);
Router.get("/deleteClient/:id", ClientController.delete_client);
Router.get("/viewClient/:id", ClientController.view_client);

// PET ROUTER
Router.post("/addPet/:id", PetController.validate_pet);
Router.get("/viewPet/:clientid/:petid", PetController.view_pet);
Router.post("/editPetInfo/:id", PetController.edit_pet_info);
Router.get("/deletePet/:id", PetController.delete_pet);

Router.post("/addPetRecord/:clientid/:petid", PetController.add_pet_record);
Router.get("/deletePetRecord/:petid/:systemid", PetController.delete_pet_record);

Router.get("/getReport/:petid/:systemid", PetController.get_report);

Router.get("/getLab/:clientid/:petid/:systemid", PetController.get_lab);
Router.post("/updateLab/:clientid/:petid/:systemid", PetController.update_lab);

Router.get("/getHealth/:petid/:systemid", PetController.get_health);

Router.get("/getNotification", AppointmentController.get_notification);
Router.get("/sendNotification", AppointmentController.send_notification);

module.exports = Router;