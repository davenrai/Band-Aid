# CSC309 Project

Our app is Band-Aid. It matches musical performers (Performer) with the venues (Venue) looking to hire them for a show (Booking)

Once the instructions below are carried out to install the app, you can use it by typing <http://localhost:5000> in Chrome, or by visiting the delpoyed app at <https://frozen-citadel-71740.herokuapp.com/index.html.> You will be at the main page for our application, "Band-Aid." Initially you must signup as either a Performer or a Venue or you can sign in as a Performer (username: "user1" password: "123456") or as a Venue (username: "venue1" password: "123456"). Passwords must be 6 characters in length.  Upon subsequent log-ins, this immediately takes you to your Venue or Performer dashboard. There is also an admin login (username: "admin1" password: "admin1").

Important note (For TA):

1) We used another github repo temporarily for part of the project. Let us know if you would like to see that as well.

2) There is a React folder which is unused but demonstrates some React code that we learnt.

## Initial Deployed app

<https://frozen-citadel-71740.herokuapp.com/index.html>

## My revised deployed app

## Setup instructions (for running locally on <http://localhost:5000)>

Install mongodb

<https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials>

### Install all modules (run this command in the project root directory)

$ npm install

### Create a mongo data directory in the project root directory

$ mkdir mongo-data

### Connect to mongo

$ mongod --dbpath ./mongo-data

### Start web server (run this command in the project root directory)

$ node server.js

### Runs the app in the development mode

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## Usage

Once you log in as a Performer (sample username: "user1" password: "123456")
or create a new Performer, you will be directed to a dashboard page. From there
you can see avaible Bookings and apply to them.

Then you can log in as a Venue (sample username: "venue1" password: "123456") 
and likewise you will be taken to a dashboard. You can creata new Booking here 
for your Venue. As well,  you can see which Performers have applied to which
Bookings,  and choose those that you wish for your Venue Booking.

Logging in once again as a Performer, your dashboard will have a button to
take you to Bookings that you have been selected for by Venues.

There is also administrator functionality (sample username: "admin1"
password: "admin1"). Dashboard functions as described.

Performers and Venues can also edit thei profiles from their respective
dashboards.

Index Photo credit:
Photo by Vishnu R Nair on Unsplash
