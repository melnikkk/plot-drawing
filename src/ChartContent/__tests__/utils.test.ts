import { describe, it, expect } from 'vitest';
import { formatNumber, parseNumericInput } from '../utils';

describe('utils', () => {
  describe('formatNumber', () => {
    it.each([
      [1000, '1,000'],
      [1000000, '1,000,000'],
      [1234567, '1,234,567'],
      [0, '0'],
      [123, '123'],
      [99, '99'],
      [-1000, '-1,000'],
      [-1234567, '-1,234,567'],
    ])('should format %i to %s', (input, expected) => {
      expect(formatNumber(input)).toBe(expected);
    });
  });

  describe('parseNumericInput', () => {
    it.each([
      ['123abc', '123'],
      ['a1b2c3', '123'],
      ['$1,000', '1000'],
      ['', ''],
      ['abc', ''],
      ['123.45', '12345'],
      ['-1000', '1000'],
      ['(100)', '100'],
    ])('should parse %s to %s', (input, expected) => {
      expect(parseNumericInput(input)).toBe(expected);
    });
  });
});
