import { MenuSideBar } from './models/MenuDTO';
import { toUnicode } from 'punycode';

// tslint:disable-next-line: eofline
export const API_ENDPOINT = 'http://localhost:57206/';
export const localStorageKey = 'access token';
export const SITENAME = 'NL Hotel Application';
export const StatusCodeHttp: any = {
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404
};

// admin
export const MENUS_SIDEBAR: MenuSideBar[] = [
    {
        id: '11111',
        level: 1,
        title: 'Dashboard',
        path: '',
        icon: 'dashboard',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Tình trạng phòng',
                path: 'qldatphong', // home
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Danh mục',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Loại phòng',
                path: 'roomType-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Chức vụ',
                path: 'employee-position-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Dịch vụ',
                path: 'hotelServices-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý đặt phòng',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Danh sách khách hàng',
                path: 'customer-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Danh sách phòng',
                path: '',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý nhân viên',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Danh sách nhân viên',
                path: 'employee-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý hệ thống',
        path: '',
        icon: 'team',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Tài khoản',
                path: 'users-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Vai trò',
                path: 'roles-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            // {
            //     id: '11111',
            //     level: 2,
            //     title: 'Quản lý API',
            //     path: 'api-management',
            //     icon: '',
            //     selected: false,
            //     disabled: false,
            //     open: false,

            // },
            {
                id: '11111',
                level: 2,
                title: 'Quyền truy cập',
                path: 'permissions-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            // {
            //     id: '11111',
            //     level: 2,
            //     title: 'Menu hệ thống',
            //     path: 'menus-management',
            //     icon: '',
            //     selected: false,
            //     disabled: false,
            //     open: false,

            // },
        ]
    },
];

// Lễ tân

export const MENUS_RECEPTION_SIDEBAR: MenuSideBar[] = [
    {
        id: '11111',
        level: 1,
        title: 'Dashboard',
        path: '',
        icon: 'dashboard',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Tình trạng phòng',
                path: 'qldatphong', // home
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Danh mục',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Loại phòng',
                path: 'roomType-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Dịch vụ',
                path: 'hotelServices-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý đặt phòng',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Danh sách khách hàng',
                path: 'customer-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Danh sách phòng',
                path: '',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Danh sách hóa đơn',
                path: '',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
];

// Quản lý nhân sự

export const MENUS_HRMANAGER_SIDEBAR: MenuSideBar[] = [
    {
        id: '11111',
        level: 1,
        title: 'Danh mục',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Chức vụ',
                path: 'employee-position-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý nhân viên',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Danh sách nhân viên',
                path: 'employee-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý hệ thống',
        path: '',
        icon: 'team',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Tài khoản',
                path: 'users-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Vai trò',
                path: 'roles-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            // {
            //     id: '11111',
            //     level: 2,
            //     title: 'Quản lý API',
            //     path: 'api-management',
            //     icon: '',
            //     selected: false,
            //     disabled: false,
            //     open: false,

            // },
            {
                id: '11111',
                level: 2,
                title: 'Quyền truy cập',
                path: 'permissions-management',
                icon: '',
                selected: false,
                disabled: false,
                open: false,

            },
            // {
            //     id: '11111',
            //     level: 2,
            //     title: 'Menu hệ thống',
            //     path: 'menus-management',
            //     icon: '',
            //     selected: false,
            //     disabled: false,
            //     open: false,

            // },
        ]
    },
];

// Quản lý kinh doanh


export const MENUS_BUSSINESSMANAGER_SIDEBAR: MenuSideBar[] = [
    {
        id: '11111',
        level: 1,
        title: 'Dashboard',
        path: '',
        icon: 'dashboard',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Tình trạng phòng',
                path: 'qldatphong', // home
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Danh mục',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Loại phòng',
                path: 'roomType-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },

            {
                id: '11111',
                level: 2,
                title: 'Dịch vụ',
                path: 'hotelServices-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
    {
        id: '11111',
        level: 1,
        title: 'Quản lý đặt phòng1',
        path: '',
        icon: 'team',
        open: false,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Danh sách khách hàng',
                path: 'customer-management',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Danh sách phòng',
                path: '',
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
];

// kế toán

export const MENUS_ACCOUNTANTS_SIDEBAR: MenuSideBar[] = [
    {
        id: '11111',
        level: 1,
        title: 'Dashboard',
        path: '',
        icon: 'dashboard',
        open: true,
        selected: false,
        disabled: false,
        children: [
            {
                id: '11111',
                level: 2,
                title: 'Quản lý hóa đơn - Phiếu dịch vụ',
                path: '', // home
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
            {
                id: '11111',
                level: 2,
                title: 'Thống kê - Báocáo',
                path: '', // home
                icon: 'user',
                selected: false,
                disabled: false,
                open: false,

            },
        ]
    },
];
