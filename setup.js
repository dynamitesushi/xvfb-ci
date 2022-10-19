const { writeFile } = require('fs').promises;
const os = require('os');
const path = require('path');

const { bootstrap } = require('@chainsafe/dappeteer');
const mkdirp = require('mkdirp');
const puppeteer = require('puppeteer');

const DIR = path.join(os.tmpdir(), 'jest_dappeteer_global_setup');

module.exports = async function () {
    const [metamask, page, browser] = await bootstrap(puppeteer, {
        headless: true,
        metamaskVersion: 'v10.15.0',
    });

    console.log('MetaMask has been setup');

    try {
        global.browser = browser;
    } catch (error) {
        console.log(error);
        throw error;
    }

    mkdirp.sync(DIR);
    await writeFile(path.join(DIR, 'wsEndpoint'), browser.wsEndpoint());
    process.env.PUPPETEER_WS_ENDPOINT = browser.wsEndpoint();
};
