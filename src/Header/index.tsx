import { FC, useCallback, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FileUploadForm } from './FileUploadForm';
import { ChartData } from '../types';

interface Props {
  setData: (data: ChartData) => void;
}

export const HeaderBlock: FC<Props> = ({ setData }) => {
  const [isUploadModalOpened, setIsUploadModalOpened] = useState<boolean>(false);

  const onUploadCsvClick = useCallback(() => {
    setIsUploadModalOpened(true);
  }, []);

  return (
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
  );
};
