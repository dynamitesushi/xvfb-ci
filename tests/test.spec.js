const Xvfb = require('xvfb');

describe('Wallet', () => {
    beforeAll(async () => {
        var xvfb = new Xvfb({
            silent: true,
            xvfb_args: ["-screen", "0", '1280x720x24', "-ac"],
        });
        xvfb.start((err)=>{if (err) console.error(err)})

        await page.goto('https://localhost:9003');
        await page.type('input[type="password"]', '123');
        await page.click('input[type="submit"]');
        await page.waitForNetworkIdle();
        const app = await page.evaluate(() => {
            const element = [...document.querySelectorAll('.app-title')].find(element => element.textContent === 'Wallet');
            return element.parentElement.parentElement.href;
        });

        await page.goto(app);
    });

    it('should be titled "Wallet"', async () => {
        await page.screenshot({ path: './screenshots/wallet.png' });
        await expect(page.title()).resolves.toMatch('Wallet');
    });
});
