/* server.js, with mongodb API and static directories */
'use strict';
const log = console.log;
const path = require('path');
const express = require('express');
// starting the express server
const app = express();

// mongoose and mongo connection
const {	mongoose } = require('./db/mongoose');
mongoose.set('useFindAndModify', false); // for some deprecation issues

// import the mongoose models
const {	Performer } = require('./models/performer');
const {	Venue } = require('./models/venue');
const { User } = require('./models/user');
const {	Booking } = require('./models/booking');

// to validate object IDs
const {	ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require('express-session');
app.use(bodyParser.urlencoded({	extended: true }));


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
			if (req.session.usertype === 'admin') {
				res.redirect('/admin'); // takes you to admin dash
			} else if (req.session.usertype === 'performer') {
				res.redirect('/dashboard-performer'); // takes you to dashboard timeline after login
			} else if (req.session.usertype === 'venue') {
				res.redirect('/dashboard'); // takes you to dashboard timeline after login
			} else {
				res.redirect('/dashboard'); // takes you to dashboard timeline after login
			}
		}
	)
	.catch(error => {
		// res.status(400).send()
		res.status(400).redirect('/login');
	});
});


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
// Note both performers and venues are users.
app.post('/users', sessionChecker, (req, res) => {
	log("req is: " + req);
	log(req.body.username);
	// Create a new user
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		usertype: req.body.usertype,
		name: req.body.name,
		phone: req.body.phone,
		location: req.body.location,
		genre: req.body.genre,
		description: req.body.description
	});
	// Save the user to mongo
	user.save().then((user) => {
			req.session.user = user._id;
			req.session.username = user.username;
			req.session.usertype = user.usertype;
			if (req.session.usertype === 'performer') {
				res.redirect(`/makeprofileperformer/${user.username}`);
			} else if (req.session.usertype === 'venue') {
				res.redirect(`/makeprofilevenue/${user.username}`);
			} else if (req.session.usertype === 'admin') {
				res.redirect('/admin');
			} else {
				res.redirect('/login');
			}
			// res.sendFile(__dirname + '/public/dashboard.html');
		},
		(error) => {
			res.status(400).send(error); // 400 for bad request
		}
	);
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


// a GET route to get all users
app.get('/users', (req, res) => {
	User.find().then((users) => {
		res.send({ users }); // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error); // server error
	});
});



// a GET route to get a specific user
app.get('/users/:username', (req, res) => {
	// const username = req.body.username;
	const username = req.params.username;
	// Find user
	// to get by _id uncomment one of the below lines
	// User.findOne({ '_id': username}).then(user => {
	// User.findById(username).then(user => {
	// to get by username
	User.findOne({ 'username': username}).then(user => {	
		if (!user) {
			res.status(404).send();  // could not find this user
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({ user })   
			res.send(user);
		}
	}).catch((error) => {
		res.status(500).send();  // server error
	});
});


// Update user in db with performer information from make profile
// app.patch('/makeprofileperformer/', sessionChecker, (req, res) => {
app.patch('/makeprofileperformer', (req, res) => {	
	const username = req.body.username;
	log("in makeprofile username is: " + username);
	log("in makepprofile req is: " + req.body.username);
	
	// Find user
	User.findOne({username}).then(user => {
		if (!user) {
			log("!user");
			res.status(404).send(); // Cannot find resource
		} else {
			user.name = req.body.name;
			user.location = req.body.location;
			user.phone = req.body.phone;
			user.genre = req.body.genre;
			user.description = req.body.description;
			// Save the user to mongo
			user.save().then(user => {
				res.send(user);
			}, error => {
				res.status(400).send(error); // Bad request
			});
		}
	}).catch(error => {
		res.status(400).send(error); // Bad request for updating user
	});
});


// Update user in db with venue information from make profile
app.post('/makeprofilevenue/:username', (req, res) => {
	// Find user
	const username = req.params.username;
	User.findOne({
		username: username
	}).then(user => {
		if (!user) {
			res.status(404).send(); // Cannot find resource
		} else {
			user.name = req.body.name;
			user.location = req.body.location;
			user.phone = req.body.phone;
			user.description = req.body.description;
			// Save the user to mongo
			user.save().then(user => {
				res.send(user);
			}, error => {
				res.status(400).send(error); // Bad request
			});
		}
	}).catch(error => {
		res.status(400).send(error); // Bad request for updating user
	});
});


