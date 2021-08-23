class main{
    hasnumber(name){
        return /\d/.test(name);
    }
    email(data){
        const useremail =  /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
        return useremail.test(data);
    }
    length(data, length){
        if(data.length >= length){
            return true;
        }else{
            return false;
        }
    }
    match(password, confirm){
        if(password == confirm){
            return true;
        }else{
            return false;
        }
    }
    empty(data){
        if(data === ''){
            return true;
        }else{
            return false;
        }
    }
}


module.exports = main;