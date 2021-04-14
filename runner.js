const fs = require("fs");

class Runner {
  constructor() {
    this.files = [];
  }

  async collectFiles(targetPath) {
    // use Promise version of readdir => easier to use than callbacks

    const files = await fs.promises.readdir(targetPath)

    return files

  }
}

module.exports = Runner;
