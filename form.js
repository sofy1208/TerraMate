const form = document.querySelector(".formu");
const inputs = document.querySelectorALL(".formu input");
const suscribeBtn = document.querySelector(".suscribe-btn");

const expresiones = {
	name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
	password: /^.{8,12}$/, 
	mail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	phone: /^\d{7,14}$/ 
}


const empty = (value) => (value = "" ? false : true);

const long = (length, min, max) => (length<min || length>max ? false: true);

const error = (input, msg) => {
    const formField = input.parentElement;
    formField.classList.remove("succes");
    formField.classList.add("error");
    const error = formField.querySelector("");
    error.textContent = msg;
};

const succes = (input) => {

}