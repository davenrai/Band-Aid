const requestForm = document.querySelector("#requestForm");
const requestList = document.querySelector("#requestList");
bookAddForm.addEventListener("submit", addNewBandRequest);

let numBandRequests = 0;

class BandRequest {
    constructor(name, loc, email, phone, desc) {
        this.name = name;
        this.loc = loc;
        this.email = email;
        this.phone = phone;
        this.desc = desc;
        this.fulfilled = false;
        numBandRequests++;
    }
}

function addNewBandRequest(e) {
    e.preventDefault();
    const venueName = requestForm.venueName.value;
    const venueLoc = requestForm.venueLoc.value;
    const venueEmail = requestForm.venueEmail.value;
    const venuePhone = requestForm.venuePhone.value;
    const reqDesc = requestForm.reqDesc.value;
    const newBandRequest = new BandRequest(venueName, venueLoc, venueEmail, venuePhone, reqDesc);
    updateRequestTimeline(newBandRequest);
}

function updateRequestTimeline(request) {
    const newRequest = document.createElement("div");
    newRequest.className = "request";
    const reqText = document.createElement("p");
    const reqTitle = document.createElement("strong");
    reqTitle.innerText = request.name;
    reqText.appendChild(reqTitle);

    requestList.appendChild(reqText);
}
