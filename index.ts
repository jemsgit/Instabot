import Browser from './src/browser/browser';
import AuthModule from './src/instagram/authenticate';
import HashTagOberver from './src/instagram/hashtagObserver';
import DismissModal from './src/instagram/dismissNotifyModal';

async function main() {
    let browser = new Browser('https://www.instagram.com', { headless: false });
    await browser.launch();
    let page = await browser.openPage('accounts/login/');
    await AuthModule.authenticateUser(page, '123', '123');
    await DismissModal.cancelModal(page);
    await HashTagOberver.hashtagObserver(page, 'clubdruzhba');
}

main();