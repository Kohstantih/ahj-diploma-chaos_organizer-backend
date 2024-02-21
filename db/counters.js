class Counters {
    constructor() {
        this.box = {
            favorites: 0,
            image: 0,
            video: 0,
            audio: 0,
            other: 0,
            links: 0,
            text: 0,
            sticker: 0,
            all: 0,
        }
    }

    increaseCount(filter) {
        this.box[filter] += 1;
        this.box.all +=1;
    }
    
    reduceCount(filter) {
        this.box[filter] -= 1;
        this.box.all -=1;
    }

    changeFavoritesCount(status) {
        this.box.favorites += status ? 1 : -1;
    }

    recalculation(element) {
        this.reduceCount(element.type);
        if(element.favorites) this.changeFavoritesCount(false);
    }

    getFiltersList() {
        return [
            {
                filter: 'favorites',
                count: this.box.favorites,
            },
            {
                filter: 'image',
                count: this.box.image,
            },
            {
                filter: 'video',
                count: this.box.video,
            },
            {
                filter: 'audio',
                count: this.box.audio,
            },
            {
                filter: 'other',
                count: this.box.other,
            },
            {
                filter: 'links',
                count: this.box.links,
            },
            {
                filter: 'text',
                count: this.box.text,
            },
            {
                filter: 'sticker',
                count: this.box.sticker,
            },
            {
                filter: 'all',
                count: this.box.all,
            },
        ];
    }

    clearCounters() {
        this.box = {
            favorites: 0,
            image: 0,
            video: 0,
            audio: 0,
            other: 0,
            links: 0,
            text: 0,
            sticker: 0,
            all: 0,
        };
    }
}

const counters = new Counters();

module.exports = counters;