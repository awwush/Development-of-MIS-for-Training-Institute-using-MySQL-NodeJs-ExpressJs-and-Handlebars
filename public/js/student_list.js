

var showParent = document.getElementById('showParent')
// var classes = document.getElementById("classList");


showParent.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')


    fetch(`/admin/student/parent/${id}`)
        .then((response) => {
            response.json().then((response) => {
                // console.log(response[0]);
                var data = response[0];
                // Classes
                var modalBodyFatherName = showParent.querySelector('.fatherName')
                var modalBodyMotherName = showParent.querySelector('.motherName')
                var modalBodyEmail = showParent.querySelector('.email')
                var modalBodyMobile = showParent.querySelector('.mobile')

                modalBodyFatherName.innerHTML = 'Father name: ' + data.father_name;
                modalBodyMotherName.innerHTML = 'Mother name: ' + data.mother_name;
                modalBodyEmail.innerHTML = 'email: ' + data.email;
                modalBodyMobile.innerHTML = 'contact: ' + data.contact;
                // var modalBodyStandard = showParent.querySelector('.standardName')
            })
        }
        )
        .catch((error) => {
            console.log(`Unhandled error while fetching parent information ${error}`);
        });

    // Update the modal's content.
    var modalTitle = showParent.querySelector('.modal-title')

    // Basic information 
    modalTitle.textContent = 'Parent details of: ' + name

})

showParent.addEventListener('hide.bs.modal', function () {

    classes.innerHTML = "";
})




var showModal = document.getElementById('showStudent')
var classes = document.getElementById("classList");


showModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')
    var email = button.getAttribute('data-bs-email')
    var mobile = button.getAttribute('data-bs-mobile')
    var board = button.getAttribute('data-bs-boardName')
    var standard = button.getAttribute('data-bs-standardName')


    fetch(`/admin/student/classes/${id}`)
        .then((response) => {
            response.json().then((data) => {
                // Classes
                for (let i = 0; i < data.length; i++) {
                    item = document.createElement('li');
                    item.setAttribute("class", "list-group-item");
                    name = document.createTextNode(data[i].name);
                    item.appendChild(name);
                    classes.appendChild(item);
                }

                if (data.length == 0) {
                    item = document.createElement('li');
                    item.setAttribute("class", "list-group-item");
                    item.setAttribute("class", "text-danger");
                    name = document.createTextNode("No data!");
                    item.appendChild(name);
                    classes.appendChild(item);
                }
            })
        }
        )
        .catch((error) => {
            console.log(`Unhandled error while fetching classes ${error}`);
        });

    // Update the modal's content.
    var modalTitle = showModal.querySelector('.modal-title')
    var modalBodyName = showModal.querySelector('.name')
    var modalBodyEmail = showModal.querySelector('.email')
    var modalBodyMobile = showModal.querySelector('.mobile')
    var modalBodyBoard = showModal.querySelector('.boardName')
    var modalBodyStandard = showModal.querySelector('.standardName')

    // Basic information 
    modalTitle.textContent = 'Student id: ' + id
    modalBodyName.innerHTML = 'Name: ' + name
    modalBodyEmail.innerHTML = 'Email: ' + email
    modalBodyMobile.innerHTML = 'Mobile: ' + mobile
    modalBodyBoard.innerHTML = 'Board: ' + board
    modalBodyStandard.innerHTML = 'Standard: ' + standard

})

showModal.addEventListener('hide.bs.modal', function () {

    classes.innerHTML = "";
})





var editModal = document.getElementById('editStudent');

var modalBodyId = document.getElementById("editId");
var modalBodyName = document.getElementById("editName");
var modalBodyEmail = document.getElementById("editEmail")
var modalBodyMobile = document.getElementById("editMobNo")
var modalBodyBirthday = document.getElementById("editBirthday")
const gender = document.getElementsByName('gender');
const submitbtn = document.getElementById("editStudentSaveRecord");

editModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;


    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')
    var email = button.getAttribute('data-bs-email')
    var mobile = button.getAttribute('data-bs-mobile')
    var dob = button.getAttribute('data-bs-dob')


    // Update the modal's content.
    var modalTitle = editModal.querySelector('.modal-title')

    modalTitle.textContent = 'Student id: ' + id;
    modalBodyId = id;
    modalBodyName.value = name;
    modalBodyEmail.value = email;
    modalBodyMobile.value = mobile;
})


editModal.addEventListener('hide.bs.modal', function () {
})