app.post('/venue', (req, res) => {
	log(req.body);
	// Create a new venue
	const venue = new Venue({
		username: req.body.username,
		password: req.body.password
	});
	// Save the venue
	venue.save().then((venue) => {
		res.send(venue);
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




// Set up a POST route to *create* a booking for a venue.
app.post('/bookings', (req, res) => {
	log(req.body);
	// Create a new request
	const booking = new Booking({
		venuename: req.body.venuename,
		location: req.body.location,
		phone: req.body.phone,
		description: req.body.description,
		applications: req.body.applications
	});
	// res.send(booking);
	// res.redirect('/dashboard');

	// Save the request
	booking.save().then(booking => {
		// res.send(booking);
		if (req.session.usertype === 'admin') {
			res.redirect('/admin'); // takes you to admin dash
		} else {
			res.redirect('/dashboard'); // takes you to dashboard timeline after login
		}
		}, (error) => {
			res.status(400).send(error); // 400 for bad booking
		});
});


// a GET route to get all bookings for all venues
app.get('/bookings', (req, res) => {
	Booking.find().then((bookings) => {
		res.send({ bookings }); // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error); // server error
	});
});


app.post('/bookings/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// Otherwise, findById
	Booking.findById(id).then((booking) => {
		if (!booking) {
			res.status(404).send()  // could not find this restaurant
		} else {
			const application = {
				performer: "test push"
			};

			booking.applications.push(application);

			booking.save().then((result) => {
				// pass the reservation that was just pushed
				// note that mongoose provided an _id when it was pushed
				log(result)
				if (req.session.usertype === 'admin') {
					res.redirect('/admin'); // takes you to admin dash
				} else {
					res.redirect('/dashboard'); // takes you to dashboard timeline after login
				}

			}).catch((error) => {
				res.status(500).send()  // server error
			})

		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

})










// a GET route to get all venues
app.get('/venues', (req, res) => {
	Venue.find().then((venues) => {
		res.send({
			venues
		}); // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error); // server error
	});
});


// Set up a POST route to *create* a booking for a venue.
app.post('/venues/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id;
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send(); // if invalid id, definitely can't find resource, 404.
		return; // so that we don't run the rest of the handler.
	}
	// Otherwise, findById
	Venue.findById(id).then((venue) => {
		if (!venue) {
			res.status(404).send(); // could not find this venue
		} else {
			const booking = {
				place: req.body.place,
				date: req.body.date
			};
			venue.bookings.push(booking);
			venue.save().then((result) => {
				res.send({
					venue,
					booking
				});
			}).catch((error) => {
				res.status(500).send(); // server error
			});
		}
	}).catch((error) => {
		res.status(500).send(); // server error
	});
});


// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that users have a proper experience on the front-end.

// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
	res.redirect('/index');
});


// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
	if (req.session.usertype === 'performer') {
		res.sendFile(__dirname + '/public/dashboard-performer.html'); // takes you to dashboard-performer after login
	} else if (req.session.usertype) {
		res.sendFile(__dirname + '/public/dashboard.html'); // takes you to dashboard after login
	} else {
		res.redirect('/login');
	}
});

app.get('/dashboard-performer', (req, res) => {
	if (req.session.usertype === 'performer') {
		res.sendFile(__dirname + '/public/dashboard-performer.html'); // takes you to dashboard-performer after login
	} else if (req.session.usertype) {
		res.sendFile(__dirname + '/public/dashboard.html'); // takes you to dashboard after login
	} else {
		res.redirect('/login');
	}
});


app.get('/makeprofileperformer/*', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/makeprofileperformer.html');
	} else {
		res.redirect('/login');
	}
});


app.get('/makeprofilevenue/*', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/makeprofilevenue.html');
	} else {
		res.redirect('/login');
	}
});


app.get('/admin', (req, res) => {
	if (req.session.user) {
		res.sendFile(__dirname + '/public/admin.html');
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