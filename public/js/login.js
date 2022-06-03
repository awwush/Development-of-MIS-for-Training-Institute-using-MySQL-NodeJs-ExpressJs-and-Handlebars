// const { json } = require("express/lib/response");

const form = document.querySelector("form");
const passwordEnter = document.getElementById("password");
const forgotPassword = document.querySelector("#forgotPassword");

function setThisButtonActive(button) {
  button.classList.add("role-active");
}

/* select all active buttons, and remove the active class from them */
function resetActiveButton() {
  document.querySelectorAll(".role-active").forEach((button) => {
    button.classList.remove("role-active");
  });
}

document.querySelectorAll(".role-buttons").forEach((button) => {
  button.addEventListener("click", function () {
    resetActiveButton();
    setThisButtonActive(button);
  });
});

function loading(booleanValue) {
  document.getElementById("loginBtn").disabled = booleanValue;
  if (booleanValue) {
    document.getElementById("loadingDiv").style.display = "block";
  } else {
    document.getElementById("loadingDiv").style.display = "none";
  }
}



// const forgot_Password = () => {
//   console.log("here in forgot password!!");
//   if (document.getElementById("username").value === "") {
//     document.getElementById("username").style.backgroundColor = "#FCA192";
//     // e.preventDefault();
//   }
// }

const send = () => {
  const username = document.getElementById("username");
  const pass = document.getElementById("password");

  loading(true);
  fetch("/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: username.value,
      password: pass.value,
    }),
    headers: {
      "Content-type": "application/json",
    },
    redirect: "follow",
  }).then(async (response) => {
    loading(false);
    if (response.redirected) {
      window.location.href = response.url;
    } else {
      response = await response.json();
      swal(`${response.reason}`);
    }
  });

  pass.value = "";
};

const forgot_Password = () => {
  console.log("here in forgot password!!");
  if (document.getElementById("username").value === "") {
    document.getElementById("username").style.backgroundColor = "red";
    // e.preventDefault();
  } else {
    document.getElementById("forgotPassword").href = `/users/forgotPassword/${document.getElementById("username").value}`;
  }
};

forgotPassword.addEventListener("click", (e) => { });
passwordEnter.addEventListener("keypress", (e) => {
  if (e.key == "Enter") send();
});
form.addEventListener("submit", send);
