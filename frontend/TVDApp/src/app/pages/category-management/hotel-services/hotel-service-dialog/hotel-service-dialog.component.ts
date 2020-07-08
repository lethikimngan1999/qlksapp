import { Component, OnInit, Input } from '@angular/core';
import { TypeMessage } from 'src/app/app.constant';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { HotelServiceDTO } from 'src/app/models/HotelServiceDTO';
import { HotelServiceService } from 'src/app/shared/services/hotel-service.service';

@Component({
  selector: 'app-hotel-service-dialog',
  templateUrl: './hotel-service-dialog.component.html',
  styleUrls: ['./hotel-service-dialog.component.css']
})
export class HotelServiceDialogComponent implements OnInit {

 
  isConfirmLoading = false;
  isShowAddHotelService = false;
  isSaveLoading = false;

  @Input() isAdd: boolean;
  @Input() hotelServiceDto: HotelServiceDTO;

  validateForm: FormGroup;

  selectedValue = null;

  constructor(
    private hotelServiceService: HotelServiceService,
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
      hotelServiceName: ['', Validators.required],
      hotelServicePrice: ['', Validators.required]
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
    if (!this.hotelServiceDto || this.isAdd) {
      this.insertHotelService();
    } else {
      this.updateHotelService();
    }
    console.log(this.hotelServiceDto);
  }

  // tao nhan vien moi
  private insertHotelService(): void {
    if (this.hotelServiceDto) {
      this.hotelServiceService.create(this.hotelServiceDto).subscribe(response => {

        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Thêm dịch vụ thành công!'
          );
        } else {
          this.message.create(TypeMessage.Error, 'Thêm dịch vụ không thành công!'
          );
        }
        this.isConfirmLoading = false;
        this.resetForm();
      });
    }
  }

  private updateHotelService() {
    if (this.hotelServiceDto) {
      this.hotelServiceService.update(this.hotelServiceDto).subscribe(response => {
        if (response && response.Status) {
          this.message.create(TypeMessage.Success, 'Cập nhật dịch vụ thành công!'
          );
          console.log(this.hotelServiceDto);
        } else {
          this.message.create(TypeMessage.Error, 'Cập nhật dịch vụ không thành công!'
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
