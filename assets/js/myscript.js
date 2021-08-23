$(document).ready(function(){

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

    document.getElementById('appointment').addEventListener('click', function(e){
        e.preventDefault();
        
        getAppointment(this);

        
    });

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

            function viewClient(client){
                $.get($(client).attr('href'), function(res){
                    document.getElementById('main').innerHTML = res;
                    document.getElementById('client-back').addEventListener('click', function(e){
                        e.preventDefault();
                        let client = document.getElementById('client');
                        getclient(client);
                    });

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

                    function viewPet(pet){
                        $.get($(pet).attr('href'), function(res){
                            document.getElementById('main').innerHTML = res;
                             
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

                    $('.view-pet').on('click', function(e){
                        e.preventDefault();

                        viewPet(this);

                    });
                });
            }

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

            $(document).on('click', '.viewClient', function(e){
                e.preventDefault();
                viewClient(this);
                
            });

        });
    }

    document.getElementById('client').addEventListener('click', function(e){
        e.preventDefault();
        
        getclient(this);

    });
});