/* AJAX fetch() calls */

const log = console.log;
log('Loaded front-end javascript.');

// A function to send a GET aaplicants for have applied for a booking.
function getSelectedFor() {
    // the URL for the request
    const url = '/users/user_by_req';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            return res.json();
        } else {
            alert('Could not get users');
        }                
    })
    .then((json) => {  // the resolved promise with the JSON body
        performersList = document.querySelector('#selectedForList');
        performersList.innerHTML = '';
        log(json);
        json.bookings.map((b) => {
            for (let i = 0; i < b.selectedFor.length; i++) {
                li = document.createElement('li');
                const venueTitle = document.createElement("strong");
                venueTitle.innerText = 'Venue Name: ';
                li.appendChild(venueTitle);
                const divVenueName = document.createElement("span");
                divVenueName.innerHTML = `${selectedFor[i].venuename}`;
                li.appendChild(divVenueName);


                // *** will use code below once selectedFor array holds the date
                // // use &nbsp (non-breaking line space)  ???
                // const lineSpace1 = document.createTextNode("---");
                // li.appendChild(lineSpace1);
                // const dateTitle = document.createElement("strong");
                // dateTitle.innerText = 'Date: ';
                // li.appendChild(dateTitle);
                // const divBookingDate = document.createElement("span");
                // divBookingDate.innerHTML = `${b.bookingDate}`;
                // li.appendChild(divBookingDate);
                
                selectedForList.appendChild(li);
                log(b);
            }
        });
    }).catch((error) => {
        log(error);
    });
}