// Copyright (c) Alliedstrand Corporation. All rights reserved.
//
// Licensed under the MIT License.

/**
 * @file Retrieve the GitHub Personal Access Token for GitHub Package Registry
 * access and store it in a root `.npmrc` file.
 *
 * @note This script should be placed in the root of the repository and added
 * to the "preinstall" script in the `package.json` file. For example,
 * `"preinstall": "node preinstall.js"`
 *
 * @note The `.npmrc` file generated by the script should not be committed to a
 * VCS as it contains sensitive information.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

const npmrcFilename = '.npmrc';
const userHomeDirpath = os.homedir();
const userNpmrcFilepath = path.join(userHomeDirpath, npmrcFilename);

const repoRootFilepath = process.cwd();
const repoNpmrcFilepath = path.join(repoRootFilepath, npmrcFilename);

console.info(`INFO: Creating ${repoNpmrcFilepath}...`);

const githubDocLink =
  'See https://help.github.com/en/github/managing-packages-with-github-package-registry/configuring-npm-for-use-with-github-package-registry';

const githubRegUrlPrefix = '//npm.pkg.github.com/:_authToken=';

if (!fs.existsSync(userNpmrcFilepath)) {
  console.error(
    `Cannot find ${npmrcFilename} file in ${userHomeDirpath}. Did you run 'npm login' for the GitHub Package Registry.`,
  );
  console.error(githubDocLink);
  process.exit(-1);
}

const npmrcReadInterface = readline.createInterface({
  input: fs.createReadStream(userNpmrcFilepath),
});

/**
 * Extract Github Personal Access Token from the user `.npmrc` file.
 * @returns {string | undefined} GitHub token if present. Otherwise,`undefined`.
 */
async function getGithubToken() {
  let token = undefined;

  for await (const line of npmrcReadInterface) {
    if (line.indexOf(githubRegUrlPrefix) === 0) {
      token = line.split(githubRegUrlPrefix)[1];
    }
  }

  return token;
}

getGithubToken().then(githubToken => {
  if (githubToken) {
    const npmrcContents = `${githubRegUrlPrefix}${githubToken}
@alliedstrand:registry=https://npm.pkg.github.com`;

    fs.writeFileSync(repoNpmrcFilepath, npmrcContents);
  } else {
    console.error(
      `Cannot find the npm registry URL for the GitHub Package Registry.
      Did you run 'npm login' for the GitHub Package Registry.`,
    );
    console.error(githubDocLink);
    process.exit(-1);
  }
});

console.log(`SUCCESS: Created ${repoNpmrcFilepath}...`);
