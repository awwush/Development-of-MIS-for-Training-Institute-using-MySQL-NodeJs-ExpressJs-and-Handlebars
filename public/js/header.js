const logout = document.getElementById("logoutBtn");

logout.addEventListener("click", logoutUser);

function loading(booleanValue) {
    const btnCollection = document.getElementsByClassName("btn");
    for (let i = 0; i < btnCollection.length; i++) {
        btnCollection[i].disabled = booleanValue;
    }

    if (booleanValue) {
        document.getElementById("loadingDiv").style.display = "block";
        for (let i = 0; i < btnCollection.length; i++) {
            btnCollection[i].style.display = "none";
        }
    }
    else {
        document.getElementById("loadingDiv").style.display = "none";
        for (let i = 0; i < btnCollection.length; i++) {
            btnCollection[i].style.display = "block";
        }
    }
}

function logoutUser() {
    loading(true);

    fetch("/users/logout", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
        },
        redirect: "follow",
    }).then(async (response) => {

        loading(false);
        if (response.redirected) {
            window.location.href = response.url;
        }
        else {
            swal(`Retry to logout..`);
        }
    });
}