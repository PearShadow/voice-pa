// Set dummy values for required environment variables
process.env.DATABASE_URL = 'postgresql://user:pass@localhost:5432/db';
process.env.JWT_SECRET = 'test-secret';
process.env.SUPABASE_URL = 'https://test.supabase.co';
process.env.SUPABASE_ANON_KEY = 'test-anon-key';
process.env.SUPABASE_SERVICE_KEY = 'test-service-key';
process.env.OPENAI_API_KEY = 'sk-test';
process.env.STORAGE_ENDPOINT = 'http://localhost:9000';
process.env.STORAGE_ACCESS_KEY = 'test-key';
process.env.STORAGE_SECRET_KEY = 'test-secret';

// Mock the logger to prevent noise during tests
jest.mock('../src/utils/logger', () => ({
    logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
    },
}));
