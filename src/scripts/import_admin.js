import {
  renderEmployeesAdminPage,
  editInfoEmployees,
  deleteInfoEmployees,
  listUsersInSelectContract,
  selectAllCompanies,
  filterRenderInfoModalView,
  contratEmployee,
  editDescriptionModalAdmin,
  createDepartamentAdmin,
  deleteDepartamentAdmin,
} from "./render.js";

import { filterCompaniesPutDepartament } from "./filter.js";
import { createDepartamentModalOpen } from "./modal.js";
import { backToLogin } from "./location.js";
import { verifyUser } from './login.js'

renderEmployeesAdminPage();
editInfoEmployees();
deleteInfoEmployees();
filterCompaniesPutDepartament();
createDepartamentModalOpen();
listUsersInSelectContract();
selectAllCompanies();
filterRenderInfoModalView();
contratEmployee();
editDescriptionModalAdmin();
createDepartamentAdmin();
deleteDepartamentAdmin();
backToLogin();

const token = localStorage.getItem('token')
const verify = await verifyUser(token)
const data = localStorage.getItem("token");
if (data == null || !verify.is_admin) {
  window.location.replace("../../index.html");
} 
