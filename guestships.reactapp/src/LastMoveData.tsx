import { IShip } from "./Ship";

export class LastMoveData {
    public readonly lastMoveType: LastMoveDataType;
    public readonly lastShotShip: IShip;

    public constructor(lastMoveType: LastMoveDataType, lastShotShip: IShip) {
        this.lastMoveType = lastMoveType;
        this.lastShotShip = lastShotShip;
    }
}

export enum LastMoveDataType {
    NoMove,
    ShipShot,
    AllShipsSunk
}