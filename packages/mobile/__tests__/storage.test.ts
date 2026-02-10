import { getMeetings, saveMeeting, deleteMeeting, updateMeeting, Meeting } from '../src/utils/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MOCK_MEETING: Meeting = {
    id: '1',
    title: 'Test Meeting',
    date: '2026-02-07',
    duration: '10:00',
    transcript: 'Hello world',
    transcriptPreview: 'Hello...',
    participants: 1,
    type: 'Mobile',
    synced: false,
};

describe('Storage Utility', () => {
    beforeEach(async () => {
        await AsyncStorage.clear();
    });

    it('should return an empty array if no meetings are stored', async () => {
        const meetings = await getMeetings();
        assert(Array.isArray(meetings));
        assert(meetings.length === 0);
    });

    it('should save a new meeting', async () => {
        await saveMeeting(MOCK_MEETING);
        const meetings = await getMeetings();
        assert(meetings.length === 1);
        assert(meetings[0].id === '1');
    });

    it('should delete a meeting', async () => {
        await saveMeeting(MOCK_MEETING);
        await deleteMeeting('1');
        const meetings = await getMeetings();
        assert(meetings.length === 0);
    });

    it('should update a meeting', async () => {
        await saveMeeting(MOCK_MEETING);
        const updated: Meeting = { ...MOCK_MEETING, title: 'Updated Title', synced: true };
        await updateMeeting(updated);
        const meetings = await getMeetings();
        assert(meetings[0].title === 'Updated Title');
        assert(meetings[0].synced === true);
    });
});

// Minimal assert helper since it's a simple unit test
function assert(condition: boolean, message?: string) {
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}
