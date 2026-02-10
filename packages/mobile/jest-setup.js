import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { NativeModules } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

NativeModules.RustRecorder = {
    start: jest.fn(() => Promise.resolve()),
    stop: jest.fn(() => Promise.resolve([0.1, 0.2, 0.3])),
    isRecording: jest.fn(() => Promise.resolve(false)),
    duration: jest.fn(() => Promise.resolve(0)),
};
