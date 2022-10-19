const fs = require('fs');

const filepath = __dirname + '/node_modules/@chainsafe/dappeteer/dist/setup/launch.js';

(async () => {
    let update = false;
    let launchFile = fs.readFileSync(filepath, 'utf-8')

    if (launchFile.includes('args: [`--disable-extensions-except=${METAMASK_PATH}`')) {
        update = true;
        launchFile = launchFile.replace(/args: \[`--disable-extensions-except=\${METAMASK_PATH}`/g, "ignoreHTTPSErrors: true, args: \['--ignore-certificate-errors', `--disable-extensions-except=\${METAMASK_PATH}`");
        console.log('patched the ignore https errors flag for dappeteer ::: launch.js');
    }

    if (update) {
        await fs.writeFileSync(filepath, launchFile)
    }
})();
