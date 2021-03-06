function updateProfileInfo() {
    // the URL for the request
    const url = '/updateprofile';
    const profileInfo = ['name', 'phone', 'location', 'genre', 'description'];
    const data = {};
    // check if non null input for profile info, if so then add to req body to update in patch
    for (let i = 0; i < profileInfo.length; i++) {
        if (document.querySelector(`#${[profileInfo[i]]}`).value.length > 0) {
            data[profileInfo[i]] = document.querySelector(`#${[profileInfo[i]]}`).value;
        }
    }
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            // Handle response we get from the API.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                log('UPDATED');
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                log('didnt work');
            }
            log(res); // log the result in the console for development purposes,
            //  users are not expected to see this.
        }).catch((error) => {
            log(error);
        });
}

function updatePassword() {
    // the URL for the request
    const url = '/users/pw';
    let data = {
        password: document.querySelector('#password').value,
    };
    const request = new Request(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    fetch(request)
        .then(function (res) {
            const message = document.querySelector('#messagePwChange');
            // Handle response we get from the API.
            if (res.status === 200) {
                // If password was changed successfully, tell the admin.
                log('changed password');
                message.innerText = `Success: Changed password for ${data.username}.`;
                message.setAttribute("style", "color: green");
            } else {
                // If password couldn't be changed, tell the admin.
                log('change password error');
                message.innerText = `Error: Unable to change password for ${data.username}.`;
                message.setAttribute("style", "color: red");
            }
        }).catch((error) => {
            log(error);
        });
}