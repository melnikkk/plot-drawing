import { FC } from 'react';
import { ChartContainer, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';
import { Box } from '@mui/material';
import { ChartData } from './types';
import { downsampleData, sliceData } from './utils';

interface Props {
  data: ChartData;
  startPoint: number;
  endPoint: number;
}

export const Chart: FC<Props> = ({ data, startPoint, endPoint }) => {
  const slicedData = sliceData(data, startPoint, endPoint);
  const sampledData = downsampleData(slicedData, 10);

  return (
    <Box>
      <ChartContainer
        width={500}
        height={300}
        series={[{ data: sampledData[1], type: 'line' }]}
        xAxis={[{ data: sampledData[0] }]}
      >
        <LinePlot />
        <ChartsXAxis />
        <ChartsYAxis />
      </ChartContainer>
    </Box>
  );
};
