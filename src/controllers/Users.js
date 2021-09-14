const user_model = require('../models/User');

class Users{
    async login(req, res){
       
        if(req.session.user_id === undefined || req.session.user_id === ''  && req.session.user_level === undefined || req.session.user_level === '' ){
            req.session.errors = [];
            res.render('index');
        }else{
            res.redirect('/home');
        }
    }

    async logout(req, res){
        req.session.user_id = undefined;
        req.session.user_level = undefined;
        req.session.user_name = undefined;
        res.redirect('/');
    }

    async validate_login(req, res){

        let result = await user_model.validateLogin(req.body);

        if(result.length != 0){
            res.json(result);

        }else{

            let getUserLevel = await user_model.getUserLevel(req.body);
            
            let userID = getUserLevel[0].id;
            let userLevel = getUserLevel[0].user_level;
            let username = getUserLevel[0].username;
            let name = getUserLevel[0].name;

            req.session.user_level = userLevel;
            req.session.user_id = userID;
            req.session.user_name = username;
            req.session.name = name;

            res.json([]);
        }
    }

    async home(req, res){

        if(req.session.user_id === undefined || req.session.user_id === ''  && req.session.user_level === undefined || req.session.user_level === '' ){
            req.session.errors = [];
            res.redirect('/');
        }
        
        let client = await user_model.countClient();
        let app = await user_model.countApp();
        let staff = await user_model.countSubadmin();

        if(req.session.user_level === 'Admin'){
            res.render('adminhome', {clients: client, app: app, staff: staff, username: req.session.user_name, userlevel: req.session.user_level});

        }else if(req.session.user_level === 'Staff'){
            res.render('home', {clients: client, app: app, staff: staff, username: req.session.user_name, userlevel: req.session.user_level});

        }
    }

    async edit_profile(req, res){
        let result = await user_model.getUser(req.session.user_id);

        res.render('partials/editprofile', {user: result, id: req.session.user_id});
    }

    async manage_user(req, res){

        let result = await user_model.getAllUser();
        res.render('partials/manageusers', {users: result});
    }

    async delete_user(req, res){
        let result = await user_model.deleteUser(req.params.id);
        
        res.redirect('/');
    }

    async edit_user(req, res){
        let result = await user_model.validateProfile(req.body, req.params.id);
        if(result.length != 0){
            res.json(result);
        }else{
            let updateUser = await user_model.editUser(req.body, req.params.id);
            req.session.user_name = req.body.username;
            res.json([]);
        }
    }

    async add_user_page(req, res){
        res.render('partials/adduser');
    }

    async validate_user(req, res){
        let result = await user_model.validateUser(req.body);
        
        if(result.length != 0){
            res.json(result);
        }else{
            let addUser = await user_model.addUser(req.body);
            res.json([]);
        }
    }

    async backuprestore(req, res){

        let result = await user_model.getFiles();
        
        res.render('partials/backuprestore', {restore: result});
    }

    async validate_backup(req, res){
        let result = await user_model.validate_backup(req.body);
        
        if(result.length != 0){
            res.json(result);
        }else{
            let result = await user_model.backup(req.body);
            res.json([]);
        }
    }

    async restore(req, res){
        let result = await user_model.truncate();
        let restoreimport = await user_model.restore(req.body);
        if(restoreimport.length != 0){
            console.log(restoreimport);
        }else{
            res.redirect('/logout');
        }
        
    }

    
}

module.exports = new Users();