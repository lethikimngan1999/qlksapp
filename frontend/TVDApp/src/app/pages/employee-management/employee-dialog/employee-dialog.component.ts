import { Component, OnInit, Input } from '@angular/core';
import { TypeMessage } from 'src/app/app.constant';
import { UploadFile, NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Observable, Observer } from 'rxjs';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeePositionService } from 'src/app/shared/services/employee-position.service';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { EmployeeDTO } from 'src/app/models';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  isConfirmLoading = false;
  isShowAddEmployee = false;
  isSaveLoading = false;

  @Input() isAdd: boolean;
  @Input() employeeDto: EmployeeDTO;

  dateFormat = 'dd/MM/yyyy';
  validateForm: FormGroup;

  loading = false;
  avatarUrl: string;
  listEmployeePosition: any;
  selectedValue = null;

  constructor(
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private modal: NzModalRef,
    private employeePositionService: EmployeePositionService
  ) {
  }


  ngOnInit(): void {
    this.initFormValidate();
    if (!this.isAdd) {
      this.avatarUrl = this.employeeDto.Image;
    }
    this.getEmployeePosition();
  }


  private initFormValidate(): void {
    this.validateForm = this.fb.group({
      _ipText_identityCardNumber: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]],
      _ipText_firstName: ['', Validators.required],
      _ipText_lastName: ['', Validators.required],
      _ipDate_dateOfBirth: [null, Validators.required],
      _rdo_gender: ['False', Validators.required],
      _ipText_email: [null, [Validators.email, Validators.required]],
      _selectBox_employeePostition: ['', Validators.required],
      _ipText_phoneNumber: ['', [Validators.required, Validators.maxLength(13)]],
      _ipTextarea_address: ['', ''],
      _ipNumber_basicSalary: [0, ''],
      _ipDate_dateStartOfWork: [null, Validators.required],
      _ipUpload_image: ['', ''],
    });
  }


  beforeUpload = (file: File) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.message.error('Vui lòng tải lên hình ảnh có định dạng PNG hoặc JPEG!');
        observer.complete();
        return;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.message.error('Vui lòng tải lên hình ảnh có dung lượng nhỏ hơn hoặc bằng 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });
  };

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: UploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
          this.employeeDto.Image = this.avatarUrl;
        });
        break;
      case 'error':
        this.message.error('Network error');
        this.loading = false;
        break;
    }
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
    if (!this.employeeDto || this.isAdd) {
      this.insertEmployee();
    } else {
      this.updateEmployee();
    }
    console.log(this.employeeDto);
  }

  // tao nhan vien moi
  private insertEmployee(): void {
    
    if (this.employeeDto) {
      this.employeeService.create(this.employeeDto).subscribe(response => {

        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm nhân viên thành công!'
          );
        } else {
          this.message.create(TypeMessage.Error, 'Thêm nhân viên không thành công!'
          );
        }
        this.isConfirmLoading = false;
        this.resetForm();
      });
    }
  }

  private updateEmployee() {
    if (this.employeeDto) {
      this.employeeService.update(this.employeeDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật nhân viên thành công!'
          );
          console.log(this.employeeDto);
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật nhân viên không thành công!'
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

  private getEmployeePosition(): any {
    this.employeePositionService.getAll().subscribe(response => {
      if (response && response.Status) {
        this.listEmployeePosition = response.Data;
      }
    });
  }
}
