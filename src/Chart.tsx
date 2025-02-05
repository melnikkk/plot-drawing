import { FC } from 'react';
import { ChartContainer, ChartsXAxis, ChartsYAxis, LinePlot } from '@mui/x-charts';
import { ChartData } from './types';
import { downsampleData } from './utils';

interface Props {
  data: ChartData;
}

export const Chart: FC<Props> = ({ data }) => {
  const sampledData = downsampleData(data, 10);

  return sampledData[0]?.length ? (
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
  ) : null;
};
