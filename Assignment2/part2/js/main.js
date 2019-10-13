/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: _Abiodun Oke__ Student ID: _117180166__ Date: _2019-05-29__
*
*
********************************************************************************/ 

$(document).ready(function(){
    console.log("jQuery working");
    let employeesModel = [];
    initializeEmployeesModel();

    $( "#employee-search").on("keyup", function(event){
        console.log(this.value);
        let filterEmp = getFilteredEmployeesModel(this.value);
        refreshEmployeeRows(filterEmp);
    });
    $(document.body).on('click', '.body-row' ,function(emp){
        let employee = getEmployeeModelById($(this).attr("data-id"));
        if(employee != null){
            
            employee.HireDate = moment(employee.HireDate).format('LL');
            
            let modalContentTemplate = _.template(
                '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %>, <%- employee.AddressState %>. <%- employee.AddressZip %></br>' + 
                '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %></br>' +
                '<strong>Hire Date:</strong> <%- employee.HireDate %>' 
              );

              let modalContent = modalContentTemplate({'employee':employee});
   
              showGenericModal(employee.FirstName + ' ' + employee.LastName, modalContent);
        }
    });
});

function initializeEmployeesModel(){
    $.ajax({
        url: "https://web-okeabiodun.herokuapp.com/employees",
        type: "GET",
        contentType: "application/json"
    })
    .done(function(employee){
        employeesModel = employee;
        refreshEmployeeRows(employeesModel);
    })
    .fail(function(err){
        showGenericModal('Error', 'Unable to get Employees');
    });
};

function showGenericModal(title, message){
    $("#genericModal .modal-title").empty()
        .append(title);
    $("#genericModal .modal-body").empty()
        .append(message);
    $("#genericModal").modal('show');
};

function refreshEmployeeRows(employees){
    $("#employees-table").empty();
    let template = _.template('<% _.forEach(employees, function(employee){%>' +
                                   '<div class="row body-row" data-id="<%- employee._id %>">' +
                                        '<div class="col-xs-4 body-column"><%- _.escape(employee.FirstName) %></div>'+
                                        '<div class="col-xs-4 body-column"><%- _.escape(employee.LastName) %></div>'+
                                        '<div class="col-xs-4 body-column"><%- _.escape(employee.Position.PositionName) %></div>'+
                                    '</div>'+
                                '<% }); %>');

    $("#employees-table").append(template({'employees': employees}));
};

function getFilteredEmployeesModel(filterString){
    let filteredEmployeesModel = _.filter(employeesModel, function(e){
        if(e.FirstName.toUpperCase().includes(filterString.toUpperCase())
            ||e.LastName.toUpperCase().includes(filterString.toUpperCase())
            ||e.Position.PositionName.toUpperCase().includes(filterString.toUpperCase())) 
            return true;
        else 
            return false;            
    });
    return filteredEmployeesModel;        
};

function getEmployeeModelById(id){
    let copy_emp = null;
    $.grep(employeesModel, function(employee, i) {
        if(employee._id == id) {
            copy_emp = _.cloneDeep(employee);
        }
        return false;
    });
    return copy_emp;
}
