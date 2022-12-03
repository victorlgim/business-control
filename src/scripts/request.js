import {
  onToggleModal,
  onToggleModalError,
  inputErrorRegister,
} from "./register.js";
import { verifyUser, renderError } from "./login.js";

async function register(body) {
  try {
    const request = await fetch(`http://localhost:6278/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const form = document.querySelector(".form");

    if (request.ok) {
      onToggleModal();
      setTimeout(() => {
        window.location.replace('./login.html')
      }, 2000)
     
      form.reset();
    } else {
      onToggleModalError();
      inputErrorRegister();
    }
    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function login(body) {
  try {
    const request = await fetch(`http://localhost:6278/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const button = document.querySelector(".btn-login");
    button.innerHTML = `<img src='../assets/spinner.png' class='spinner-img'>`;

    if (request.ok) {
      const response = await request.json();
      localStorage.setItem("token", response.token);
      const isAdmin = await verifyUser();
      if (isAdmin.is_admin == false) {
        setTimeout(() => {
          window.location.replace("./userpage.html");
        }, 3000);
      } else {
        setTimeout(() => {
          window.location.replace("./adminpage.html");
        }, 3000);
      }
    } else {
      setTimeout(() => {
        renderError();
        button.innerHTML = "Login";
      }, 3000);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getSectionCompanies() {
  try {
    const request = await fetch(`http://localhost:6278/companies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function listCompaniesSection(section) {
  try {
    const request = await fetch(`http://localhost:6278/companies/${section}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function verifyTypeUser(token) {
  try {
    const request = await fetch(`http://localhost:6278/auth/validate_user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function infoEmployeeHeader(token) {
  try {
    const request = await fetch(`http://localhost:6278/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();
    return data;
  } catch (err) {}
}

async function infoEmployeeDepartamentUser(token) {
  try {
    const request = await fetch(
      `http://localhost:6278/users/departments/coworkers`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function attInformationEmployee(token, body) {
  try {
    const request = await fetch(`http://localhost:6278/users`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function listEmplooyesViewAdmin(token) {
  try {
    const request = await fetch(`http://localhost:6278/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function listAllDepartaments(token) {
  try {
    const request = await fetch(`http://localhost:6278/companies/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function editInfoEmployeeRequest(id, token, body) {
  try {
    const request = await fetch(
      `http://localhost:6278/admin/update_user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteInfoEmployeeRequest(id, token) {
  try {
    const request = await fetch(
      `http://localhost:6278/admin/delete_user/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function allListDepartamentsCompaniesAdmin(id, token) {
  try {
    const request = await fetch(`http://localhost:6278/departments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function allListDepartamentsCompanies(token) {
  try {
    const request = await fetch(`http://localhost:6278/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function usersNoDepartament(token) {
  try {
    const request = await fetch(`http://localhost:6278/admin/out_of_work`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function contractEmployeePutDepartament(token, body) {
  try {
    const request = await fetch(`http://localhost:6278/departments/hire/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function dismissUsers(id, token) {
  try {
    const request = await fetch(
      `http://localhost:6278/departments/dismiss/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function editDepartament(id, token, body) {
  try {
    const request = await fetch(`http://localhost:6278/departments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function createDepartament(token, body) {
  try {
    const request = await fetch(`http://localhost:6278/departments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function deleteDepartament(id, token) {
  try {
    const request = await fetch(`http://localhost:6278/departments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

async function listUsersDepartament(token) {
  try {
    const request = await fetch(`http://localhost:6278/users/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await request.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

export {
  register,
  login,
  getSectionCompanies,
  listCompaniesSection,
  verifyTypeUser,
  infoEmployeeHeader,
  infoEmployeeDepartamentUser,
  attInformationEmployee,
  listEmplooyesViewAdmin,
  listAllDepartaments,
  editInfoEmployeeRequest,
  deleteInfoEmployeeRequest,
  allListDepartamentsCompaniesAdmin,
  allListDepartamentsCompanies,
  usersNoDepartament,
  contractEmployeePutDepartament,
  dismissUsers,
  editDepartament,
  createDepartament,
  deleteDepartament,
  listUsersDepartament,
};
