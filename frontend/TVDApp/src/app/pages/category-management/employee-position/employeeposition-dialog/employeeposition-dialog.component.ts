import { Component, OnInit, Input } from '@angular/core';
import { TypeMessage } from 'src/app/app.constant';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EmployeePositionDTO } from 'src/app/models';
import { EmployeePositionService } from 'src/app/shared/services/employee-position.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-employeeposition-dialog',
  templateUrl: './employeeposition-dialog.component.html',
  styleUrls: ['./employeeposition-dialog.component.css']
})
export class EmployeepositionDialogComponent implements OnInit {

  isConfirmLoading = false;
  isShowAddEmployeePosition = false;
  isSaveLoading = false;

  @Input() isAdd: boolean;
  @Input() employeePositionDto: EmployeePositionDTO;

  validateForm: FormGroup;

  selectedValue = null;

  constructor(
    private employeePositionService: EmployeePositionService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
  ) {
  }


  ngOnInit(): void {
    this.initFormValidate();
  }


  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      employeePositionName: ['', Validators.required]
    });
  }

  public handleCancelButton(): void {
    this.resetForm();
    this.modal.destroy();
  }

  public handleSubmitButton(): void {
    this.isSaveLoading = true;
    this.saveData();
    setTimeout(() => {
      this.isSaveLoading = false;
    }, 1000);
    this.modal.destroy();
  }
  /**
  * check them hoac chinh sua nhan vien
  */
  private saveData() {
    this.isConfirmLoading = true;
    if (!this.employeePositionDto || this.isAdd) {
      this.insertEmployeePosition();
    } else {
      this.updateEmployeePosition();
    }
    console.log(this.employeePositionDto);
  }

  // tao nhan vien moi
  private insertEmployeePosition(): void {
    if (this.employeePositionDto) {
      this.employeePositionService.create(this.employeePositionDto).subscribe(response => {

        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm chức vụ thành công!'
          );
        } else {
          this.message.create(TypeMessage.Error, 'Thêm chức vụ không thành công!'
          );
        }
        this.isConfirmLoading = false;
        this.resetForm();
      });
    }
  }

  private updateEmployeePosition() {
    if (this.employeePositionDto) {
      this.employeePositionService.update(this.employeePositionDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật chức vụ thành công!'
          );
          console.log(this.employeePositionDto);
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật chức vụ không thành công!'
          );
        }
        this.isConfirmLoading = false;
      });
    }
  }


  resetForm(): void {
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

}
