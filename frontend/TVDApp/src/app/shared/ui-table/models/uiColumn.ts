import { UIColumnButton } from './uiColumnButton';

export class UIColumn {
    public title: string;
    public index?: string;
    public width?: string;
    public format?: string;
    public type?: 'checkbox' | 'link';
    public click?: (record: any) => any;
    public button?: UIColumnButton[];
}