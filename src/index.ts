import express from 'express';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import cors from 'cors';

const KEY = process.env.KEY;
const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();
type themeTS = {
    id: number;
    json: string;
    state: number;
};

app.get('/themes', async (req, res) => {
    try {
        const themes = await prisma.theme.findMany(
            {
                where: {
                    state: 1
                }
            }
        );
        let json: any[] = [];
        themes.forEach((theme: themeTS) => {
            const parsed = JSON.parse(theme.json);
            parsed.id = theme.id;
            json.push(parsed);
        });
        res.json(json);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to fetch themes' });
    }
});
app.get('/themes/reviewRequired', async (req, res) => {
    try {
        const themes = await prisma.theme.findMany(
            {
                where: {
                    state: 0
                }
            }
        );
        let json: any[] = [];
        themes.forEach((theme: themeTS) => {
            const parsed = JSON.parse(theme.json);
            parsed.id = theme.id;
            json.push(parsed);
        });
        res.json(json);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to fetch themes' });
    }
});
app.post('/themes', async (req: any, res: any) => {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No theme data provided in request body' });
        }
        console.log('Received theme data:', req.body);
        const json = JSON.stringify(req.body);
        const theme = await prisma.theme.create({
            data: {
                json: json,
                state: 0
            }
        });
        res.status(201).json(theme);
    } catch (error) {
        console.error('Error creating theme:', error);
        res.status(500).json({ error: 'Failed to create theme' });
    }
});
app.post('/themes/:id/:key/approve', async (req: any, res: any) => {
    const { id, key } = req.params;
    try {
        if (key !== KEY) {
            return res.status(403).json({ error: 'Invalid passkey' });
        }
        const theme = await prisma.theme.update({
            where: { id: parseInt(id) },
            data: { state: 1 }
        });
        res.json(theme);
    } catch (error) {
        console.error('Error approving theme:', error);
        res.status(500).json({ error: 'Failed to approve theme' });
    }
});
app.post('/themes/:id/:key/reject', async (req: any, res: any) => {
    const { id, key } = req.params;
    try {
        if (key !== KEY) {
            return res.status(403).json({ error: 'Invalid passkey' });
        }
        const theme = await prisma.theme.update({
            where: { id: parseInt(id) },
            data: { state: 2 }
        });
        res.json(theme);
    } catch (error) {
        console.error('Error approving theme:', error);
        res.status(500).json({ error: 'Failed to approve theme' });
    }
});


app.listen(9478, () => {
    console.log('Server is running on port 9478');
});