import { ShipType } from "./ShipType";

export interface IShip {
    id: number;
    isSunk: boolean;
    shipType: ShipType;

    Hit(): void;
    OnHit?(ship: IShip): void;
}

class NoShip implements IShip {
    id: number = -1;
    isSunk: boolean = true;;
    shipType: ShipType = ShipType.NoShip;

    public Hit(): void {
        this.OnHit(this);
    }

    public OnHit(ship: IShip): void { }
}

export class Ship implements IShip {
    public static readonly noShip: IShip = new NoShip();

    public readonly id: number;
    public readonly shipType: ShipType;

    private readonly hitsToSink: number;
    private hits: number = 0;

    public get isSunk(): boolean {
        return this.hits >= this.hitsToSink;
    }

    public constructor(id: number, shipType: ShipType) {
        this.id = id;
        this.shipType = shipType;
        this.hitsToSink = shipType as number;
    }

    public Hit(): void {
        this.hits++;
        this.OnHit(this);
    }
    
    public OnHit(ship: IShip): void { }
}
