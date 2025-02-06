import { ChartData } from './types';

export const downsampleData = (
  data: [number[], number[]],
  threshold: number,
): ChartData => {
  const [xValues, yValues] = data;
  const dataLength = xValues.length;

  if (threshold >= dataLength || threshold === 0) {
    return [xValues, yValues];
  }

  const sampledX: number[] = [];
  const sampledY: number[] = [];

  const every = (dataLength - 2) / (threshold - 2);

  let a = 0;
  let maxAreaPoint = null;
  let maxArea = -1;

  sampledX.push(xValues[a]);
  sampledY.push(yValues[a]); // Always add the first point

  for (let i = 0; i < threshold - 2; i++) {
    let averageX = 0;
    let averageY = 0;

    let averageRangeStart = Math.floor((i + 1) * every) + 1;
    let averageRangeEnd = Math.floor((i + 2) * every) + 1;

    averageRangeEnd = averageRangeEnd < dataLength ? averageRangeEnd : dataLength;

    const averageRangeLength = averageRangeEnd - averageRangeStart;

    for (; averageRangeStart < averageRangeEnd; averageRangeStart++) {
      averageX += xValues[averageRangeStart];
      averageY += yValues[averageRangeStart];
    }

    averageX /= averageRangeLength;
    averageY /= averageRangeLength;

    let rangeOffs = Math.floor(i * every) + 1;
    let rangeTo = Math.floor((i + 1) * every) + 1;

    const pointAx = xValues[a];
    const pointAy = yValues[a];

    maxArea = -1;

    for (; rangeOffs < rangeTo; rangeOffs++) {
      const area =
        Math.abs(
          (pointAx - averageX) * (yValues[rangeOffs] - pointAy) -
            (pointAy - averageY) * (xValues[rangeOffs] - pointAx),
        ) * 0.5;

      if (area > maxArea) {
        maxArea = area;
        maxAreaPoint = { x: xValues[rangeOffs], y: yValues[rangeOffs] };
      }
    }

    if (maxAreaPoint) {
      sampledX.push(maxAreaPoint.x);
      sampledY.push(maxAreaPoint.y);

      a = rangeTo - 1;
    }
  }

  sampledX.push(xValues[dataLength - 1]);
  sampledY.push(yValues[dataLength - 1]);

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
