const Xvfb = require('xvfb');

describe('Wallet', () => {
    beforeAll(async () => {
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
