import { IShip, Ship } from "./Ship";

export interface IBoardData {
    readonly ships: IShip[];
    readonly holesWithShipIds: Map<string, number>;
    readonly columnLabels: string[];
    readonly rowLabels: string[];
    readonly isInitialized: boolean;

    GetShipForCoordinates(coordinates: string): IShip;
}

class NoBoardData implements IBoardData {
    public readonly ships: IShip[] = [];
    public readonly holesWithShipIds: Map<string, number> = new Map<string, number>();
    public readonly columnLabels: string[] = [];
    public readonly rowLabels: string[] = [];
    public readonly isInitialized: boolean = false;

    GetShipForCoordinates(coordinates: string): IShip {
        return Ship.noShip;
    }
}

export class BoardData implements IBoardData {
    public static readonly noBoardData: IBoardData = new NoBoardData();

    public readonly ships: IShip[];
    public readonly holesWithShipIds: Map<string, number>;
    public readonly columnLabels: string[];
    public readonly rowLabels: string[];
    public readonly isInitialized: boolean;

    public constructor(ships: IShip[], holesWithShipIds: Map<string, number>, columnLabels: string[], rowLabels: string[]) {
        this.ships = ships;
        this.holesWithShipIds = holesWithShipIds;
        this.columnLabels = columnLabels;
        this.rowLabels = rowLabels;
        this.isInitialized = true;
    }

    public GetShipForCoordinates(coordinates: string): IShip {
        const shipId: number | undefined = this.holesWithShipIds.get(coordinates);
        if (shipId === -1 || shipId === undefined)
            return Ship.noShip;
        return this.ships.find(ship => ship.id === shipId) ?? Ship.noShip;
    }
}

