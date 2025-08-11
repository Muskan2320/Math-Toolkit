export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }
export function multiply(a, b) { return a * b; }
export function divide(a, b) { return b === 0 ? "Cannot divide by zero" : Number((a / b).toFixed(2)); }
export function square(a) { return a * a; }