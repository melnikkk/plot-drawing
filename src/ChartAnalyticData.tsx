import { FC } from 'react';
import { Paper, Typography } from '@mui/material';
import { ChartData } from './types';

interface Props {
  data: ChartData;
}

export const ChartAnalyticData: FC<Props> = ({ data }) => {
  const points = data[0].length;
  const minValue = Math.min(...data[1]);
  const maxValue = Math.max(...data[1]);
  const averageValue = data[1].reduce((acc, curr) => acc + curr, 0) / points;
  const variance =
    data[1].reduce((acc, curr) => acc + (curr - averageValue) ** 2, 0) / points;

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
