import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { FileUploadForm } from './FileUploadForm.tsx';
import { Chart } from './Chart';
import { ChartData } from './types';
import { ChartControls } from './ChartControls';
import {
  DEFAULT_START_POINT,
  DEFAULT_END_POINT,
  DEFAULT_STEP_DELAY,
  DEFAULT_STEP_SIZE,
} from './constants';

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const [startPoint, setStartPoint] = useState<number>(DEFAULT_START_POINT);
  const [endPoint, setEndPoint] = useState<number>(DEFAULT_END_POINT);
  const [stepDelay, setStepDelay] = useState<number>(DEFAULT_STEP_DELAY);
  const [stepSize, setStepSize] = useState<number>(DEFAULT_STEP_SIZE);

  const [data, setData] = useState<ChartData>([[], []]);

  const dataSize = data[0].length;

  const onUploadCsvClick = () => {
    setIsUploadModalOpened(true);
  };

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

  const reset = () => {
    setStartPoint(DEFAULT_START_POINT);
    setEndPoint(DEFAULT_END_POINT);
    setStepDelay(DEFAULT_STEP_DELAY);
    setStepSize(DEFAULT_STEP_SIZE);
  };

  return (
    <Container>
      <Box textAlign="center">
        <Typography variant="h2" component="h1">
          Plot drawing
        </Typography>

        <Button variant="contained" onClick={onUploadCsvClick}>
          Upload CSV
        </Button>

        <FileUploadForm
          open={isUploadModalOpened}
          setOpen={setIsUploadModalOpened}
          setData={setData}
        />
      </Box>

      {dataSize > 0 ? (
        <Box
          maxWidth={980}
          margin="auto"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Chart data={data} startPoint={startPoint} endPoint={endPoint} />
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
      ) : null}
    </Container>
  );
}

export default App;
