import { register } from "./request.js";

function getValueInput() {
  const form = document.querySelector(".form");
  const elements = [...form.elements];
  const pwd = document.querySelector("#password");

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const body = {};

    elements.forEach(e => {
      if (e.tagName !== "BUTTON" && e.value !== "") {
        body[e.id] = e.value;
      }
    });

    pwd.value = "";
    await register(body);
  });
}

function backToHomePage() {
  const backToHome = document.querySelector(".backtohome");
  const backToLogin = document.querySelector(".btn-login-header");
  backToHome.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("../../index.html");
    }, 700);
  });

  backToLogin.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./login.html");
    }, 700);
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

  dropdownLogin.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./login.html");
    }, 700);
  });
}

function onToggleModal() {
  const modal = document.querySelector(".modal-container-verify");
  modal.classList.remove("hidden");
}

function onToggleModalError() {
  const modalError = document.querySelector(".modal-container-err");
  modalError.classList.remove("hidden");
  setTimeout(() => {
    modalError.classList.add("hidden");
  }, 4000);
}

function inputErrorRegister() {
  const username = document.querySelector(".username");
  const email = document.querySelector(".email");
  username.style.border = "1px solid #C73650";
  email.style.border = "1px solid #C73650";
}

function cleanInput() {
  const inputEmail = document.querySelector(".email");
  const inputUser = document.querySelector(".username");
  inputEmail.addEventListener("keyup", () => {
    inputEmail.style.border = "1px solid #e9ecef";
    inputUser.style.border = "1px solid #e9ecef";
  });
  inputUser.addEventListener("keyup", () => {
    inputEmail.style.border = "1px solid #e9ecef";
    inputUser.style.border = "1px solid #e9ecef";
  });
}

function menuNavbarMobile() {
  const menu = document.querySelector(".menu-three");
  const divView = document.querySelector(".buttons-header");
  const divMenu = document.querySelector(".menu-header");
  const closeMenu = document.querySelector(".");
  menu.addEventListener("click", () => {
    divView.classList.remove("hidden");
    divMenu.classList.add("hidden");
  });
}

export {
  getValueInput,
  backToHomePage,
  onToggleModal,
  onToggleModalError,
  menuNavbarMobile,
  inputErrorRegister,
  cleanInput,
  dropdownMenuRegister,
};
