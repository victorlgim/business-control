function entryToLoginAndRegister() {
  const login = document.querySelector(".btn-login-header");
  const register = document.querySelector(".btn-register-header");
  login.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./src/pages/login.html");
    }, 700);
  });

  register.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./src/pages/register.html");
    }, 700);
  });
}

function backToLogin() {
  const logoutAdmin = document.querySelector(".btn-logout");
  logoutAdmin.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("../../index.html");
      localStorage.removeItem("token");
    }, 1500);
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
      window.location.replace("./src/pages/register.html");
    }, 700);
  });

  dropdownLogin.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      window.location.replace("./src/pages/login.html");
    }, 700);
  });
}

export { entryToLoginAndRegister, backToLogin, dropdownMenuRegister };
