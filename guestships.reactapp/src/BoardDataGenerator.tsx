import { BoardConfiguration } from "./BoardConfiguration";
import { BoardData, IBoardData } from "./BoardData";
import { IShip, Ship } from "./Ship";
import { ShipType } from "./ShipType";

export interface IBoardDataGenerator {
    GenerateNewBoard(): IBoardData;
}

export class BoardDataGenerator implements IBoardDataGenerator {

    private readonly columnLabels: string[];
    private readonly rowLabels: string[];
    private readonly holesWithShipIds: Map<string, number>;

    public constructor() {
        this.columnLabels = BoardConfiguration.GetColumnLabels();
        this.rowLabels = BoardConfiguration.GetRowLabels();
        this.holesWithShipIds = new Map<string, number>();
    }

    public GenerateNewBoard(): IBoardData {
        this.columnLabels.forEach((columnLabel: string) => {
            this.rowLabels.forEach((rowLabel: string) => {
                this.holesWithShipIds.set(`${columnLabel}${rowLabel}`, -1);
            });
        });

        const ships: IShip[] = this.SetupShips();

        return new BoardData(ships, this.holesWithShipIds, this.columnLabels, this.rowLabels);
    }

    private SetupShips(): IShip[] {
        return [
            this.SetShip(1, ShipType.Battleship),
            this.SetShip(2, ShipType.Cruiser),
            this.SetShip(3, ShipType.Cruiser)
        ];
    }

    private SetShip(id: number, shipType: ShipType): IShip {
        const ship: IShip = new Ship(id, shipType);
        const coordinatesOfShip: Coordinates[] = this.getShipPlacement(ship);

        coordinatesOfShip.forEach((coordinates: Coordinates) => {
            this.holesWithShipIds.set(this.getCoordinatesFromCoordinates(coordinates), id);
        });

        return ship;
    }

    private getShipPlacement(ship: IShip): Coordinates[] {
        let allHolesAreFine: boolean = false;
        
        let startCoords: Coordinates;
        let endCoords: Coordinates | null = null;
        let coordinatesBetween: Coordinates[] = [];

        do {
            startCoords = this.getEmptyRandomCoordinates();
            endCoords = this.getEndHole(startCoords, ship.shipType);

            if (endCoords) {
                coordinatesBetween = this.getCoordinatesBetween(startCoords, endCoords);

                let areCoordinatesBetweenFine: boolean = true;
                coordinatesBetween.forEach((coords: Coordinates) => {
                    areCoordinatesBetweenFine = areCoordinatesBetweenFine && this.getShipIdFromCoordinates(coords) === -1;
                });

                allHolesAreFine = areCoordinatesBetweenFine;
            }
        }
        while (!allHolesAreFine)

        const all = [startCoords];
        all.push(...coordinatesBetween);
        if (endCoords)
            all.push(endCoords);
        else 
            throw new Error("Ending coordiantes are null");
        
        return all;
    }

    private getEmptyRandomCoordinates(): Coordinates {
        let isHoleFree: boolean = false;
        let coordinates: Coordinates;

        do {
            coordinates = new Coordinates(this.getRandom(this.columnLabels.length), this.getRandom(this.rowLabels.length));
            const shipId: number = this.getShipIdFromCoordinates(coordinates);
            isHoleFree = shipId === -1;
        }
        while (!isHoleFree);

        return coordinates;
    }

    private getEndHole(startHoleCoordinates: Coordinates, shipType: ShipType): Coordinates | null {
        const candidates: Coordinates[] = this.getHoleCandidates(startHoleCoordinates, shipType);
        if (candidates.length > 0)
            return candidates[this.getRandom(candidates.length)];

        return null;
    }

    private getHoleCandidates(startCoordinates: Coordinates, shipType: ShipType): Coordinates[] {
        const shipLength: number = shipType as number - 1;
        const candidates: Coordinates[] = [];

        this.addIfAvailable(candidates, 
            this.tryGetCoordinates(startCoordinates.columnIndex, startCoordinates.rowIndex + shipLength),
            this.tryGetCoordinates(startCoordinates.columnIndex, startCoordinates.rowIndex - shipLength),
            this.tryGetCoordinates(startCoordinates.columnIndex + shipLength, startCoordinates.rowIndex),
            this.tryGetCoordinates(startCoordinates.columnIndex - shipLength, startCoordinates.rowIndex),
        );

        return candidates;
    }

    private addIfAvailable(candidates: Coordinates[], ...params: (Coordinates | null)[]) {
        params.forEach(coordinate => {
            if (coordinate && this.getShipIdFromCoordinates(coordinate) === -1) {
                candidates.push(coordinate);
            }
        });
    }

    private tryGetCoordinates(columnIndex: number, rowIndex: number) : Coordinates | null {
        if (columnIndex >= 0 && columnIndex < this.columnLabels.length && rowIndex >= 0 && rowIndex < this.rowLabels.length) {
            return new Coordinates(columnIndex, rowIndex);
        }
        return null;
    }

    private getRandom(exclusiveUpperBound: number): number {
        return Math.floor(Math.random() * exclusiveUpperBound)
    }

    private getShipIdFromCoordinates(coordinates: Coordinates): number {
        const obtainedValue: number | undefined = this.holesWithShipIds.get(this.getCoordinatesFromCoordinates(coordinates));
        if (obtainedValue)
            return obtainedValue;

        throw new Error("Coordinates does not match coordinate array");
    }

    private getCoordinatesBetween(start: Coordinates, end: Coordinates) {
        if (start.rowIndex === end.rowIndex)
            return this.getCoordinatesBetweenByColumn(start, end);
        if (start.columnIndex === end.columnIndex) 
            return this.getCoordinatesBetweenByRow(start, end);

        throw new Error("Start and end point of ship are set diagonally");
    }

    private getCoordinatesBetweenByColumn(start: Coordinates, end: Coordinates): Coordinates[] {
        const rowIndex: number = start.rowIndex;
        const startColumn: number = Math.min(start.columnIndex, end.columnIndex);
        const endColumn: number = Math.max(start.columnIndex, end.columnIndex);

        const coordinatesBetween: Coordinates[] = [];
        for (let i = startColumn + 1; i < endColumn; i++) {
            coordinatesBetween.push(new Coordinates(i, rowIndex));
        }

        return coordinatesBetween;
    }

    private getCoordinatesBetweenByRow(start: Coordinates, end: Coordinates): Coordinates[] {
        const columnIndex: number = start.columnIndex;
        const startRow: number = Math.min(start.rowIndex, end.rowIndex);
        const endRow: number = Math.max(start.rowIndex, end.rowIndex);

        const coordinatesBetween: Coordinates[] = [];
        for (let i = startRow + 1; i < endRow; i++) {
            coordinatesBetween.push(new Coordinates(columnIndex, i));
        }

        return coordinatesBetween;
    }

    private getCoordinatesFromCoordinates({ columnIndex, rowIndex }: Coordinates): string {
        return `${this.columnLabels[columnIndex]}${this.rowLabels[rowIndex]}`;
    }
}

class Coordinates {
    columnIndex: number;
    rowIndex: number;

    constructor(columnIndex: number, rowIndex: number) {
        this.columnIndex = columnIndex;
        this.rowIndex = rowIndex;
    }
}