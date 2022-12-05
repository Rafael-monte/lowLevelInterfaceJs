const { openConfigurationFile } = require("./configurationFileReader");
const { COMMANDS_BY_LANGUAGE } = require("./constants");
const { exec } = require("child_process");
const localStorage = require("node-localstorage").LocalStorage('./core/preprocessor/output/results');
const { addFunctionInLowLevelFunctionsBuffer, LLLFunction, low_function } = require("../builtin/lowLevelFunctions");
const path = require("path");

/**
 * Compila os módulos de linguagem de baixo nivel (LLLModules)
 */
async function compileLowLevelPrograms(showStatistics) {
    console.log('Iniciando pré-compilação...');
    console.time();
    const processingConfigs = openConfigurationFile();
    for (const module of processingConfigs.modules) {
        await generateOutputFileByModule(module);
    }
    console.log('Finalizado');
    console.timeEnd();
    if (!showStatistics) {
        console.clear();
    }
}

/**
 * Compila os arquivos para gerar um arquivo saída
 * @param {LowLevelLanguageModule} module 
 */
async function generateOutputFileByModule(module) {
    let executionCommand = COMMANDS_BY_LANGUAGE[module.targetLanguage](module);
    showModule(module, executionCommand);
    await compileModule(executionCommand, module);
    addFunctionInLowLevelFunctionsBuffer(module, createFunctionToAssociate(module));
}


function createFunctionToAssociate(module) {
    return async function(...args) {
        return new Promise((resolve, reject) => {
            const extension = process.platform.startsWith('win')? '.exe': '.o';
                exec(`${module.outputName}${extension} ${args.length>0? args.join(' '): ''}`, (error, stdout, stderr) => {
                    if (error || stderr !== '') {
                        console.error(`Error ${error}`);
                        throw new Error();
                    }
                resolve(localStorage.setItem(module.name, stdout));     
            });
        })
    }
}


async function compileModule(executionCommand, module) {
    return new Promise((resolve, reject) => {
        exec(executionCommand, (error, stdout, stderr) => {
           if (error) {
               console.error(`Ocorreu um erro ao compilar o modulo ${module.name}`);
               reject(error);
               return;
           }
           if (stderr) {
               console.log(`stderr: ${stderr}`);
               resolve(stderr);
               return;
           }
   
           if (stdout !== "") {
               console.log(`${module.name}: Modulo compilado, porém com avisos: ${stdout}`);
            }
            resolve(stdout);
       });
    })
}

/**
 * Mostra o módulo que será compilado
 * @param {LowLevelLanguageModule} module - Módulo de linguagem de baixo nivel que vai ser compilado  
 * @param {string} executionCommand - Comando usado para compilar o arquivo  
 */
function showModule(module, executionCommand) {
    const PIPE_SEPARATOR = "--------------------\n";
    console.log(`\tLanguage: ${module.targetLanguage}\n\tCommand: ${executionCommand}\n\tName: ${module.name}\n${PIPE_SEPARATOR}`);
}


async function start(showStatistics=false) {
    await compileLowLevelPrograms(showStatistics);
}

module.exports = {start}