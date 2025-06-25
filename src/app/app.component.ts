import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule } from '@angular/forms';
import { EmployeeModel } from './models/Employee';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm?: FormGroup;
  employeeObj:EmployeeModel = new EmployeeModel();

  constructor(){
    this.createForm();
  }

  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId),
      name: new FormControl(this.employeeObj.name),
      city: new FormControl(this.employeeObj.city),
      address: new FormControl(this.employeeObj.address),
      contactNo: new FormControl(this.employeeObj.contactNo),
      emailId: new FormControl(this.employeeObj.emailId),
      pinCode: new FormControl(this.employeeObj.pinCode),
      state: new FormControl(this.employeeObj.state),
    })
  }

}
