const { low_function } = require("./core/builtin/lowLevelFunctions");
const { start } = require("./core/preprocessor/preprocessor");

async function main() {
    await start(true);
    low_function('fastSquareRoot', 42).then(raiz => {
        low_function('teste', raiz).then(resposta => {
            console.log(resposta);
        })
    });
}


main();