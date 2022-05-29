# JustNode.js

===================================   
Chapter 10 - Using a Database    
===================================   
In this chapter I have used postgresql which I Installed with a docker container brought up with docker compose.

There is a documentation at https://node-postgres.com/features/connecting,  
on how to create a client, connection pool and how to query the data base.

1. Installed a postgres sql connector for node:  

    $ npm install --save pg

    Now, if you decide to use a different DB , please install the corresponding connector.

2. Created a buildDB.sql (see util/sqlScripts) to build the initial database tables if do not exist already, and seed some data.

3. Connecting to DB (util/database.ts: 10.1): As described in the documentation I specified, there are several ways to connect to db:
    via a single client which connect to db with every query, or via a connection pool which holds a pool of connections 
    and which can be used to retrieve connection to use for a query.  Using a pool is more efficient way.
    Also, as described in the documentation, connection information can be specified with:  
    
    A. environment variables, for example:
       
        export PGHOST='localhost'  
        expport PGUSER='myusername'  
        export PGDATABASE=postgres  
        export PGPASSWORD=mypassword  
        export PGPORT=5432  
        
    B. Specifying connection information in the code as configuration.  
    
    C. Specifying a connection string in the code.
    
    Note: B and C may expose sensitive information in the code.  

4. Domain object (models/post.ts: 10.2): Shows how to create a domain object with CRUD operations for the  Post table. 
 
5. Querying data - the controller methods (feedController.ts) were modified to use the CRUD methods from the domain object
        to query data from the Post table, and return data in json format to the client, as a response of the http request.  

6. Added postman test collection use the test directory to test the GET and POST end points.
    A curl version of these http calls is in the same directory.           
    

