import chalk from 'chalk';
import readline from 'readline';

import { add, subtract, multiply, divide, square } from './math.mjs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(chalk.blue("Welcome to Math Toolkit!"));

function askOperation() {
    rl.question("Choose operation (add, subtract, multiply, divide, square, exit): ", (operation) => {
        if (operation === 'exit'){
            console.log(chalk.yellow('Goodbye!!'));
            rl.close();
            return;
        }

        rl.question("Enter first number: ", (num1) => {
            if (operation === 'square') {
                console.log(chalk.green(`Result: ${square(Number(num1))}`));
                return askOperation();
            }
    
            rl.question("Enter second number: ", (num2) => {
                const a = Number(num1);
                const b = Number(num2);
    
                let result;
                switch(operation) {
                    case "add":
                        result = add(a, b);
                        break;
                    case "subtract":
                        result = subtract(a, b);
                        break;
                    case "multiply":
                        result = multiply(a, b);
                        break;
                    case "divide":
                        result = divide(a, b);
                        break;
                    default:
                        console.log(chalk.red('Invalid operation!'));
                        return askOperation();
                }
    
                console.log(chalk.yellow('Calculating...'));
                setTimeout(() => {
                    console.log(chalk.green(`Result: ${result}`));
                    askOperation();
                }, 1500);
            });
        });
    });
}

askOperation();