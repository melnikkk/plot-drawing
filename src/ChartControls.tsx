import { ChangeEvent, FC } from 'react';
import { Box, TextField } from '@mui/material';
import { formatNumber, parseNumericInput } from './utils';

interface Props {
  startPoint: number;
  endPoint: number;
  onStartPointChange: (value: number) => void;
  onEndPointChange: (value: number) => void;
}

export const ChartControls: FC<Props> = ({
  startPoint,
  endPoint,
  onStartPointChange,
  onEndPointChange,
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

  return (
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
  );
};
