/* create profile with make profile */
const log = console.log;

document.addEventListener("DOMContentLoaded", getName);

function addToProfileInfo(booking) {
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
