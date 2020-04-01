/* view_available_bookings.js */
const log = console.log;

// requestList.addEventListener("click", removeRequest);
document.addEventListener("DOMContentLoaded", getAllBookings);

function addToRequestTimeline(request) {
    // TODO: clean up
    const newRequest = document.createElement("div");
    newRequest.className = "request";
    const reqText = document.createElement("p");
    const reqTitle = document.createElement("strong");
    reqTitle.innerText = request.venuename;
    reqText.appendChild(reqTitle);
    const lineBreak1 = document.createElement("br");
    reqText.appendChild(lineBreak1);
    const reqLoc = document.createTextNode(request.location);
    reqText.appendChild(reqLoc);
    const lineBreak2 = document.createElement("br");
    reqText.appendChild(lineBreak2);
    const reqPhone = document.createTextNode(request.phone);
    reqText.appendChild(reqPhone);
    const lineBreak3 = document.createElement("br");
    reqText.appendChild(lineBreak3);
    const lineBreak4 = document.createElement("br");
    reqText.appendChild(lineBreak4);
    const reqDesc = document.createTextNode(request.description);
    reqText.appendChild(reqDesc);
    newRequest.appendChild(reqText);
    const fulfillButton = document.createElement("button");
    fulfillButton.className = "fulfill";
    const buttonText = document.createTextNode("I'm down!");
    fulfillButton.appendChild(buttonText);
    fulfillButton.addEventListener("click", fulfillRequest);
    newRequest.appendChild(fulfillButton);
    requestList.appendChild(newRequest);
}

function fulfillRequest(e) {
    log("button clicked")
    applyToBookingsVenue(e)
    removeRequest(e)
    return e;
    
}

function removeRequest(e) {
    e.preventDefault();
    if (e.target.classList.contains("fulfill")) {
        console.log("remove");
        const requestToRemove = e.target.parentElement;
        console.log(requestToRemove);
        requestList.removeChild(requestToRemove);
    }
}



/* AJAX fetch() calls */

// A function to send a GET request to the web server,
//  and then loop through them and add a list element for each booking.
function getAllBookings() {
        // the URL for the request
        const url = '/bookings';
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               return res.json() 
           } else {
                alert('Could not get bookings')
           }                
        })
        .then((json) => {  // the resolved promise with the JSON body
            bookingsList = document.querySelector('#allBookingsList')
            bookingsList.innerHTML = '';
            log(json)
            json.bookings.map((b) => {
                addToRequestTimeline(b)
            })
        }).catch((error) => {
            log(error)
        })
}

// A function to send a PATCH request to the web server,
//  to apply for a booking.
function applyToBookings(e) {
    // the URL for the request
    const url = '/bookings/apply/5e8176dba5e3f74cc0a303a4';
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


function applyToBookingsVenue(e) {
    // the URL for the request
    const url = '/bookings/applyByVenue/apple';
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