import '@testing-library/jest-dom';
import { vi } from 'vitest';
import * as React from 'react';

// Polyfill for React 19: react-dom/test-utils is deprecated, act is now in react
vi.mock('react-dom/test-utils', () => ({
    act: React.act,
}));

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useParams: () => ({ id: 'test-id' }),
    usePathname: () => '/dashboard',
}));
