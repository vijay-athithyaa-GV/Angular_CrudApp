import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeModel } from './models/Employee';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  employeeForm: FormGroup = new FormGroup({});
  employeeObj:EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  constructor(){
    this.createForm();
    const oldData = localStorage.getItem("Empdata");
    if(oldData != null){
       const parseData = JSON.parse(oldData);
       this.employeeList = parseData;
    }

  }

  createForm(){
    this.employeeForm = new FormGroup({
      empid: new FormControl(this.employeeObj.empId,[Validators.required]),
      name: new FormControl(this.employeeObj.name,[Validators.required]),
      city: new FormControl(this.employeeObj.city,[Validators.required]),
      address: new FormControl(this.employeeObj.address,[Validators.required]),
      contactNo: new FormControl(this.employeeObj.contactNo,[Validators.required]),
      emailId: new FormControl(this.employeeObj.emailId,[Validators.required]),
      pinCode: new FormControl(this.employeeObj.pinCode,[Validators.required]),
      state: new FormControl(this.employeeObj.state,[Validators.required]),
    })
  }

  onSave(){
    debugger;
    if(this.employeeForm.invalid){
      this.employeeForm.markAllAsTouched();
      return;
    }
    const oldData = localStorage.getItem("Empdata");
    if(oldData!=null){
      const parseData = JSON.parse(oldData);
      this.employeeForm.controls['empid'].setValue(parseData.length+1);
      this.employeeList.unshift( this.employeeForm.value);
    }else{
       this.employeeList.unshift(this.employeeForm.value);
    }
    localStorage.setItem("Empdata",JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }

  onEdit(item:EmployeeModel){
    this.employeeObj  = item;
    this.createForm();
  }
  onUpdate(){
    const record = this.employeeList.find(m => m.empId == this.employeeForm.controls['empid'].value)
    if(record!=undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
    }
    localStorage.setItem("Empdata",JSON.stringify(this.employeeList));
    this.employeeObj = new EmployeeModel();
    this.createForm();
  }
}
