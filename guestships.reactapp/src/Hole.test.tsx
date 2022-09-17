import { act, render, screen} from "@testing-library/react";
import { Hole } from "./Hole";
import { ShipType } from "./ShipType";

describe(Hole, () => {
    it.each([
        ShipType.NoShip, 
        ShipType.Cruiser, 
        ShipType.Battleship])('renders button with class hole for ship of type %p', shipType => {
        render(<Hole shipType={shipType as ShipType} />);

        const buttonElement = screen.getByText(/●/i);
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('hole');
    });

    it('renders button with class hole shot-miss after clicking when shipType is NoShip', () => {
        render(<Hole shipType={ShipType.NoShip} />);

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
        ShipType.Battleship])('renders button with class hole shot-hit after clicking when shipType other than NoShip', shipType => {
        render(<Hole shipType={shipType} />);

        const buttonElement = screen.getByText(/●/i);
        act(() => {
            buttonElement.click();
        });
      
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('hole');
        expect(buttonElement).toHaveClass('shot-hit');
    });
});