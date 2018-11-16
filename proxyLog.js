const methodHandlers = require('./logHandlers');

module.exports =  new Proxy(console, {
    get(target, name) {
        if(typeof target[name] === 'function') return Reflect.get(target, name);

        const chosen = [];

        Object.keys(methodHandlers).forEach(variant => {
            if(name.toLowerCase().indexOf(variant) !==-1) {
                chosen.push(variant);
            }
        });

        return (...args) => {
            chosen.forEach(methodName => methodHandlers[methodName](...args))
        };
    }
});
