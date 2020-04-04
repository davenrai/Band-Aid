/* AJAX fetch() calls */

const log = console.log;
log('Loaded front-end javascript.');

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
        log(json);
        json.bookings.map((b) => {
            for (let i = 0; i < b.applications.length; i++) {
                const newRequest = document.createElement("div");
                newRequest.className = "request";
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
    log("button clicked");
    addBookingtoPerformer(e);
    removeRequest(e);
    return e;
}


function removeRequest(e) {
    e.preventDefault();
    if (e.target.classList.contains("choose")) {
        console.log("remove");
        const requestToRemove = e.target.parentElement;
        console.log(requestToRemove);
        performersList.removeChild(requestToRemove);
    }
}


function addBookingtoPerformer(e) {
    //parentElement of button is the list item li
    log("length is " + (e.target.parentElement.firstChild.childNodes.length))
    log("parentElement is: " + e.target.parentElement);
    log("parentElement.firstChildchildNodes[0].innerText is: " + e.target.parentElement.firstChild.childNodes[0].innerText);
    log("parentElement.childNodes[1] is: " + e.target.parentElement.childNodes[1]);
    const venuename = e.target.parentElement.firstChild.childNodes[0].innerText;
    log("venueName is: " + e.target.parentElement.firstChild.childNodes[0].innerText);
    log(venuename)
    const location = e.target.parentElement.firstChild.childNodes[2].innerText;
    log("location is: " + location);
    log(location)  
    const bookingDate = e.target.parentElement.firstChild.childNodes[4].innerText;
    log("booking date is" + bookingDate)
    log(bookingDate)
    const performerName = e.target.parentElement.firstChild.childNodes[7].innerText;
    log("performerName is: " + performerName);
    log(performerName)

    // the URL for the request
    const url = '/users/choosePerformer/' + performerName;
    const data = {
        venuename: venuename,
        bookingDate: bookingDate,
        location: location

    };

    log("data object is: " + data);
    log("data.booking field is: " + data.bookingDate);

    const request = new Request(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    log("about to fetch");
    // fetch(url, request)  // DO NOT use this
    fetch(request)  // USE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            log("result is 200");
            log(res.body);
            log(res);
        } else {
            alert('Could not apply to a (performer) user');
        }                
    }).catch((error) => {
        log(error);
    });
}