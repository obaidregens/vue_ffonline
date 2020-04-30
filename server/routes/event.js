var mysql = require('./mysqldb');

module.exports = {
    events: [
        {
            id: 1,
            title: "Beach Cleanup",
            date: "Aug 28 2020",
            time: "10:00",
            location: "Daytona Beach",
            organizer: "Adam Jahr",
            category: "sustainability",
            attendees: [
                {
                    id: 1,
                    name: "Adam Jahr"
                },
                {
                    id: 2,
                    name: "Gregg Pollock"
                },
                {
                    id: 3,
                    name: "Beth Swanson"
                }
            ]
        },
        {
            id: 2,
            title: "Park Cleanup",
            date: "Jan 29 2021",
            time: "14:00",
            location: "Green Park",
            organizer: "Beth Swanson",
            category: "sustainability",
            attendees: [
                {
                    id: 3,
                    name: "Adam Jahr"
                },
                {
                    id: 2,
                    name: "Gregg Pollock"
                },
                {
                    id: 1,
                    name: "Beth Swanson"
                }
            ]
        }
    ],
    getEventById: function(ID,res){
        //Promises example taken from
        //https://stackoverflow.com/questions/28432401/replacing-callbacks-with-promises-in-node-js
        var db = mysql.load_db();
        function getEvents () {
            return new Promise((resolve, reject) => {
                var event_query = "SELECT * " +
                    "FROM events " +
                    "WHERE ID = " + ID + " " +
                    "ORDER BY ID ASC ";
                db.query(event_query,function(err, events) {
                    if (err){
                        return reject(err);
                    }
                    return resolve(events);
                });
            });
        }
        function getAttendees (event) {
            return new Promise((resolve, reject) => {
                var attendee_query = "SELECT attendees.ID, attendees.Name dww" +
                    "FROM event_attendees " +
                    "JOIN attendees " +
                    "ON attendees.ID = event_attendees.attendee_id " +
                    "WHERE event_attendees.event_id = " + ID + " " +
                    "ORDER BY attendees.ID ASC ";
                db.query(attendee_query,function(err, attendees) {
                    if (err){
                        return reject(err);
                    }

                    event[0].attendees = attendees;
                    return resolve(event[0]);
                });
            })
        }
        // Usage:
        getEvents()  // Returns a Promise!
            .then(getAttendees)
            .then(function(event_attendees){
                res.status(200).send({
                    success: 'true',
                    event: event_attendees,
                });
                res.end();
            })
            .catch(err => {
                throw err;
            })
    },
    getEvents: function(){

    }
}