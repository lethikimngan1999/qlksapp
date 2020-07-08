export const TypeMessage = {
    Success: 'success',
    Error: 'error',
    Warning: 'warning'
};

export const FormatDateTime = {
    DATE_FMT: 'dd/MMM/yyyy',
    DATE_TIME_FMT: 'dd/MMM/yyyy hh:mm:ss'
};

export const GioiTinh = [
    {
        value: 'F',  display: 'Female'
    },
    { value: 'M', display: 'Male'}
];

export enum Role {
    User = 'User',
    Admin = 'Admin',
    HRManager = 'Quản lý nhân sự',
    Receptionists = 'Nhân viên lễ tân',
    BusinessManager = 'Quản lý kinh doanh',
    Accountants = 'Nhân viên kế toán'
}
