function changeName() {
        const url = '/my-profile';
        let data = {
            name: document.querySelector('#name').value,
        }
}

// /* AJAX fetch() calls */

// const log = console.log;

// function updateProfileInfo() {
//     // the URL for the request
//     const url = '/makeprofileperformer';
//     let data = {
//         name: document.querySelector('#name').value,
//         phone: document.querySelector('#phone').value,
//         email: document.querySelector('#email').value,
//         location: document.querySelector('#location').value,
//         genre: document.querySelector('#genre').value,
//         description: document.querySelector('#description').value
//     }


//     const request = new Request(url, {
//         method: 'PATCH', 
//         body: JSON.stringify(data),
//         headers: {
//             'Accept': 'application/json, text/plain, */*',
//             'Content-Type': 'application/json'
//         },
//     });
//     fetch(request)
//     .then(function(res) {

//         // Handle response we get from the API.
//         if (res.status === 200) {
//             // If student was added successfully, tell the user.
//             console.log('UPDATED')
//         } else {
//             // If server couldn't add the student, tell the user.
//             // Here we are adding a generic message, but you could be more specific in your app.
//             console.log('didnt work')
//         }
//         log(res)  // log the result in the console for development purposes,
//                           //  users are not expected to see this.
//     }).catch((error) => {
//         log(error)
//     })
// }