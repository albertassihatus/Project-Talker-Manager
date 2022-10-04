const fs = require('fs').promises;
const path = require('path');

const talkerPath = path.resolve(__dirname, '..', 'talker.json');

async function readTalkerData() {
    try {
        const data = JSON.parse(await fs.readFile(talkerPath, 'utf8'));
        const talker = JSON.parse(data);
        return talker;
    } catch (error) {
        console.log(`Erro na leitura do arquivo: ${error}`);
    }
}

module.exports = {
    readTalkerData,
};
