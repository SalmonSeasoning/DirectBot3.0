const mysql = require('mysql');

class Database { 
    constructor(host, user, passwd, dbname)
    {
        this.connection = mysql.createConnection({
            host: host,
            user: user,
            password: passwd
        });
        this.dbname = dbname;
    }
    connect()
    {
        return new Promise((res, rej)=>{
            this.connection.connect((err)=>{
                if(err) rej(err.message);
                res(true);
            });
        });
    }
    get connected()
    {
        return !(this.connection.state === "disconnected");
    }
}
module.exports = {
    Database: Database
};