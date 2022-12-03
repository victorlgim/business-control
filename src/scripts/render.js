import {
  getSectionCompanies,
  infoEmployeeHeader,
  infoEmployeeDepartamentUser,
  listEmplooyesViewAdmin,
  editInfoEmployeeRequest,
  deleteInfoEmployeeRequest,
  usersNoDepartament,
  allListDepartamentsCompanies,
  contractEmployeePutDepartament,
  dismissUsers,
  editDepartament,
  createDepartament,
  deleteDepartament,
  listUsersDepartament,
} from "./request.js";

import { filterCompaniesPutDepartament } from "./filter.js";

async function renderHomeSectionAll() {
  const listRenderSection = await getSectionCompanies();

  const ul = document.querySelector(".ul-section");
  listRenderSection.forEach(e => {
    const li = document.createElement("li");
    const divContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const divLiBtn = document.createElement("div");
    const spanWorking = document.createElement("span");
    const spanJobs = document.createElement("span");

    li.classList.add("li-section");
    divContainer.classList.add("container-section");
    h3.classList.add("name-jobs");
    divLiBtn.classList.add("div-li-btn");
    spanWorking.classList.add("working-day");
    spanJobs.classList.add("btn-jobs");

    h3.innerText = `${e.name}`;
    spanWorking.innerText = `Abre às: ${e.opening_hours}`;
    spanJobs.innerText = `${e.sectors.description}`;

    divLiBtn.append(spanWorking, spanJobs);
    divContainer.append(h3, divLiBtn);
    li.appendChild(divContainer);
    ul.appendChild(li);
  });
}

function renderFilterSectionAll(arr) {
  const ul = document.querySelector(".ul-section");
  arr.forEach(e => {
    const li = document.createElement("li");
    const divContainer = document.createElement("div");
    const h3 = document.createElement("h3");
    const divLiBtn = document.createElement("div");
    const spanWorking = document.createElement("span");
    const spanJobs = document.createElement("span");

    li.classList.add("li-section");
    divContainer.classList.add("container-section");
    h3.classList.add("name-jobs");
    divLiBtn.classList.add("div-li-btn");
    spanWorking.classList.add("working-day");
    spanJobs.classList.add("btn-jobs");

    h3.innerText = `${e.name}`;
    spanWorking.innerText = `Abre às: ${e.opening_hours}`;
    spanJobs.innerText = `${e.sectors.description}`;

    divLiBtn.append(spanWorking, spanJobs);
    divContainer.append(h3, divLiBtn);
    li.appendChild(divContainer);
    ul.appendChild(li);
  });
}

async function renderHeaderUser() {
  const token = localStorage.getItem("token");
  const getInfoProfileHeader = await infoEmployeeHeader(token);
  console.log(getInfoProfileHeader)
  const usernameModal = document.querySelector('#username')
  const emailModal = document.querySelector('#email')
  const username = document.querySelector(".username");
  const email = document.querySelector(".email");
  const cargo = document.querySelector(".cargo");
  const hour = document.querySelector(".type-job");
  const edit = document.querySelector(".btn-edit");

  username.innerText = getInfoProfileHeader.username;
  email.innerText = `Email: ${getInfoProfileHeader.email}`;
  if (getInfoProfileHeader.professional_level == "estágio") {
    cargo.innerText = "Estágio";
  } else if (getInfoProfileHeader.professional_level == "júnior") {
    cargo.innerText = "Junior";
  } else if (getInfoProfileHeader.professional_level == "pleno") {
    cargo.innerText = "Pleno";
  } else if (getInfoProfileHeader.professional_level == "sênior") {
    cargo.innerText = "Senior";
  }

  if (getInfoProfileHeader.kind_of_work == "home office") {
    hour.innerText = "Home Office";
  } else if (getInfoProfileHeader.kind_of_work == "presencial") {
    hour.innerText = "Presencial";
  } else if (getInfoProfileHeader.kind_of_work == "hibrido") {
    hour.innerText = "Híbrido";
  } else if (getInfoProfileHeader.kind_of_work == null) {
    hour.innerText = ''
  }

  usernameModal.value = getInfoProfileHeader.username
  emailModal.value= getInfoProfileHeader.email
  edit.id = getInfoProfileHeader.uuid;
}

