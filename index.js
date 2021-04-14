#!/usr/bin/env node

const Runner = require('./runner')
const runner = new Runner()

const run = async () => {
  // process.cwd() => retrieves the current working directory
  const results = await runner.collectFiles(process.cwd())
  
  console.log(results);
}

run()