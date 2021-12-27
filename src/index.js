import {Request} from "./requests";
import {UI} from "./ui";


const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");
const request = new Request("http://localhost:3000/employees");

// request.get()
// .then(employees => console.log(employees))
// .catch(err=>console.log(err));

// request.post({name:"Ahmet Gürsoy",department:"Pazarlama",salary:"6000"})
// .then(employee => console.log(employee))
// .catch(err => console.log(err));

// request.put(1,{name:"Ahmet Gürsoy",department:"Muhasebe",salary:"4500"})
// .then(employee=>console.log("employee"))
// .catch(err => console.log(err));

// request.delete(3)
// .then(message => console.log(message))
// .catch(err => console.log(err));

const ui = new UI();
let updateState = null; 

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click", UpdateOrDelete);
    updateEmployeeButton.addEventListener("click",updateEmployee);
    
}
function getAllEmployees(){
  request.get()
  .then(employees =>{
     ui.addAllEmployeesToUI(employees);
  })
  .catch(error =>console.log(error));

 }

 function addEmployee(e){

   const employeeName = nameInput.value.trim();
   const employeeDepartment = departmentInput.value.trim();
   const employeeSalary = salaryInput.value.trim();

   if(employeeName === ""||employeeDepartment === "" ||employeeSalary === "")
   {
      alert("Lütfen tüm alanları doldurun");
   }

   else
   {
      request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
      .then(employee => {
        ui.addEmployeeToUI(employee);
   })
   .catch(error =>console.log(error));
   }
}
function UpdateOrDelete(e){
  
   if(e.target.id === "delete-employee")
   {
       deleteEmployee(e.target);
   }
   else if(e.target.id === "update-employee")
   {
      updateEmployeeController(e.target.parentElement.parentElement);
   }
}

  function deleteEmployee(targetEmployee){
      const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;

      request.delete(id)
      .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
      })
      .catch(error => console.log(error));
    }

  function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);
    if(updateState === null){
      
      updateState = {
        updateId : targetEmployee.children[3].textContent,
        updateParent : targetEmployee
     }
   }
    else {
       updateState = null;

    }

}
   function updateEmployee(){
       if(updateState){
         
         const data = {name:nameInput.value.trim(),department:departmentInput.value.trim(),salary:Number(salaryInput.value.trim())}

         request.put(updateState.updateId,data)
          .then(updatedEmployee =>{
              ui.updateEmployeeOnUI(updatedEmployee,updateState.updateParent);
          })
          .catch(error =>console.log(error));

     }
  }
     
   

 




