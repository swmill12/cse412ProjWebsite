# cse412ProjWebsite

Database is made in config.js. As the user can't edit data, this was the simplist way to store the data for now. There is a database that was used for the presentation contained in database.zip. This should require setting up the database and running the makefile contained in there. That makefile reads data from .txt files and puts it into the database. This database is not required to be set up prior to running the website as the database is also set up inside of JavaScript files. 

## To Run Website
Need to download packages (npm install _____) that are needed. These are located at top of app.js, and include but aren't limited to 'express'.
After these are installed, setup database so there is a database server open on port 8010 (or if other port, update port in both JS files) and update password/login info on both app.js and config.js. From there run app.js and go to localhost:3000 on a browser. This takes you to the home screen. 
