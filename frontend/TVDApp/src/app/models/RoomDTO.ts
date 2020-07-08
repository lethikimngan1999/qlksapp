import { RoomTypeDTO } from './RoomTypeDTO';

export class RoomDTO {
    RoomId: string;
    RoomTypeId: string;
    RoomName: string;
    RoomPhone: string;
    MaxGuests: number;
    Status: boolean;
    RoomTypes: RoomTypeDTO[];
}