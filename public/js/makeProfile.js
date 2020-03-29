/* AJAX fetch() calls */

// const {	User } = require('../../models/user'); // doesnt work on server side
const log = console.log

log('Loaded front-end javascript.')

// A function to send a POST request with a new student.
function addProfileInfo() {
    // the URL for the request
    // let x = document.cookie; 
    // log(x)
    // const username = document.cookie.username;
    const username = "bob46"

	log("in makeprofile js username is: " + username);
	// log("in makepprofile js req is: " + req)
    // currUser = User.findOne({username})
    // log(currUser)
    // const url = '/users/';

    //had to include http:// or else chrome complains
    const url = 'http://localhost:5000/makeprofileperformer/';

    // The data we are going to send in our request
    let data = {
        username: "bob44",
        name: "new proper bob8833",
        // name: document.querySelector('#name').value,
        // location: document.querySelector('#location').value
    }
    // Create our request constructor with all the parameters we need
    // const request = new Request('https://example.com', {method: 'POST', body: '{"foo": "bar"}'});
    const request = new Request(url, {
        method: 'patch', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    // Send the request with fetch()
    fetch(request)
    .then(function(res) {

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('Added info to your profile')
           
        } else {
            // If server couldn't add the student, tell the user.
     
        }
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
}


function fetchTest() {
    log("in fetchTest ")
    fetch('http://localhost:5000/users/bob44')

    .then(function(res) {

        // Handle response we get from the API.
        // Usually check the error codes to see what happened.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('fetch test works')
           
        } else {
            // If server couldn't add the student, tell the user.
     
        }
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
    }