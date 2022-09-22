import { render, screen } from "@testing-library/react";
import { Board } from "./Board";
import { IBoardData } from "./BoardData";
import { Ship } from "./Ship";

jest.mock('./BoardData');

describe(Board, () => {

    it.each([
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ], columnLabels: [ '' ], GetShipForCoordinates: (c) => Ship.noShip } as IBoardData,
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], columnLabels: [ '' ], GetShipForCoordinates: (c) => Ship.noShip} as IBoardData
    ])(('renders row labels according to boardData'), (boardData: IBoardData) => {
        render(<Board boardData={boardData} />);

        boardData.rowLabels.forEach(label => {
            const labelElement = screen.getByText(label);
            expect(labelElement).toBeInTheDocument();
            expect(labelElement).toHaveClass('label');
        });
    });

    it.each([
        { rowLabels: [''], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], GetShipForCoordinates: (c) => Ship.noShip } as IBoardData,
        { rowLabels: [''], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], GetShipForCoordinates: (c) => Ship.noShip} as IBoardData
    ])(('renders column labels according to boardData'), (boardData: IBoardData) => {
        render(<Board boardData={boardData} />);

        boardData.columnLabels.forEach(label => {
            const labelElement = screen.getByText(label);
            expect(labelElement).toBeInTheDocument();
            expect(labelElement).toHaveClass('label');
        });
    });

    it.each([
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], GetShipForCoordinates: (c) => Ship.noShip } as IBoardData,
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], GetShipForCoordinates: (c) => Ship.noShip } as IBoardData,
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], GetShipForCoordinates: (c) => Ship.noShip} as IBoardData,
        { rowLabels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'], columnLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'], GetShipForCoordinates: (c) => Ship.noShip} as IBoardData,
    ])('render rows x columns holes', async (boardData: IBoardData) => {
        render(<Board boardData={boardData}/>);

        const holes = await screen.findAllByTestId('hole');
        holes.map(hole => expect(hole).toBeInTheDocument());
        expect(holes.length).toEqual(boardData.columnLabels.length * boardData.rowLabels.length);
    });
});