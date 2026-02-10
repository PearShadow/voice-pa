import { describe, it, expect } from 'vitest';
import { formatDate, formatDuration } from '../src/lib/formatters';

describe('Formatters Utility', () => {
    describe('formatDate', () => {
        it('formats valid date correctly', () => {
            expect(formatDate('2026-02-07')).toBe('Feb 7, 2026');
        });

        it('returns Invalid Date for bad input', () => {
            expect(formatDate('invalid')).toBe('Invalid Date');
        });
    });

    describe('formatDuration', () => {
        it('formats seconds to MM:SS', () => {
            expect(formatDuration(65)).toBe('01:05');
            expect(formatDuration(125)).toBe('02:05');
        });

        it('formats seconds to HH:MM:SS', () => {
            expect(formatDuration(3665)).toBe('01:01:05');
        });

        it('handles zero', () => {
            expect(formatDuration(0)).toBe('00:00');
        });
    });
});
