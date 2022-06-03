var studentModal = document.getElementById('showStudents')
var students = document.getElementById("studentsList");


studentModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget

  var id = button.getAttribute('data-bs-id')
  var name = button.getAttribute('data-bs-name')


  fetch(`/admin/class/listStudents/${id}`)
    .then((response) => {
      response.json().then((data) => {
        // studentss

        for (let i = 0; i < data.length; i++) {
          item = document.createElement('li');
          item.setAttribute("class", "list-group-item");
          name = document.createTextNode(data[i].name);
          item.appendChild(name);
          students.appendChild(item);
        }editTeacherBtn

        if (data.length == 0) {
          item = document.createElement('li');
          item.setAttribute("class", "list-group-item");
          item.setAttribute("class", "text-danger");
          name = document.createTextNode("No data!");
          item.appendChild(name);
          students.appendChild(item);
        }
      })
    }
    )
    .catch((error) => {
      console.log(`Unhandled error while fetching students ${error}`);
    });

  // Update the modal's content.
  var modalTitle = studentModal.querySelector('.modal-title')
  var modalBodyName = studentModal.querySelector('.name')

  // Basic information 
  modalTitle.textContent = `${name}`;


})

studentModal.addEventListener('hide.bs.modal', function () {

  students.innerHTML = "";
})



// Edit class
var editModal = document.getElementById('editClass');

var modalBodyId = document.getElementById("editId");
var modalBodyClassName = document.getElementById("editClassName");
var modalBodyBoard = document.getElementById("viewBoard");
var modalBodyStandard = document.getElementById("viewStandard");
var modalBodySubjectId = document.getElementById("editSubjectId");
var modalBodySubject = document.getElementById("viewSubject")
var modalBodyClassFees = document.getElementById("editClassFees")
var editTeacherBtn = document.getElementById("editTeacherBtn");
// var changeTeacher = false;
const teachersList = document.getElementById("teachersList");
const submitbtn = document.getElementById("editClassSaveRecord");

editModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget;


  var id = button.getAttribute('data-bs-id')
  var className = button.getAttribute('data-bs-className')
  var teacherName = button.getAttribute('data-bs-teacherName')
  var teacherId = button.getAttribute('data-bs-teacherId')
  var boardShort = button.getAttribute('data-bs-boardsShort')
  var boardFull = button.getAttribute('data-bs-boardsFull')
  var standard = button.getAttribute('data-bs-standard')
  var subject = button.getAttribute('data-bs-subject')
  var subjectId = button.getAttribute('data-bs-subjectId')
  var fees = button.getAttribute('data-bs-fees')

  // console.log(subjectId);


  fetch(`/admin/class/getTeacher/${subjectId}`)
    .then((response) => {
      response.json().then((data) => {

        teachersList.innerHTML = "";
        for (var i = 0; i < data.length; i++) {
          var opt = document.createElement('option');
          opt.value = data[i].id;
          opt.text = data[i].name;
          teachersList.add(opt);
          // console.log(data[i].name);
        }
        teachersList.value = teacherId;

      }).catch(err => {
        console.log(err);
      })
    })


  // Update the modal's content.
  var modalTitle = editModal.querySelector('.modal-title')

  modalTitle.textContent = 'Edit: ' + id;
  modalBodyId.value = id;
  modalBodyClassName.value = className;
  fullBoardName = `${boardShort} - ${boardFull}`;
  console.log(fullBoardName);
  modalBodyBoard.value = fullBoardName;
  modalBodyStandard.value = standard;
  modalBodySubjectId.value = subjectId;
  modalBodySubject.value = subject;
  modalBodyClassFees.value = fees;
})

editModal.addEventListener('hide.bs.modal', function () {
})


submitbtn.addEventListener("click", async () => {


  let details = {
    classId: modalBodyId.value,
    className: modalBodyClassName.value,
    fees: modalBodyClassFees.value,
    subjectId: modalBodySubjectId.value,
    teacherId: teachersList.value,
    changeTeacher: teachersList.disabled ? false : true
  }

  // console.log(details);
  fetch("/admin/class/edit", {
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



editTeacherBtn.addEventListener("click", async () => {
  if (teachersList.disabled == true) {
    teachersList.disabled = false;
  }
  else {
    teachersList.disabled = true;
  }
})



// Delete teacher modal
var deleteModal = document.getElementById('deleteClass')
var deleteHiddenClassName = document.getElementById("deleteClassNameInputHidden");
var deleteClassIdInputHidden = document.getElementById("deleteClassIdInputHidden");

deleteModal.addEventListener('show.bs.modal', function (event) {
  var button = event.relatedTarget

  var id = button.getAttribute('data-bs-id')
  var className = button.getAttribute('data-bs-className')
  // var mobile = button.getAttribute('data-bs-mobile')

  var deleteClassId = deleteModal.querySelector('.deleteClassId')
  var deleteClassName = deleteModal.querySelector('.deleteClassName')

  // Basic information 
  deleteClassId.innerHTML = id
  deleteClassIdInputHidden.value = id
  deleteHiddenClassName.value = className
  deleteClassName.innerHTML = className


})



deleteBtn = document.getElementById("deleteClassBtn");
deleteBtn.addEventListener("click", async () => {

  var inputClassName = document.getElementById("deleteNameInput");

  if (inputClassName.value != deleteHiddenClassName.value) {
    swal("Enter the class name as mentioned");
    return;
  }

  let details = {
    id: deleteClassIdInputHidden.value,
    name: deleteHiddenClassName.value,
  }

  console.log(details);

  fetch("/admin/class/delete", {
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
  var inputClassName = document.getElementById("deleteNameInput");
  inputClassName.value = "";
})