import { ChartContainer, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';

export const Chart = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <ChartContainer
      width={500}
      height={300}
      series={[{ data, type: 'line' }]}
      xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9] }]}
    >
      <LinePlot />
      <ChartsXAxis />
      <ChartsYAxis />
    </ChartContainer>
  );
};
