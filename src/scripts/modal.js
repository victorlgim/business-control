import {
  attInformationEmployee,
  infoEmployeeDepartamentUser,
  listUsersDepartament,
  infoEmployeeHeader,
} from "./request.js";
import { renderErrorModalEdit } from "./login.js";
import { renderCardsUsersPageDepartament } from "./render.js";

function modalEditUserDepartament() {
  const edit = document.querySelector(".btn-edit");
  const modal = document.querySelector(".modal-container");
  const closeModal = document.querySelector(".close-edit");
  const logout = document.querySelector(".btn-logout");

  edit.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  closeModal.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
  logout.addEventListener("click", () => {
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.replace("../../index.html");
    }, 400);
  });
}

async function requestEditUserDepartament() {
  const token = localStorage.getItem("token");
  const usernameModal = document.querySelector('#username')
  const emailModal = document.querySelector('#email')
  const modal = document.querySelector(".modal-container");
  const formEdit = document.querySelector(".form-edit");
  const elements = [...formEdit.elements];
  const ul = document.querySelector(".departament-company");
  const username = document.querySelector(".username");
  const email = document.querySelector(".email");

  formEdit.addEventListener("submit", async event => {
    event.preventDefault();

    const body = {};

    elements.forEach(e => {
      if (e.tagName !== "BUTTON" && e.value !== "") {
        body[e.id] = e.value;
      }
    });

    const button = document.querySelector(".btn-edit-profile");
    button.innerHTML = `<img src='../assets/spinner.png' class='spinner-img'>`;
    const data = await attInformationEmployee(token, body);
   
    
    console.log(data)
    setTimeout(async () => {
      const getDepartaments = await listUsersDepartament(token);
      const getUsersDepartament = await infoEmployeeDepartamentUser(token);
      const users = await infoEmployeeHeader(token);
      
      if (!data.error) {
        username.innerHTML = data.username;
        email.innerHTML = data.email;
        modal.classList.add("hidden");
        button.innerHTML = "Editar Perfil";
        formEdit.reset();
        ul.innerHTML = "";
        await renderCardsUsersPageDepartament(getUsersDepartament);
        setTimeout(() => {
          const title = document.querySelector(".title-company");
          getUsersDepartament.forEach(ev => {
            if (users.department_uuid == ev.uuid) {
              title.innerText = `${getDepartaments.name} - ${ev.name}`;
            }
          });
        }, 800);
      } else {
        renderErrorModalEdit();
        button.innerHTML = "Editar Perfil";
      }
      usernameModal.value = data.username
      emailModal.value = data.email
    }, 2000);
    
  });
}

function createDepartamentModalOpen() {
  const create = document.querySelector(".btn-create");
  const modal = document.querySelector(".modal-container-create-departament");
  const close = document.querySelector(".close-create-departament");
  create.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
  close.addEventListener("click", () => {
    modal.classList.add("hidden");
  });
}

export {
  modalEditUserDepartament,
  requestEditUserDepartament,
  createDepartamentModalOpen,
};
