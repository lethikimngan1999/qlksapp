export class MenuDTO {
    Id?: string;
    Name: string;
    Description: string;
    Status: string;
}

export class MenuSideBar {
    id: string;
    level: number;
    title: string;
    path: string;
    icon: string;
    selected: boolean;
    disabled: boolean;
    open: boolean;
    children?: MenuSideBar[];
    parent?: MenuSideBar;
}
