/// <reference types="vitest" />
import '@testing-library/jest-dom';
import 'vitest';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

declare global {
  const describe: (typeof import('vitest'))['describe'];
  const it: (typeof import('vitest'))['it'];
  const expect: (typeof import('vitest'))['expect'];
  const vi: (typeof import('vitest'))['vi'];
}

afterEach(() => {
  cleanup();
});
