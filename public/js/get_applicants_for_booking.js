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
                for (let i = 0; i < b.applications.length; i++) {
                    li = document.createElement('li')
                    li.innerHTML = `Venue Name: <strong>${b.venuename}</strong>, Applicants: <strong>${b.applications[i]}</strong>`
                    performersList.appendChild(li)
                    log(b)
                }
            })
        }).catch((error) => {
            log(error)
        })
    }

    function chooseApplicant(e) {
        log("button clicked")
        addBookingtoPerformer(e)
        // removeRequest(e)
        return e;
        
    }


    function addBookingtoPerformer(e) {
    
        const venuename = e.target.parentElement.childNodes[0].childNodes[0].innerText
        log("parent elemnt is: " + e.target.parentElement)
        log("parent elemnt.childNodes[0] is: " + e.target.parentElement.childNodes[0].childNodes[0].innerText)
        
        // the URL for the request
        const url = '/bookings/applyByVenue/' + venuename;
        let data = {}
    
        const request = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
    
        log("about to fetch")
        fetch(url, request)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                log("result is 200")
                log(res.body)
                log(res)
           } else {
                alert('Could not apply to booking');
           }                
        }).catch((error) => {
            log(error);
        });
    }
