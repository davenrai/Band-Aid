/* create profile with make profile */
const log = console.log;

// requestList.addEventListener("click", removeRequest);
document.addEventListener("DOMContentLoaded", getName);

function addToProfileInfo(booking) {
    // const newBooking = document.createElement("div");
    // newBooking.className = "booking";
    // const bookingText = document.createElement("p");
    // const bookingTitle = document.createElement("strong");
    // bookingTitle.innerText = booking.venuename;
    // bookingText.appendChild(bookingTitle);
    // const lineBreak1 = document.createElement("br");
    // bookingText.appendChild(lineBreak1);
    // const bookingLoc = document.createTextNode(booking.location);
    // bookingText.appendChild(bookingLoc);
    // const lineBreak2 = document.createElement("br");
    // bookingText.appendChild(lineBreak2);
    // const bookingPhone = document.createTextNode(booking.phone);
    // bookingText.appendChild(bookingPhone);
    // const lineBreak3 = document.createElement("br");
    // bookingText.appendChild(lineBreak3);
    // const bookingDate = document.createTextNode(booking.bookingDate);
    // bookingText.appendChild(bookingDate);
    // const lineBreak4 = document.createElement("br");
    // bookingText.appendChild(lineBreak4);
    // const lineBreak5 = document.createElement("br");
    // bookingText.appendChild(lineBreak5);
    // const bookingDesc = document.createTextNode(booking.description);
    // bookingText.appendChild(bookingDesc);
    // newBooking.appendChild(bookingText);
    // const fulfillButton = document.createElement("button");
    // fulfillButton.className = "fulfill";
    // const buttonText = document.createTextNode("I'm down!");
    // fulfillButton.appendChild(buttonText);
    // fulfillButton.addEventListener("click", fulfillRequest);
    // newBooking.appendChild(fulfillButton);
    // requestList.appendChild(newBooking);

}

function getPerformerName() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile name');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#name');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}


function getPerformerPhone() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile phone');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#phone');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}


function getPerformerEmail() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile email');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#email');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}


function getPerformerLocation() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile location');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#location');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}



function getPerformerGenre() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile genre');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#genre');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}

function getPerformerDescription() {
    const url = '/makeprofileperformer.html';

    fetch(url)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                alert('Could not get profile description');
            }
        })
        .then((json) => { 
            profileName = document.querySelector('#description');
            bookingsList.innerHTML = '';
            log(json);
            json.bookings.map((b) => {
                addToProfileInfo(b);
            });
        }).catch((error) => {
            log(error);
        });
}
