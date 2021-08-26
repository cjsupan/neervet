$(document).ready(function(){

    $('.sub-menu ul').hide();
    $(".sub-menu a").click(function () {
        $(this).parent(".sub-menu").children("ul").slideToggle("100");
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
       
        $.get('/getNotification/3', function(res){
            var modalBody = $("#notifModal")[0].children[0].children[0].children[1].children[1];
            modalBody.innerHTML = res;

        });

        $(document).on('change','#dateValue', function(e){
            e.preventDefault();
            var num = this.value;

            $.get("/getNotification/"+num+"", function(res){
                var modalBody = $("#notifModal")[0].children[0].children[0].children[1].children[1];
                modalBody.innerHTML = res;

            });
        });
    });

    $(document).on('click', '#send-notification', function(e){
        e.preventDefault();
        var day = document.getElementById('dateValue').value;
        $.get("/sendNotification/"+day+"", function(res){
            alert('Notification sent!');
            $("#notifModal").modal("hide");
        });
    });

    //WHEN APPOINTMENTS WAS CLICKED IN SIDENAV
    $(document).on('click','#appointment', function(e){
        e.preventDefault();
        
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
                    document.getElementById('client-back').addEventListener('click', function(e){
                        e.preventDefault();
                        let client = document.getElementById('client');
                        getclient(client);
                    });

                    //ADD APPOINTMENT
                    document.getElementById('save-appointment').addEventListener('click', function(e){
                        e.preventDefault();
                        $.post($('#appointment-form').attr('action'), $('#appointment-form').serialize(), function(res){
                            
                            if(res != 'clear'){
                                var error = "<div class='alert alert-warning' role='alert'>"+ res[0] +" </div>";
                                document.getElementById('appointment-error').innerHTML = error;
                            }else if(res === 'clear'){
                                alert('Appointment added');
                                $('#appointmentModal').modal('hide');
                            }
                        });
                    });

                    //ADD PET
                    document.getElementById('save-pet').addEventListener('click', function(e){
                        e.preventDefault();
                        $.post($('#pet-form').attr('action'), $('#pet-form').serialize(), function(res){
                            if(typeof res === 'string'){
                                var errors = "";
                                for(var i=0; i<res.length; i++){

                                    errors += "<div class='alert alert-warning' role='alert'>"+ res[i] +" </div>";
                                }
                                
                                document.getElementById('pet-error').innerHTML = errors;
                            }else if(typeof res === 'number'){
                                var resid = toString(res);
                                alert('Pet added');
                                $('#petModal').modal('hide');
                                
                                let client = document.getElementById('client-stay');
                                viewClient(client);
                            }
                        });
                    });

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
                            
                            //SHOW PET HEALTH RECORD
                            $(".date").on('click', function(){
                                var record = this.id;
                                $("."+record+"").slideToggle("slow");
                                // $('#main').animate({
                                //     scrollTop: 450
                                // },1000);
                                var pos = $("."+record+"").offset().top - 160;
                                $('#main').animate({
                                    scrollTop: pos
                                },600);
                            });
                            //EDIT LAB RECORD
                            $(".edit-lab").on('click', function(){
                                var id = this.value;

                                $.get("/getLab/"+id+"", function(res){
                                
                                    var action = "/updateLab/"+id+"";
                                    var modalBody = "";
                                        modalBody += "<form id='lab-form' action='"+action+"' method='POST'>";
                                        modalBody += "<label for='heartworm'>Heartworm: </label>";
                                        modalBody += "<input type='text' name='heartworm' class='form-control lab-input' value='"+res[0].heartworm+"'>";
                                        modalBody += "<label for='skinscrape'>Skin scrape: </label>";
                                        modalBody += "<input type='text' name='skin_scrape' class='form-control lab-input' value='"+res[0].skin_scrape+"'>";
                                        modalBody += "<label for='earmites'>Ear mites/Ear cytology: </label>";
                                        modalBody += "<input type='text' name='ear_mites' class='form-control lab-input' value='"+res[0].ear_mites+"'><br>";
                                        modalBody += "<label for='cdv'>CDV: </label>";
                                        modalBody += "<input type='text' name='cdv' class='form-control lab-input' value='"+res[0].cdv+"'>";
                                        modalBody += "<label for='cpv'>CPV: </label>";
                                        modalBody += "<input type='text' name='cpv' class='form-control lab-input' value='"+res[0].cpv+"'>";
                                        modalBody += "<label for='fiv'>FIV/FeLV test: </label>";
                                        modalBody += "<input type='text' name='fiv' class='form-control lab-input' value='"+res[0].fiv+"'><br>";
                                        modalBody += "<label for='urinalysis' class='lab-textarea'>Urinalysis: </label>";
                                        modalBody += "<label for='fecalysis' class='lab-textarea'>Fecalysis: </label>";
                                        modalBody += "<label for='vaginalsmear' class='lab-textarea'>Vaginal smear: </label><br>";
                                        modalBody += "<textarea name='urinalysis' class='form-control'></textarea>";
                                        modalBody += "<textarea name='fecalysis' class='form-control'></textarea>";
                                        modalBody += "<textarea name='vaginal_smear' class='form-control'></textarea><br>";
                                        modalBody += "<label for='xray' class='lab-textarea'>Xray: </label><br>";
                                        modalBody += "<textarea name='xray' id='xray' class='form-control'></textarea><br><br>";
                                        modalBody += "<label for='differential'>Differential diagnosis: </label>";
                                        modalBody += "<input type='text' name='differential' id='differential' class='form-control lab-input' value='"+res[0].differential+"'><br>";
                                        modalBody += "<label for='definitive' id='def-lab' class='lab-textarea'>Definitive diagnosis: </label>";
                                        modalBody += "<textarea name='definitive' id='definitive' class='form-control'></textarea><br><br>";
                                        modalBody += "<label for='treatment' id='treatment-label' class='lab-textarea'>Treatment and Prescribed Medicine: </label><br>";
                                        modalBody += "<textarea name='treatment' id='treatment' class='form-control'></textarea><br>";
                                        modalBody += "<label for='comments'>Comments/Remarks: </label>";
                                        modalBody += "<input type='text' name='comments' id='comments' class='form-control lab-input' value='"+res[0].comments+"'><br>";
                                        modalBody += "<label for='next_app'>Next appointment: </label>";
                                        modalBody += "<input type='date' name='next_app' id='date' class='form-control lab-input'>";
                                        modalBody += "</form>";
                                        $(".lab-modal-body").children().prevObject[0].innerHTML = modalBody;
                                });
                            });

                            //SAVE LAB RECORD
                            $("#save-lab").on('click', function(){
                                $.post($('#lab-form').attr('action'), $('#lab-form').serialize());
                                alert('laboratory Updated');
                                $('#labModal').modal('hide');
                                let pet = document.getElementById('pet-stay');
                                viewPet(pet);
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

        });
    }

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

    $(document).on('click','#client', function(e){
        e.preventDefault();
        
        getclient(this);

    });
});