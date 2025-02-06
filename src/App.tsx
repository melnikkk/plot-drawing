import { FileUploadForm } from './FileUploadForm.tsx';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Chart } from './Chart';
import { ChartData } from './types';
import { ChartControls } from './ChartControls';

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [data, setData] = useState<ChartData>([[], []]);
  const [startPoint, setStartPoint] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<number>(100);

  const onUploadCsvClick = () => {
    setIsUploadModalOpened(true);
  };

  return (
    <Container>
      <Box textAlign="center">
        <h1>Plot drawing</h1>
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
          <Chart data={data} startPoint={startPoint} endPoint={endPoint} />
          <ChartControls
            startPoint={startPoint}
            endPoint={endPoint}
            onStartPointChange={setStartPoint}
            onEndPointChange={setEndPoint}
          />
        </Box>
      ) : null}
    </Container>
  );
}

export default App;
