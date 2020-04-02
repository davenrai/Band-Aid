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

                    const divVenueName = document.createElement("span");
                    //this also works
                    // const divVenueName = document.createElement("div");
                    // how to createTextNode using ${} notation
                    divVenueName.innerHTML = `Venue Name: <strong>${b.venuename}</strong>`;
                    li.appendChild(divVenueName);
                    const divPerformerName = document.createElement("span");
                    divPerformerName.innerHTML = `Venue Name: <strong>${b.applications[i]}</strong>`;
                    li.appendChild(divPerformerName);                  

                    // li.innerHTML = `Venue Name: <strong>${b.venuename}</strong>, Applicants: <strong>${b.applications[i]}</strong>`
                    const chooseApplicantButton = document.createElement("button");
                    chooseApplicantButton.className = "fulfill";
                    const buttonText = document.createTextNode("I choose you!");
                    chooseApplicantButton.appendChild(buttonText);
                    chooseApplicantButton.addEventListener("click", chooseApplicant);
                    li.appendChild(chooseApplicantButton);
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
    
        const venueName = e.target.parentElement.childNodes[0].innerText
        const performerName = e.target.parentElement.childNodes[1].innerText
        log("parent element is: " + e.target.parentElement)
        // log("parent element.childNodes[0] is: " + e.target.parentElement.childNodes[2].innerText)
        log("venueName is: " + venueName)
        log("performerName is: " + performerName)
        
        const testperformerName = "bob555"

        // the URL for the request
        // const url = '/users/choosePerformer/' + performerName;
        // FOR TESTING - have to create list different - 4 spans ???
        const url = '/users/choosePerformer/' + testperformerName;
        
   
        // const data = {
        //     booking: testdata
        // }
        const data = { booking: 'example' };
        log("data object is: " + data)
        log("data.booking field is: " + data.booking)

        const request = new Request(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            // body: {	"booking": "from js fetch" },
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
        });
        
        // log("in get_applicants_for_booking.js request.body.booking is :" + request.body.booking)
        log("about to fetch")
        // fetch(url, request)
        fetch(request)  // USE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                log("result is 200")
                log(res.body)
                log(res)
           } else {
                alert('Could not apply to a (performer) user');
           }                
        }).catch((error) => {
            log(error);
        });
    }
