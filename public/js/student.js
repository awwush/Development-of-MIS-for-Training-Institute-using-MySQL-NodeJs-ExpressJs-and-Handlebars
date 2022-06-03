const form = document.querySelector("form");


function loading(booleanValue) {
	document.getElementById("addStudent").disabled = booleanValue;
	if (booleanValue) {
		document.getElementById("loadingDiv").style.display = "block";
	} else {
		document.getElementById("loadingDiv").style.display = "none";
	}
}

document.addEventListener("DOMContentLoaded" , () => {
	fetchBoard();
	fetchStandards();
});

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



document.querySelector("#board").addEventListener("change",() => {
	if(document.querySelector("#board").value != "" && document.querySelector("#standard").value != "" ){
		fetchClasses();
	}
})
document.querySelector("#standard").addEventListener("change",() => {
	if(document.querySelector("#board").value != "" && document.querySelector("#standard").value != "" ){
		fetchClasses();
	}
})

const fetchClasses = () => {
	const board = document.querySelector("#board"); 
	const standard = document.querySelector("#standard");
	
		fetch(`/admin/student/getClasses?board_id=${board.value}&standard_id=${standard.value}`)
		.then( async (responses)=>{
			// console.log(responses);
			const data = await responses.json();
			const classField = document.querySelector("#classesHolder");
			classField.innerHTML = "";
				data.forEach((response) => {
					const div = document.createElement("div");
					div.classList.add("form-check");
					div.classList.add("form-switch");
					div.classList.add("form-check-inline");
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
		})
	
}
document.querySelector("#nullclass").addEventListener("click",() => {
	if(document.querySelector("#nullclass").checked){
		document.getElementsByName("addClass").forEach((ele)=>{
			ele.checked = true;
		})
	}else {
		document.getElementsByName("addClass").forEach((ele)=>{
			ele.checked = false;
		})
	}
})



// After fetching the standard for the student
// use the below link for classes addition to classesHolder div
 // using it for help -- https://stackoverflow.com/questions/59337691/can-i-clone-edit-and-append-a-div

// document.querySelector("#details").addEventListener("submit",() => {
// 	console.log("hello there!");
// 	formHandler();

// });

const formHandler = (e) => {
	e.preventDefault();
	// console.log("hello again!");
	loading(true);

	const studentName = document.getElementById("name");
	const studentMobNo = document.getElementById("mobNo");
	const studentEmail = document.getElementById("email");
	const studentBoard = document.getElementById("board");
	const studentStandard = document.getElementById("standard");
	const birthday = document.getElementById("birthday");
	const gender = document.getElementsByName("gender");
	const fatherName = document.getElementById("fatherName");
	const motherName = document.getElementById("motherName");
	const parentEmail = document.getElementById("parentEmail");
	const parentMobNo = document.getElementById("parentMobNo");
	// const studentClass = document.getElementById("studentClass");

	 
	var classList = [];
	document.getElementsByName("addClass").forEach((ele) => {
		if(ele.checked){
			classList.push(ele.value);
		}
	});


	var genderValue;
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].checked) genderValue = gender[i].value;
    }
	const details = {
		studentName: studentName.value,
		studentMobNo: studentMobNo.value,
		studentEmail: studentEmail.value,
		studentBoard: studentBoard.value,
		studentStandard: studentStandard.value,
		birthday: birthday.value,
		gender: genderValue,
		fatherName: fatherName.value,
		motherName: motherName.value,
		parentEmail: parentEmail.value,
		parentMobNo: parentMobNo.value,
		class: classList,
	};

	console.log(details);

	fetch("/admin/student/save", {
		method: 'POST',
		body: JSON.stringify(details),
		headers: { "Content-type": "application/json" },
	}).then(async (response) => {
		const data = await response.json();
		swal(data.reason);
		loading(false);

		// setTimeout(() => {

		// 	if (data.redirect != undefined)
		// 		window.location.href = data.redirect;
		// }, 2000)
	})
};

form.addEventListener("submit", formHandler);
