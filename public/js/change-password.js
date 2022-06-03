const oldPassword = document.querySelector('#old-password');
const newPassword = document.querySelector('#new-password');
const rePassword = document.querySelector('#re-password');
const submitbtn = document.querySelector('#submitbtn');
const errmsg = document.querySelector('#errmsg');


var showOldPassword = document.getElementById("showOldPassword");
showOldPassword.onclick = function () {
    
    if(oldPassword.getAttribute("type") == "password"){
        oldPassword.setAttribute("type", "text");
        showOldPassword.innerHTML = "hide";
    }
    else{
        oldPassword.setAttribute("type", "password");
        showOldPassword.innerHTML = "show";
    }
}

var showNewPassword = document.getElementById("showNewPassword");
showNewPassword.onclick = function () {
    
    if(newPassword.getAttribute("type") == "password"){
        newPassword.setAttribute("type", "text");
        showNewPassword.innerHTML = "hide";
    }
    else{
        newPassword.setAttribute("type", "password");
        showNewPassword.innerHTML = "show";
    }
}

var showConfirmNewPassword = document.getElementById("showConfirmNewPassword");
showConfirmNewPassword.onclick = function () {
    
    if(rePassword.getAttribute("type") == "password"){
        rePassword.setAttribute("type", "text");
        showConfirmNewPassword.innerHTML = "hide";
    }
    else{
        rePassword.setAttribute("type", "password");
        showConfirmNewPassword.innerHTML = "show";
    }
}

newPassword.onfocus = function () {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
newPassword.onblur = function () {
    document.getElementById("message").style.display = "none";
}


var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");


newPassword.onkeyup = function () {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (newPassword.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (newPassword.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (newPassword.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (newPassword.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}

submitbtn.addEventListener('click', () => {

    if(newPassword.value == '' || newPassword.value.length < 8){
        errmsg.appendChild(document.createTextNode("Enter new password of atleast 8 characters"));
        setTimeout(function () {
            if (errmsg.hasChildNodes()) {
                errmsg.removeChild(errmsg.firstChild);
            }
        }, 2000);
    }
    else if (newPassword.value === rePassword.value) {
        fetch('/users/changePassword', {
            method: "POST",
            body: JSON.stringify({
                old: oldPassword.value,
                new: newPassword.value,
            }),
            headers: {
                "Content-type": "application/json",
            },
            redirect: "follow",
        }).then((response) => {
            response.json().then((data) => {
                if (data.status === "false") {
                    swal(data.reason);
                    oldPassword.value = "";
                }
            }).catch((err) => {
                swal('Password successfully updated!!').then(() => {
                    if (response.redirected)
                        window.location.href = response.url;
                });
            })

        })

    } else {
        errmsg.appendChild(document.createTextNode("new password and re entered password dont match!!"));
        setTimeout(function () {
            if (errmsg.hasChildNodes()) {
                errmsg.removeChild(errmsg.firstChild);
            }
        }, 2000);
    }


});


