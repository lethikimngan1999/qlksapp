export class UIColumnButton {
    public text: string;
    public click?: (record: any) => any;
    public type?: 'primary' | 'default' | 'dashed' | 'danger' | 'link';
}