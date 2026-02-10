import { TranscriptionService } from '../src/services/transcription.service';
import { prisma } from '../src/config/database';
import { transcriptionQueue } from '../src/config/queues';

jest.mock('../src/config/database', () => ({
    prisma: {
        meeting: {
            update: jest.fn(),
            findUnique: jest.fn(),
        },
    },
}));

jest.mock('../src/config/queues', () => ({
    transcriptionQueue: {
        add: jest.fn(),
    },
}));

describe('TranscriptionService', () => {
    let service: TranscriptionService;

    beforeEach(() => {
        service = new TranscriptionService();
        jest.clearAllMocks();
    });

    it('should queue a transcription job and update meeting status', async () => {
        const data = {
            meetingId: 'meet-123',
            audioUrl: 'http://test.com/audio.wav',
            userId: 'user-456',
        };

        await service.queueTranscription(data);

        expect(prisma.meeting.update).toHaveBeenCalledWith({
            where: { id: 'meet-123' },
            data: { status: 'PROCESSING' },
        });

        expect(transcriptionQueue.add).toHaveBeenCalledWith(data);
    });

    it('should retry transcription successfully', async () => {
        const mockMeeting = {
            id: 'meet-123',
            audioUrl: 'http://test.com/audio.wav',
            userId: 'user-456',
        };

        (prisma.meeting.findUnique as jest.Mock).mockResolvedValue(mockMeeting);

        await service.retryTranscription('meet-123');

        expect(prisma.meeting.findUnique).toHaveBeenCalled();
        expect(transcriptionQueue.add).toHaveBeenCalledWith({
            meetingId: 'meet-123',
            audioUrl: 'http://test.com/audio.wav',
            userId: 'user-456',
        });
    });

    it('should throw error if meeting not found for retry', async () => {
        (prisma.meeting.findUnique as jest.Mock).mockResolvedValue(null);

        await expect(service.retryTranscription('invalid')).rejects.toThrow('Meeting or audio URL not found');
    });
});
