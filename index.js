#!/usr/bin/env node

const readlineSync = require('readline-sync');
const chalk = require('chalk');

const { displayHelp, hashPassword, fetchHashList } = require('./util');

let option, password, passwordHash;
let isPawned = false;

// Check option
[,, option, password] = process.argv; // Retrieve user password and option from args
if ((option !== '--password') && (option !== '-p')) {
  displayHelp();
}

// Check if a password was passed
if (!password) {
  passwordHash = hashPassword(readlineSync.question('Password: ', { hideEchoBack: true }));
} else {
  console.log(chalk.red('Typing your password within the terminal is unsafe!'));
  console.log('Use the --password(-p) option without any arguments to hide your password.\n');
  passwordHash = hashPassword(password);
  password = '';
}

fetchHashList(passwordHash, hashList => {
  hashList.forEach(element => {
    if (element.passwordHash === passwordHash.substring(5)) {
      isPawned = true;
      console.log(chalk.red('Your password has been compromised!'));
      console.log(`It appears ${chalk.red(element.appearances)} times within the data set.`);
    }
  });

  if (!isPawned) {
    console.log(chalk.green('Your password was not found within the data set of compromised passwords.'));
  }
});
