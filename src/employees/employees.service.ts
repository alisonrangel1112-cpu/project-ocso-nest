import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  private employees: CreateEmployeeDto[] = [
    {
    id: 1,
    name: "Erandi",
    lastName: "Frias",
    phoneNumber: "442 660 8899"
  },
{
  id: 2,
  name: "Daniela",
  lastName: "Cruz",
  phoneNumber: "446 556 7799"
}
];
  create(createEmployeeDto: CreateEmployeeDto) {
    createEmployeeDto.id = this.employees.length +1
    this.employees.push(createEmployeeDto);
    return createEmployeeDto;
  }

  findAll() {
    return this.employees;
  }

  findOne(id: number) {
    const employee = this.employees.filter((employee) => employee. id = id )[0];
    return employee;
  }

  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
  let employeeToUpdate = this.findOne(id);
  employeeToUpdate = {
    ...employeeToUpdate,
    ...updateEmployeeDto,
  }
  this.employees = this.employees.map((employee) => {
    if (employee.id == id){
      employee = employeeToUpdate
    }
    return employee
  })
  return employeeToUpdate;
  }
  

  remove(id: number) {
    this.employees = this.employees.filter((employee) => employee.id != id);
    return this.employees;
  }
}
