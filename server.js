/* server.js, with mongodb API and static directories */
'use strict';
const log = console.log;
const path = require('path');

const express = require('express');
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose');

// import the mongoose models
const { Performer } = require('./models/performer');
const { Venue } = require('./models/venue');
const { User } = require('./models/user');
const { Request } = require('./models/request');

// to validate object IDs
const { ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require('express-session');
app.use(bodyParser.urlencoded({
	extended: true
}));


/*** Session handling **************************************/
// Create a session cookie
app.use(session({
	secret: 'oursecret',
	resave: false,
	saveUninitialized: false,
	cookie: {
		expires: 60000,
		httpOnly: true
	}
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
	if (req.session.user) {
		res.redirect('/dashboard'); // redirect to dashboard if logged in.
	} else {
		next(); // next() moves on to the route.
	}
};


// Middleware for authentication of resources
const authenticate = (req, res, next) => {
	if (req.session.user) {
		User.findById(req.session.user).then((user) => {
			if (!user) {
				return Promise.reject();
			} else {
				req.user = user;
				next();
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized");
		});
	} else {
		res.status(401).send("Unauthorized");
	}
};


/*** Webpage routes below **********************************/

// static js directory
app.use("/js", express.static(path.join(__dirname, '/public/js')));

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/public/index.html'));
});

// // static js directory
// app.use("/js", express.static(__dirname + '/public/js'))

// static img directory
app.use("/img", express.static(__dirname + '/public/img'));


/** User routes below **/
// Set up a POST route to *create* a user of your web app.
// Note both performers and venues are performers.
app.post('/users', (req, res) => {
	log(req.body);

	// Create a new user
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		usertype: req.body.usertype
	});

	// Save the user
	user.save().then((user) => {
		// res.send(user);
		res.redirect('/dashboard');
		// res.sendFile(__dirname + '/public/dashboard.html');
	}, (error) => {
		res.status(400).send(error); // 400 for bad request
	});
});

app.post('/venue', (req, res) => {
	log(req.body);

	// Create a new user
	const venue = new Venue({
		username: req.body.username,
		password: req.body.password
	});

	// Save the user
	user.save().then((user) => {
		res.send(user);
	}, (error) => {
		res.status(400).send(error); // 400 for bad request
	});
});

// Set up a POST route to *create* a venue.
app.post('/venues', (req, res) => {
	log(req.body);

	// Create a new venue
	const venue = new Venue({
		name: req.body.name,
		location: req.body.location,
		phone: req.body.phone,
		description: req.body.description,
		bookings: req.body.bookings

	});

	// Save the venue
	venue.save().then((venue) => {
		res.send(venue);
	}, (error) => {
		res.status(400).send(error); // 400 for bad request
	});
});


// a GET route to get all venues
app.get('/venues', (req, res) => {
	Venue.find().then((venues) => {
		res.send({ venues }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
})


// Set up a POST route to *create* a booking for a venue.
app.post('/venues/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	Venue.findById(id).then((venue) => {
		if (!venue) {
			res.status(404).send()  // could not find this venue
		} else {
			const booking = {
				place: req.body.place,
				date: req.body.date
			};
			venue.bookings.push(booking);


			venue.save().then((result) => {
				res.send({venue, booking}) 
			}).catch((error) => {
				res.status(500).send()  // server error
			})

		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})



// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that users have a proper experience on the front-end.


// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
	res.redirect('/index');
});


// A route to login and create a session
app.post("/users/login", sessionChecker, (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    log(username, password);
    // Use the static method on the User model to find a user
    // by their username and password
    User.findByUsernamePassword(username, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
			req.session.username = user.username;
			req.session.usertype = user.usertype;
			// res.send({ currentUser: user.email });
			res.redirect('/dashboard');
		})
		.catch(error => {
			// res.status(400).send()
			res.status(400).redirect('/login');
		});
});


// new band request for venue
app.post('/requests', (req, res) => {
	log(req.body);
	// Create a new request
	const request = new Request({
		venuename: req.body.venuename,
		location: req.body.location,
		phone: req.body.phone,
		description: req.body.description
	});
	res.send(request);
	res.redirect('/dashboard');
	// Save the request
	// request.save().then((request) => {
	// 	// res.send(request);
	// 	res.redirect('/dashboard');
	// }, (error) => {
	// 	res.status(400).send(error); // 400 for bad request
	// });
});


// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/dashboard.html');
	} else {
		res.redirect('/login');
	}
});

// ****** OR this one ??????????????????????????

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
	if (req.session.user) {
		res.send({
			currentUser: req.session.username
		});
	} else {
		res.status(401).send();
	}
});


// A route to logout a user
app.get('/users/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error);
		} else {
			res.redirect('/index.html');
		}
	});
});

//---------------------------------------------------------------------------

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/public"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
	res.sendFile(__dirname + "/public/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 5000;
app.listen(port, () => {
	log(`Listening on port ${port}...`);
});