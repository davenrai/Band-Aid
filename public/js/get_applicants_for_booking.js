/* AJAX fetch() calls */

// const {	User } = require('../../models/user'); // doesnt work on server side
const log = console.log

log('Loaded front-end javascript.')

// A function to send a GET aaplicants for have applied for a booking.
    function fetchTest5() {
        // the URL for the request
        const url = '/users';
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               return res.json() 
           } else {
                alert('Could not get users')
           }                
        })
        .then((json) => {  // the resolved promise with the JSON body
            usersList = document.querySelector('#usersList')
            usersList.innerHTML = '';
            log(json)
            json.users.map((s) => {
                li = document.createElement('li')
                li.innerHTML = `Name: <strong>${s.username}</strong>, Year: <strong>${s.usertype}</strong>`
                usersList.appendChild(li)
                log(s)
            })
        }).catch((error) => {
            log(error)
        })
    }

    // currently same as fetchTest5
    function fetchTest6() {
        // the URL for the request
        const url = '/users';
    
        // Since this is a GET request, simply call fetch on the URL
        fetch(url)
        .then((res) => { 
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
               return res.json() 
           } else {
                alert('Could not get users')
           }                
        })
        .then((json) => {  // the resolved promise with the JSON body
            usersList = document.querySelector('#usersList')
            usersList.innerHTML = '';
            log(json)
            json.users.map((s) => {
                li = document.createElement('li')
                li.innerHTML = `Name: <strong>${s.username}</strong>, Year: <strong>${s.usertype}</strong>`
                usersList.appendChild(li)
                log(s)
            })
        }).catch((error) => {
            log(error)
        })
    }