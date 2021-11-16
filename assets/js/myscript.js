$(document).ready(function(){

    $(document).on('click', '#login-submit', function(){
        
        $.post($('#login-form').attr('action'), $('#login-form').serialize(), function(res){

            if(res.length != 0){
                let errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+ res[i] +"</div>";
                }
                document.getElementById('login-errors').innerHTML = errors;
            }else if(res.length == 0) {
                location.replace("http://localhost:1337/home");
            }
            
        });
    });

    $("#login-form").on('keyup', function(e){
        if(e.keyCode === 13){
            $.post($('#login-form').attr('action'), $('#login-form').serialize(), function(res){

                if(res.length != 0){
                    let errors = '';
                    for(var i=0; i<res.length; i++){
                        errors += "<div class='alert alert-warning'>"+ res[i] +"</div>";
                    }
                    document.getElementById('login-errors').innerHTML = errors;
                }else if(res.length == 0) {
                    location.replace("http://localhost:1337/home");
                }
                
            });
        }
    })

    $('.sub-menu ul').hide();
    $(".sub-menu a").click(function () {
        $(this).parent(".sub-menu").children("ul").slideToggle("100");
    });


    $(document).on('click', '.list-group-item', function(e){
        e.preventDefault();
        var idname = $(this).attr('value');
        document.getElementById(idname).scrollIntoView({ behavior: "smooth"});
        
    });

    $(document).on('click', '#how-to-add-pet-record', function(){
        document.getElementById("list-item-6").scrollIntoView({ behavior: "smooth"});
        
    });

    $(document).on('click', '#how-to-add-pet', function(e){
        e.preventDefault();
        var idname = $(this).attr('value');
        document.getElementById(idname).scrollIntoView({ behavior: "smooth"});
    })

    function editProfile(user){
        $.get($(user).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;
        });
    }

    $(document).on('click', '#edit-profile', function(e){
        e.preventDefault();

        editProfile($(this));
    });

    $(document).on('click', '#view-password', function(){
        console.log($(this));
        if($("user-password").attr("type") == "text"){
            
            $("user-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");

        }else if($("user-password").attr("type") == "password"){
            $("user-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });
    
    $(document).on('click', '#view-confirm-password', function(){
        if($("user-confirm-password").attr("type") == "text"){
            $("user-confirm-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");
        }else if($("user-confirm-password").attr("type") == "password"){
            $("user-confirm-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });

    function manageUser(user){
        $.get($(user).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;
        });
    }

    $(document).on('click', '#manage-user', function(e){
        e.preventDefault();

        manageUser($(this));
    });

    $(document).on('click', '#view-password', function(){
        if($("#user-password").attr("type") == "text"){
            $("#user-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");
        }else if($("#user-password").attr("type") == "password"){
            $("#user-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });
    
    $(document).on('click', '#view-confirm-password', function(){
        if($("#user-confirm-password").attr("type") == "text"){
            $("#user-confirm-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");
        }else if($("#user-confirm-password").attr("type") == "password"){
            $("#user-confirm-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });

    // GET ALL APPOINTMENTs
    function getAppointment(app){
        $.get($(app).attr('href'), function(res){
            
            document.getElementById('main').innerHTML = res;
        
            $(document).on("keypress", '#search-appointment', function(e){
                if(e.keyCode == 13){
                    e.preventDefault();
                    $.post($("#app-search").attr('action'), $("#app-search").serialize(), function(res){
                        document.getElementById('main').innerHTML = res;
                    });
                }
            });

            $(document).on('click','#search-btn',function(){
                $.post($("#app-search").attr('action'), $("#app-search").serialize(), function(res){
                    document.getElementById('main').innerHTML = res;
                });
            });
        });
    }

    function editAppointment(app){
        
        var id = $(app).val();
        var body = $('#editAppModal')[0].children[0].children[0].children[1];

        var dateToday = new Date();
        var dd = String(dateToday.getDate()).padStart(2, '0');
        var mm = String(dateToday.getMonth() + 1).padStart(2, '0');
        var yyyy = dateToday.getFullYear();
        var hour = dateToday.getHours();
        var min = dateToday.getMinutes();
        var sec = dateToday.getSeconds();
                    
        var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;

        $.get($(app).attr('href'), function(res){
            var date = res[0].date_and_time.replace('Z', '');
            console.log(date);
            var form = '';
                form += "<form id='edit-appointment' action='/editAppointment/"+id+"' method='POST'>";
                form += "<label for='title'>Title:<span class='require'>*</span> </label>";
                form += "<input type='text' name='title' class='form-control' value="+res[0].title+"><br>";
                form += "<label for='datetime'>Date and Time:<span class='require'>*</span> </label>";
                form += "<input type='datetime-local' id='edit-app-date' name='date_and_time' class='form-control' min='"+ today +"' value="+ res[0].datetime +" required><br>";
                form += "<label for='is_active'>Status: </label>";
                form += "<select name='is_active' class='form-control'>";
                if(res[0].is_active == 1){
                    form += "<option value='1' selected>Active</option>"
                    form += "<option value='0' >Not Active</option>";
                }else if(res[0].is_active == 0){
                    form += "<option value='0' selected>Not Active</option>";
                    form += "<option value='1' >Active</option>";
                }
                
                form += "</select>"; 
                form += "</form>";
                form += "<div id='appointment-errors'></div>";
            body.innerHTML = form;
        });
    }

    // EDIT APPOINTMENT
    $(document).on('click', '.edit-appointment', function(e){
        e.preventDefault();

        editAppointment(this);
    });

    $(document).on('click', '#update-app', function(e){
        e.preventDefault();
        $.post($("#edit-appointment").attr('action'), $('#edit-appointment').serialize(), function(res){
            if(res.length != 0){
                var error = '';
                for(var i=0; i<res.length; i++){
                    error += "<div class='alert alert-warning'>"+res[i]+"</div>";
                }
                document.getElementById('appointment-errors').innerHTML = error;
            }else if(res.length === 0){
                alert('Appointment Updated');
                $("#editAppModal").modal('hide');
                getAppointment($("#appointment"));
                
            }
        });
    });
    

    
    // GET ALL CLIENT WHO NEED TO NOTIFY
    $(document).on('click', '#notification', function(e){
        e.preventDefault();
       
        $.get('/getNotification', function(res){
            var modalBody = $("#notifModal")[0].children[0].children[0].children[1].children[1];
            modalBody.innerHTML = res;

        });
    });

    $(document).on('click', '#send-notification', function(e){
        e.preventDefault();
        
        $.get($("#notif").attr('href'), function(res){
            alert(res);
            $("#notifModal").modal("hide");
            let app = document.getElementById('appointment');
            getAppointment(app);
        });

        let app = document.getElementById('appointment');
        getAppointment(app);
    });

    //WHEN APPOINTMENTS WAS CLICKED IN SIDENAV
    $(document).on('click','#appointment', function(e){
        e.preventDefault();
        $('.sub-menu ul').slideUp();
        
        getAppointment(this);
    });

    //GET ALL CLIENT -- start
    function getclient(client){
        $.get($(client).attr('href'), function(res){
            
            document.getElementById('main').innerHTML = res;
            $('#search-client').focus();
        });
    }
    //GET ALL CLIENT -- end

    //SEARCH CLIENTS WITH KEYPRESS
    $(document).on("keypress", '#search', function(e){
        if(e.keyCode == 13){
            e.preventDefault();
            $.post($("#search").attr('action'), $("#search").serialize(), function(res){
                document.getElementById('main').innerHTML = res;
            });
        }
    });
    //SEARCH CLIENTS
    $(document).on('click','#search-btn',function(e){
        e.preventDefault();

        $.post($("#search").attr('action'), $("#search").serialize(), function(res){
            document.getElementById('main').innerHTML = res;
        });
    });

    // VIEW CLIENT PAGE/INFORMATION -- start
    function viewClient(client){
        $.get($(client).attr('href'), function(res){

            document.getElementById('main').innerHTML = res;
            
            var dateToday = new Date();
            var dd = String(dateToday.getDate()).padStart(2, '0');
            var mm = String(dateToday.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = dateToday.getFullYear();
            var hour = dateToday.getHours();
            var min = dateToday.getMinutes();
            var sec = dateToday.getSeconds();
            
            var todate = yyyy + '-' + mm + '-' + dd;
            var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;
            var maxdate = yyyy + '-' + mm + '-' + dd;

            document.getElementById('app-datetime').min = today;
            document.getElementById('birthdate-input').max = todate;
            document.getElementById('datetime-input').max = maxdate;
        });                
    }
    // VIEW CLIENT PAGE/INFORMATION -- end

    //PET BACK
    $(document).on('click', '#pet-back', function(e){
        e.preventDefault();
        let client = document.getElementById('back-to-client');
        viewClient(client);
    });

    //VIEW CLIENT
    $(document).on('click', '.viewClient', function(e){
        e.preventDefault();
        viewClient(this);
        
    });

    //CLIENT STATUS
    $(document).on('click', '.client-status', function(e){
        e.preventDefault();
        if(this.value == 'activate'){
            if(confirm('Confirm to Activate')){
            $.get($(this).attr('href'), function(){

                getclient(document.getElementById('client'));
            });
                
            }else{
                e.preventDefault();
            }
        }else if(this.value == 'deactivate'){

            if(confirm('Confirm to Deactivate')){
                $.get($(this).attr('href'), function(){
    
                    getclient(document.getElementById('client'));
                });
                    
            }else{
                e.preventDefault();
            }
        }
        
    });

    // EDIT PROFILE
    $(document).on('click', '#save-client-info', function(e){
        e.preventDefault();
        $.post($("#edit-client-form").attr('action'), $("#edit-client-form").serialize(), function(res){

            if(res.length != 0){
                let errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+res[i]+"</div>";
                }
                document.getElementById('client-errors').innerHTML = errors;
            }else{
                alert("Profile Updated");
                $("#editClientModal").modal('hide');
                var stay = document.getElementById("client-stay");
                viewClient(stay);
            }

        });
    });

     //ADD PET
     $(document).on('click', '#save-pet',function(e){
        e.preventDefault();
        
        $.post($('#pet-form').attr('action'), $('#pet-form').serialize(), function(res){
            if(res.length != 0){
                var errors = "";
                for(var i=0; i<res.length; i++){

                    errors += "<div class='alert alert-warning' role='alert'>"+ res[i] +" </div>";
                }
                $("#pet-modal-body").animate({ scrollTop: 0 }, "slow");
                document.getElementById('pet-error').innerHTML = errors;
            }else if(res.length === 0){
                
                alert('Pet added');
                $('#petModal').modal('hide');
                
                let client = document.getElementById('client-stay');
                viewClient(client);
            }
        });
    });

    //VIEW PET PAGE/INFORMATION -- start
    function viewPet(pet){
        $.get($(pet).attr('href'), function(res){

            document.getElementById('main').innerHTML = res;

            var dateToday = new Date();
            var dd = String(dateToday.getDate()).padStart(2, '0');
            var mm = String(dateToday.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = dateToday.getFullYear();
            var hour = dateToday.getHours();
            var min = dateToday.getMinutes();
            var sec = dateToday.getSeconds();
            
            var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;
            document.getElementById('datetime-input').max = today;
        });
    }
    //VIEW PET PAGE/INFORMATION -- end


    //SAVE LAB RECORD
    $(document).on('click', '#save-lab', function(e){
        e.preventDefault();
        $.post($('#record-form').attr('action'), $('#record-form').serialize(), function(res){

            if(res.length != 0){
                let errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+res[i]+"</div>"
                }
                $("#labModalBody").animate({ scrollTop: 0 }, "slow");
                document.getElementById('record-errors').innerHTML = errors;
                
            }else if(res.length === 0){
                alert('laboratory Updated');

                $('#labModal').modal('hide');
                $('#viewHealthRecordModal').modal('hide');
                let pet = document.getElementById('pet-stay');
                viewPet(pet);
            }
        });
    });

    //SAVE PET RECORD
    $(document).on('click', '#save-pet-record', function(e){
        e.preventDefault();
        
        $.post($('#pet-record-form').attr('action'), $('#pet-record-form').serialize(), function(res){
            if(res.length != 0){
                var error = '';

                for(var i=0; i<res.length; i++){
                    error += "<div class='alert alert-warning'>"+res[i]+"</div>";
                }
                $("#pet-modal-body").animate({ scrollTop: 0 }, "slow");
                document.getElementById('record-errors').innerHTML = error;
            }else if(res.length === 0){
                alert('Pet record added!');
                $('#petRecordModal').modal('hide');
                let pet = document.getElementById('pet-stay');
                viewPet(pet);
            }
        });
    });


    //VIEW PET PAGE
    $(document).on('click', '.view-pet', function(e){
        e.preventDefault();

        viewPet(this);

    });

    // // ADD PET RECORD
    // $(document).on('click', '#add-pet-record', function(e){
    //     e.preventDefault();

    //     var ids = document.getElementById('record-href').value;
    //     var href = "/treatment/" + ids;
    //     console.log(document.getElementById('record-href').href);

    //     document.getElementById('record-href').href = href;
    //     $.get($("#record-href").attr('href'), function(res){
    //         console.log(document.getElementById('record-href').href)
    //         document.getElementById('record-form').innerHTML = res;
    //     })
    // });

    // //RECORD TYPE
    // $(document).on('change', '#record-type', function(e){
    //     e.preventDefault();
    //     var ids = document.getElementById('record-href').value;
    //     var href = this.value + "/" + ids;
    //     document.getElementById('record-href').href = href;
    //     $.get($("#record-href").attr('href'), function(res){
    //         document.getElementById('record-form').innerHTML = res;
    //     })
    // })


    //SAVE PET INFORMATION
    $(document).on('click', '#save-pet-info', function(e){
        e.preventDefault();
        $.post($('#edit-pet-info').attr('action'), $('#edit-pet-info').serialize(), function(res){

            if(res.length != 0){
                let errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+res[0]+"</div>";
                }
                document.getElementById('pet-info-errors').innerHTML = errors;
            }else if(res.length === 0){
                alert('Pet Information Updated');
                $("#editPetModal").modal('hide');
                $("#editPetModal").prependTo("body");
                document.getElementById('pet-info-errors').innerHTML = '';
                var stay = document.getElementById('pet-stay');
                viewPet(stay);
            }
        });
    });

    //CLIENT BACK
    $(document).on('click', '#client-back', function(e){
        e.preventDefault();
        let client = document.getElementById('client');
        getclient(client);
    });


     // PRINT REPORT
     $(document).on('click', '#print-now', function(){
                        
        $("#pet-report").printThis();

    });


    //EDIT LAB RECORD
    $(document).on('click','#edit-lab', function(e){
        e.preventDefault();
        var id = this.value;
        document.getElementById('edit-lab').setAttribute('href', "/getLab/"+id+"");
        $.get($('#edit-lab').attr('href'), function(res){
            
            document.getElementById('labModalBody').innerHTML = res;
            var dateToday = new Date();
            var dd = String(dateToday.getDate()).padStart(2, '0');
            var mm = String(dateToday.getMonth() + 1).padStart(2, '0');
            var yyyy = dateToday.getFullYear();
            var hour = dateToday.getHours();
            var min = dateToday.getMinutes();
            var sec = dateToday.getSeconds();
                        
            var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;
            document.getElementById('dateandtime').max = today;
    
            document.getElementById('record-form').setAttribute('action', "updateLab/"+id+"");
           
        });
    });

    
    //VIEW PET HEALTH RECORD
    $(document).on('click', '.view-health', function(e){
        e.preventDefault();
        $.get($(this).attr('href'), function(res){
            document.getElementById('record-content').innerHTML = res;
            
        });
        var petIdsystemId = $(this).val();
        document.getElementById('edit-lab').value = petIdsystemId;
    });


    // VIEW PET REPORT
    $(document).on('click', '.view-report', function(e){
        e.preventDefault();
        console.log(document.getElementById('pet-report'));
        $.get($(this).attr('href'), function(res){
            document.getElementById('pet-report').innerHTML = res;
        });
    });


    //SAVE CLIENT
    $(document).on('click','#saveClient', function(e){
        e.preventDefault();
               
        $.post($('#client-form').attr('action'), $('#client-form').serialize(), function(res){
            document.getElementById('errors').innerHTML = "";
            var errors = "";
            if(res.url === '/'){
                alert('Client Added!');
                $('#client-modal').modal('hide');
                let client = document.getElementById('client');
                getclient(client);
            }else if(res != ''){
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning lead' role='alert'>" + res[i] + "</div>";
                }
                document.getElementById('errors').innerHTML += errors;
            }
        });
    });

    //SAVE EDIT USER PROFILE
    $(document).on('click', '#save-profile', function(e){
        e.preventDefault();

        $.post($('#edit-user').attr('action'), $("#edit-user").serialize(), function(res){
            
            if(res.length != 0){
                var errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+ res[i] +"</div><br>";
                    
                }
                document.getElementById('profile-errors').innerHTML = errors;

            }else{
                alert('Profile Updated');
                location.replace('http://localhost:1337/');
            }
            
        });
    });


    //ADD USER
    $(document).on('click', '#save-user', function(e){
        e.preventDefault();
        $.post($('#add-user-form').attr('action'), $("#add-user-form").serialize(), function(res){
            
            if(res.length != 0){
                var errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+ res[i] +"</div><br>";
                    
                }
                document.getElementById('user-errors').innerHTML = errors;

            }else{
                alert('User Added');
                location.replace('http://localhost:1337/');
            }
            
        });
    });

    //EDIT USER STAFF
    $(document).on('click', '.edit-user-staff', function(e){
        e.preventDefault();
        $.get($(this).attr('href'), function(res){
            var form = '';

                form += "<form id='edit-staff-form' action='/editUserStaff/"+ res[0].id +"' method='POST'>";
                form += " <div id='profile-errors'></div>";
                form += "<p class='lead'>Personal Info</p>";
                form += "<label for='first_name'>First Name: </label>";
                form += "<input type='text' class='form-control' name='first_name' value='"+ res[0].first_name +"'><br>";
                form += "<label for='last_name'>Last Name: </label>";
                form += "<input type='text' class='form-control' name='last_name' value='"+res[0].last_name+"'><br>";
                form += "<p class='lead'>Account Info</p>";
                form += "<label for='username'>Username:<span class='require'>*</span></label>";
                form += "<input type='text' name='username' class='form-control' value='"+res[0].username+"'><br>";
                form += "<label for='password'>Password:<span class='require'>*</span></label>";
                form += "<div class='form-group'>";
                form += "<input type='password' id='users-password' name='password' class='form-control' value='"+res[0].password+"' ><img id='view-password' src='img/closeeye.png'><br>";
                form += "</div><br>";
                form += "<label for='confirmpassword'>Confirm Password:<span class='require'>*</span></label>";
                form += "<div class='form-group'>";
                form += "<input type='password' id='users-confirm-password' name='confirmpassword' class='form-control' value='"+res[0].password+"' ><img id='view-confirm-password' src='img/closeeye.png'><br>";
                form += "</div>";

                form += "<label for='user_level'>User level: </label>";
                if(res[0].user_level == 'Staff'){
                    form += "<select name='user_level' class='form-control'>";
                    form += "<option value='Staff' selected>Staff</option>";
                    form += "<option value='Admin'>Admin</option>";
                    form += "</select>";

                }else if(res[0].user_level == 'Admin'){
                    form += "<select name='user_level' class='form-control'>";
                    form += "<option value='Admin' selected>Admin</option>";
                    form += "<option value='Staff'>Staff</option>";
                    form += "</select>";
                }
                form += "<label for='is_active'>Status: </label>";
                if(res[0].is_active == 1){
                    form += "<select name='is_active' class='form-control'>";
                    form += "<option value='1' selected>Active</option>";
                    form += "<option value='0'>Not Active</option>";
                    form += "</select>";
                }else if(res[0].is_active == 0){
                    form += "<select name='is_active' class='form-control'>";
                    form += "<option value='0' selected>Not Active</option>";
                    form += "<option value='1'>Active</option>";
                    form += "</select>";
                }
                form += "</form>"; 
            document.getElementById('edit-user-staff-form').innerHTML = form;

            
        });
    });

    $(document).on('click', '#view-password', function(){
        if($("#users-password").attr("type") == "text"){
            $("#users-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");
        }else if($("#users-password").attr("type") == "password"){
            $("#users-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });
    
    $(document).on('click', '#view-confirm-password', function(){
        if($("#users-confirm-password").attr("type") == "text"){
            $("#users-confirm-password").attr('type', 'password');
            $(this).attr("src", "img/closeeye.png");
        }else if($("#users-confirm-password").attr("type") == "password"){
            $("#users-confirm-password").attr('type', 'text');
            $(this).attr("src", "img/openeye.png");
        }
    });

    //SAVE USER STAFF

    $(document).on('click', '#save-user-staff', function(e){
        e.preventDefault();

        $.post($('#edit-staff-form').attr('action'), $('#edit-staff-form').serialize(), function(res){

            if(res.length != 0){
                var errors = '';
                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning'>"+ res[i] +"</div><br>";
                    
                }
                document.getElementById('profile-errors').innerHTML = errors;

            }else{
                alert('Profile Updated');
                var manageUserstaff = document.getElementById('manage-user');
                $('#editStaffModal').modal('hide');
                manageUser(manageUserstaff);
            }
        });

    })

    //GET ALL CLIENT WHEN CLICKED
    $(document).on('click','#client', function(e){
        e.preventDefault();
        
        getclient(this);

    });


    //BACKUP
    $(document).on('click', '#backup-restore', function(e){
        e.preventDefault();
        $('.sub-menu ul').slideUp();
       
        $.get($(this).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;
        });
    });

    $(document).on('click', '#backup-now', function(){
    
        $.get($(this).attr('href'));
    });


    //RESTORE
    $(document).on('click', '#restore-now', function(e){
        e.preventDefault()
        console.log($("#sqlfile")[0].files)
        document.getElementById('spin').innerHTML = "<div id='spinner' class='spinner-border text-light' role='status'></div>";
        
        var fd = new FormData();
        var files = $('#sqlfile')[0].files;
        
        if(files.length > 0){
            fd.append('file', files[0]);
            $.ajax({
                url: $("#restore-form").attr('action'),
                type: 'post',
              data: fd,
              contentType: false,
              processData: false,
              success: function(res){
                  alert('Restore Success!');
                  location.reload();
              }
            })
        }
    });

    //ADD APPOINTMENT
    $(document).on('click','#save-appointment', function(e){
        e.preventDefault();
        var dateToday = new Date().toDateString();
       
        $.post($('#appointment-form').attr('action'), $('#appointment-form').serialize(), function(res){
            
            if(res.length != 0){
                var errors = '';

                for(var i=0; i<res.length; i++){
                    errors += "<div class='alert alert-warning' role='alert'>"+ res[i] +" </div>";
                }
                
                document.getElementById('appointment-error').innerHTML = errors;
            }else if(res.length === 0){
                alert('Appointment added');
                $('#appointmentModal').modal('hide');
            }
        });
    });

    $(document).on('click','.main-box', function(e){
        e.preventDefault();
        if($(this).attr('id') === 'clients'){
            $('.sub-menu ul').slideUp();
        
            getclient($("#client"));
        }
    });

    function getAppointmentToday(app){
        $.get($(app).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;

            let complete = document.querySelectorAll('.complete-appointment');
            for(var i=0; i<complete.length; i++){
                if(complete[i].value === '1'){
                    $(complete[i]).prop('disabled', true);
                }
            }
        });
    }

    $(document).on('click', '.complete-appointment', function(e){
        e.preventDefault();
        
        if(confirm('Confirm to Complete')){
            $.get($(this).attr('href'));
            let appToday = document.getElementById('app-today');
            getAppointmentToday(appToday);
        }else{
            e.preventDefault();
        }
    });

    $(document).on('click','.main-box', function(e){
        e.preventDefault();
        let app = $(this).attr('id') === 'appointments-today';
        let appToday = document.getElementById('app-today');
        if(app){
            $('.sub-menu ul').slideUp();

            getAppointmentToday(appToday);
        }
    });
});