export class RolePermissionDTO {
    RoleId: string;
    RoleName?: string;
    MenuId?: string;
    MenuName?: string;
    CanRead?: boolean;
    CanCreate?: boolean;
    CanUpdate?: boolean;
    CanDelete?: boolean;
    CanImport?: boolean;
    CanExport?: boolean;
    Status?: string;
    Role?: any;
    Menu?: any;
}
