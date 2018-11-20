require('dotenv').config();

const methodHandlers = require('./logHandlers');

module.exports =  new Proxy(console, {
    get(target, name) {

        const chosen = [];

        Object.keys(methodHandlers).forEach(variant => {
            if(name.toLowerCase().indexOf(variant) !==-1) {
                chosen.push(variant);
            }
        });
        
        if(!chosen.length && typeof target[name] === 'function') return Reflect.get(target, name);

        return (...args) => {
            chosen.forEach(methodName => methodHandlers[methodName](...args))
        };
    }
});
