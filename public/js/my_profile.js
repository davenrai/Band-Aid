/* create profile with make profile */
const log = console.log;

function getProfileInfo() {
    // the URL for the request
    const url = '/profile';

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            log('got json')
           return res.json() 
       } else {
            alert('Could not get profile info')
       }                
    })
    .then((json) => {  // the resolved promise with the JSON body
            performerList = document.querySelector('#performerList');
            performerList.appendChild(document.createTextNode("Registered Name: " + json.name))
            performerList.appendChild(document.createElement("br"))
            performerList.appendChild(document.createTextNode("Registered Phone: " + json.phone))
            performerList.appendChild(document.createElement("br"))
            performerList.appendChild(document.createTextNode("Location: " + json.location))
            performerList.appendChild(document.createElement("br"))
            performerList.appendChild(document.createTextNode("Genre: " + json.genre))
            performerList.appendChild(document.createElement("br"))
            performerList.appendChild(document.createTextNode("Your Description: " + json.description))
    }).catch((error) => {
        log(error)
    })
}