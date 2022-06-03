// Add new board
function addBoard() {
    newBoardShortName = document.getElementById("newBoardShortName");
    newBoardFullName = document.getElementById("newBoardFullName");
    console.log(newBoardFullName.value);
    console.log(newBoardShortName.value);

    if (newBoardShortName.value == "") {
        swal("Atleast shortform is required");
        return;
    }
    details = {
        short_form: newBoardShortName.value,
        long_form: newBoardFullName.value,
    };
    // console.log(JSON.stringify(details));

    fetch("/admin/class/newBoard", {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-type": "application/json" },
    })
        .then(
            async (response) => {
                loading(false);
                const data = await response.json();
                swal(data.reason);
                document.getElementById("newBoardShortName").value = "";
                if (data.status == 200) {
                    var myModalEl = document.querySelector('#addBoard');
                    var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
                    myModal.hide();
                    window.location.reload();
                }


            },
            (response) => {
                console.log(`Request rejected ${response.status}`);
            },
        )
        .catch((error) => {
            console.log(`Unhandled error ${error}`);
        });
}



// Add standard
function addStandard() {
    newStandardName = document.getElementById("newStandardName");
    console.log(newStandardName.value);

    if (newStandardName.value == "") {
        swal("standard is required");
        return;
    }

    details = {
        newStandardName: newStandardName.value,
    };
    console.log(JSON.stringify(details));

    fetch("/admin/class/newStandard", {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-type": "application/json" },
    })
        .then(
            async (response) => {
                loading(false);
                const data = await response.json();
                console.log(data);
                swal(data.reason);
                document.getElementById("newStandardName").value = "";
                if (data.status == 200) {
                    var myModalEl = document.querySelector('#addStandard');
                    var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
                    myModal.hide();
                    window.location.reload();
                }
                // console.log("response has come from the server for NEW STANDARD");
            },
            (response) => {
                console.log(`Request rejected ${response.status}`);
            },
        )
        .catch((error) => {
            console.log(`Unhandled error ${error}`);
        });
}



// Add subject
function addSubject() {
    newSubjectName = document.getElementById("newSubjectName");
    console.log(newSubjectName.value);

    if (newSubjectName.value == "") {
        swal("subject name is required");
        return;
    }

    details = {
        newSubjectName: newSubjectName.value,
    };
    console.log(JSON.stringify(details));

    fetch("/admin/class/newSubject", {
        method: "POST",
        body: JSON.stringify(details),
        headers: { "Content-type": "application/json" },
    })
        .then(
            async (response) => {
                loading(false);
                const data = await response.json();
                console.log(data);
                swal(data.reason);
                document.getElementById("newSubjectName").value = "";
                if (data.status == 200) {
                    var myModalEl = document.querySelector('#addSubject');
                    var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
                    myModal.hide();
                    window.location.reload();
                }
            },
            (response) => {
                console.log(`Request rejected ${response.status}`);
            }, newSubjectName
        )
        .catch((error) => {
            console.log(`Unhandled error ${error}`);
        });
}


var showTeacher = document.getElementById('showTeacher')
var teacher = document.getElementById("teacherList");


showTeacher.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')

    console.log(id);
    
    fetch(`/admin/subject/teachers/${id}`)
        .then((response) => {
            response.json().then((data) => {
                // Teachers

                for (let i = 0; i < data.length; i++) {
                    item = document.createElement('li');
                    item.setAttribute("class", "list-group-item");
                    teacherName = document.createTextNode(data[i].name);
                    item.appendChild(teacherName);
                    teacher.appendChild(item);
                }

                if (data.length == 0) {
                    item = document.createElement('li');
                    item.setAttribute("class", "list-group-item");
                    item.setAttribute("class", "text-danger");
                    nameField = document.createTextNode("No data!");
                    item.appendChild(nameField);
                    teacher.appendChild(item);
                }
            })
        }
        )
        .catch((error) => {
            console.log(`Unhandled error while fetching teachers ${error}`);
        });

})

showTeacher.addEventListener('hide.bs.modal', function () {

    teacher.innerHTML = "";
})








