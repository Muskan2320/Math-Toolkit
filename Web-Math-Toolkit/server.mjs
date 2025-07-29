import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';
import { add, subtract, multiply, divide, square } from './math.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/calculate', (req, res) => {
    const { operation, num1, num2 } = req.body;
    const a = Number(num1);
    const b = Number(num2);

    let result;
    switch (operation) {
        case 'add': result = add(a, b); break;
        case 'subtract': result = subtract(a, b); break;
        case 'multiply': result = multiply(a, b); break;
        case 'divide': result = divide(a, b); break;
        case 'square': result = square(a); break;
        default: return res.status(400).json({error: 'Invalid operation'});
    }

    res.json({
        "operation": operation,
        "number 1": a,
        "number 2": b,
        "result": result
    });
});

app.listen(3000, () => console.log('Web Math toolkit running on http://localhost:3000'));