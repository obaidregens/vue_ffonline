var mysql = require('mysql');
module.exports.mysql = mysql;

module.exports.options = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_vue'
};
module.exports.load_db = function (){
    //Create Connection
    var db = mysql.createConnection(module.exports.options);

// Connect
    db.connect(function(err){
        if (err){
            throw err;
        }
        console.log('MySQL is now connected.');
    });
    return db;
};
module.exports.update_tables = function(res){
    var db = module.exports.load_db();
    //RUN SQL QUERIES
    var sql = [];
    //Events
    sql.push( "CREATE TABLE IF NOT EXISTS events (" +
        "ID INT NOT NULL AUTO_INCREMENT," +
        "title VARCHAR(100)," +
        "date VARCHAR(50) NOT NULL," +
        "time VARCHAR(50) NULL DEFAULT NULL," +
        "location VARCHAR(100) DEFAULT ''," +
        "description TEXT DEFAULT ''," +
        "organizer INT NOT NULL," +
        "category VARCHAR(50) DEFAULT ''," +
        "PRIMARY KEY(ID)" +
        ");");
    //Attendees details
    sql.push( "CREATE TABLE IF NOT EXISTS attendees (" +
        "ID INT NOT NULL AUTO_INCREMENT," +
        "name VARCHAR(100)," +
        "PRIMARY KEY(ID)" +
        ");");
    //Event attendees
    sql.push( "CREATE TABLE IF NOT EXISTS event_attendees (" +
        "event_id INT NOT NULL," +
        "attendee_id INT NOT NULL," +
        "PRIMARY KEY(event_id, attendee_id)" +
        ");");
    for (let i = 0; i < sql.length; i++) {
        db.query(sql[i],function(err, result){
            if (err){
                throw err;
            }
        });
    }
};
module.exports.sample_data = [{
    table: 'attendees',
    data: {
        name: 'Adam Jahr'
    }
},{
    table: 'attendees',
    data: {
        name: 'James Smith'
    }
},{
    table: 'attendees',
    data: {
        name: 'Michael Smith'
    }
},{
    table: 'events',
    data: {
        title: "Beach Cleanup",
        date: "Aug 28 2018",
        time: "10:00",
        location: "Daytona Beach",
        description: "Let's clean up this beach",
        organizer: 1,
        category: "sustainability"
    }
},{
    table: 'event_attendees',
    data: {
        event_id: 1,
        attendee_id: 1
    },
},{
    table: 'event_attendees',
    data: {
        event_id: 1,
        attendee_id: 2
    },
}];

module.exports.add_data = function(data_arr){
    // data_arr will be an array of objects containing 2 required keys, each representing a record to be inserted
    // 1- table, which will be a string
    // 2- data, an object with keys as fields and values as values of the record.
    var db = module.exports.load_db();
    for (let i = 0; i < data_arr.length; i++) {
        let keys = Object.keys(data_arr[i].data).join(', ');
        let values_arr = Object.values(data_arr[i].data);
        for (let b = 0; b < values_arr.length; b++){
            if (typeof values_arr[b] == 'string'){
                values_arr[b] = values_arr[b].replace(/'/g,"''");
                values_arr[b] = "'" + values_arr[b] + "'";
            }
        }
        let values = values_arr.join(', ');
        let sql = "INSERT INTO " + data_arr[i].table + " (" + keys + ") " +
            "VALUES (" + values + ");";
        db.query(sql,function(err, result){
            if (err){
                throw err;
            }
        });
    }
};