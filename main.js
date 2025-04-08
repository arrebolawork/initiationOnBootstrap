const indexFrom = document.querySelector("#myForm");
const emailPatter = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const namePatter = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;
const passPatter = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/;

if (window.document.location.pathname === "/initiationOnBootstrap/index.html") {
  indexFrom.addEventListener("submit", verifyEmptyInputs);
} else if (window.document.location.pathname === "/initiationOnBootstrap/usuarios.html") {
  document.addEventListener("DOMContentLoaded", () => {
    renderUsers();
  });
}

function verifyEmptyInputs(e) {
  //compruebo los input userName userEmail userPass userRepeatPass
  e.preventDefault();
  const userName = indexFrom[0].value.trim();
  const userEmail = indexFrom[3].value.trim();
  const userPass = indexFrom[5].value.trim();
  const userRepeatPass = indexFrom[6].value.trim();

  userName === "" || userEmail === "" || userPass === "" || userRepeatPass === "" ? showAlert("danger", "Debes rellenar todos los campos obligatorios") : validations();
}

function showAlert(alertColor, message) {
  if (message === "Debes rellenar todos los campos obligatorios") {
    const userName = indexFrom[0];
    const userEmail = indexFrom[3];
    const userPass = indexFrom[5];
    const userRepeatPass = indexFrom[6];

    userName.className = "form-control is-valid";
    userEmail.className = "form-control is-valid";
    userPass.className = "form-control is-valid";
    userRepeatPass.className = "form-control is-valid";

    if (userName.value.trim() === "") {
      userName.className = "form-control is-invalid";
    }
    if (userEmail.value.trim() === "") {
      userEmail.className = "form-control is-invalid";
    }
    if (userPass.value.trim() === "") {
      userPass.className = "form-control is-invalid";
    }
    if (userRepeatPass.value.trim() === "") {
      userRepeatPass.className = "form-control is-invalid";
    }
  }
  const container = document.getElementById("relativeContainer");
  const divAlert = document.createElement("div");
  divAlert.id = "newAlert";
  divAlert.className = `position-absolute top-50 start-50 translate-middle alert alert-${alertColor} fade show`;
  divAlert.role = "alert";
  divAlert.textContent = `${message}`;
  container.appendChild(divAlert);
  if (alertColor === "danger" || alertColor === "warning") return alertTimer(3500);
  alertTimer(2500);
}
function alertTimer(num) {
  setTimeout(() => {
    document.getElementById("newAlert").remove();
  }, num);
}
function validations() {
  const userName = indexFrom[0].value.trim();
  const userEmail = indexFrom[3].value.trim();
  const userPass = indexFrom[5].value.trim();
  const userRepeatPass = indexFrom[6].value.trim();

  let correctName = true;
  let correctEmail = true;
  let correctPass = true;
  let correctVerify = true;

  userName.className = "form-control";
  userEmail.className = "form-control";
  userPass.className = "form-control";
  userRepeatPass.className = "form-control";

  if (!namePatter.test(userName)) {
    userName.className = "form-control border border-danger";
    correctName = false;
    showAlert("danger", "El formato del nombre no es correcto");
  }

  if (!emailPatter.test(userEmail)) {
    userEmail.className = "form-control border border-danger";
    correctEmail = false;
    showAlert("danger", "El formato del email no es correcto");
  }

  if (userRepeatPass !== userPass) {
    userRepeatPass.className = "form-control border border-danger";
    correctVerify = false;
    showAlert("danger", "Las contraseñas deben coincidir");
  } else if (!passPatter.test(userPass)) {
    userPass.className = "form-control border border-danger";
    correctPass = false;
    showAlert("danger", "La contraseña debe contener Mayúsculas, Minúsculas, Números y carácteres especiales. Longitud minima 8 carácteres");
  }

  if (correctName && correctEmail && correctPass && correctVerify) {
    createUser();
  }
}

function createUser() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userName = indexFrom[0].value.trim();
  const lastName = indexFrom[1].value.trim();
  const image = indexFrom[2].value.trim();
  const userEmail = indexFrom[3].value.trim();
  const userCity = indexFrom[4].value.trim();
  const userPass = indexFrom[5].value.trim();

  const userFind = users.find((user) => user.email === userEmail);

  if (userFind) {
    showAlert("warning", "Ya existe un usuario con ese EMAIL");
    return;
  }

  const newUser = {
    name: userName,
    lastName: lastName,
    urlImg: image,
    email: userEmail,
    city: userCity,
    pass: userPass,
  };

  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  indexFrom.reset();
  showAlert("success", "Usuario Creado correctamente");
  redirectToUsuarios();
}
function redirectToUsuarios() {
  const link = document.getElementById("linkUsers");

  setTimeout(() => {
    link.click();
  }, 3000);
}
function renderUsers() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  if (users.length === 0) {
    return isNoUsers();
  } else {
    return users.forEach((user) => isUsers(user));
  }
}

function isNoUsers() {
  const container = document.getElementById("usersRenderContainer");
  const div = document.createElement("div");
  const title2 = document.createElement("h2");
  title2.innerText = "No hay usuarios guardados en el LocalStorage";
  div.appendChild(title2);
  container.appendChild(div);
}

function isUsers(user) {
  const container = document.getElementById("usersRenderContainer");

  const div = document.createElement("div");
  div.className = "card";
  div.style.width = "18rem";

  const image = document.createElement("img");
  image.src = user.urlImg || "https://cdn.pixabay.com/photo/2015/05/25/17/25/duck-783684_1280.jpg";
  image.className = "card-img-top";
  image.alt = "Perfil de usuario";
  image.style.minHeight = "219.25px";

  const div2 = document.createElement("div");
  div2.className = "card-body";

  const title5 = document.createElement("h5");
  title5.className = "card-title text-uppercase text-center";
  title5.textContent = `${user.name} ${user.lastName}`;

  const lista = document.createElement("ul");
  lista.className = "list-group list-group-flush";

  const item1 = document.createElement("li");
  item1.className = "list-group-item";
  item1.innerText = user.email;
  const item2 = document.createElement("li");
  item2.className = "list-group-item";
  item2.innerText = user.city || "Capital del Mundo(Bilbao)";

  lista.appendChild(item1);
  lista.appendChild(item2);
  div2.appendChild(title5);
  div2.appendChild(lista);
  div.appendChild(image);
  div.appendChild(div2);
  container.appendChild(div);
}
