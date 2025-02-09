import { sliceData, downsampleData } from '../index';
import { ChartData } from '../../types';

describe('utils', () => {
  describe('sliceData', () => {
    it.each([
      {
        name: 'should correctly slice data within given range',
        data: [
          [0, 1, 2, 3, 4],
          [10, 11, 12, 13, 14],
        ] as ChartData,
        from: 1,
        to: 3,
        expected: [
          [1, 2, 3],
          [11, 12, 13],
        ] as ChartData,
      },
      {
        name: 'should handle slice at boundaries',
        data: [
          [0, 1, 2],
          [10, 11, 12],
        ] as ChartData,
        from: 0,
        to: 2,
        expected: [
          [0, 1, 2],
          [10, 11, 12],
        ] as ChartData,
      },
      {
        name: 'should return empty arrays when range is invalid',
        data: [
          [0, 1, 2],
          [10, 11, 12],
        ] as ChartData,
        from: 3,
        to: 4,
        expected: [[], []] as ChartData,
      },
    ])('$name', ({ data, from, to, expected }) => {
      const result = sliceData(data, from, to);

      expect(result).toEqual(expected);
    });
  });

  describe('downsampleData', () => {
    it('should return original data if length is less than threshold', () => {
      const data: ChartData = [
        [0, 1, 2],
        [10, 11, 12],
      ];

      const result = downsampleData(data, 5);

      expect(result).toEqual(data);
    });

    it('should return original data if input is empty', () => {
      const data: ChartData = [[], []];

      const result = downsampleData(data, 5);

      expect(result).toEqual(data);
    });

    it('should downsample data to specified threshold', () => {
      const data: ChartData = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      ];

      const result = downsampleData(data, 5);

      expect(result[0].length).toBe(5);
      expect(result[1].length).toBe(5);

      expect(result[0][0]).toBe(data[0][0]);
      expect(result[0][4]).toBe(data[0][9]);
      expect(result[1][0]).toBe(data[1][0]);
      expect(result[1][4]).toBe(data[1][9]);
    });

    it('should handle data with significant variations', () => {
      const data: ChartData = [
        [0, 1, 2, 3, 4, 5],
        [0, 10, 1, 15, 2, 0],
      ];

      const result = downsampleData(data, 4);

      expect(result[0].length).toBe(4);
      expect(result[1].length).toBe(4);

      expect(result[1]).toContain(15);
    });
  });
});