// Edit board
var editModal = document.getElementById('editBoard');

var modalBodyId = document.getElementById("editId");
var modalBodyShortName = document.getElementById("editBoardShortName");
var modalBodyFullName = document.getElementById("editBoardFullName");

const editBoardSubmitbtn = document.getElementById("editBoardSaveRecord");

editModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;


    var id = button.getAttribute('data-bs-id')
    var shortForm = button.getAttribute('data-bs-shortName')
    var fullForm = button.getAttribute('data-bs-fullName')



    // Update the modal's content.
    var modalTitle = editModal.querySelector('.modal-title')

    modalTitle.textContent = 'Edit: ' + id;
    modalBodyId.value = id;
    modalBodyShortName.value = shortForm;
    modalBodyFullName.value = fullForm;
})

editModal.addEventListener('hide.bs.modal', function () {
})


editBoardSubmitbtn.addEventListener("click", async () => {


    let details = {
        id: modalBodyId.value,
        shortForm: modalBodyShortName.value,
        fullForm: modalBodyFullName.value
    }

    console.log(details);
    fetch("/admin/board/edit", {
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






// Edit standard and subject

var editStandardSubjectModal = document.getElementById('editStandardSubject');

var modalBodyId = document.getElementById("editId");
var modalBodyName = document.getElementById("editStandardSubjectName");
var editUrlParam = "";

const editStandardSubjectSubmitbtn = document.getElementById("editBoardSaveRecord");

editStandardSubjectModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;


    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')
    var fullForm = button.getAttribute('data-bs-fullName')
    var urlParamAttribute = button.getAttribute('data-bs-edit')


    // Update the modal's content.
    var modalTitle = editStandardSubjectModal.querySelector('.modal-title')

    modalTitle.textContent = 'Edit: ' + id;
    modalBodyId.value = id;
    modalBodyName.value = name;
    editUrlParam = urlParamAttribute;
})

editStandardSubjectModal.addEventListener('hide.bs.modal', function () {
})


// editStandardSubjectSubmitbtn.addEventListener("click", async () => {
async function EditStandardSubjectRecord() {

    let details = {
        id: modalBodyId.value,
        name: modalBodyName.value,
    }

    console.log(details);
    fetch(`/admin/${editUrlParam}/edit`, {
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


}



// Delete modal
var deleteModal = document.getElementById('deleteMiscellaneous')
var deleteHiddenName = document.getElementById("deleteNameInputHidden");
var deleteIdInputHidden = document.getElementById("deleteIdInputHidden");
var deleteUrlParam = "";

deleteModal.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget

    var id = button.getAttribute('data-bs-id')
    var name = button.getAttribute('data-bs-name')
    var urlParamAttribute = button.getAttribute('data-bs-delete')
    // var mobile = button.getAttribute('data-bs-mobile')

    var deleteId = deleteModal.querySelector('.deleteId')
    var deleteName = deleteModal.querySelector('.deleteName')

    // Basic information 
    deleteId.innerHTML = id
    deleteIdInputHidden.value = id
    deleteHiddenName.value = name
    deleteName.innerHTML = name
    deleteUrlParam = urlParamAttribute;

})



// deleteBtn = document.getElementById("deleteBtn");
// deleteBtn.addEventListener("click", async () => {
async function deleteRecord() {

    var inputName = document.getElementById("deleteNameInput");

    if (inputName.value != deleteHiddenName.value) {
        swal("Enter the name as mentioned");
        return;
    }

    let details = {
        id: deleteIdInputHidden.value,
        name: deleteHiddenName.value,
    }

    console.log(details);
    console.log(deleteUrlParam);
    // var urlParam = actionOn;
    fetch(`/admin/${deleteUrlParam}/delete`, {
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
    },
        (rejectResponse) => console.log(rejectResponse))
        .catch(err => console.log(err));


}


deleteModal.addEventListener('hide.bs.modal', function (event) {
    var inputClassName = document.getElementById("deleteNameInput");
    inputClassName.value = "";
})