import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders game board', () => {
  render(<App />);

  const boardElement = screen.getByTestId('board');
  expect(boardElement).toBeInTheDocument();
});

