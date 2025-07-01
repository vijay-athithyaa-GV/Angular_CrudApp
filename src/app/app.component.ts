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
  editIndex: number | null = null;
  isEditMode: boolean = false;
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
      empId: new FormControl(this.employeeObj.empId,[Validators.required]),
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
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.employeeForm.controls['empId'].setValue(this.employeeList.length ? Math.max(...this.employeeList.map(e => e.empId)) + 1 : 1);
    this.employeeList.unshift(this.employeeForm.value);
    localStorage.setItem("Empdata", JSON.stringify(this.employeeList));
    this.onReset();
  }

  onEdit(item: EmployeeModel) {
    this.editIndex = this.employeeList.findIndex(emp => emp.empId === item.empId);
    this.employeeForm.patchValue(item);
    this.isEditMode = true;
  }
  onUpdate(){
    if (this.editIndex !== null && this.editIndex > -1) {
      this.employeeList[this.editIndex] = this.employeeForm.value;
      localStorage.setItem("Empdata", JSON.stringify(this.employeeList));
      this.onReset();
    }
  }

  onReset() {
    this.employeeObj = new EmployeeModel();
    this.createForm();
    this.isEditMode = false;
    this.editIndex = null;
  }
  onDelete(id:number){
    const isDelete = confirm("Are you sure want to delete",this.employeeForm.);
    if(isDelete){
      const index = this.employeeList.findIndex(m => m.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("Empdata",JSON.stringify(this.employeeList));
    }
  }
}
