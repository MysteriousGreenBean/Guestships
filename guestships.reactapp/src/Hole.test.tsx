import { act, render, screen} from "@testing-library/react";
import { Hole } from "./Hole";
import { IShip } from "./Ship";
import { ShipType } from "./ShipType";

describe(Hole, () => {
    it('', () => expect(true).toEqual(true));
    it.each([
        ShipType.NoShip, 
        ShipType.Cruiser, 
        ShipType.Battleship])('renders button with class hole for ship of type %p', (shipType: ShipType) => {
        render(<Hole ship={{shipType: shipType} as IShip} />);
        
        const buttonElement = screen.getByText(/●/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('hole');
    });

    it('renders button with class hole shot-miss after clicking when shipType is NoShip', () => {
        render(<Hole ship={{shipType: ShipType.NoShip, Hit: () => {}} as IShip} />);

        const buttonElement = screen.getByText(/●/i);
        act(() => {
            buttonElement.click();
        });
      
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('hole');
        expect(buttonElement).toHaveClass('shot-miss');
    });

    it.each([
        ShipType.Cruiser,
        ShipType.Battleship])('renders button with class hole shot-hit after clicking when shipType other than NoShip', (shipType: ShipType) => {
        render(<Hole ship={{shipType: shipType, Hit: () => {}} as IShip} />);

        const buttonElement = screen.getByText(/●/i);
        act(() => {
            buttonElement.click();
        });
      
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('hole');
        expect(buttonElement).toHaveClass('shot-hit');
    });

    it.each([
        ShipType.NoShip,
        ShipType.Cruiser,
        ShipType.Battleship])('calls Hit method on ship when button is clicked', (shipType: ShipType) => {
        
        let hitClicked: boolean = false;
        render(<Hole ship={{shipType: shipType, Hit: () => { hitClicked = true; }} as IShip} />);

        const buttonElement = screen.getByText(/●/i);
        act(() => {
            buttonElement.click();
        });
      
        expect(hitClicked).toEqual(true);
    });

    it.each([
        ShipType.NoShip,
        ShipType.Cruiser,
        ShipType.Battleship])('calls Hit method on ship only first time when button is clicked', (shipType: ShipType) => {
        
        let clickCount: number = 0;
        render(<Hole ship={{shipType: shipType, Hit: () => { clickCount++; }} as IShip} />);

        const buttonElement = screen.getByText(/●/i);
        act(() => {
            buttonElement.click();
        });

        act(() => {
            buttonElement.click();
        });
      
        expect(clickCount).toEqual(1);
    });

});