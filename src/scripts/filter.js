import {
  listCompaniesSection,
  allListDepartamentsCompaniesAdmin,
  allListDepartamentsCompanies,
} from "./request.js";
import {
  renderFilterSectionAll,
  renderHomeSectionAll,
  renderAllDepartamentsViewAdmin,
  filterRenderInfoModalView,
} from "./render.js";

function filterSelectHomePage() {
  const selectFilter = document.querySelector(".setor-btn");
  selectFilter.addEventListener("change", async event => {
    if (event.target.value == "Todos") {
      const ul = document.querySelector(".ul-section");
      ul.innerHTML = "";
      renderHomeSectionAll();
    } else {
      const filterCompanies = await listCompaniesSection(event.target.value);
      const ul = document.querySelector(".ul-section");
      ul.innerHTML = "";
      renderFilterSectionAll(filterCompanies);
    }
  });
}

async function filterCompaniesPutDepartament() {
  const token = localStorage.getItem("token");
  const ul = document.querySelector(".ul-departaments");
  const divNull = document.querySelector(".div-null-admin");
  const h2 = document.querySelector(".msg-null-adm");
  const filterAllDepartaments = await allListDepartamentsCompanies(token);
  renderAllDepartamentsViewAdmin(filterAllDepartaments);
  const selectCompanies = document.querySelector(".style-company");
  selectCompanies.addEventListener("change", async event => {
    const filterDepartaments = await allListDepartamentsCompaniesAdmin(event.target.value, token);


    if (!filterDepartaments.length) {
      const ul = document.querySelector(".ul-departaments");
      ul.innerHTML = "";
      divNull.classList.remove("hidden");
      ul.style.border = "1px solid #A8A8A8";
      h2.innerText = "Não há departamentos nesta empresa";
    } else {
      const ul = document.querySelector(".ul-departaments");
      
      ul.innerHTML = "";
      ul.style.border = "1px solid #fff";
      divNull.classList.add("hidden");
      renderAllDepartamentsViewAdmin(filterDepartaments);
      await filterRenderInfoModalView();
    }
  });
}

export { filterSelectHomePage, filterCompaniesPutDepartament };
