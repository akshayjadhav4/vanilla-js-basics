// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitButton = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFlag = false;
let editId = "";
// ****** EVENT LISTENERS **********

// ****** FUNCTIONS **********

const displayAlert = (message, action) => {
  alert.textContent = message;
  alert.classList.add(`alert-${action}`);

  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
};

// ****** LOCAL STORAGE **********

const getLocalStorage = () => {
  return localStorage.getItem("items")
    ? JSON.parse(localStorage.getItem("items"))
    : [];
};
const addToLocalStorage = (id, value) => {
  const grocery = { id, value };
  let items = getLocalStorage();
  items.push(grocery);
  localStorage.setItem("items", JSON.stringify(items));
};

const removeFromLocalStorage = (id) => {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id);
  localStorage.setItem("items", JSON.stringify(items));
};

const editLocalStorage = (id, value) => {
  let items = getLocalStorage();
  items = items.filter((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  localStorage.setItem("items", JSON.stringify(items));
};

const setBackToDefault = () => {
  grocery.value = "";
  editFlag = "";
  editId = "";
  submitButton.textContent = "Add";
};

const deleteItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;

  list.removeChild(element);

  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("Item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
};

const editItem = (e) => {
  const element = e.currentTarget.parentElement.parentElement;
  //   console.log(e.currentTarget.parentElement.previousElementSibling); ==> gives p tag
  editElement = e.currentTarget.parentElement.previousElementSibling;

  //set form value
  grocery.value = editElement.innerHTML;
  editFlag = true;
  editId = element.dataset.id;
  submitButton.textContent = "Edit";
};

//  helper
const createListItem = (id, value) => {
  const element = document.createElement("article");
  element.classList.add("grocery-item");

  let attribute = document.createAttribute("data-id");
  attribute.value = id;
  // adding dataset id to edit item later
  element.setAttributeNode(attribute);
  element.innerHTML = `<p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;

  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  // append child in list
  list.appendChild(element);
};

const addItem = (e) => {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();

  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert("Item added", "success");

    // show container
    container.classList.add("show-container");

    addToLocalStorage(id, value);
    setBackToDefault();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("Item updated", "success");
    editLocalStorage(editId, value);
    setBackToDefault();
  } else {
    displayAlert("Please enter a value", "danger");
  }
};

const clearItems = () => {
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => {
      list.removeChild(item);
    });
  }
  container.classList.remove("show-container");
  displayAlert("All items removed.", "danger");
  setBackToDefault();
  localStorage.removeItem("items");
};

// submit form
form.addEventListener("submit", addItem);

// remove all items
clearBtn.addEventListener("click", clearItems);

// load items
window.addEventListener("DOMContentLoaded", () => {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
});
