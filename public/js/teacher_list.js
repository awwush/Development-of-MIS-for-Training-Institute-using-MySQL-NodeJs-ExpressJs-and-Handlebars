
var showModal = document.getElementById('showTeacher')
var subject = document.getElementById("subjectList");


showModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget

  var id = button.getAttribute('data-bs-id')
  var name = button.getAttribute('data-bs-name')
  var email = button.getAttribute('data-bs-email')
  var salary = button.getAttribute('data-bs-salary')
  var mobile = button.getAttribute('data-bs-mobile')


  fetch(`/admin/teacher/subjects/${id}`)
    .then((response) => {
      response.json().then((data) => {
        // Subjects

        for (let i = 0; i < data.length; i++) {
          item = document.createElement('li');
          item.setAttribute("class", "list-group-item");
          name = document.createTextNode(data[i].name);
          item.appendChild(name);
          subject.appendChild(item);
        }
      })
    }
    )
    .catch((error) => {
      console.log(`Unhandled error while fetching subjects ${error}`);
    });

  // Update the modal's content.
  var modalTitle = showModal.querySelector('.modal-title')
  var modalBodyName = showModal.querySelector('.name')
  var modalBodyEmail = showModal.querySelector('.email')
  var modalBodySalary = showModal.querySelector('.salary')
  var modalBodyMobile = showModal.querySelector('.mobile')

  // Basic information 
  modalTitle.textContent = 'Teacher id: ' + id
  modalBodyName.innerHTML = 'Name ' + name
  modalBodyEmail.innerHTML = 'Email ' + email
  modalBodySalary.innerHTML = 'Salary ' + salary
  modalBodyMobile.innerHTML = 'Mobile ' + mobile

})

showModal.addEventListener('hide.bs.modal', function () {

  subject.innerHTML = "";
})



var editModal = document.getElementById('editTeacher');

var modalBodyId = document.getElementById("editId");
var modalBodyName = document.getElementById("editName");
var modalBodyEmail = document.getElementById("editEmail")
var modalBodySalary = document.getElementById("editSalary")
var modalBodyMobile = document.getElementById("editMobNo")
var modalBodyBirthday = document.getElementById("editBirthday")
const gender = document.getElementsByName('gender');
const unAssignedSubject = document.getElementById("unassignedSubjects");
const editSubjectBtn = document.getElementById("editSubjectBtn");
const submitbtn = document.getElementById("editTeacherSaveRecord");
unAssignedSubject.disabled = true;
editModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;


  var id = button.getAttribute('data-bs-id')
  var name = button.getAttribute('data-bs-name')
  var email = button.getAttribute('data-bs-email')
  var salary = button.getAttribute('data-bs-salary')
  var mobile = button.getAttribute('data-bs-mobile')
  var dob = button.getAttribute('data-bs-dob')

  fetch(`/admin/teacher/unAssignedSubjects/${id}`)
    .then((response) => {
      response.json().then((data) => {
        unAssignedSubject.innerHTML = "";

        // TODO: for no subjects, hide the subjects
        data.sort();
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement('option');
          opt.value = data[i].id;
          opt.text = data[i].name;
          unAssignedSubject.add(opt);
        }

      }).catch(err => {
        console.log(err);
      })
    })


  // Update the modal's content.
  var modalTitle = editModal.querySelector('.modal-title')

  modalTitle.textContent = 'Teacher id: ' + id;
  modalBodyId = id;
  modalBodyName.value = name;
  modalBodyEmail.value = email;
  modalBodySalary.value = salary;
  modalBodyMobile.value = mobile;
})

editModal.addEventListener('hide.bs.modal', function () {
})


submitbtn.addEventListener("click", async () => {
  let listOfSubjects = [];
  for (let i = 0; i < unAssignedSubject.options.length; i++) {
    if (unAssignedSubject.options[i].selected) {
      listOfSubjects.push(unAssignedSubject.options[i].value);

    }
  }
  

  let details = {
    id: modalBodyId,
    nameq: modalBodyName.value,
    mobNo: modalBodyMobile.value,
    salary: modalBodySalary.value,
    subject: listOfSubjects,
    addSubjects: unAssignedSubject.disabled ? false : true
  }

  fetch("/admin/teacher/edit", {
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


editSubjectBtn.addEventListener("click", async () => {
  if (unAssignedSubject.disabled == true) {
    unAssignedSubject.disabled = false;
  }
  else {
    unAssignedSubject.disabled = true;
  }
})


// Delete teacher modal
var deleteModal = document.getElementById('deleteTeacher')
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



deleteBtn = document.getElementById("deleteTeacherBtn");
deleteBtn.addEventListener("click", async () => {

  var inputMobile = document.getElementById("deleteMobileInput");

  if (inputMobile.value != deleteHidden.value) {
    swal("Enter the mobile number as mentioned");
    return;
  }

  let details = {
    mobNo: inputMobile.value,
  }

  fetch("/admin/teacher/delete", {
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