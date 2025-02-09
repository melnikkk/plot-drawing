import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { HeaderBlock } from '../index';

describe('<HeaderBlock />', () => {
  it('should render title and upload button', () => {
    const setData = vi.fn();

    render(<HeaderBlock setData={setData} />);

    expect(screen.getByText('Plot drawing')).toBeInTheDocument();
    expect(screen.getByText('Upload CSV')).toBeInTheDocument();
  });

  it('should open upload modal on button click', async () => {
    const setData = vi.fn();

    render(<HeaderBlock setData={setData} />);

    const uploadButton = screen.getByText('Upload CSV');
    fireEvent.click(uploadButton);

    expect(screen.getByText('Upload CSV File')).toBeInTheDocument();
  });
});
