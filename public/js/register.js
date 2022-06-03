
const form = document.querySelector("form");


function loading(booleanValue) {
	document.getElementById("registerBtn").disabled = booleanValue;
	if(booleanValue){
		document.getElementById("loadingDiv").style.display = "block";
	}else {
		document.getElementById("loadingDiv").style.display = "none";
	}
}


const formHandler = (e) => {
	e.preventDefault();
	loading(true);

	const adminName = document.getElementById("name");
	const mobileNo = document.getElementById("mobNo");
	const instituteName = document.getElementById("instituteName");
	const email = document.getElementById("email");
	const id = document.getElementById("id");
	const aadhaar = document.getElementById("aadhaar");

	const details = {
		name: adminName.value,
		mobile: mobileNo.value,
		institute_name: instituteName.value,
		email: email.value,
		id: id.value,
		aadhaar: aadhaar.value,
	};

	fetch("/users/register", {
		method: "POST",
		body: JSON.stringify(details),
		headers: { "Content-type": "application/json" },
		redirect: "follow",
	}).then((response) => {
		loading(false);
		if (response.redirected) window.location.href = response.url;
		else {
			response.json().then((res) => {
				console.log(res);
				if (res.reason) {
					console.log(`Already signed up with this id`);
					// swal(`Already signed up with this id`);
					swal(res.reason);


				}
			});
		}
	},
		(response) => {
			console.log(`Request rejected ${response.status}`);
		}).catch((error) => {
			console.log(`Unhandled error ${error}`);
		});
};

form.addEventListener("submit", formHandler);