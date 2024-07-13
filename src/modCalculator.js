function modularCalculator(op, num1, num2, mod) {
    
    let result;

    switch(op) {
        case '+':
            result = (num1 + num2) % mod;
            console.log(result);
            break;
        case '-':
            result = (num1 - num2) % mod;
            if (result < 0) {
                result += mod;
            }
            console.log(result);
            break;
        case '*':
            result = (num1 * num2) % mod;
            console.log(result);
            break;
        default:
            throw new Error("Invalid parameters");
    }

    return result;
}

modularCalculator('+', 10, 15, 12); // Should return: 1
modularCalculator('-', 10, 15, 12); // Should return: 7
modularCalculator('*', 10, 15, 12); // Should return: 6