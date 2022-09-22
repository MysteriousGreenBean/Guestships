import { Ship } from "./Ship";
import { ShipType } from "./ShipType";

describe(Ship, () => {
    it.each([
        ShipType.NoShip,
        ShipType.Cruiser,
        ShipType.Battleship
    ])('remembers its own id', (shipType: ShipType) => {
        const testShip = new Ship(1, shipType);
        expect(testShip.id).toEqual(1);
    });

    it.each([
        ShipType.NoShip,
        ShipType.Cruiser,
        ShipType.Battleship
    ])('remembers its own ship type', (shipType: ShipType) => {
        const testShip = new Ship(1, shipType);
        expect(testShip.shipType).toEqual(shipType);
    });

    it('is always sunk if its type is NoShip', () => {
        const testShip = new Ship(1, ShipType.NoShip);
        expect(testShip.isSunk).toEqual(true);
    });

    it.each([
        ShipType.Cruiser,
        ShipType.Battleship
    ])('is sunk only after amounts of hits equal to enum value if it is other than NoShip', (shipType: ShipType) => {
        const testShip = new Ship(1, shipType);
        const expectedAmountOfHits = shipType as number;

        for (let i = 0; i < expectedAmountOfHits; i++)
        {
            expect(testShip.isSunk).toEqual(false);
            testShip.Hit();
        }

        expect(testShip.isSunk).toEqual(true);
    });
});