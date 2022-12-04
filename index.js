const { low_function } = require("./core/builtin/lowLevelFunctions");
const { start } = require("./core/preprocessor/preprocessor");

function main() {
    low_function('fastSquareRoot', 0.5).then(r => console.log(r));
}

start();
main();