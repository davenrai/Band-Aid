const requestForm = document.querySelector("#requestForm");
const requestList = document.querySelector("#requestList");
requestForm.addEventListener("submit", addNewBandRequest);

let numBandRequests = 0;
const requests = [];

class BandRequest {
    constructor(name, loc, email, phone, desc) {
        this.name = name;
        this.loc = loc;
        this.email = email;
        this.phone = phone;
        this.desc = desc;
        this.fulfilled = false;
        this.num = numBandRequests;
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
    requests.push(newBandRequest);
    updateRequestTimeline(newBandRequest);
}

function updateRequestTimeline(request) {
    // TODO: CLEAN UP!!! use spans or something
    const newRequest = document.createElement("div");
    newRequest.className = "request";
    const reqText = document.createElement("p");
    const reqTitle = document.createElement("strong");
    reqTitle.innerText = request.name;
    reqText.appendChild(reqTitle);
    const lineBreak = document.createElement("br");
    reqText.appendChild(lineBreak);
    const reqLoc = document.createTextNode(request.loc);
    const reqPhone = document.createTextNode(request.phone + " ");
    const reqEmail = document.createTextNode(request.email);
    const reqDesc = document.createTextNode(request.desc);
    reqText.appendChild(reqLoc);
    reqText.appendChild(lineBreak);
    reqText.appendChild(reqPhone);
    reqText.appendChild(reqEmail);
    reqText.appendChild(lineBreak);
    reqText.appendChild(lineBreak);
    reqText.appendChild(reqDesc);
    newRequest.appendChild(reqText);
    const fulfillButton = document.createElement("button");
    fulfillButton.className = "fulfill";
    const buttonText = document.createTextNode("I'm down!");
    fulfillButton.appendChild(buttonText);
    fulfillButton.addEventListener("click", fulfillRequest);
    newRequest.appendChild(fulfillButton);
    requestList.appendChild(newRequest);
}

function fulfillRequest(e) {
    e.preventDefault();
    if (e.toElement.className == "fulfill") {
        // remove request
        // requests.splice()
    }
}

function removeRequest(request) {

}
