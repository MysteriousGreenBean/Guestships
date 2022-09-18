import { render, screen } from "@testing-library/react";
import { Board } from "./Board";


describe(Board, () => {
    it.each(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])('renders relevant row label', (label: string) => {
        render(<Board />);
        
        const labelElement = screen.getByText(label);
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveClass('label');
    });

    it.each(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])('renders relevant column label', (label: string) => {
        render(<Board />);

        const labelElement = screen.getByText(label);
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveClass('label');
    });

    it('renders 100 holes', async () => {
         render(<Board />);

         const holes = await screen.findAllByTestId('hole');
         holes.map(hole => expect(hole).toBeInTheDocument());
         expect(holes.length).toEqual(100);
    });
});