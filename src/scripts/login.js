import { login, verifyTypeUser } from "./request.js";

function entryPrincipal() {
  const form = document.querySelector(".form-login");

  const elements = [...form];

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const body = {};

    elements.forEach(e => {
      if (e.tagName == "INPUT" && e.value !== "") {
        body[e.id] = e.value;
      }
    });

    login(body);
  });
}

function backToRegister() {
  const register = document.querySelector(".btn-register-header");
  const bottomRegister = document.querySelector(".btn-register");
  register.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./register.html");
    }, 700);
  });
  bottomRegister.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./register.html");
    }, 700);
  });
}

async function verifyUser() {
  const token = localStorage.getItem("token");
  const isAdmin = await verifyTypeUser(token);
  return isAdmin;
}

function renderErrorModalEdit() {
  const inputEmail = document.querySelector("#email");
  inputEmail.style.border = "1px solid #C73650";
}

function renderError() {
  const span = document.querySelector(".msg-error");
  const inputPassword = document.querySelector("#password");

  inputPassword.style.border = "1px solid #C73650";
  span.classList.remove("hidden");
}

function cleanPwd() {
  const inputPwd = document.querySelector("#password");
  inputPwd.value = "";
}

function cleanInputPwd() {
  const inputEmail = document.querySelector(".loginemail");
  const inputPwd = document.querySelector(".loginpwd");
  const span = document.querySelector(".msg-error");
  inputPwd.addEventListener("keyup", () => {
    span.classList.add("hidden");
    inputEmail.style.border = "1px solid #e9ecef";
    inputPwd.style.border = "1px solid #e9ecef";
  });
}

function dropdownMenuRegister() {
  const dropdown = document.querySelector(".menu-three");
  const header = document.querySelector(".header");
  const btnDropdown = document.querySelector(".buttons-dropdown");
  const dropdownLogin = document.querySelector(".btn-login-dropdown");
  const dropdownRegister = document.querySelector(".btn-register-dropdown");
  const closeDropdown = document.querySelector(".modal-close-x");

  dropdown.addEventListener("click", () => {
    header.style.height = "110px";
    btnDropdown.classList.remove("hidden");
    closeDropdown.classList.remove("hidden");
    dropdown.classList.add("hidden");
  });

  closeDropdown.addEventListener("click", () => {
    header.style.height = "60px";
    btnDropdown.classList.add("hidden");
    closeDropdown.classList.add("hidden");
    dropdown.classList.remove("hidden");
  });

  dropdownRegister.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./register.html");
    }, 700);
  });

  dropdownLogin.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 700);
  });
}

export {
  entryPrincipal,
  backToRegister,
  verifyUser,
  renderError,
  cleanPwd,
  cleanInputPwd,
  renderErrorModalEdit,
  dropdownMenuRegister

};
