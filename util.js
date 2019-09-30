const crypto = require('crypto');
const request = require('request');
const chalk = require('chalk');

module.exports =  {
  // Display the help menu
  displayHelp: () => {
    console.log(
      `Password Detective 
Copyright (c) 2019 Elikem Hermon. All rights reserved.

Usage: pass-detect [OPTION]...
  -p, --password    password to be checked
  -h, --help        display the help menu`);
    process.exit();
  },

  // Hash password using SHA1
  hashPassword: password => {
    let hash = crypto.createHash('sha1');
    hash.update(password);
    return hash.digest('hex');
  },

  // Retrieve hash list from the hibp api
  fetchHashList: (passwordHash, callback) => {
    // Make a request to the hibp api
    const reqOptions = {
      url: `https://api.pwnedpasswords.com/range/${passwordHash.substring(0, 5)}`,
      headers: {
        'User-Agent': 'password-detective'
      }
    };

    request(reqOptions, (error, response, body) => {
      if (error) {
        throw error;
      }

      if (response.statusCode === 200) {
        let hashList = body.split('\r\n');

        hashList.forEach((item, index, arr) => {
          let hashVal = item.substring(0, 35).toLowerCase();
          let appearances = item.substring(36);

          arr[index] = { 'passwordHash': hashVal, 'appearances': appearances };
        });

        callback(hashList);
      } else {
        console.log(chalk.red('Error: The request could not be processed'));
        process.exit();
      }
    });
  }
};