async function renderCardsUsersPageDepartament(arr) {
  const section = document.querySelector(".departament-company");
  const h4 = document.createElement("h4");
  const div = document.createElement("div");
  const ul = document.createElement("ul");

  h4.classList.add("title-company");
  div.classList.add("container-ul");
  ul.classList.add("person-company");

  arr.forEach(ev => {
    ev.users.forEach(e => {
      const li = document.createElement("li");
      const h5 = document.createElement("h5");
      const span = document.createElement("span");

      li.classList.add("li-company");
      h5.classList.add("name-person");
      span.classList.add("cargo-person");

      h5.innerText = e.username;
      if (e.professional_level == "estágio") {
        span.innerText = "Estágio";
      } else if (e.professional_level == "júnior") {
        span.innerText = "Junior";
      } else if (e.professional_level == "pleno") {
        span.innerText = "Pleno";
      } else if (e.professional_level == "sênior") {
        span.innerText = "Sênior";
      }

      li.append(h5, span);
      ul.appendChild(li);
    });
  });
  div.appendChild(ul);
  section.append(h4, div);
}

async function renderUsersPageDepartament() {
  const token = localStorage.getItem("token");
  const getDepartaments = await listUsersDepartament(token);
  const users = await infoEmployeeHeader(token);

  const getUsersDepartament = await infoEmployeeDepartamentUser(token);
  const departamentNull = document.querySelector(".departament-null");
  const section = document.querySelector(".departament-company");

  if (!getUsersDepartament.length) {
    departamentNull.classList.remove("hidden");
    section.classList.add("hidden");
  } else {
    section.classList.remove("hidden");
    departamentNull.classList.add("hidden");
    renderCardsUsersPageDepartament(getUsersDepartament);
    setTimeout(() => {
      const title = document.querySelector(".title-company");
      getUsersDepartament.forEach(ev => {
        if (users.department_uuid == ev.uuid) {
          title.innerText = `${getDepartaments.name} - ${ev.name}`;
        }
      });
    }, 800);
  }
}

async function renderEmployeesAdminPage() {
  const token = localStorage.getItem("token");
  const getDepartaments = await allListDepartamentsCompanies(token);
  const getEmployeesAdmin = await listEmplooyesViewAdmin(token);

  const sectionUsers = document.querySelector(".users-cadastrados");
  const ulUsers = document.querySelector(".ul-departaments-user");
  const modalEdit = document.querySelector(".modal-container-edit-user");
  const closeModalEdit = document.querySelector(".close-edit-lapis");
  const modalDelete = document.querySelector(".modal-container-remove-user");
  const closeModalDelete = document.querySelector(".close-remove-user");
  const buttonEditModal = document.querySelector(".btn-edit-modal");

  const buttonDeleteModal = document.querySelector(".btn-remove-user");
  const filterEmployeesUsers = getEmployeesAdmin.filter(e => {
    return e.is_admin == false;
  });

  filterEmployeesUsers.forEach(e => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const spanNivel = document.createElement("span");
    const spanCompany = document.createElement("span");
    const divContainerTwo = document.createElement("div");
    const imgEdit = document.createElement("img");
    const imgDelete = document.createElement("img");

    li.classList.add("li-departaments-user");
    h3.classList.add("departament-name-user");
    spanNivel.classList.add("description-departament-user");
    spanCompany.classList.add("company-name-user");
    divContainerTwo.classList.add("bottom-li-departament-user");
    imgEdit.classList.add("lapis-user");
    imgDelete.classList.add("trash-user");

    imgEdit.src = "../assets/lapis-blue.png";
    imgDelete.src = "../assets/bottomtrash.png";
    imgEdit.alt = "Edição";
    imgDelete.alt = "Deletar";
    imgEdit.id = e.uuid;
    imgDelete.id = e.uuid;
    buttonEditModal.id = e.uuid;

    imgEdit.addEventListener("click", event => {
      modalEdit.classList.remove("hidden");
      buttonEditModal.id = event.target.id;
    });

    closeModalEdit.addEventListener("click", () => {
      modalEdit.classList.add("hidden");
    });

    imgDelete.addEventListener("click", event => {
      modalDelete.classList.remove("hidden");
      buttonDeleteModal.id = event.target.id;

      const titleUser = document.querySelector(".msg-remove-user");
      if (e.uuid == event.target.id) {
        titleUser.innerText = `Realmente deseja remover o usuário ${e.username}?`;
      }
    });

    closeModalDelete.addEventListener("click", () => {
      modalDelete.classList.add("hidden");
    });

    h3.innerText = e.username;
    if (e.professional_level == "estágio") {
      spanNivel.innerText = "Estágio";
    } else if (e.professional_level == "júnior") {
      spanNivel.innerText = "Júnior";
    } else if (e.professional_level == "pleno") {
      spanNivel.innerText = "Pleno";
    } else if (e.professional_level == "sênior") {
      spanNivel.innerText = "Sênior";
    }

    spanCompany.innerText = "Desempregado";

    getDepartaments.forEach(el => {
      if (e.department_uuid == el.uuid) {
        spanCompany.innerText = el.companies.name;
      }
    });

    divContainerTwo.append(imgEdit, imgDelete);
    li.append(h3, spanNivel, spanCompany, divContainerTwo);
    ulUsers.appendChild(li);
  });
}

