const nameq = document.querySelector("#name");
const email = document.querySelector("#email");
const mobNo = document.querySelector("#mobNo");
const salary = document.querySelector("#salary");
const subject = document.querySelector("#subject");
const birthday = document.querySelector("#birthday");
const gender = document.getElementsByName('gender');
const submitbtn = document.querySelector("#addTeacher");

function loading(booleanValue) {
	document.getElementById("registerBtn").disabled = booleanValue;
	if(booleanValue){
		document.getElementById("loadingDiv").style.display = "block";
	}else {
		document.getElementById("loadingDiv").style.display = "none";
	}
}



document.addEventListener("DOMContentLoaded", () => {
    fetch("/admin/class/getSubject")
        .then((response) => {
            response.json().then((data) => {
                subject.innerHTML = "";
                // let select = document.createElement('option');
                // select.text = "Select a Subject!";
                // select.value="";
                // subject.add(select);
                data.sort();
                for (var i = 0; i < data.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = data[i].id;
                    opt.text = data[i].name;
                    subject.add(opt);
                }

            }).catch(err => {
                console.log(err);
            })
        })
});

submitbtn.addEventListener("click", async () => {
    let listOfSubjects = [];
    for (let i = 0; i < subject.options.length; i++) {
        if (subject.options[i].selected) {
            listOfSubjects.push(subject.options[i].value);

        }
    }

    var genderValue;
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) genderValue = gender[i].value;
    }
    let details = {
        nameq: nameq.value,
        email: email.value,
        mobNo: mobNo.value,
        salary: salary.value,
        subject: listOfSubjects,
        birthday: birthday.value,
        gender: genderValue
    }
    console.log(details);

    fetch("/admin/teacher/save", {
        method: 'POST',
        body: JSON.stringify(details),
        headers: { "Content-type": "application/json" },
    }).then(async (response) => {
        const data = await response.json();
        swal(data.reason);

        setTimeout(() => {

            if (data.redirect != undefined)
                window.location.href = data.redirect;
        }, 2000)
    })


});
