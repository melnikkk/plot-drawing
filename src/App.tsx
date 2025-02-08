import { useState, Profiler } from 'react';
import { Container } from '@mui/material';
import { ChartData } from './types';
import { HeaderBlock } from './Header';
import { ChartContent } from './ChartContent';

function App() {
  const [data, setData] = useState<ChartData>([[], []]);

  const onRenderCallback = (id: string, phase: string, actualDuration: number) => {
    console.log(`${id} rendering took ${actualDuration}ms - ${phase}`);
  };

  return (
    <Profiler id="ChartApp" onRender={onRenderCallback}>
      <Container>
        <HeaderBlock setData={setData} />

        {data[0].length > 0 ? <ChartContent data={data} /> : null}
      </Container>
    </Profiler>
  );
}

export default App;
