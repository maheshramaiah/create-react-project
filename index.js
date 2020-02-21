#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const CURR_DIR = process.cwd();

inquirer.prompt([
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name'
  }
]).then(answers => {
  const projectName = answers['project-name'];

  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  createDirectories(`${__dirname}/template`, projectName);
});

function createDirectories(dir, outputPath) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const orgFilePath = `${dir}/${file}`;
    const stats = fs.statSync(orgFilePath);

    if (stats.isFile()) {
      const content = fs.readFileSync(orgFilePath, 'utf-8');

      fs.writeFileSync(`${CURR_DIR}/${outputPath}/${file}`, content, 'utf-8');
    }
    else {
      fs.mkdirSync(`${CURR_DIR}/${outputPath}/${file}`);
      createDirectories(orgFilePath, `${outputPath}/${file}`);
    }
  });
}