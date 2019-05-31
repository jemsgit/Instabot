import * as puppeteer from 'puppeteer';

async function cancelModal(page) {
    await page.waitFor(5000);
    console.log('dismiss')
    const dialog = await page.$('div[role=dialog]');
    if(dialog) {
        const button = await page.$x('//button[contains(text(), "Not Now")]');
        if(button[0]) {
            await button[0].click();
        }
    }
} 

export default {
    cancelModal
}