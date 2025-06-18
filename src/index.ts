import express from 'express';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import cors from 'cors';

const KEY = process.env.KEY;
const app = express();
app.use(cors());
app.use(express.json());

const prisma = new PrismaClient();

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
        themes.forEach((theme) => {
            json.push(JSON.parse(theme.json));
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
        themes.forEach((theme) => {
            json.push(JSON.parse(theme.json));
        });
        res.json(json);
    } catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to fetch themes' });
    }
});
app.post('/themes', async (req, res) => {
    try {
        const json = req.body;
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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});