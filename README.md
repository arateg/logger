CUSTOMIZED COLOR LOGGER
===
***The logger has opportunities to print color messages and also send emails.***

You can write your own method names of logger and they are supported!  
## Install 
```light block 
$ npm i @arateg/logger --save
```

## Usage
File .env must contain 5 values: 
  1. **`SMTP_USER`** - ***string.*** *User who will send messages.*
  2. **`SMTP_PASS`** - ***string.*** *Password for smtp user.*
  3. **`SMTP_HOST1`** - ***string.*** *SMTP host service.*
  4. **`EMAIL_RECEIVERS`** - ***string or array.*** *Emails for messages.*
  5. **`LOG_FOLDER`** - ***string.*** *Folder to save log files.*


##### ***.env*** example
```light block 
SMTP_USER='user@gmail.com'
SMTP_PASS='password'
SMTP_HOST='smtp.gmail.com'
EMAIL_RECEIVERS='other@gmail.com'
LOG_FOLDER='/var/logs/myapp'
```
##### ***index.js***
```light block 
const {logger} = require('@arateg/logger');
logger.iWantInfo('Message for admin', { something: 'Hello', someField: 'Great!' });
logger.warnLogWithEmail('Print and send Mail', { error: 'No error', sweetCakes: 'Give me 3!!!' });
```

## API 
```light block 
logger.<method>(string, object)
```
## How it works:
```light block 
 1. The logger has some keyword:
   + daemon
   + _info
   + email
   + _error
   + _full
   + _warn
 2. Combine these words with any other words you want and create convient method name.
 3. Add a string as the 1st argument(message) and an object as the 2nd.
 4. Timestamp in format DD-MM-YYYY HH:mm:ss (31/12/2018 23:59:59) will be added automatically.
 5. You receive a colored message (and email send if needed and configured).
```

## Description of keyword(log levels):
+ `"daemon"` - print log in green ![#28C865](https://placehold.it/10/28C865/000000?text=+) color. Has `debug` log level.
+ `"_info"` - print log in cyan ![#1DC7CF](https://placehold.it/10/1DC7CF/000000?text=+) color. Has `info` log level.
+ `"email"` - send a message with report to email. Print message of successful in yellow ![#E3DA14](https://placehold.it/10/E3DA14/000000?text=+) color. If some error when sending print message in red ![#EE4218](https://placehold.it/10/EE4218/000000?text=+) color to console.
+ `"_error"` - print log in red ![#EE4218](https://placehold.it/10/EE4218/000000?text=+) color. Has `error` log level.
+ `"_full"` - print log in gray ![#A1A1A1](https://placehold.it/10/A1A1A1/000000?text=+) color. Has `silly` log level.
+ `"_warn"` - print log in magenta  ![#CE5CFF](https://placehold.it/10/CE5CFF/000000?text=+) color. Has `warn` log level.
  
## Log files:
Logger creates a folder for logs regarding `LOG_FOLDER` in `.env` file.
There is a message in console `===== New log file =====` when new file is created each day.
Logger creates a new 2 files each day, where `%DATE%` has a format `YYYY-MM-DD`. :
+ `LogError-%DATE%.log`. These files are related to `_error` log level.
+ `LogCombined-%DATE%.log`. These files are related to `silly` log level.
