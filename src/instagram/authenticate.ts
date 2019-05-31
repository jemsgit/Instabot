import * as puppeteer from 'puppeteer';
import MailBox from '../utils/pop3';

async function authenticateUser(page: puppeteer.Page, login: string, password: string) {
    console.log('authPage')
    await page.waitForSelector('input[name="username"]');

    const usernameInput = await page.$('input[name="username"]');
    const passwordInput = await page.$('input[name="password"]');

    await usernameInput.type(login, { delay: 50 });
    await passwordInput.type(password, { delay: 50 });

    const logInButton = await page.$('button[type=submit]');

    await logInButton.click();

    await page.waitFor(5000);
    await checkSuspiciousLoginCheck(page);
}

async function checkSuspiciousLoginCheck(page) {
    console.log('checkSuspicious')
    const header = await page.$('section h2');
    const text = header ? await page.evaluate(element => element.textContent, header) : null;
    if(header && text == 'We Detected An Unusual Login Attempt') {
        const senCodeButton = await page.$('form button');
        senCodeButton.click();
        await page.waitFor(20000);
        let mailbox: MailBox = new MailBox('123', '123');
        let mails = await mailbox.readMails();
        console.log('filtering')
        mails = mails.filter(item => {
            console.log(item);
            return item.headers 
            && item.headers.from 
            && item.headers.from.includes('Instagram') 
            && item.headers.subject 
            && item.headers.subject.includes('Подтвердите')
        })

        if(mails[0]) {
            let mailMarkup = mails[0].html;
            let codePosition = mailMarkup.indexOf('<font size="6">') + 15;
            let code = mailMarkup.slice(codePosition, codePosition + 6);
            console.log(code);
            if(code) {
                let codeInput = await page.$('input[name=security_code]');
                codeInput.type(code, { delay: 50 });
                await page.waitFor(2000);
                const submitButton = await page.$('form button');
                await submitButton.click();
                await page.waitFor(2000);
            }
        }
        
    }
} 

export default {
    authenticateUser
}