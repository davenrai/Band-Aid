/* AJAX fetch() calls */

const log = console.log;

document.addEventListener("DOMContentLoaded", getApplicants);

// A function to send a GET aaplicants for have applied for a booking.
function getApplicants() {
    // the URL for the request
    const url = '/bookings';

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
        performersList = document.querySelector('#performersList');
        performersList.innerHTML = '';
        json.bookings.map((b) => {
            for (let i = 0; i < b.applications.length; i++) {
                const newRequest = document.createElement("div");
                newRequest.className = "availableBooking";
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

                const divPerformerName = document.createElement("span");
                divPerformerName.innerHTML = `${b.applications[i]}`;
                reqText.appendChild(divPerformerName);

                newRequest.appendChild(reqText);

                const chooseApplicantButton = document.createElement("button");
                chooseApplicantButton.className = "choose";
                const buttonText = document.createTextNode("I choose you!");
                chooseApplicantButton.appendChild(buttonText);
                chooseApplicantButton.addEventListener("click", chooseApplicant);
                newRequest.appendChild(chooseApplicantButton);

                performersList.appendChild(newRequest);

            }
        });
    }).catch((error) => {
        log(error);
    });
}



function chooseApplicant(e) {
    addBookingtoPerformer(e);
    removeRequest(e);
    return e;
}



function removeRequest(e) {
    e.preventDefault();
    if (e.target.classList.contains("choose")) {
        const requestToRemove = e.target.parentElement;
        performersList.removeChild(requestToRemove);
    }
}


function addBookingtoPerformer(e) {
    const venuename = e.target.parentElement.firstChild.childNodes[0].innerText;
    const location = e.target.parentElement.firstChild.childNodes[2].innerText;
    const bookingDate = e.target.parentElement.firstChild.childNodes[4].innerText;
    const performerName = e.target.parentElement.firstChild.childNodes[7].innerText;

    // the URL for the request
    const url = '/users/choosePerformer/' + performerName;
    const data = {
        venuename: venuename,
        bookingDate: bookingDate,
        location: location

    };

    const request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    fetch(request)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            log("result is 200");
        } else {
            alert('Could not apply to a (performer) user');
        }                
    }).catch((error) => {
        log(error);
    });
}