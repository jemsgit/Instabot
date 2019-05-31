import * as Client from 'node-poplib-gowhich';

class MailBox {
    client: any;

    constructor(login: string, password: string) {
        this.client = new Client.Client({
            hostname: 'pop.gmail.com',
            port: 995,
            tls: true,
            mailparser: true,
            username: login,
            password: password
        });
    }

    async readMails() {
        let getMessagesPromise = new Promise((resolve, reject) => {
            try {
                this.client.connect((err) =>{
                    if(err) {
                        reject(err);
                    }
                    console.log('reading mails')
                    this.client.retrieveAll((err, messages) => {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(messages)
                        }
                        this.client.quit();
                      })
                })
            } catch(e) {
                reject(e);
            }
            
        })

        let messages;

        try {
            messages = await getMessagesPromise;
        } catch(e) {
            console.log(e)
        }
        return messages;
    }
}

export default MailBox;