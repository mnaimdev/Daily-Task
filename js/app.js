// Initialize DOM Content
// Login Element
const login = document.getElementById("login");
const loginContent = document.getElementById("loginContent");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const submit = document.getElementById("submit");
const profile = document.querySelector(".profile");
const form = document.getElementById("login-content-form");

const eye = document.getElementById("eye");

// Event Listener
eye.addEventListener("click", () => {
  if (loginPassword.type === "password") {
      eye.classList.add("fa-eye-slash");
      loginPassword.type = "text";
  } else {
      loginPassword.type = "password";
      eye.classList.remove("fa-eye-slash");
  }
});

login.addEventListener("click", () => {
    loginContent.classList.toggle("show");
})



// check form validation
const validate = () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const verify = email.match(mailFormat);

     if (!email || !password) {
       alert("Give your information please");
       return false;
   }
   else if (!verify) {
    alert("please enter as valid email address.");
    email.value = "";
    return false;
 } 
    else if (password.length < 8) {
        alert("password length should be greater than or equal 8");
       loginPassword.value = "";
    } else {
   loginContent.classList.remove("show");
   login.classList.add("hidden");
   profile.classList.remove("hidden");
   }
}

submit.addEventListener("click", validate);

// Todo Element
const addTask = document.getElementById("addTask");
const dateInput = document.getElementById("dateInput");
const taskInput = document.getElementById("taskInput");
const todoSection = document.querySelector(".todo-section");

addTask.addEventListener('click', createTask);

function createTask(event) {
    event.preventDefault();

  
        if (dateInput.value === "") {
            dateInput.focus();
            alert("Select Date");
            return false;
        }
        else if (taskInput.value === "") {
            taskInput.focus();
            alert("Enter  Task");
            return false;
        } else {

            let div = document.createElement("div");
            let ul = document.createElement("ul");
            let li = document.createElement("li");
            let span = document.createElement("span");
            let p = document.createElement("p");
            let button = document.createElement("button");
        
            div.className = "todos";
            ul.className = "todoUl";
            li.className = "listItem";
            button.className = "remove";
        
            span.innerText = dateInput.value;
            p.innerText = taskInput.value;
            console.log(taskInput.value);
            button.innerText = "X";
        
            li.appendChild(span);
            li.appendChild(p);
            li.appendChild(button);
        
            ul.appendChild(li);
            div.appendChild(ul);
            
            todoSection.appendChild(div);
            taskInput.value = "";
            dateInput.value = "";
        
            bindCompleteTask(li, deleteTask);
        }

};

function bindCompleteTask(listItem, deleteTask) {
    let removeBtn = listItem.querySelector(".remove");
    removeBtn.onclick = deleteTask;
}

function deleteTask() {
    let li = this.parentNode;
    let ul = li.parentNode;
    let div = ul.parentNode;
    div.remove();
}
