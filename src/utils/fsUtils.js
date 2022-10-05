// const path = require('path');

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

// async function writeNewTalkerData(newTalkers) {
//     try {
//         const oldTalkers = await readTalkerData();
//         const newTalkersWithId = { id: oldTalkers.length + 1, ...newTalkers };
//         const allTalkers = JSON.stringify(
//             newTalkersWithId,
//         );

//         await fs.writeFile(talkerPath, allTalkers);
//         return newTalkersWithId;
//     } catch (error) {
//         console.log(`Erro na leitura do arquivo: ${error}`);
//     }
// }

const writeNewTalkerData = async (newTalkers) => {
    try {
      await fs.writeFile(join(__dirname, talkerPath), JSON.stringify(newTalkers));
    } catch (error) {
      return null;
    }
  };

module.exports = {
    readTalkerData,
    writeNewTalkerData,
};
