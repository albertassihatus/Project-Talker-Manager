const { join } = require('path');

const fs = require('fs').promises;

const talkerPath = './src/talker.json';

async function readTalkerData() {
    try {
        const data = await fs.readFile(talkerPath, 'utf8');
        const talker = JSON.parse(data);
        return talker;
    } catch (error) {
        console.log(`Erro na leitura do arquivo: ${error}`);
    }
}

const writeNewTalkerData = async (newTalkers) => {
  try {
    const talkerData = join(talkerPath);
    await fs.writeFile(talkerData, JSON.stringify(newTalkers));
  } catch (error) {
    console.error('Erro ao salvar o arquivo', error.message);
  }
};

module.exports = {
    readTalkerData,
    writeNewTalkerData,
};
