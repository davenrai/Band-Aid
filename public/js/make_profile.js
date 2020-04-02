/* AJAX fetch() calls */

const log = console.log

log('Loaded front-end javascript.')

function updateProfileInfo() {
    //parentElement of button is the list item li
    // const venueName = e.target.parentElement.childNodes[1].innerText
    // const performerName = e.target.parentElement.childNodes[3].innerText
    // log("parent element is: " + e.target.parentElement)
    // log("venueName is: " + venueName)
    // log("performerName is: " + performerName)
    
    // the URL for the request
    const url = '/makeprofileperformer';
    const myname = "fred"
    const data = {
        name: myname
    }

    log("data object is: " + data)
    log("data.booking field is: " + data.booking)

    const request = new Request(url, {
        method: 'PATCH', 
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
    });
    
    // log("in get_applicants_for_booking.js request.body.booking is :" + request.body.booking)
    log("about to fetch")
    // fetch(url, request)  // DO NOT use this
    fetch(request)  // USE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    .then((res) => { 
        if (res.status === 200) {
            // return a promise that resolves with the JSON body
            log("result is 200")
            // log(res.body)
            // log(res)
        } else {
            alert('Could not apply to a (performer) user');
        }                
    }).catch((error) => {
        log(error);
    });
}
