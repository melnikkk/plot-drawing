import { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { ChartData } from '../types';
import { useChartData } from '../hooks/useChartData';

interface Props {
  data: ChartData;
  startPoint: number;
  endPoint: number;
}

export const ChartAnalyticData: FC<Props> = ({ data, startPoint, endPoint }) => {
  const { slicedData } = useChartData(data, startPoint, endPoint);

  const points = slicedData[0].length;
  const minValue = Math.min(...slicedData[1]);
  const maxValue = Math.max(...slicedData[1]);
  const averageValue = slicedData[1].reduce((acc, curr) => acc + curr, 0) / points;
  const variance =
    slicedData[1].reduce((acc, curr) => acc + (curr - averageValue) ** 2, 0) / points;

  return (
    <Paper elevation={2} sx={{ padding: 2, marginTop: 2 }}>
      <Typography>Points count: {points}</Typography>
      <Typography>Min value: {minValue}</Typography>
      <Typography>Max value: {maxValue}</Typography>
      <Typography>Average value: {averageValue}</Typography>
      <Typography>Variance: {variance}</Typography>
    </Paper>
  );
};
