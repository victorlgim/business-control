import { renderHeaderUser, renderUsersPageDepartament } from "./render.js";
import {
  modalEditUserDepartament,
  requestEditUserDepartament,
} from "./modal.js";

import { verifyUser } from './login.js'

renderHeaderUser();
renderUsersPageDepartament();
modalEditUserDepartament();
requestEditUserDepartament();

const token = localStorage.getItem('token')
const verify = await verifyUser(token)

if (token == null || verify.is_admin) {
  window.location.replace("../../index.html");
} 
