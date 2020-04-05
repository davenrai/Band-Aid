# Team 08

Our is app is Band-Aid. It matches musical performers (Performer) with the venues (Venue) looking to hire them for a show (Booking)

Once the instructions below are carried out to install the app, you can use it by typing http://localhost:5000 in Chrome, or by visiting the delpoyed app at https://frozen-citadel-71740.herokuapp.com/index.html. You will be at the main page for our application, "Band-Aid." Initially you must signup as either a Performer or a Venue or you can sign in as a Performer (username: "user1" password: "123456") or as a Venue (username: "venue1" password: "123456"). Passwords must be 6 characters in length.  Upon subsequent log-ins, this immediately takes you to your Venue or Performer dashboard. There is also an admin login (username: "admin1" password: "admin1").

Important note (For TA): We used another github repo temporarily for part of the project. Let us know if you would like to see that as well.

# Deployed app

https://frozen-citadel-71740.herokuapp.com/index.html




# Setup instructions (for running locally on http://localhost:5000)

install mongodb

https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials


## Install all modules (run this command in the project root directory)

$ npm install

## Create a mongo data directory in the project root directory

$ mkdir mongo-data

## Connect to mongo
$ mongod --dbpath ./mongo-data

## Start web server (run this command in the project root directory)

$ node server.js


## Runs the app in the development mode.
Open [http://localhost:5000](http://localhost:5000) to view it in the browser.


Index Photo:
Photo by Vishnu R Nair on Unsplash