submitbtn.addEventListener("click", async () => {

    let details = {
        id: modalBodyId,
        nameq: modalBodyName.value,
        mobNo: modalBodyMobile.value,
    }
    console.log(details);
    fetch("/admin/student/edit", {
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
        .catch(err => {
            console.log()
        })


});





// Add class for a student

var addClassModal = document.getElementById('addClass');
var modalBodyId = document.getElementById("addClassId");
var classesHolder = addClassModal.querySelector("#classesHolder");

addClassModal.addEventListener('show.bs.modal', function (event) {

    var button = event.relatedTarget;

    var id = button.getAttribute('data-bs-id')
    var boardId = button.getAttribute('data-bs-boardId')
    var standardId = button.getAttribute('data-bs-standardId')

    modalBodyId = id;
    // Update the modal's content.
    var modalTitle = addClassModal.querySelector('.modal-title')

    // Basic information 
    modalTitle.textContent = 'Unenrolled classes: ';

    fetch(`/admin/student/unEnrolledClasses?board_id=${boardId}&standard_id=${standardId}&student_id=${id}`)
        .then(async (responses) => {
            console.log(responses);

            const data = await responses.json();
            const classField = document.querySelector("#classesHolder");
            classField.innerHTML = "";
            data.forEach((response) => {
                // console.log(response);
                const div = document.createElement("div");
                div.classList.add("form-check");
                div.classList.add("form-switch");
                // div.classList.add("form-check-inline");
                div.classList.add("pt-2");
                const inpt = document.createElement("input");
                inpt.classList.add("form-check-input");
                inpt.name = "addClass";
                inpt.value = response.id;
                inpt.type = "checkbox";
                const texxt = document.createElement("label");
                texxt.classList.add("form-check-label");
                texxt.innerHTML = response.name;
                div.appendChild(inpt);
                div.appendChild(texxt);
                classField.appendChild(div);
            })

            if (data.length == 0) {
                classField.innerHTML = "No class to view";
            }
        }).catch(err => {
            console.log("There seems to be an error!");
        })


});

addClassModal.addEventListener('hide.bs.modal', function () {
    classesHolder.innerHTML = "";
})

addClassbtn = document.getElementById("addClassSaveRecord");

addClassbtn.addEventListener("click", async () => {


    var classList = [];
    document.getElementsByName("addClass").forEach((ele) => {
        if (ele.checked) {
            classList.push(ele.value);
        }
    });

    let details = {
        id: modalBodyId,
        class: classList,
    }

    console.log(details);

    fetch("/admin/student/class/add", {
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




// Delete class for a student


var deleteFromClassModal = document.getElementById('removeFromClass')
var deleteClassList = document.getElementById("removeClassList");
var modalBodyId = document.getElementById("removeClassId");

deleteFromClassModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')
    modalBodyId = id;

    fetch(`/admin/student/classes/${id}`)
        .then(async (responses) => {
            // console.log(responses);

            const data =await responses.json();
            const classField = document.querySelector("#classesAddHolder");
            classField.innerHTML = "";
            data.forEach((response) => {
                // console.log(response);
                const div = document.createElement("div");
                div.classList.add("form-check");
                div.classList.add("form-switch");
                // div.classList.add("form-check-inline");
                div.classList.add("pt-2");
                const inpt = document.createElement("input");
                inpt.classList.add("form-check-input");
                inpt.name = "removeClass";
                inpt.value = response.id;
                inpt.type = "checkbox";
                const texxt = document.createElement("label");
                texxt.classList.add("form-check-label");
                texxt.innerHTML = response.name;
                div.appendChild(inpt);
                div.appendChild(texxt);
                classField.appendChild(div);
            })

            if (data.length == 0) {
                classField.innerHTML = "No class to view";
            }
        }).catch(err => {
            console.log("There seems to be an error!" + err);
        })
})

deleteFromClassModal.addEventListener('hide.bs.modal', function () {

    classes.innerHTML = "";
})



removeClassbtn = document.getElementById("removeClassSaveRecord");
removeClassbtn.addEventListener("click", async () => {


    var classList = [];
    document.getElementsByName("removeClass").forEach((ele) => {
        if (ele.checked) {
            classList.push(ele.value);
        }
    });

    let details = {
        id: modalBodyId,
        class: classList,
    }

    console.log(details);

    fetch("/admin/student/class/delete", {
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





// Delete Student modal
var deleteModal = document.getElementById('deleteStudent')
var deleteHidden = document.getElementById("deleteMobileInputHidden");

deleteModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')
    var mobile = button.getAttribute('data-bs-mobile')

    var deleteName = deleteModal.querySelector('.deleteName')
    var deleteMobile = deleteModal.querySelector('.deleteMobile')

    // Basic information 
    deleteName.innerHTML = name
    deleteMobile.innerHTML = mobile
    deleteHidden.value = mobile


})



deleteBtn = document.getElementById("deleteStudentBtn");
deleteBtn.addEventListener("click", async () => {

    var inputMobile = document.getElementById("deleteMobileInput");

    if (inputMobile.value != deleteHidden.value) {
        swal("Enter the mobile number as mentioned");
        return;
    }

    let details = {
        mobNo: inputMobile.value,
    }

    fetch("/admin/student/delete", {
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

deleteModal.addEventListener('hide.bs.modal', function (event) {
    var inputMobile = document.getElementById("deleteMobileInput");
    inputMobile.value = "";
})

