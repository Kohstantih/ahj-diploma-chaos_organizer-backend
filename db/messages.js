class Messages {
    constructor() {
        this.box = [];
    }

    getMessagesByFilter(name) {
        if (name === 'all') return this.box
        if(name === 'favorites') return this.box.filter((m) => m.favorites);
        return this.box.filter((m) => m.type === name);
    }

    toggleFavoritesStatus(id) {
        const element = this.box.find((el) => el.id === id);

        element.favorites = element.favorites ? false : true;

        return element.favorites;
    }

    getMessageById(id) {
        const element = this.box.find((el) => el.id === id);
        return element;
    }

    deleteMessage(id) {
        this.box = this.box.filter((el) => el.id !== id);
    }

    changePinnedStatus(id) {
        if(this.pinnedMessageId) {
            this.getMessageById(this.pinnedMessageId).pinned = false;
        }

        const newPinnedMessage = this.getMessageById(id);
        newPinnedMessage.pinned = true;

        return newPinnedMessage;
    }

    deletePinnedStatus() {
        this.getPinnedMessage().pinned = false;
    }

    getPinnedMessage() {
        const result = this.box.find((el) => el.pinned);

        return result;
    }
}

const messages = new Messages;

module.exports = messages;
