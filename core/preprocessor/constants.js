/*
    Essas são todas as linguagens disponíveis no momento
*/
const LANGUAGES = {
    C: "C",
    CPP: "C++"
};

/*
    Local do arquivo de configurações das linguagens
*/
const CONFIG_FILE_LOCATION="core\\preprocessor\\config\\processing-configs.json";

/*
    Map com os comandos para compilar os programas de acordo com o nome dele
*/ 
const COMMANDS_BY_LANGUAGE = {
    "C": function(module) {
        let compiledFileExtension = module.operationalSystem === 'windows'? '.exe': '.o'
        return `gcc ${module.location} -o ${module.outputName}${compiledFileExtension}`
    },
    "C++": function(module) {
        let compiledFileExtension = module.operationalSystem === 'windows'? '.exe': '.o'
        return `g++ -o ${module.outputName}${compiledFileExtension} ${module.location}`
    }
};


module.exports = {LANGUAGES, COMMANDS_BY_LANGUAGE, CONFIG_FILE_LOCATION};
