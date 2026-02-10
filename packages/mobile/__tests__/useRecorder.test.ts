import { renderHook, act } from '@testing-library/react-native';
import { useRecorder } from '../src/hooks/useRecorder';
import { NativeModules } from 'react-native';

const RustRecorderMock = NativeModules.RustRecorder;

describe('useRecorder Hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useRecorder());
        expect(result.current.isRecording).toBe(false);
        expect(result.current.duration).toBe(0);
        expect(result.current.transcript).toBe('');
        expect(result.current.error).toBe(null);
    });

    it('should start recording and update state', async () => {
        const { result } = renderHook(() => useRecorder());

        await act(async () => {
            await result.current.startRecording();
        });

        expect(result.current.isRecording).toBe(true);
        expect(RustRecorderMock.start).toHaveBeenCalled();
    });

    it('should update duration on timer', async () => {
        RustRecorderMock.duration.mockResolvedValueOnce(1.5);
        const { result } = renderHook(() => useRecorder());

        await act(async () => {
            await result.current.startRecording();
        });

        await act(async () => {
            jest.advanceTimersByTime(100);
        });

        expect(result.current.duration).toBe(1.5);
    });

    it('should stop recording and reset state', async () => {
        const { result } = renderHook(() => useRecorder());

        await act(async () => {
            await result.current.startRecording();
        });

        await act(async () => {
            await result.current.stopRecording();
        });

        expect(result.current.isRecording).toBe(false);
        expect(RustRecorderMock.stop).toHaveBeenCalled();
    });

    it('should handle errors during start', async () => {
        RustRecorderMock.start.mockRejectedValueOnce(new Error('Device Failure'));
        const { result } = renderHook(() => useRecorder());

        await act(async () => {
            await result.current.startRecording();
        });

        expect(result.current.error).toBe('Device Failure');
        expect(result.current.isRecording).toBe(false);
    });
});
