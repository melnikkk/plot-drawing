import { ChartData } from '../types';

export const downsampleData = (data: ChartData, threshold: number): ChartData => {
  // Early returns for edge cases
  if (data[0].length <= threshold || !data[0].length) {
    return data;
  }

  // Pre-allocate arrays instead of pushing
  const sampledX = new Array(threshold);
  const sampledY = new Array(threshold);
  const dataLength = data[0].length;

  // Pre-calculate bucket size
  const bucketSize = (dataLength - 2) / (threshold - 2);

  // Keep first point
  sampledX[0] = data[0][0];
  sampledY[0] = data[1][0];

  // Process buckets
  for (let i = 0; i < threshold - 2; i++) {
    const bucketStart = Math.floor((i + 0) * bucketSize) + 1;
    const bucketEnd = Math.floor((i + 1) * bucketSize) + 1;

    let maxArea = -1;
    let maxAreaIndex = bucketStart;

    // Use direct array access instead of slice
    const a0 = data[0][bucketStart - 1];
    const a1 = data[1][bucketStart - 1];

    // Calculate areas in bucket
    for (let j = bucketStart; j < bucketEnd; j++) {
      const area =
        Math.abs(
          (data[0][j] - a0) * (data[1][j + 1] - a1) -
            (data[0][j + 1] - a0) * (data[1][j] - a1),
        ) * 0.5;

      if (area > maxArea) {
        maxArea = area;
        maxAreaIndex = j;
      }
    }

    sampledX[i + 1] = data[0][maxAreaIndex];
    sampledY[i + 1] = data[1][maxAreaIndex];
  }

  // Keep last point
  sampledX[threshold - 1] = data[0][dataLength - 1];
  sampledY[threshold - 1] = data[1][dataLength - 1];

  return [sampledX, sampledY];
};

export const sliceData = (data: ChartData, from: number, to: number): ChartData => {
  const [xValues, yValues] = data;

  const slicedXValues = xValues.slice(from, to + 1);
  const slicedYValues = yValues.slice(from, to + 1);

  return [slicedXValues, slicedYValues];
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const parseNumericInput = (value: string): string => {
  return value.replace(/\D/g, '');
};
