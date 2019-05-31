import * as puppeteer from 'puppeteer';

let time = 15000;

async function hashtagObserver(page: puppeteer.Page, hastag: string) {
    let cancelled = false;

    async function observe() {
        console.log('start observe')
        await page.goto(`https://www.instagram.com/explore/tags/${hastag}`, {waitUntil: 'networkidle2'});
        let images = await page.$$('article > div:nth-child(3) img');
        images.forEach(async element => {
            const imgSrc = await page.evaluate(img => img.getAttribute('src'), element);
            console.log(imgSrc);
            await element.dispose();
        });
        if(!cancelled) {
            setTimeout(observe, time)
        }
    }

    function cancel() {
        cancelled = true;
    }

    observe();
    return {
        cancel
    }
}

export default { hashtagObserver }