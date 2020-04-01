/* AJAX fetch() calls */

// const {	User } = require('../../models/user'); // doesnt work on server side
const log = console.log

log('Loaded front-end javascript.')

// A function to send a GET aaplicants for have applied for a booking.
    function getApplicants() {
        // the URL for the request
        const url = '/bookings';
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               return res.json() 
           } else {
                alert('Could not get users')
           }                
        })
        .then((json) => {  // the resolved promise with the JSON body
            performersList = document.querySelector('#performersList')
            performersList.innerHTML = '';
            log(json)
            json.bookings.map((b) => {
                li = document.createElement('li')
                for (let i = 0; i < b.applications.length; i++) {
                    li.innerHTML = `Venue Name: <strong>${b.venuename}</strong>, Applicants: <strong>${b.applications[i]}</strong>`
                    performersList.appendChild(li)
                    log(b)
                }
            })
        }).catch((error) => {
            log(error)
        })
    }
