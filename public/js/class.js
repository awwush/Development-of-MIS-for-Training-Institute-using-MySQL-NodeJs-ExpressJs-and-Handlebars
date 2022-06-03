const form = document.querySelector("form");

function loading(booleanValue) {
	document.getElementById("addClass").disabled = booleanValue;
	if (booleanValue) {
		document.getElementById("loadingDiv").style.display = "block";
	} else {
		document.getElementById("loadingDiv").style.display = "none";
	}
}

const formHandler = (e) => {
	e.preventDefault();
	loading(true);

	const className = document.getElementById("name");
	const board = document.getElementById("board");
	const subject = document.getElementById("subject");
	const standard = document.getElementById("standard");
	const teacher = document.getElementById("teacher");

	// id is stored in value which is required in the class table as per schema of the database
	const details = {
		name: className.value,
		board_id: board.value,
		standard_id: standard.value,
		subject_id: subject.value,
		teacher_id: teacher.value,
		fees: fees.value,
	};

	console.log(details);

	fetch("class/save", {
		method: "POST",
		body: JSON.stringify(details),
		headers: { "Content-type": "application/json" },
		// redirect: "follow",
	})
		.then(
			async (response) => {
				// console.log("response came back");
				loading(false);
				var data = await response.json();
				swal(data.reason);
				setTimeout(() => {

					if (data.redirect != undefined)
						window.location.href = data.redirect;
					else {
						document.querySelector("#name").style.backgroundColor = "#FCA192";
					}
				}, 2000)



			},
			// (response) => {
			// 	console.log(`Request rejected ${response.status}`);

		)
	// 	.catch((error) => {
	// 		console.log(`Unhandled error ${error}`);
	// 	});
};

form.addEventListener("submit", formHandler);

// Work to be done after page is loaded
// fetch Boards, subjects, standards, teachers and add as options

document.addEventListener("DOMContentLoaded", fetchDataFromApi);

function fetchDataFromApi() {
	fetchBoard();
	fetchStandards();
	fetchSubjects();
	// fetch teachers after selection of subject using subject as a condition in where clause.
}

function fetchBoard() {
	board = document.getElementById("board");
	fetch("/admin/class/getBoard")
		.then((response) => {
			response.json().then((data) => {
				board.innerHTML = "";
				let select = document.createElement('option');
				select.text = "Select a Board!";
				select.value = "";
				board.add(select);
				data.sort();
				for (var i = 0; i < data.length; i++) {
					var opt = document.createElement('option');
					opt.value = data[i].id;
					opt.text = data[i].name;
					board.add(opt);
				}

			}).catch(err => {
				console.log(err);
			})
		})
}

function fetchStandards() {
	standard = document.getElementById("standard");
	fetch("/admin/class/getStandard")
		.then((response) => {
			response.json().then((data) => {
				standard.innerHTML = "";
				let select = document.createElement('option');
				select.text = "Select a Standard!";
				select.value = "";

				standard.add(select);
				data.sort();
				for (var i = 0; i < data.length; i++) {
					var opt = document.createElement('option');
					opt.value = data[i].id;
					opt.text = data[i].name;
					standard.add(opt);
				}

			}).catch(err => {
				console.log(err);
			})
		})
}

function fetchSubjects() {
	subject = document.getElementById("subject");
	fetch("/admin/class/getSubject")
		.then((response) => {
			response.json().then((data) => {
				subject.innerHTML = "";
				let select = document.createElement('option');
				select.text = "Select a Subject!";
				select.value = "";
				subject.add(select);
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
}
document.getElementById("subject").addEventListener("change", () => {
	teacher = document.getElementById("teacher");
	teacher.innerHTML = "";
	// teacher.empty();
	let select = document.createElement('option');
	select.text = "Assign it to a teacher";
	select.value = "";
	teacher.add(select);
	fetchTeachers();
})


// fetch teacher to be called when the subject is being selected by the user
// use where clause in teacher table where subject = "above choosen"
function fetchTeachers() {
	teacher = document.getElementById("teacher");
	subject = document.getElementById("subject");
	// console.log(subject.value);

	// console.log("in fetch teacher");
	fetch(`/admin/class/getTeacher/${subject.value}`)
		.then((response) => {
			response.json().then((data) => {


				console.log(subject.value);
				for (var i = 0; i < data.length; i++) {
					var opt = document.createElement('option');
					opt.value = data[i].id;
					opt.text = data[i].name;
					teacher.add(opt);
					console.log(data[i].name);
				}

			}).catch(err => {
				console.log(err);
			})
		})

}

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
				fetchBoard();
				document.getElementById("newBoardShortName").value = "";
				if (data.status == 200) {
					var myModalEl = document.querySelector('#addBoard');
					var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
					myModal.hide();
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
				fetchStandards();
				document.getElementById("newStandardName").value = "";
				if (data.status == 200) {
					var myModalEl = document.querySelector('#addStandard');
					var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
					myModal.hide();
				}
				console.log("response has come from the server for NEW STANDARD");
			},
			(response) => {
				console.log(`Request rejected ${response.status}`);
			},
		)
		.catch((error) => {
			console.log(`Unhandled error ${error}`);
		});
}

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
				fetchSubjects();
				document.getElementById("newSubjectName").value = "";
				if (data.status == 200) {
					var myModalEl = document.querySelector('#addSubject');
					var myModal = bootstrap.Modal.getOrCreateInstance(myModalEl);
					myModal.hide();
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
