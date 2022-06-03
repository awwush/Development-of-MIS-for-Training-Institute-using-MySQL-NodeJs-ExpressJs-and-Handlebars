document.addEventListener("DOMContentLoaded", fetchDataFromApi);

function fetchDataFromApi() {
    fetchTeachersCount();
    fetchStudentsCount();
    fetchClassesCount();
    fetchBirthDayList();
}

function fetchTeachersCount() {
    fetch("/admin/teacher/count")
        .then((response) => {
            // console.log(response);
            response.json().then((res) => {
                // console.log("here fetch teachers count");
                // console.log(res);
                document.getElementById("teacherCount").innerHTML = res.count;
            })
        })
}

function fetchStudentsCount() {
    fetch("/admin/student/count")
        .then((response) => {
            // console.log(response);
            response.json().then((res) => {
                // console.log("here fetch teachers count");
                // console.log(res);
                document.getElementById("studentCount").innerHTML = res.count;
            })
        })
}

function fetchClassesCount() {
    fetch("/admin/class/count")
        .then((response) => {
            // console.log(response);
            response.json().then((res) => {
                // console.log("here fetch teachers count");
                // console.log(res);
                document.getElementById("classCount").innerHTML = res.count;
            })
        })
}

function fetchBirthDayList() { }


const mailModal = document.getElementById("sendEmail");
mailModal.addEventListener('show.bs.modal', function (event) {


})

const sendMailButton = document.getElementById("sendMailButton");
const primarySelect = document.getElementById("mailPrimary");
const mailSubject = document.getElementById("mailSubject");
const mailLink = document.getElementById("mailLink");
const mailBody = document.getElementById("mailBody");

sendMailButton.addEventListener('click', () => {
    // console.log("clicked");
    console.log(primarySelect.value);

    const details = {
        "subject": mailSubject.value,
        "mailBody": mailBody.value,
        "link": mailLink.value,
    }

    console.log(details);

    fetch(`/admin/mail/${primarySelect.value}`, {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-type": "application/json" },
    })
        .then(
            async (response) => {
                // loading(false);
                const data = await response.json();
                swal(data.reason);

                setTimeout(() => {

                    if (data.redirect != undefined)
                        window.location.href = data.redirect;
                }, 2000)

            },
            (response) => {
                console.log(`Request rejected ${response.status}`);
            },
        )
        .catch((error) => {
            console.log(`Unhandled error ${error}`);
        });
});
