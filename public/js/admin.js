/* AJAX calls */

const log = console.log;

function updatePassword() {
    // the URL for the request
    const url = '/admin';
    let data = {
        username: document.querySelector('#username').value,
        password: document.querySelector('#password').value,
    };
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API.
        if (res.status === 200) {
            // If password was changed successfully, tell the admin.
            console.log('UPDATED');
        } else {
            // If password couldn't be changed, tell the admin.
            console.log('didnt work');
        }
    }).catch((error) => {
        log(error);
    });
}

function updateBooking() {
    // the URL for the request
    const url = '/admin';
    let data = {
        venuename: document.querySelector('#venuename').value,
        bookingDate: document.querySelector('#bookingDate').value,
        description: document.querySelector('#description').value,
    };
    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {
        // Handle response we get from the API.
        if (res.status === 200) {
            // If password was changed successfully, tell the admin.
            console.log('UPDATED');
        } else {
            // If password couldn't be changed, tell the admin.
            console.log('didnt work');
        }
    }).catch((error) => {
        log(error);
    });
}

function deleteUser() {
    // the URL for the request
    const url = '/users';
    let data = {
        username: document.querySelector('#username').value
    }
    const request = new Request(url, {
        method: 'DELETE', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
    .then(function(res) {

        // Handle response we get from the API.
        if (res.status === 200) {
            // If student was added successfully, tell the user.
            console.log('UPDATED')
        } else {
            // If server couldn't add the student, tell the user.
            // Here we are adding a generic message, but you could be more specific in your app.
            console.log('error')
        }
        log(res)  // log the result in the console for development purposes,
                          //  users are not expected to see this.
    }).catch((error) => {
        log(error)
    })
    
}

