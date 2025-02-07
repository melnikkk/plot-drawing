import { ChangeEvent, FC } from 'react';
import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { formatNumber, parseNumericInput } from './utils';

interface Props {
  startPoint: number;
  endPoint: number;
  stepDelay: number;
  stepSize: number;
  dataSize: number;
  isRunning: boolean;
  onStartPointChange: (value: number) => void;
  onEndPointChange: (value: number) => void;
  onStepDelayChange: (value: number) => void;
  onStepSizeChange: (value: number) => void;
  onRunClick: (value: boolean) => void;
  onResetClick: () => void;
}

export const ChartControls: FC<Props> = ({
  startPoint,
  endPoint,
  stepDelay,
  stepSize,
  dataSize,
  isRunning,
  onStartPointChange,
  onEndPointChange,
  onStepDelayChange,
  onStepSizeChange,
  onRunClick,
  onResetClick,
}) => {
  const handleStartChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseNumericInput(event.target.value);
    const numberedValue = Number(value);

    if (!isNaN(numberedValue)) {
      onStartPointChange(numberedValue);
    }
  };

  const handleEndChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseNumericInput(event.target.value);
    const numberedValue = Number(value);
    const isValid = !isNaN(numberedValue) && numberedValue <= dataSize;

    if (isValid) {
      onEndPointChange(numberedValue);
    }
  };

  const handleStepDelayChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseNumericInput(event.target.value);
    const numberedValue = Number(value);

    if (!isNaN(numberedValue)) {
      onStepDelayChange(numberedValue);
    }
  };

  const handleStepSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseNumericInput(event.target.value);
    const numberedValue = Number(value);

    if (!isNaN(numberedValue)) {
      onStepSizeChange(numberedValue);
    }
  };

  const handleRunClick = () => {
    onRunClick(!isRunning);
  };

  const handleResetClick = () => {
    onResetClick();
  };

  return (
    <Paper elevation={2} sx={{ padding: 2 }}>
      <Typography textAlign="center" variant="h5" component="h5">
        Chart controls
      </Typography>
      <Box mt={2}>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField
            type="text"
            inputMode="numeric"
            label="Start Point"
            size="small"
            value={formatNumber(startPoint)}
            onChange={handleStartChange}
          />
          <TextField
            type="text"
            inputMode="numeric"
            label="End Point"
            size="small"
            value={formatNumber(endPoint)}
            onChange={handleEndChange}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between" gap={2}>
          <TextField
            type="text"
            inputMode="numeric"
            label="Step delay"
            size="small"
            value={formatNumber(stepDelay)}
            onChange={handleStepDelayChange}
          />
          <TextField
            type="text"
            inputMode="numeric"
            label="Step size"
            size="small"
            value={formatNumber(stepSize)}
            onChange={handleStepSizeChange}
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="contained" color="secondary" onClick={handleResetClick}>
            Reset
          </Button>
          <Button variant="contained" color="primary" onClick={handleRunClick}>
            {isRunning ? 'Pause' : 'Run'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};
