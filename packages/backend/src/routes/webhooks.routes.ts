import { Router, Request, Response } from 'express';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import { transcriptionService } from '../services/transcription.service';
import { Platform } from '@prisma/client';

const router = Router();

/**
 * POST /api/webhooks/whatsapp
 * Handles incoming WhatsApp messages from Twilio
 */
router.post('/whatsapp', async (req: Request, res: Response) => {
    try {
        const { From, NumMedia, MediaUrl0, MediaContentType0 } = req.body;

        logger.info(`Received WhatsApp message from ${From}. Media count: ${NumMedia}`);

        if (NumMedia > 0 && MediaContentType0?.startsWith('audio/')) {
            // Find user by phone number (in a real app, you'd have a phone field in User)
            // For now, let's assume we use a default user or lookup by a new 'phone' field
            // I should probably add a 'phone' field to User model if I want real mapping

            // For MVP/Demo: use the first user or a hardcoded ID
            const user = await prisma.user.findFirst();
            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            const meeting = await prisma.meeting.create({
                data: {
                    userId: user.id,
                    title: `WhatsApp Voice Note from ${From}`,
                    platform: Platform.WHATSAPP,
                    status: 'PROCESSING',
                    duration: 0,
                    audioUrl: MediaUrl0,
                },
            });

            await transcriptionService.queueTranscription({
                meetingId: meeting.id,
                audioUrl: MediaUrl0,
                userId: user.id,
            });

            res.send('<Response><Message>Voice note received! Transcribing now...</Message></Response>');
        } else {
            res.send('<Response><Message>Please send a voice note to transcribe.</Message></Response>');
        }
    } catch (error) {
        logger.error('WhatsApp webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * POST /api/webhooks/voice
 * Initial voice call handler
 */
router.post('/voice', (_req: Request, res: Response) => {
    const twiml = `
        <Response>
            <Say>Welcome to Voice P. A. Please leave a message after the beep. Your message will be transcribed.</Say>
            <Record 
                action="/api/webhooks/voice/recording" 
                maxLength="3600" 
                playBeep="true" 
            />
        </Response>
    `;
    res.type('text/xml');
    res.send(twiml);
});

/**
 * POST /api/webhooks/voice/recording
 * Handles recording completion
 */
router.post('/voice/recording', async (req: Request, res: Response) => {
    try {
        const { From, RecordingUrl, RecordingDuration } = req.body;

        logger.info(`Received phone recording from ${From}. Duration: ${RecordingDuration}s`);

        const user = await prisma.user.findFirst();
        if (!user) {
            res.status(404).send('User not found');
            return;
        }

        const meeting = await prisma.meeting.create({
            data: {
                userId: user.id,
                title: `Phone Call from ${From}`,
                platform: Platform.PHONE,
                status: 'PROCESSING',
                duration: parseFloat(RecordingDuration),
                audioUrl: RecordingUrl,
            },
        });

        await transcriptionService.queueTranscription({
            meetingId: meeting.id,
            audioUrl: RecordingUrl,
            userId: user.id,
        });

        res.send('<Response><Say>Thank you. Your recording has been received.</Say></Response>');
    } catch (error) {
        logger.error('Voice recording webhook error:', error);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
