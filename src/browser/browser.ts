import * as puppeteer from 'puppeteer';

class Browser {
    host: string;
    browserProps: Object;
    browser: puppeteer.Browser;
    pages: Array<puppeteer.Page>;

    constructor(host: string, props: Object) {
        this.host = host;
        this.browserProps = props;
        this.pages = [];
    }

    async launch() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: ['--lang=en-US,en'],
            ...this.browserProps
        });
        return true
    }

    async openPage(pageUrl) {
        if(!this.browser) {
            throw new Error ('No browser');
        }
        let page: puppeteer.Page = await this.browser.newPage();
        this.pages.push(page);
        await page.goto(`${this.host}/${pageUrl}`, {waitUntil: 'networkidle2'});
        return page;
    }

    async closeBrowser() {
        if(!this.browser) {
            throw new Error ('No browser');
        }
        await this.browser.close();
    }
}

export default Browser;