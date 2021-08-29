const Express = require("express");
const Router = Express.Router();
const UserController = require(`./controllers/users`);

Router.get("/", UserController.login);
Router.post("/login", UserController.validate_login);
Router.get("/logout", UserController.logout);

Router.get("/home", UserController.home);

Router.get("/editProfile", UserController.edit_profile);
Router.post("/editUser/:id", UserController.edit_user);

Router.get("/appointment", UserController.appointment);
Router.post("/addAppointment/:id", UserController.validate_appointment);
Router.get("/deleteAppointment/:id", UserController.delete_appointment);
Router.post("/searchApp", UserController.search_app);

Router.get("/client", UserController.client);
Router.post("/searchClient", UserController.search_client);
Router.post("/addClient", UserController.validate_client);
Router.get("/deleteClient/:id", UserController.delete_client);
Router.get("/viewClient/:id", UserController.view_client);


Router.post("/addPet/:id", UserController.validate_pet);
Router.get("/viewPet/:clientid/:petid", UserController.view_pet);
Router.get("/deletePet/:id", UserController.delete_pet);

Router.post("/addPetRecord/:clientid/:petid", UserController.add_pet_record);
Router.get("/deletePetRecord/:systemid/:vitalid/:historyid", UserController.delete_pet_record);

Router.post("/updateLab/:id", UserController.update_lab);
Router.get("/getLab/:id", UserController.get_lab);

Router.get("/getNotification/:number", UserController.get_notification);
Router.get("/sendNotification/:day", UserController.send_notification);

module.exports = Router;