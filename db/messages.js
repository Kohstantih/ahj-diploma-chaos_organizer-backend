class Messages {
    constructor() {
        this.box = [];
    }

    getMessagesList(filter, count, lastId) {
        if (this.box.length === 0) return this.box;

        const result = [];
        let indexStart = null;
    
        const filteredMessages = this.getMessagesByFilter(filter);
        
        if (!filteredMessages) return result;
        
        indexStart = filteredMessages.findIndex((el) => el.id === lastId);
        indexStart = indexStart >= 0 ? indexStart : filteredMessages.length;
        indexStart -= 1;
               
        for (let i = indexStart; i > indexStart - count; i -= 1) {
            if (i >= 0) {
                result.unshift(filteredMessages[i]);
            };                        
        }

        return result;
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
        const oldPinnedMessage = this.getPinnedMessage();
        if(oldPinnedMessage) oldPinnedMessage.pinned = false;

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

    clearMessages() {
        this.box = [];
    }
}

const messages = new Messages;

module.exports = messages;
