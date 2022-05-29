// 10.2.1: import the database object exported from util/database.ts to be able to access the db
const db = require ('../util/database');

// 10.2.2: similar to other languages (like Java and Hibernate), for every table in the database
//             we will create a domain object, which will provide us with methods to read, write,
//             update and delete records from that table.

module.exports = class Post {
    constructor(private id, private title, private content, private imageUrl, private creator, private createdAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.imageUrl = imageUrl;
        this.creator = creator;
        this.createdAt = createdAt;
    }

// 10.2.3: The following shows 2 ways for querying data from db, using the database object from util/database.ts:

// 10.2.4: option 1: run a query using the query method and send a call back method to capture
//         the results and errors.
// db.query('SELECT NOW()', (err, res) => {
//     console.log(err, res);
// });

// 10.2.5: option 2: since the database query method returns a promise (async execution), we can
//         chain the promise to a then operator to capture results and to the catch operator to capture errors.
// db.query("select * from post")
//     .then (res => console.log(res))
//     .catch(err => console.log(err));

// 10.2.6 This is a model (domain) static method to fetch all entries from the post table.
//      The method returns a promise which calling code can use ".then" and ".err" methods to fetch results and errors.
    static fetchAll() {
        return db.query('SELECT * FROM post');
    }

// 10.2.7 For insert to the database, we will use a non static method, which means that the calling code will
//        instantiate an object from this Post class, populate the instance variables and call save.
//        Therefore, we will here write an insert sql statement with values from the instance
//       variables. We will use a format with placeholders "(?,?,?,?)" to protect ourselves from sql injection attacks.
    save() {

        const sqlquesry= "INSERT INTO post (title,content,imageurl,creator) VALUES("+
            "'"+this.title+"'"
           +",'"+this.content+"'"
            +",'"+this.imageUrl+"'"
            +",'"+this.creator+"')";

        return db.query(sqlquesry);

        // Need to check why this does not work -
        // return db.query("INSERT INTO post (title,content,imageurl,creator) VALUES(?,?,?,?)",
        //                 [this.title, this.content, this.imageUrl, this.creator]);
    }

// 10.2.8 - The get by ID is similar to fetchAll but we we just match the id sent as parameters in the where clause
//             to fetch a single record (or no record).
    static findById(id) {
        return (db.query("SELECT * FROM post where id= ?" ,[id] ));
    }

// 10.2.9 - The delete by ID is similar to findById but for delete
    static deleteById(id) {
        return (db.query("DELETE FROM post where id= ?" ,[id] ));
    }
};
