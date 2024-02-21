const { faker, fakerRU } = require('@faker-js/faker');

class Bot {
    constructor() {
        this.counter = 0;

        this.createWheatherObj = this.createWheatherObj.bind(this);
        this.createCurrencyObj = this.createCurrencyObj.bind(this);
        this.createNewsObj = this.createNewsObj.bind(this);
        this.createPosterObj = this.createPosterObj.bind(this);
        this.createImageObj = this.createImageObj.bind(this);

        this.listCreator = {
            wheather: {
                count: 1,
                func: this.createWheatherObj,
            },
            currency: {
                count: 3,
                func: this.createCurrencyObj,
            },
            news: {
                count: 3,
                func: this.createNewsObj,
            },
            poster: {
                count: 3,
                func: this.createPosterObj,
            },
            image: {
                count: 1,
                func: this.createImageObj,
            },
        };

        this.count = 0;
        this.counter = 0;
    }

    getInform(code) {
        const count = this.listCreator[code].count;
        const func = this.listCreator[code].func;

        this.count = count;
        
        return faker.helpers.multiple(func, { count })
    };

    createWheatherObj() {
        const result = {};

        result.degree = faker.number.int({ min: -35, max: 35 });
        result.windSpeed = faker.number.int({ min: 1, max: 20 });
        result.humidityPercents = faker.number.int({ min: 30, max: 85 });
        result.rainPercents = faker.number.int({ min: 0, max: 100 });

        return result;
    }

    createCurrencyObj() {
        const { code, symbol } = faker.finance.currency();

        const result = { code, symbol };
        result.currencySelling = faker.number.float({ min: 2, max: 100, multipleOf: 0.25 });
        result.currencyBuy = (1.1 * result.currencySelling).toFixed(2);

        return result;
    }

    createNewsObj() {
        const result = {};
        const timestamp = new Date().getTime();

        if (this.counter === this.count) {
            this.counter = 0;
          }
  
          this.counter += 1;

        result.text = fakerRU.lorem.sentence({ min: 9, max: 12 });
        result.timestamp = new Date(
            faker.date.between(
                { from: timestamp - ((4 - this.counter) * 100000), to: timestamp - ((3 - this.counter) * 100000) }
                )
        ).getTime();

        return result;
    }

    createPosterObj() {
        const result = {};
        const timestamp = new Date().getTime();

        result.src = faker.image.urlLoremFlickr({ width: 100, height: 100 });
        result.name =  fakerRU.lorem.sentence({ min: 1, max: 3 });
        result.cinema = fakerRU.lorem.word({ length: { min: 4, max: 9 } });

        if (this.counter === this.count) {
            this.counter = 0;
        }
  
        this.counter += 1;

        result.timestamp = new Date(
            faker.date.between(
                { from: timestamp + ((3 + this.counter) * 100000000), to: timestamp + ((4 + this.counter) * 100000000) }
                )
        ).getTime();

        return result;
    }

    createImageObj() {
        const result = {};

        result.src = faker.image.urlLoremFlickr({ width: 640, height: 480, category: 'city' });
        result.name = faker.location.city();

        return result;
    }
}

const bot = new Bot();

module.exports = bot;
