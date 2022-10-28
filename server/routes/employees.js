/*Prajwal Purohit 301243308
  Midterm Exam
  Comp229*/

// modules required for routing
const e = require("connect-flash");
const { Console } = require("console");
let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

// define the employee model
let employee = require("../models/employees");

/* GET employee List page. READ */
router.get("/", (req, res, next) => {
  // find all employee in the employee_detail collection
  employee.find((err, employees) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("employees/index", {
        title: "Emplyoees",
        employees: employees,
      });
    }
  });
});

//  GET the Employee Details page in order to add a new employee
router.get("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('employees/add', {title: 'Add an Employee'});
});

// POST process the Employee Details page and create a new Employee - CREATE
router.post("/add", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
  let newEmployee = employee({
    "Employeename": req.body.EmployeeName,
    "Employeeid": req.body.EmployeeId,
    "Department": req.body.Department,
    "Designation": req.body.Designation,
    "Salary": req.body.Salary
  });

  employee.create(newEmployee, (err, employee) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/employees');
    }
  });
});

// GET the Employee Details page in order to edit an existing Employee
router.get("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/

  let id = req.params.id;
  employee.findById(id, (err, editEmployee) => {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.render('employees/details', {title: 'Employee Edit', employee: editEmployee });
    }
  })
});

// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
  /*****************
   * ADD CODE HERE *
   *****************/
   let id = req.params.id;

   let updatedEmployee = employee({
    "_id" : id,
    "Employeeid": req.body.Employeeid,
    "Employeename": req.body.Employeename,
    "Department": req.body.Department,
    "Designation": req.body.Designation,
    "Salary": req.body.Salary

   });

   employee.updateOne({_id : id}, updatedEmployee, (err) =>
   {
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      res.redirect('/employees');
    }
  });


});

// GET - process the delete by specific employeename
router.get("/delete/employees", (req, res, next) => {

  employee.deleteOne({Employeename: "Rolex"}, (err) => {
    if(err){
      console.log(err);
      res.end(err);
    }
    else
    {
      // refreshes the list
      res.redirect('/employees');
    }
  });

});

module.exports = router;
