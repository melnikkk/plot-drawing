import { useEffect, useState, useTransition } from 'react';
import { ChartData } from '../types';
import { sliceData, downsampleData } from '../ChartContent/utils';

export function useChartData(data: ChartData, startPoint: number, endPoint: number) {
  const [_isPending, startTransition] = useTransition();
  const [processedData, setProcessedData] = useState<{
    slicedData: ChartData;
    sampledSlicedData: ChartData;
  }>({ slicedData: [[], []], sampledSlicedData: [[], []] });

  useEffect(() => {
    startTransition(() => {
      const slicedData = sliceData(data, startPoint, endPoint);
      const sampledSlicedData = downsampleData(slicedData, 100);

      setProcessedData({ slicedData, sampledSlicedData });
    });
  }, [data, startPoint, endPoint]);

  return processedData;
}
