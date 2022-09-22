import { render, screen, waitFor } from "@testing-library/react";
import { FeedbackBox } from "./FeedbackBox";
import { LastMoveData, LastMoveDataType } from "./LastMoveData";
import { IShip, Ship } from "./Ship";
import { ShipType } from "./ShipType";

describe(FeedbackBox, () => {+
    it('does not render anything if no move was yet made', async () => {
        const { container } = render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.NoMove, Ship.noShip)} />);

        await waitFor(() => {
            expect(container.childElementCount).toEqual(0);
        });
    });

    it('renders Miss! when shot was taken and missed', () => {
        render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.ShipShot, { shipType: ShipType.NoShip } as IShip)} />);

        const textElement = screen.getByText('Miss!');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('feedback');
    });

    it('renders Battleship is hit! when battleship was hit', () => {
        render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.ShipShot, { shipType: ShipType.Battleship } as IShip)} />);

        const textElement = screen.getByText('Battleship is hit!');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('feedback');
    });

    it('renders Battleship is hit and sunk! when battleship was hit and sunk', () => {
        render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.ShipShot, { shipType: ShipType.Battleship, isSunk: true } as IShip)} />);

        const textElement = screen.getByText('Battleship is hit and sunk!');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('feedback');
    });

    it('renders Cruiser is hit! when battleship was hit', () => {
        render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.ShipShot, { shipType: ShipType.Cruiser } as IShip)} />);
        
        const textElement = screen.getByText('Cruiser is hit!');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('feedback');
    });

    it('renders Cruiser is hit and sunk! when Cruiser was hit and sunk', () => {
        render(<FeedbackBox lastMoveData={new LastMoveData(LastMoveDataType.ShipShot, { shipType: ShipType.Cruiser, isSunk: true } as IShip)} />);

        const textElement = screen.getByText('Cruiser is hit and sunk!');
        expect(textElement).toBeInTheDocument();
        expect(textElement).toHaveClass('feedback');
    });
}); 