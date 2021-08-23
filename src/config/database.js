/** MYSQL Connection **/
const Mysql = require('mysql');
class Database{
    constructor(){
        this.connection = Mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'neervet',
            port: 3306
        });
        return this.connection;
    }
    
}
module.exports = new Database;
