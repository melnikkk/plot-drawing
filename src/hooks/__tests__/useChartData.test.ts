import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useChartData } from '../useChartData';
import { sliceData, downsampleData } from '../../utils';
import { ChartData } from '../../types';

vi.mock('../../utils', () => ({
  sliceData: vi.fn(),
  downsampleData: vi.fn(),
}));

describe('useChartData', () => {
  const mockData: ChartData = [
    [1, 2, 3, 4, 5],
    [10, 20, 30, 40, 50],
  ];

  it('should update when inputs change', () => {
    const { rerender } = renderHook(
      ({ data, startPoint, endPoint }) => useChartData(data, startPoint, endPoint),
      {
        initialProps: {
          data: mockData,
          startPoint: 1,
          endPoint: 3,
        },
      },
    );

    expect(sliceData).toHaveBeenCalledWith(mockData, 1, 3);

    rerender({
      data: mockData,
      startPoint: 2,
      endPoint: 4,
    });

    expect(sliceData).toHaveBeenCalledWith(mockData, 2, 4);
  });
});
