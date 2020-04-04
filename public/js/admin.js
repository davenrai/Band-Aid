/* AJAX calls */
const log = console.log;
log("loaded admin.js");

// function updatePassword() {
//     // the URL for the request
//     const url = '/admin';
//     let data = {
//         username: document.querySelector('#username').value,
//         password: document.querySelector('#password').value,
//     };
//     const request = new Request(url, {
//         method: 'PATCH', 
//         body: JSON.stringify(data),
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//     });
//     fetch(request)
//     .then(function(res) {
//         // Handle response we get from the API.
//         if (res.status === 200) {
//             // If password was changed successfully, tell the admin.
//             log('UPDATED');
//         } else {
//             // If password couldn't be changed, tell the admin.
//             log('didnt work');
//         }
//     }).catch((error) => {
//         log(error);
//     });
//}


function deleteUser() {
    // the URL for the request
    const url = '/users';
    let data = {
        username: document.querySelector('#username').value
    };
    const request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            const message = document.querySelector('#messageDeleteUser');
            // Handle response we get from the API.
            if (res.status === 200) {
                // If user was deleted successfully, tell the admin.
                log('user deleted');
                message.innerText = `Success: Delete user ${data.username}.`;
                message.setAttribute("style", "color: white");
            } else {
                // If server couldn't delete the user, tell the admin.
                log('user delete error');
                message.innerText = `Error: Unable to delete user ${data.username}.`;
                message.setAttribute("style", "color: white");
            }
        }).catch((error) => {
            log(error);
        });
}


function deleteBooking() {
    // the URL for the request
    const url = '/bookings';
    let data = {
        venuename: document.querySelector('#venuename').value
    };
    const request = new Request(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            const message = document.querySelector('#messageDeleteBooking');
            // Handle response we get from the API.
            if (res.status === 200) {
                // If booking was deleted successfully, tell the admin.
                log('booking deleted');
                message.innerText = `Success: Deleted booking for ${data.venuename}.`;
                message.setAttribute("style", "color: white");
            } else {
                // If server couldn't delete the booking, tell the admin.
                log('booking delete error');
                message.innerText = `Error: Unable to delete booking for ${data.venuename}.`;
                message.setAttribute("style", "color: white");
            }
        }).catch((error) => {
            log(error);
        });
}


function updateBooking() {
    // the URL for the request
    const url = '/bookings';
    let data = {
        venuename: document.querySelector('#bookingId').value,
        bookingDate: document.querySelector('#bookingDate').value,
        description: document.querySelector('#description').value,
    };
    log('data');
    log(data);
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            const message = document.querySelector('#messageUpdateBooking');
            // Handle response we get from the API.
            if (res.status === 200) {
                // If booking was updated successfully, tell the admin.
                log('updated booking');
                message.innerText = `Success: Updated booking for ${data.venuename}.`;
                message.setAttribute("style", "color: white");
            } else {
                // If booking couldn't be updated, tell the admin.
                log('update booking error');
                message.innerText = `Error: Unable to update booking for ${data.venuename}.`;
                message.setAttribute("style", "color: white");
            }
        }).catch((error) => {
            log(error);
        });
}