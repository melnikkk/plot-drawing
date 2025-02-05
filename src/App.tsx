import { FileUploadForm } from './FileUploadForm.tsx';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import { Chart } from './Chart';
import { ChartData } from './types';

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [data, setData] = useState<ChartData>([[], []]);

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
      <Chart data={data} />
    </Container>
  );
}

export default App;
