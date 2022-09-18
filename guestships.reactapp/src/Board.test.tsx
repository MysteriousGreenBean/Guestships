import { render, screen } from "@testing-library/react";
import { Board } from "./Board";


describe(Board, () => {
    it.each(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])('renders relevant row label', (label: string) => {
        render(<Board />);
        
        const labelElement = screen.getByText(label);
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveClass('label');
    });
});