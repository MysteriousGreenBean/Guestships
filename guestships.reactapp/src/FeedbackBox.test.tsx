import { render, screen } from "@testing-library/react";
import { FeedbackBox } from "./FeedbackBox";
import { ShipType } from "./ShipType";

describe(FeedbackBox, () => {
    it.each([
        { shipType: ShipType.NoShip, text: "Miss!" },
        { shipType: ShipType.Cruiser, text: "Cruiser is hit!" },
        { shipType: ShipType.Battleship, text: "Battleship is hit!" },
    ])('shows relevant text for ShipType %p', ({shipType, text}: { shipType: ShipType, text: string}) => {
    
        render(<FeedbackBox shipHit={shipType} />);

        const feedbackBox = screen.getByText(text)
        expect(feedbackBox).toBeInTheDocument();
        expect(feedbackBox).toHaveClass('feedback');
    });
});