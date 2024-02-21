const messages = require('./messages');

class Searcher {
    constructor() {
        this.foundMessages = [];
    }

    startSearch(value) {
        this.foundMessages = [];

        const template =  new RegExp(value, 'gi');

        this.searchTextMessages(template);

        this.searchFileMessages(template);

        return this.foundMessages;
    }

    searchTextMessages(template) {
        const textMessages =  messages.box.filter((m) => !m.fileStatus && m.type !== 'sticker');
        if (!textMessages) return;

        textMessages.forEach((el) => {
            const index = el.message.search(template);
            if (index >= 0) {
                this.foundMessages.push({
                    fileStatus: false,
                    id: `${el.id}`,
                    message: `${el.message}`,
                });
            }
        });
    }

    searchFileMessages(template) {
        const fileMessages =  messages.box.filter((m) => m.fileStatus);
        if (!fileMessages) return;

        fileMessages.forEach((el) => {
            const index = el.fileName.search(template);
            if (index >= 0) {
                this.foundMessages.push({
                    fileStatus: true,
                    fileName: el.fileName,
                    id: `${el.id}`,
                });
            }
        });
    }
}

const searcher = new Searcher();

module.exports = searcher;
