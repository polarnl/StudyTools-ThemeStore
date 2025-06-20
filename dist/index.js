"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../generated/prisma");
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const KEY = process.env.KEY;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const prisma = new prisma_1.PrismaClient();
app.get('/themes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const themes = yield prisma.theme.findMany({
            where: {
                state: 1
            }
        });
        let json = [];
        themes.forEach((theme) => {
            const parsed = JSON.parse(theme.json);
            parsed.id = theme.id;
            json.push(parsed);
        });
        res.json(json);
    }
    catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to fetch themes' });
    }
}));
app.get('/themes/reviewRequired', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const themes = yield prisma.theme.findMany({
            where: {
                state: 0
            }
        });
        let json = [];
        themes.forEach((theme) => {
            const parsed = JSON.parse(theme.json);
            parsed.id = theme.id;
            json.push(parsed);
        });
        res.json(json);
    }
    catch (error) {
        console.error('Error fetching themes:', error);
        res.status(500).json({ error: 'Failed to fetch themes' });
    }
}));
app.post('/themes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'No theme data provided in request body' });
        }
        console.log('Received theme data:', req.body);
        const json = JSON.stringify(req.body);
        const theme = yield prisma.theme.create({
            data: {
                json: json,
                state: 0
            }
        });
        res.status(201).json(theme);
    }
    catch (error) {
        console.error('Error creating theme:', error);
        res.status(500).json({ error: 'Failed to create theme' });
    }
}));
app.post('/themes/:id/:key/approve', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key } = req.params;
    try {
        if (key !== KEY) {
            return res.status(403).json({ error: 'Invalid passkey' });
        }
        const theme = yield prisma.theme.update({
            where: { id: parseInt(id) },
            data: { state: 1 }
        });
        res.json(theme);
    }
    catch (error) {
        console.error('Error approving theme:', error);
        res.status(500).json({ error: 'Failed to approve theme' });
    }
}));
app.post('/themes/:id/:key/reject', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key } = req.params;
    try {
        if (key !== KEY) {
            return res.status(403).json({ error: 'Invalid passkey' });
        }
        const theme = yield prisma.theme.update({
            where: { id: parseInt(id) },
            data: { state: 2 }
        });
        res.json(theme);
    }
    catch (error) {
        console.error('Error approving theme:', error);
        res.status(500).json({ error: 'Failed to approve theme' });
    }
}));
app.listen(9478, () => {
    console.log('Server is running on port 9478');
});
