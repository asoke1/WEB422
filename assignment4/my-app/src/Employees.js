import React, {Component} from 'react'
import MainContainer from './MainContainer'
import moment from 'moment'

class Employees extends Component{
    constructor(props){
        super(props);
        this.state = {
            employees: []
        };
    }

    componentDidMount(){
        fetch("https://web-okeabiodun.herokuapp.com/employees")
        .then(res=>res.json())
        .then(returnedData=>{
            this.setState({
                employees: returnedData
            })
        }).catch(err=>{
            console.log(err);
        });
    }

    render(){
        return(
            <MainContainer sidebar="Employees">
                <h1 className="page-header">Employees</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <td><b>Name & Position</b></td>
                            <td><b>Address</b></td>
                            <td><b>Phone Num</b></td>
                            <td><b>Hire Date</b></td>
                            <td><b>Salary Bonus</b></td>
                        </tr>        
                    </thead>
                        
                    <tbody>
                        {this.state.employees.map(employee=>{
                            //let projectEndDate = project.ProjectEndDaet ? project.ProjectEndDate : "n/a";
                            return(
                                <tr key={employee._id}>
                                    <td>{employee.FirstName} {employee.LastName} - {employee.Position.PositionName}</td>
                                    <td>{employee.AddressStreet}, {employee.AddressCity} {employee.AddressState}, {employee.AddressZip}</td>
                                    <td>{employee.PhoneNum}</td>
                                    <td>{moment(employee.HireDate).utc().format('LL')}</td>
                                    <td>$ {employee.SalaryBonus}</td>
                                </tr>           
                            );
                        })} 
                    </tbody>
                </table>
            </MainContainer>
        );
    }
}

export default Employees;