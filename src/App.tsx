import { FileUploadForm } from './FileUploadForm.tsx';
import { useState } from 'react';
import { Box, Button, Container } from '@mui/material';

function App() {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

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
          file={file}
          setOpen={setIsUploadModalOpened}
          setFile={setFile}
        />
      </Box>
    </Container>
  );
}

export default App;
