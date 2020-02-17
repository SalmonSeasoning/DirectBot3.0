# DirectBot3.0

A Discord Template Bot built with Node.js

# License
Licensed MIT (See LICENSE)

# Setting up DirectBot3.0

1) Make sure you have `git` and `npm` installed!

2) `git clone https://github.com/SalmonSeasoning/DirectBot3.0` in the desired directory

3) Run `npm install`

4) Run `npm run gen-config` to generate the config.json file

5) See "Setting up config.json"

6) If you want the default database-related commands, run `npm run sql-setup`

7) Simply start the node program up with `node .` or by using ForeverJS

# Setting up config.json

`global_prefix` (default: `"!"`) the bot's prefix

`activity` (default: `"<global_prefix>help"`) the bot's "PLAYING" status

`presence` (default: `"online"`) the bot's online status

`database` the database configuration

- `host` (default: `"localhost"`) the target to connect to

- `username` (default: `"root"`) the username for database

- `password` the password for the database

- `database` the name of the database or schema being used

> Note: If you do not have an available database connection, simply discard the `database { ... }` code block from config.json and it will be completely ignored with the downside of all database-requiring commands being disabled as well... obviously.

`administrator_uids` (default: `[]`) an array of Discord UIDs that will be marked as administrators

`private_token` the bot's login token
