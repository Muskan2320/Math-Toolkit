import express from 'express';
import path from 'path';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { fileURLToPath } from 'url';
import { add, subtract, multiply, divide, square } from './math.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', async (req, res) => {
    const { operation, num1, num2 } = req.body;
    const a = parseFloat(String(num1).replace(/^\./, "0."));
    const b = parseFloat(String(num2).replace(/^\./, "0."));

    console.log(`Received operation: ${operation}, num1: ${a}, num2: ${b}`);

    if (isNaN(a)) {
        return res.status(400).json({ error: 'Invalid first number provided' });
    }

    if (operation !== "square" && isNaN(b)) {
        return res.status(400).json({ error: 'Invalid second number provided' });
    }

    let result;
    switch (operation) {
        case 'add': result = add(a, b); break;
        case 'subtract': result = subtract(a, b); break;
        case 'multiply': result = multiply(a, b); break;
        case 'divide': 
            result = divide(a, b); 
            if (typeof result !== 'number'){
                return res.status(400).json({error: result});
            }
            break;
        case 'square': result = square(a); break;
        default: return res.status(400).json({error: 'Invalid operation'});
    }

    await prisma.calculation.create({
        data: {
            operation,
            num1: a,
            num2: operation === "square" ? null : b,
            result,
        },
    });

    res.json({
        operation,
        num1: a,
        num2: operation === "square" ? null : b,
        result,
    });
});

app.get('/history', async (req, res) => {
    const history = await prisma.calculation.findMany({
        orderBy: {createdAt: 'desc'},
        take: 5,
    });

    res.json(history);
});

app.listen(3000, () => console.log('Web Math toolkit running on http://localhost:3000'));