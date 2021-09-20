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

    $(document).on('click', '#edit-profile', function(e){
        e.preventDefault();

        $.get($(this).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;

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
        });
    });

    $(document).on('click', '#manage-user', function(e){
        e.preventDefault();

        $.get($(this).attr('href'), function(res){
            document.getElementById('main').innerHTML = res;

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
        });
    });

    $(document).on('click', '')

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

    // EDIT APPOINTMENT
    $(document).on('click', '.edit-appointment', function(e){
        e.preventDefault();

        var id = $(this).val();
        var body = $('#editAppModal')[0].children[0].children[0].children[1];

        var dateToday = new Date();
        var dd = String(dateToday.getDate()).padStart(2, '0');
        var mm = String(dateToday.getMonth() + 1).padStart(2, '0');
        var yyyy = dateToday.getFullYear();
        var hour = dateToday.getHours();
        var min = dateToday.getMinutes();
        var sec = dateToday.getSeconds();
                    
        var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;
        
        $.get($("#app-id").attr('href'), function(res){
            var form = '';
                form += "<form id='edit-appointment' action='/editAppointment/"+id+"' method='POST'>";
                form += "<label for='title'>Title: </label>";
                form += "<input type='text' name='title' class='form-control' value="+res[0].title+"><br>";
                form += "<label for='datetime'>Date and Time: </label>";
                form += "<input type='datetime-local' id='edit-app-date' name='date_and_time' min='"+today+"' class='form-control' required><br>";
                form += "</form>";
                form += "<div id='appointment-errors'></div>";
            body.innerHTML = form;
        });
        
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

    // DELETE APPOINTMENT
    $(document).on('click','.delete-appointment', function(e){
        e.preventDefault();
        if(confirm('Confirm to delete')){
            $.get($(this).attr('href'));
            let app = document.getElementById('appointment');
            getAppointment(app);
        }else{
            e.preventDefault();
        }
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
            alert('Notification sent!');
            $("#notifModal").modal("hide");
        });
    });

    //WHEN APPOINTMENTS WAS CLICKED IN SIDENAV
    $(document).on('click','#appointment', function(e){
        e.preventDefault();
        $('.sub-menu ul').slideUp();
        
        getAppointment(this);
    });

    //GET ALL CLIENT
    function getclient(client){
        $.get($(client).attr('href'), function(res){
            
            document.getElementById('main').innerHTML = res;
            $('#search-client').focus();

            $(document).on("keypress", '#search', function(e){
                if(e.keyCode == 13){
                    e.preventDefault();
                    $.post($("#search").attr('action'), $("#search").serialize(), function(res){
                        document.getElementById('main').innerHTML = res;
                    });
                }
            });

            $(document).on('click','#search-btn',function(e){
                e.preventDefault();

                $.post($("#search").attr('action'), $("#search").serialize(), function(res){
                    document.getElementById('main').innerHTML = res;
                });
            });

            // VIEW CLIENT PAGE/INFORMATION
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
                    
                    var today = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + min;
                    var maxdate = yyyy + '-' + mm + '-' + dd;

                    document.getElementById('app-datetime').min = today;
                    var x = document.querySelectorAll('.datetime-input');
                    for(var i=0; i<x.length; i++){
                        x[i].max = maxdate;
                    }

                    document.getElementById('client-back').addEventListener('click', function(e){
                        e.preventDefault();
                        let client = document.getElementById('client');
                        getclient(client);
                    });

                    // //ADD PET
                    // document.getElementById('save-pet').addEventListener('click', function(e){
                    //     e.preventDefault();
                        
                    //     $.post($('#pet-form').attr('action'), $('#pet-form').serialize(), function(res){
                    //         if(res.length != 0){
                    //             var errors = "";
                    //             for(var i=0; i<res.length; i++){

                    //                 errors += "<div class='alert alert-warning' role='alert'>"+ res[i] +" </div>";
                    //             }
                    //             $("#pet-modal-ody").animate({ scrollTop: 0 }, "slow");
                    //             document.getElementById('pet-error').innerHTML = errors;
                    //         }else if(res.length === 0){
                                
                    //             alert('Pet added');
                    //             $('#petModal').modal('hide');
                                
                    //             let client = document.getElementById('client-stay');
                    //             viewClient(client);
                    //         }
                    //     });
                    // });

                    //DELETE PET
                    $('.delete-pet').on('click', function(e){
                        e.preventDefault();
                        if(confirm('Confirm to delete')){
                            e.preventDefault();
                            $.get($(this).attr('href'));
                            let client = document.getElementById('client-stay');
                            viewClient(client);
                        }else{
                            e.preventDefault();
                        }
                    });

                    //VIEW PET PAGE/INFORMATION
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
                            
                            var maxdate = yyyy + '-' + mm + '-' + dd;

                            var x = document.querySelectorAll('.datetime-input');
                            for(var i=0; i<x.length; i++){
                                x[i].max = maxdate;
                            }

                            //SAVE LAB RECORD
                            $("#save-lab").on('click', function(){
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

                            $('#pet-back').on('click', function(e){
                                e.preventDefault();
                                let client = document.getElementById('back-to-client');
                                viewClient(client);
                            });

                            //SAVE PET RECORD
                            $('#save-pet-record').on('click', function(e){
                                e.preventDefault();
                                
                                $.post($('#pet-record-form').attr('action'), $('#pet-record-form').serialize());
                                alert('Pet record added!');
                                $('#petRecordModal').modal('hide');
                                let pet = document.getElementById('pet-stay');
                                viewPet(pet);
                            });
                        });
                    }

                    //VIEW PET PAGE
                    $('.view-pet').on('click', function(e){
                        e.preventDefault();

                        viewPet(this);

                    });

                    //SAVE PET INFORMATION
                    $(document).on('click', '#save-pet-info', function(){
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

                    $(document).on('click', '.delete-record', function(e){
                        e.preventDefault();
                        if(confirm('Confirm to delete')){
                            $.get($(this).attr('href'), function(){
                                viewPet($("#pet-stay"));
                            });
                        }else{
                            e.preventDefault();
                        }
                
                        
                    })

                });                
            }

            //DELETE CLIENT
            $('.deleteClient').on('click', function(e){
               e.preventDefault();
                if(confirm('Confirm to delete')){
                    e.preventDefault();
                    $.get($(this).attr('href'), function(){
                        let client = document.getElementById('client');
                        getclient(client);
                    });
                }else{
                    e.preventDefault();
                }
            });

           

            //VIEW CLIENT
            $(document).on('click', '.viewClient', function(e){
                e.preventDefault();
                viewClient(this);
                
            });
            // EDIT PROFILE
            $(document).on('click', '#save-client-info', function(){
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

        });
    }

     // PRINT REPORT
     $(document).on('click', '#print-now', function(){
                        
        $("#pet-report").printThis();

    });

    //EDIT LAB RECORD
    $(document).on('click','#edit-lab', function(){
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
    $(document).on('click', '.view-health', function(){
        $.get($(this).attr('href'), function(res){
            document.getElementById('record-content').innerHTML = res;
            
        });
        var petIdsystemId = $(this).val();
        document.getElementById('edit-lab').value = petIdsystemId;
    });

    // VIEW PET REPORT
    $(document).on('click', '.view-report', function(){
        console.log(document.getElementById('pet-report'));
        $.get($(this).attr('href'), function(res){
            document.getElementById('pet-report').innerHTML = res;
        });
    });

    //SAVE CLIENT
    $(document).on('click','#saveClient', function(){
               
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

    $(document).on('click', '#delete-user', function(e){
        e.preventDefault();

        $.get($(this).attr('href'), function(){
            alert("User Deleted");
            location.reload();
        });
    });

    $(document).on('click','#client', function(e){
        e.preventDefault();

        $('.sub-menu ul').slideUp();
        getclient(this);

    });

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

    // DELETE APPOINTMENT TODAY
    $(document).on('click','.delete-appointment-today', function(e){
        e.preventDefault();
        if(confirm('Confirm to delete')){
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