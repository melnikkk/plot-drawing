import { FileUploadForm } from './FileUploadForm.tsx';
import { useState, useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Chart } from './Chart';
import { ChartData } from './types';
import { ChartControls } from './ChartControls';

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [data, setData] = useState<ChartData>([[], []]);
  const [startPoint, setStartPoint] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<number>(100);
  const [stepDelay, setStepDelay] = useState<number>(0);
  const [stepSize, setStepSize] = useState<number>(0);

  const onUploadCsvClick = () => {
    setIsUploadModalOpened(true);
  };

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setStartPoint(startPoint + stepSize);
        setEndPoint(endPoint + stepSize);
      }, stepDelay);

      return () => clearInterval(interval);
    }
  }, [isRunning, startPoint, endPoint, stepSize, stepDelay]);

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

      {data[0]?.length > 0 ? (
        <Box maxWidth={500} margin="auto">
          <ChartControls
            isRunning={isRunning}
            startPoint={startPoint}
            endPoint={endPoint}
            stepDelay={stepDelay}
            stepSize={stepSize}
            onStartPointChange={setStartPoint}
            onEndPointChange={setEndPoint}
            onStepDelayChange={setStepDelay}
            onStepSizeChange={setStepSize}
            onRunClick={setIsRunning}
          />
          <Chart data={data} startPoint={startPoint} endPoint={endPoint} />
        </Box>
      ) : null}
    </Container>
  );
}

export default App;
