/* view_available_bookings.js */
const log = console.log;

// requestList.addEventListener("click", removeRequest);
document.addEventListener("DOMContentLoaded", getAllBookings);

function addToBookings(booking) {
    const newBooking = document.createElement("div");
    newBooking.className = "booking";
    const bookingText = document.createElement("p");
    const bookingTitle = document.createElement("strong");
    bookingTitle.innerText = booking.venuename;
    bookingText.appendChild(bookingTitle);
    const lineBreak1 = document.createElement("br");
    bookingText.appendChild(lineBreak1);
    const bookingLoc = document.createTextNode(booking.location);
    bookingText.appendChild(bookingLoc);
    const lineBreak2 = document.createElement("br");
    bookingText.appendChild(lineBreak2);
    const bookingPhone = document.createTextNode(booking.phone);
    bookingText.appendChild(bookingPhone);
    const lineBreak3 = document.createElement("br");
    bookingText.appendChild(lineBreak3);
    const bookingDate = document.createTextNode(booking.bookingDate);
    bookingText.appendChild(bookingDate);
    const lineBreak4 = document.createElement("br");
    bookingText.appendChild(lineBreak4);
    const lineBreak5 = document.createElement("br");
    bookingText.appendChild(lineBreak5);
    const bookingDesc = document.createTextNode(booking.description);
    bookingText.appendChild(bookingDesc);
    newBooking.appendChild(bookingText);
    const fulfillButton = document.createElement("button");
    fulfillButton.className = "fulfill";
    const buttonText = document.createTextNode("I'm down!");
    fulfillButton.appendChild(buttonText);
    fulfillButton.addEventListener("click", fulfillRequest);
    newBooking.appendChild(fulfillButton);
    requestList.appendChild(newBooking);
}

function fulfillRequest(e) {
    log("button clicked");
    applyToBookingsVenue(e);
    removeRequest(e);
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
                return res.json();
            } else {
                alert('Could not get bookings');
            }
        })
        .then((json) => { // the resolved promise with the JSON body
            bookingsList = document.querySelector('#allBookingsList');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToBookings(b);
            });
        }).catch((error) => {
            log(error);
        });
}

function applyToBookingsVenue(e) {
    const venuename = e.target.parentElement.childNodes[0].childNodes[0].innerText;
    log("parent elemnt is: " + e.target.parentElement);
    log("parent elemnt.childNodes[0] is: " + e.target.parentElement.childNodes[0].childNodes[0].innerText);

    // the URL for the request
    const url = '/bookings/applyByVenue/' + venuename;
    let data = {};

    const request = new Request(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });

    log("about to fetch");
    fetch(url, request)
        .then((res) => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                log("result is 200");
                log(res.body);
                log(res);
            } else {
                alert('Could not apply to booking');
            }
        }).catch((error) => {
            log(error);
        });
}