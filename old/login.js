const button = document.querySelector('#login')
button.addEventListener('click', loginVerification)

function loginVerification () {
    // check to see if username / password is in database
    //
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    if(username === 'user' && password === 'user'){
        window.location.href = "./timeline.html";
    }
    else if(username === 'admin' && password === 'admin'){
        window.location.href = "./admin.html";
    }
}