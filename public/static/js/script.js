function myMenuFunction() {
    var menuBth = document.getElementById("myNavMenu");
    if (menuBth.className === "nav-menu") {
        menuBth.className += " responsive";
    } else {
        menuBth.className = "nav-menu";
    }
}

/* -- dark mode -- */

const body = document.querySelector("body"), toggleSwitch = document.getElementById("toggle-switch");

toggleSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
});

/* -- Typing Effect -- */

var typingEffect = new Typed(".typedText", {
    strings: ["Civil", "Engineer", "Contractor", "Designer", "BIM modeler", "Cost estimator", "Programmer"],
    typeSpeed: 100,
    backSpeed: 60,
    loop: true,
    backDelay: 2000,
});

/*-- Scroll animation --*/

const sr = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 2000,
    reset: true
});

sr.reveal(".featured-name", { delay: 100 });
sr.reveal(".text-info", { delay: 200 });
sr.reveal(".text-btn", { delay: 200 });
sr.reveal(".social_icons", { delay: 200 });
sr.reveal(".featured-image", { delay: 320 });

sr.reveal(".project-box", { interval: 200 });

sr.reveal(".top-header", {});

const srLeft = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true
});

srLeft.reveal(".about-info", { delay: 100 });
srLeft.reveal(".contact-info", { delay: 100 });

const srRight = ScrollReveal({
    origin: "left",
    distance: "80px",
    duration: 2000,
    reset: true
});

srRight.reveal(".skill", { delay: 100 });
srRight.reveal(".skill-box", { delay: 100 });

/*-- active link --*/

const section = document.querySelectorAll(".section[id]");

function scrollActive() {
    const scrollY = window.scrollY;

    section.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id")
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.add("active-link")
        } else {
            document.querySelector(".nav-menu a[href*=" + sectionId + "]").classList.remove("active-link")
        }

    });
}

window.addEventListener("scroll", scrollActive);

/*-- Email Sender -- */

var errorsDiv = document.querySelector("#errors");

document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var formData = new FormData(this);
    errors = formValidation(formData)
    if (Object.keys(errors).length > 0) {
        displayErrors(errors)
    } else {
        errorsDiv.innerHTML = "";
        enviarDatos(formData);
        this.reset();
    }
});


function displayErrors(errors) {
    var ulElement = document.createElement("ul");


    for (var key in errors) {
        if (errors.hasOwnProperty(key)) {

            var liElement = document.createElement("li");
            liElement.textContent = errors[key];
            liElement.style.color = "red";
            ulElement.appendChild(liElement);
        }
    }

    errorsDiv.innerHTML = "";
    errorsDiv.appendChild(ulElement);
    var br = document.createElement("br");
    errorsDiv.appendChild(br);
}


function formValidation(formData) {
    var name = formData.get("name");
    var email = formData.get("email");
    var subject = formData.get("subject");
    var message = formData.get("message");

    var errors = {};

    if (!name) {
        errors["name"] = "Por favor, ingresa tu nombre.";
    }
    if (!email) {
        errors["email"] = "Por favor, ingresa tu correo electrónico.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        errors["email"] = "Por favor, ingresa un correo electrónico válido.";
    }
    if (!subject) {
        errors["subject"] = "Por favor, ingresa el asunto.";
    }
    if (!message) {
        errors["message"] = "Por favor, ingresa tu mensaje.";
    }

    return errors;
}


function enviarDatos(data) {
    fetch('https://script.google.com/macros/s/AKfycbxQFNtl8gYpepSCOIpKne-0I_8zmAp3WmByPplAnR97VoZLTD4wEIOlQUZG0_tr6Og8AQ/exec', {
        method: 'POST',
        body: data,
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud.');
            }
            return response.json();
        })
        .then(data => {
            openModal(successModal);
        })
        .catch(error => {
            console.error('Error:', error);
            openModal(errorModal);
        });
}

/*-- Modal --*/

var successModal = document.getElementById("successModal");
var errorModal = document.getElementById("errorModal");


var closeSuccess = document.querySelector("#successModal .close");
var closeError = document.querySelector("#errorModal .close");


// When the user clicks on <span> (x), close the modal
closeSuccess.onclick = function () {
    closeModal(successModal);
}

closeError.onclick = function () {
    closeModal(errorModal);
}

// Function to open modal
function openModal(modal) {
    modal.style.display = "block";
}

// Function to close modal
function closeModal(modal) {
    modal.style.display = "none";
}
