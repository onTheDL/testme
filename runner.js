const fs = require("fs");
const path = require("path");

class Runner {
  constructor() {
    this.testFiles = [];
  }

  async runTests() {
    for (let file of this.testFiles) {
      const beforeEaches = []
      global.beforeEach = (fn) => {
        beforeEaches.push(fn)
      }
      global.it = (desc, fn) => {
        beforeEaches.forEach(func => func())
        fn()
      }
      require(file.name)
    }
  }

  async collectFiles(targetPath) {
    // use Promise version of readdir => easier to use than callbacks

    const files = await fs.promises.readdir(targetPath);

    for (let file of files) {
      const filepath = path.join(targetPath, file);

      // to identify if file or directory
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        
        // is an array
        const childFiles = await fs.promises.readdir(filepath);

        // Add parent absolute pathway to each child file
        // see Lec 465 @ 8:13
        files.push(...childFiles.map(f => path.join(file, f)))

      }
    }
  }
}

module.exports = Runner;
