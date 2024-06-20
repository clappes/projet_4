function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const modalClean = document.querySelectorAll(".button");
const formulaire = document.querySelector("form[name='reserve']");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// Clean modal event
modalClean.forEach((btn) => btn.addEventListener("click", cleanModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
// Close modal form
function closeModal() {
  modalbg.style.display = "none";
  form.reset();
}
// Clean modal form
function cleanModal() {
  formulaire.style.display = "none";
}
// --------------------------------------------------------------------------------------------

// Récupération des élements du formulaire 

const form = document.querySelector('form');

let first = document.getElementById("first");
let last = document.getElementById("last");
let email = document.getElementById("email");
let birth = document.getElementById("birthdate");
let quantity = document.getElementById("quantity");
let inputlocation = document.getElementsByName("location");
let inputcheckbox = document.getElementById("checkbox1");
let child = document.getElementById("condition");
let radio = document.getElementById("radio");
let br = document.createElement('br');

// Event submit sur le formulaire pour empêcher l'action par défaut d'être éxécuté
form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// --------------------------------------------------------------------------------------------

// function de validation pour le prénom et le nom
function validerPrenom(first) {
  if (first.trim().length < 2) {
    throw new Error("**Veuillez entrer 2 caractères ou plus pour le champ prénom.");
  }
}
function validerNom(last) {
  if (last.trim().length < 2) {
    throw new Error("**Veuillez entrer 2 caractères ou plus pour le champ nom.");
  }
}

// function de validation pour l'email
function validerEmail(email) {
  const regexEmail = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+");
  if (!regexEmail.test(email)) {
    throw new Error("**Veuillez entrer un email valide.");
  }
}

// function de validation de la date de naissance
function validerBirthdate(birth) {
  console.log(document.getElementById('birthdate'));
  let date = new Date();
  if (document.getElementById('birthdate').value === "" || new Date(birth) > date) {
    throw new Error("**Vous devez entrer votre date de naissance.");
  }
}

// function de validation de la quantity
function validerQuantity(quantity) {
  if (quantity == "") {
    throw new Error("**Veuillez entrer 1 chiffre ou plus pour ce champ.");
  }
}

// function de validation des btn radios
function validerRadio(type) {
  if (type == "") {
    throw new Error("**Veuillez sélectionner une option.");
  }
}

// function de validation des conditions
function validerChecbBox(inputcheckbox) {
  if (!inputcheckbox.checked) {
    throw new Error("**Vous devez accepter les conditions d'utilisation.");
  }
}

// --------------------------------------------------------------------------------------------

// function pour afficher les messages d'erreurs des champs 
function afficherErreur(message, element) {
  let error = document.getElementById(element.id + "_erreur");

  if (!error) {
    error = document.createElement("span");
    element.insertAdjacentElement("afterend", error);
    error.id = element.id + "_erreur";
    error.classList.add("errorMessage");
  }
  error.innerHTML = message;
  element.classList.add("errorBorder");
  element.addEventListener('input', () => {
    if (error) {
      error.remove();
      element.classList.remove("errorBorder");
    }
  });
}

// function pour afficher le message d'erreur des boutons radio
function afficherErreur2(message, element) {
  let error2 = document.getElementById(element.id + "_erreur");

  if (!error2) {
    error2 = document.createElement("span");
    radio.append(br);
    br.insertAdjacentElement("afterend", error2);
    error2.id = element.id + "_erreur";
    error2.classList.add("errorMessage");
  }
  error2.innerHTML = message;
  for (let i = 0; i < element.length; i++) {
    element[i].addEventListener('input', () => {
      if (error2) {
        error2.remove();
      }
    });
  }
}

// function pour afficher le message d'erreur des conditions d'utilisation
function afficherErreur3(message, element) {
  let error = document.getElementById(element.id + "_erreur");

  if (!error) {
    error = document.createElement("span");
    child.append(br);
    br.insertAdjacentElement("afterend", error);
    error.id = element.id + "_erreur";
    error.classList.add("errorMessage");
  }
  error.innerHTML = message;
  element.addEventListener('input', () => {
    if (error) {
      error.remove();
    }
  });
}

// --------------------------------------------------------------------------------------------
// function validate
function validate() {
  let bool = true;
  try {
    validerPrenom(first.value);
  }catch (Error){
    afficherErreur(Error.message , first);
    bool = false;
  }

  try {
    validerNom(last.value);
  }catch (Error){
    afficherErreur(Error.message, last);
    bool = false;
  }

  try {
    validerEmail(email.value);
  }catch (Error){
    afficherErreur(Error.message, email);
    bool = false;
  }

  try {
    validerBirthdate(birth.value);
  }catch (Error){
    afficherErreur(Error.message, birth);
    bool = false;
  }

  try {
    validerQuantity(quantity.value);
  }catch (Error){
    afficherErreur(Error.message, quantity);
    bool = false;
  }

 try {
  let location = "";
  for(let i = 0; i <inputlocation.length; i++){
    if(inputlocation[i].checked){
      location = inputlocation[i].value;
      break;
    }
  }
   validerRadio(location);
 }catch (Error){
   afficherErreur2(Error.message, inputlocation)
   bool = false;
 }

  try {
    validerChecbBox(inputcheckbox);
  }catch (Error){
    afficherErreur3(Error.message, inputcheckbox);
    bool = false;
  }
  if(bool){
    form.reset();
    cleanModal();

    let messageSuccess = document.createElement("p");
    let btnClose = document.createElement("button");

    messageSuccess.innerHTML = "Merci pour votre inscription";
    btnClose.innerHTML = "Fermer";

    btnClose.classList.add("btn-submit");
    messageSuccess.classList.add("msg-success");

    formulaire.append(br);
    formulaire.insertAdjacentElement("afterend", messageSuccess);
    messageSuccess.insertAdjacentElement("afterend", btnClose);

    btnClose.addEventListener("click", function() {
      messageSuccess.style.display = "none";
      btnClose.style.display = "none";
      formulaire.style.display = "block";
      modalbg.style.display = "none";
    });
    
    let closemodal = document.querySelector(".close");
    closemodal.addEventListener("click", function() {
      messageSuccess.style.display = "none";
      btnClose.style.display = "none";
      formulaire.style.display = "block";
      modalbg.style.display = "none";
    });
  } 
  
  return true;
}


