import { FC, useState, useActionState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Box, Button, Modal, Paper, Stack, Typography } from '@mui/material';
import { ChartData } from './types';

interface Props {
  open: boolean;
  setData: (data: ChartData) => void;
  setOpen: (open: boolean) => void;
}

export const FileUploadForm: FC<Props> = ({ open, setData, setOpen }) => {
  const [file, setFile] = useState<File | null>(null);
  const [_fileError, setFileError] = useState<string | null>(null);

  const closeModal = () => setOpen(false);

  const onDrop = (acceptedFiles: Array<File>) => {
    handleFileChange(acceptedFiles[0]);
  };

  const handleFileChange = (file: File) => {
    const isValidFileFormat = file?.type === 'text/csv' && file.name.endsWith('.csv');

    if (isValidFileFormat) {
      setFile(file);
    } else {
      setFile(null);

      setFileError('Please select a CSV file.');
    }
  };

  const handleFileUpload = () => {
    if (file) {
      // @ts-expect-error: skip
      Papa.parse(file, {
        delimiter: ';',
        newline: '',
        skipEmptyLines: true,
        complete: (result: { data: Array<[string]> }) => {
          const data = result.data.reduce(
            (acc, dataString) => {
              const splitDataString = dataString[0].split(',');

              if (splitDataString[0] && splitDataString[1]) {
                acc[0].push(Number(splitDataString[0]));
                acc[1].push(Number(splitDataString[1]));
              }
              return acc;
            },
            [[], []] as ChartData,
          );

          setData(data);
        },
        error(e) {
          setFileError('Parsing error.');
          console.log('Parsing error: ', e);
        },
      });
    }

    closeModal();
  };

  const [_formState, formAction] = useActionState(handleFileUpload, null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    onError: () => setFileError('Please select a CSV file.'),
  });

  return (
    <Modal
      sx={{ alignContent: 'center', justifySelf: 'center' }}
      open={open}
      onClose={closeModal}
    >
      <Box width={500} border="1px solid grey" p={2} borderRadius={2} bgcolor="white">
        <Typography component="h4" variant="h4" textAlign="center" gutterBottom>
          Upload CSV File
        </Typography>
        <form action={formAction}>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Paper
              elevation={1}
              sx={{
                p: 2,
                border: '1px solid gray',
                cursor: 'pointer',
                textAlign: 'center',
                alignContent: 'center',
                width: '100%',
                height: 200,
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {file ? (
                <>
                  <Typography fontWeight="bold" color="secondary">
                    File uploaded
                  </Typography>
                  <Typography color="secondary">
                    Drag and drop a file here, or click to select another file
                  </Typography>
                </>
              ) : (
                <Typography color="secondary">
                  {isDragActive
                    ? 'Drop the files here ...'
                    : 'Drag and drop a file here, or click to select file'}
                </Typography>
              )}
            </Paper>
            <Stack direction="row" justifyContent="space-between" width="100%">
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};
