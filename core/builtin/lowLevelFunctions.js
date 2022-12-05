const localStorage = require('node-localstorage').LocalStorage('./core/preprocessor/output/results');
/**
 * Map que controla todas as funções de baixo nivel compiladas
 */
const lll_function = new Map();


function addFunctionInLowLevelFunctionsBuffer(module, functionAssociated) {
    lll_function.set(module.name, functionAssociated)
}


async function low_function(functionName, ...args) {
    if (args.length > 0) {
        await lll_function.get(functionName)(args);
    }
    else {
        await lll_function.get(functionName)();
    }
    return localStorage.getItem(functionName);
}



module.exports = {low_function, addFunctionInLowLevelFunctionsBuffer};
