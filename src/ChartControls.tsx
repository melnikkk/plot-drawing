import { ChangeEvent, FC } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { formatNumber, parseNumericInput } from './utils';

interface Props {
  startPoint: number;
  endPoint: number;
  stepDelay: number;
  stepSize: number;
  isRunning: boolean;
  onStartPointChange: (value: number) => void;
  onEndPointChange: (value: number) => void;
  onStepDelayChange: (value: number) => void;
  onStepSizeChange: (value: number) => void;
  onRunClick: (value: boolean) => void;
}

export const ChartControls: FC<Props> = ({
  startPoint,
  endPoint,
  stepDelay,
  stepSize,
  isRunning,
  onStartPointChange,
  onEndPointChange,
  onStepDelayChange,
  onStepSizeChange,
  onRunClick,
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

    if (!isNaN(numberedValue)) {
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

  return (
    <Box mt={6}>
      <Box display="flex" justifyContent="space-between">
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
      <Box mt={2} display="flex" justifyContent="space-between">
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
        <Button variant="contained" color="primary" onClick={handleRunClick}>
          {isRunning ? 'Pause' : 'Run'}
        </Button>
      </Box>
    </Box>
  );
};
