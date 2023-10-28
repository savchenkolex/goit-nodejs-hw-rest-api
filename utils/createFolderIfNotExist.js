const fs = require('fs').promises;
const path = require('path');

const isAccessible = path => {
    return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
};

async function createFolderIfNotExist (folder) {
    const publicDir = path.join(process.cwd(), 'public');
    if (!(await isAccessible(publicDir))) {
        await fs.mkdir(publicDir);
    } 
    
    if (!(await isAccessible(folder))) {
      await fs.mkdir(folder);
    }
  };

  module.exports = createFolderIfNotExist;