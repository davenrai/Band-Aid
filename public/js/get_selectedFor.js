/* AJAX fetch() calls */

const log = console.log;
log('Loaded front-end javascript.');

// A function to send a GET aaplicants for have applied for a booking.
function getSelectedFor() {
    // the URL for the request
    const url = '/selectedFor';

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
        log(json.selectedFor)
        json.selectedFor.map((b) => {


            const newRequest = document.createElement("div");
            newRequest.className = "booking";
            const reqText = document.createElement("p");
            const reqTitle = document.createElement("strong");
            reqTitle.innerHTML = `${b.venuename}`;
            reqText.appendChild(reqTitle);
            
            const lineBreak1 = document.createElement("br");
            reqText.appendChild(lineBreak1);

            const divLocation = document.createElement("span");
            divLocation.innerHTML = `${b.location}`;
            reqText.appendChild(divLocation);

            const lineBreak2 = document.createElement("br");
            reqText.appendChild(lineBreak2);
           
            
            const divBookingDate = document.createElement("span");
            divBookingDate.innerHTML = `${b.bookingDate}`;
            reqText.appendChild(divBookingDate);

            const lineBreak3 = document.createElement("br");
            reqText.appendChild(lineBreak3);
            const lineBreak4 = document.createElement("br");
            reqText.appendChild(lineBreak4);

            newRequest.appendChild(reqText);

            selectedForList.appendChild(newRequest);
        });
    }).catch((error) => {
        log(error);
    });
}