async function renderAllDepartamentsViewAdmin(arr) {
  const ul = document.querySelector(".ul-departaments");
  const modalEyes = document.querySelector(".modal-container-eyes");
  const modalLapis = document.querySelector(
    ".modal-container-edit-desc-departament"
  );
  const modalTrash = document.querySelector(
    ".modal-container-delete-departament-user"
  );
  const btnDelete = document.querySelector(
    ".btn-confirm-delete-departament-user"
  );
  const btnEdit = document.querySelector(".btn-edit-description-departament");
  const closeEyes = document.querySelector(".close-edit-eyes");
  const closeLapis = document.querySelector(".close-edit-desc-departament");
  const closeTrash = document.querySelector(".close-delete-departament-user");

  arr.forEach(e => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const spanDescription = document.createElement("span");
    const spanCompany = document.createElement("span");
    const div = document.createElement("div");
    const imgView = document.createElement("img");
    const imgEdit = document.createElement("img");
    const imgTrash = document.createElement("img");

    li.classList.add("li-departaments");
    h3.classList.add("departament-name");
    spanDescription.classList.add("description-departament");
    spanCompany.classList.add("company-name");
    div.classList.add("bottom-li-departament");
    imgView.classList = "eyes eyesbutton";
    imgEdit.classList = "lapis lapisbutton";
    imgTrash.classList = "trash trashbutton";

    imgView.src = "../assets/eyes.png";
    imgEdit.src = "../assets/lapis.png";
    imgTrash.src = "../assets/bottomtrash.png";

    imgView.id = e.uuid;
    imgEdit.id = e.uuid;
    imgTrash.id = e.uuid;

    imgView.addEventListener("click", event => {
      modalEyes.classList.remove("hidden");
    });

    imgEdit.addEventListener("click", event => {
      modalLapis.classList.remove("hidden");
      btnEdit.id = event.target.id;
    });

    imgTrash.addEventListener("click", event => {
      modalTrash.classList.remove("hidden");
      const h3 = document.querySelector(".title-delete-departament-user");
      if (e.uuid == event.target.id) {
        h3.innerText = `Realmente deseja deletar o Departamento ${e.name} e demitir seus
        funcionários?`;
      }
      btnDelete.id = event.target.id;
    });

    closeEyes.addEventListener("click", () => {
      modalEyes.classList.add("hidden");
    });

    closeLapis.addEventListener("click", () => {
      modalLapis.classList.add("hidden");
    });

    closeTrash.addEventListener("click", () => {
      modalTrash.classList.add("hidden");
    });

    h3.innerText = e.name;
    spanDescription.innerText = e.description;

    spanCompany.innerText = e.companies.name;

    div.append(imgView, imgEdit, imgTrash);
    li.append(h3, spanDescription, spanCompany, div);
    ul.appendChild(li);
  });
}

async function selectAllCompanies() {
  const companies = await getSectionCompanies();
  const select = document.querySelector(".style-company");
  companies.forEach(e => {
    const option = document.createElement("option");
    option.innerText = e.name;
    option.value = e.uuid;
    select.appendChild(option);
  });
}

async function listUsersInSelectContract() {
  const token = localStorage.getItem("token");
  const select = document.querySelector(".select-user");
  const usersSold = await usersNoDepartament(token);

  usersSold.forEach(e => {
    const option = document.createElement("option");
    option.innerText = e.username;
    option.value = e.uuid;
    select.appendChild(option);
  });
}

function editInfoEmployees() {
  const token = localStorage.getItem("token");
  const formEdit = document.querySelector(".form-edit-user");
  const elements = [...formEdit.elements];

  formEdit.addEventListener("submit", async event => {
    event.preventDefault();
    const editButton = document.querySelector(".btn-edit-modal");
    const id = editButton.id;

    const bodyEdit = {};

    elements.forEach(e => {
      if (e.tagName !== "BUTTON" && e.value !== "") {
        bodyEdit[e.id] = e.value;
      }
    });

    const modalEdit = document.querySelector(".modal-container-edit-user");

    await editInfoEmployeeRequest(id, token, bodyEdit);

    const ul = document.querySelector(".ul-departaments-user");
    ul.innerHTML = "";

    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      modalEdit.classList.add("hidden");
      btnModal.classList.add("hidden");
      renderEmployeesAdminPage();
    }, 900);
  });
}

