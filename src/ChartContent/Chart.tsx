import { FC } from 'react';
import { ChartContainer, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';
import { Box } from '@mui/material';
import { ChartData } from '../types';
import { useChartData } from '../hooks/useChartData';

interface Props {
  data: ChartData;
  startPoint: number;
  endPoint: number;
}

export const Chart: FC<Props> = ({ data, startPoint, endPoint }) => {
  const { sampledSlicedData } = useChartData(data, startPoint, endPoint);

  return (
    <Box>
      {sampledSlicedData[0]?.length ? (
        <ChartContainer
          width={500}
          height={300}
          series={[{ data: sampledSlicedData[1], type: 'line' }]}
          xAxis={[{ data: sampledSlicedData[0] }]}
        >
          <LinePlot />
          <ChartsXAxis />
          <ChartsYAxis />
        </ChartContainer>
      ) : null}
    </Box>
  );
};
