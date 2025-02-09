import { FC, useEffect, useState, useCallback } from 'react';
import { Box } from '@mui/material';
import { Chart } from './Chart';
import { ChartAnalyticData } from './ChartAnalyticData';
import { ChartControls } from './ChartControls';
import { ChartData } from '../types';
import {
  DEFAULT_STEP_DELAY,
  DEFAULT_STEP_SIZE,
  DEFAULT_END_POINT,
  DEFAULT_START_POINT,
} from './constants';

interface Props {
  data: ChartData;
}

export const ChartContent: FC<Props> = ({ data }) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [startPoint, setStartPoint] = useState<number>(DEFAULT_START_POINT);
  const [endPoint, setEndPoint] = useState<number>(DEFAULT_END_POINT);
  const [stepDelay, setStepDelay] = useState<number>(DEFAULT_STEP_DELAY);
  const [stepSize, setStepSize] = useState<number>(DEFAULT_STEP_SIZE);

  const dataSize = data[0].length;

  const reset = useCallback(() => {
    setStartPoint(DEFAULT_START_POINT);
    setEndPoint(DEFAULT_END_POINT);
    setStepDelay(DEFAULT_STEP_DELAY);
    setStepSize(DEFAULT_STEP_SIZE);
  }, []);

  useEffect(() => {
    const nextStartPoint = startPoint + stepSize;
    const nextEndPoint = endPoint + stepSize;

    if (isRunning) {
      let interval: NodeJS.Timeout;

      if (nextEndPoint <= dataSize) {
        interval = setInterval(() => {
          setStartPoint(nextStartPoint);
          setEndPoint(nextEndPoint);
        }, stepDelay);
      } else {
        setIsRunning(false);
      }

      return () => clearInterval(interval);
    }
  }, [isRunning, startPoint, endPoint, stepSize, stepDelay]);

  return (
    <Box maxWidth={980} margin="20px auto" display="flex" justifyContent="space-between">
      <Box>
        <Chart data={data} startPoint={startPoint} endPoint={endPoint} />
        <ChartAnalyticData data={data} startPoint={startPoint} endPoint={endPoint} />
      </Box>
      <Box>
        <ChartControls
          isRunning={isRunning}
          startPoint={startPoint}
          endPoint={endPoint}
          stepDelay={stepDelay}
          stepSize={stepSize}
          dataSize={dataSize}
          onStartPointChange={setStartPoint}
          onEndPointChange={setEndPoint}
          onStepDelayChange={setStepDelay}
          onStepSizeChange={setStepSize}
          onRunClick={setIsRunning}
          onResetClick={reset}
        />
      </Box>
    </Box>
  );
};