function deleteInfoEmployees() {
  const token = localStorage.getItem("token");
  const modalDeleted = document.querySelector(".modal-container-remove-user");
  const deleteButton = document.querySelector(".btn-remove-user");
  deleteButton.addEventListener("click", async event => {
    event.preventDefault();
    const id = deleteButton.id;

    await deleteInfoEmployeeRequest(id, token);
    const ul = document.querySelector(".ul-departaments-user");
    ul.innerHTML = "";
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      modalDeleted.classList.add("hidden");
      btnModal.classList.add("hidden");
      renderEmployeesAdminPage();
    }, 900);
  });
}

async function filterRenderInfoModalView() {
  const token = localStorage.getItem("token");
  const ul = document.querySelector(".ul-section-users");
  const title = document.querySelector(".name-departament");
  const desc = document.querySelector(".description-departament-modal");
  const company = document.querySelector(".company-pertinent");
  const div = document.querySelector(".erro-users");
  const section = document.querySelector(".section-users");

  const contractButton = document.querySelector(".btn-contratar");
  setTimeout(() => {
    const view = document.querySelectorAll(".eyesbutton");
    view.forEach(e => {
      e.addEventListener("click", async event => {
        const users = await listEmplooyesViewAdmin(token);
        const departaments = await allListDepartamentsCompanies(token);
        const findDepartament = departaments.find(ev => {
          return ev.uuid == event.target.id;
        });

        title.id = event.target.id;
        contractButton.id = event.target.id;
        title.innerText = findDepartament.name;
        desc.innerText = findDepartament.description;
        company.innerText = findDepartament.companies.name;
        ul.innerHTML = "";
        setTimeout(() => {
          const filterUsers = users.filter(ev => {
            return event.target.id == ev.department_uuid;
          });

          if (!filterUsers.length) {
            ul.innerHTML = "";
            renderNoEmployee();
          } else {
            section.style.width = "649px";
            section.style.border = "none";
            div.classList.add("hidden");
            renderEmployeesContractPage(filterUsers);
          }
        }, 800);
      });
    });
  }, 800);
}

function renderNoEmployee() {
  const section = document.querySelector(".section-users");
  const div = document.querySelector(".erro-users");
  section.style.border = "1px solid rgb(168, 168, 168)";
  section.style.width = "610px";
  div.classList.remove("hidden");
}

function contratEmployee() {
  const token = localStorage.getItem("token");
  const formCreate = document.querySelector(".form-contratar");
  const ul = document.querySelector(".ul-section-users");
  const select = document.querySelector(".select-user");
  const btnContratar = document.querySelector(".btn-contratar");
  const modal = document.querySelector(".modal-container-eyes");

  formCreate.addEventListener("submit", async event => {
    event.preventDefault();

    const bodyEdit = {
      user_uuid: select.value,
      department_uuid: btnContratar.id,
    };

    await contractEmployeePutDepartament(token, bodyEdit);
    const ul = document.querySelector(".ul-departaments-user");
    ul.innerHTML = "";
    const selectName = document.querySelector(".select-user");
    selectName.innerHTML = "";
    await listUsersInSelectContract();
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");

      btnModal.classList.add("hidden");
      renderEmployeesAdminPage();
    }, 1000);
  });
}

