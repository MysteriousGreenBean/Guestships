import { render, screen } from '@testing-library/react';
import App from './App';

describe(App, () => {
  it('renders game board', () => {
    render(<App />);
  
    const boardElement = screen.getByTestId('board');
    expect(boardElement).toBeInTheDocument();
  });
});