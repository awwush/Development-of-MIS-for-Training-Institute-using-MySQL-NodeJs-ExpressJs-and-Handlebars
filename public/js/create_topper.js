document.addEventListener("DOMContentLoaded", () => {
    fetchClass();
});

function fetchClass() {
    classList = document.getElementById("classList");
    fetch("/admin/class/listAll")
        .then((response) => {
            response.json().then((data) => {
                classList.innerHTML = "";
                let select = document.createElement('option');
                select.text = "Select a class!";
                select.value = "";
                classList.add(select);
                data.sort();
                for (var i = 0; i < data.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = data[i].id;
                    opt.text = data[i].name;
                    classList.add(opt);
                }

            }).catch(err => {
                console.log(err);
            })
        })
}


document.getElementById("classList").addEventListener("change", () => {
    studentList = document.getElementById("studentList");
    studentList.innerHTML = "";
    // studentList.empty();
    let select = document.createElement('option');
    select.text = "Assign it to a student";
    select.value = "";
    studentList.add(select);
    // console.log(classList.value);
    fetchStudents(classList.value);
})

function fetchStudents(classId) {
    studentList = document.getElementById("studentList");
    fetch(`/admin/class/listStudents/${classId}`)
        .then((response) => {
            response.json().then((data) => {
                studentList.innerHTML = "";
                let select = document.createElement('option');
                select.text = "Select a student!";
                select.value = "";
                studentList.add(select);
                data.sort();
                for (var i = 0; i < data.length; i++) {
                    var opt = document.createElement('option');
                    opt.value = data[i].id;
                    opt.text = data[i].name;
                    studentList.add(opt);
                }

            }).catch(err => {
                console.log(err);
            })
        })
}

const saveTopper = document.getElementById("saveTopper");
const classId = document.getElementById("classList");
const studentId = document.getElementById("studentList");
const receivedMarks = document.getElementById("receivedMarks");
const totalMarks = document.getElementById("totalMarks");


saveTopper.addEventListener('click', function (e) {
    e.preventDefault();

    if (receivedMarks.value > totalMarks.value) {
        swal("received marks cannot be greater than total marks");
        return;
    }

    const imageFile = document.getElementById("topperPhoto");
    // const formData = new FormData();
    // formData.append('topperImage', imageFile[0]);
    // upload image and receive url
    fetch('/admin/topper/saveImage', {
        method: 'POST',
        body: imageFile,
        // headers: {
        //     "Content-type": "multipart/form-data"
        // }
    }).then((response) => { console.log(response); })
        .catch(err => console.log(err));

    const details = {
        classId: classId.value,
        studentId: studentId.value,
        receivedMarks: receivedMarks.value,
        totalMarks: totalMarks.value,
        // url: photoUrl,
    }

    console.log(details);

    fetch(`/admin/topper/save`)
        .then()
        .catch((err) => console.log(err));
});