async function renderEmployeesContractPage(arr) {
  const token = localStorage.getItem("token");
  const getDepartaments = await allListDepartamentsCompanies(token);

  const section = document.querySelector(".section-users");
  const ul = document.querySelector(".ul-section-users");
  arr.forEach(e => {
    const li = document.createElement("li");
    const h5 = document.createElement("h5");
    const spanCargo = document.createElement("span");
    const spanCompany = document.createElement("span");
    const div = document.createElement("div");
    const button = document.createElement("button");

    li.classList.add("li-section-users");
    h5.classList.add("username-li");
    spanCargo.classList.add("cargo-li");
    spanCompany.classList.add("company-name-li");
    div.classList.add("btn-off-flex");
    button.classList.add("btn-off");

    h5.innerText = e.username;

    if (e.professional_level == "estágio") {
      spanCargo.innerText = "Estágio";
    } else if (e.professional_level == "júnior") {
      spanCargo.innerText = "Júnior";
    } else if (e.professional_level == "pleno") {
      spanCargo.innerText = "Pleno";
    } else if (e.professional_level == "sênior") {
      spanCargo.innerText = "Senior";
    }

    button.id = e.uuid;
    button.addEventListener("click", async event => {
      const modal = document.querySelector(".modal-container-eyes");
      await dismissUsers(event.target.id, token);

      const ul = document.querySelector(".ul-departaments-user");
      ul.innerHTML = "";
      const select = document.querySelector(".select-user");
      select.innerHTML = "";

      const btnModal = document.querySelector(".modal-loading");
      btnModal.classList.remove("hidden");
      setTimeout(() => {
        modal.classList.add("hidden");
        btnModal.classList.add("hidden");
        renderEmployeesAdminPage();
        listUsersInSelectContract();
      }, 1300);
    });

    getDepartaments.forEach(el => {
      if (e.department_uuid == el.uuid) {
        spanCompany.innerText = el.companies.name;
      }
    });

    button.innerText = "Demitir";

    div.appendChild(button);
    li.append(h5, spanCargo, spanCompany, div);
    ul.appendChild(li);
  });
}

async function editDescriptionModalAdmin() {
  const token = localStorage.getItem("token");
  const formEdit = document.querySelector(".form-edit-description-departament");
  const ul = document.querySelector(".ul-departaments");
  const textArea = document.querySelector(".text-area");

  const modal = document.querySelector(
    ".modal-container-edit-desc-departament"
  );

  formEdit.addEventListener("submit", async event => {
    event.preventDefault();
    
    const btnEdit = document.querySelector(".btn-edit-description-departament");

    const body = {
      description: textArea.value,
    };

    const data = await editDepartament(btnEdit.id, token, body);
    console.log(data)
  
    ul.innerHTML = "";
   
    
    filterCompaniesPutDepartament();
    filterRenderInfoModalView();
    modal.classList.add("hidden");
    formEdit.reset();
  });
}

async function createDepartamentAdmin() {
  const token = localStorage.getItem("token");
  const select = document.querySelector(".select-company");
  const companies = await getSectionCompanies();
  const ul = document.querySelector(".ul-departaments");
  const modal = document.querySelector(".modal-container-create-departament");
  companies.forEach(e => {
    const option = document.createElement("option");
    option.innerText = e.name;
    option.value = e.uuid;
    select.appendChild(option);
  });
  const form = document.querySelector(".form-create-departament");
  const elements = [...form.elements];

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const body = {};

    elements.forEach(e => {
      if (e.tagName !== "BUTTON" && e.value !== "") {
        body[e.id] = e.value;
      }
    });

    await createDepartament(token, body);
    ul.innerHTML = "";
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.add("hidden");

      btnModal.classList.add("hidden");
      filterCompaniesPutDepartament();
      filterRenderInfoModalView();
    }, 1000);
    form.reset();
  });
}

async function deleteDepartamentAdmin() {
  const token = localStorage.getItem("token");
  const modal = document.querySelector(
    ".modal-container-delete-departament-user"
  );
  const ul = document.querySelector(".ul-departaments");
  const ulTwo = document.querySelector(".ul-departaments-user");
  const buttonDelete = document.querySelector(
    ".btn-confirm-delete-departament-user"
  );

  buttonDelete.addEventListener("click", async event => {
    await deleteDepartament(event.target.id, token);
    ul.innerHTML = "";
    ulTwo.innerHTML = "";
    const btnModal = document.querySelector(".modal-loading");
    btnModal.classList.remove("hidden");
    setTimeout(() => {
      btnModal.classList.add("hidden");
      modal.classList.add("hidden");
      filterCompaniesPutDepartament();
      filterRenderInfoModalView();
      renderEmployeesAdminPage();
    }, 700);
  });
}

export {
  renderHomeSectionAll,
  renderFilterSectionAll,
  renderHeaderUser,
  renderUsersPageDepartament,
  renderEmployeesAdminPage,
  editInfoEmployees,
  deleteInfoEmployees,
  renderAllDepartamentsViewAdmin,
  listUsersInSelectContract,
  selectAllCompanies,
  filterRenderInfoModalView,
  contratEmployee,
  renderEmployeesContractPage,
  editDescriptionModalAdmin,
  createDepartamentAdmin,
  deleteDepartamentAdmin,
  renderCardsUsersPageDepartament,
};
