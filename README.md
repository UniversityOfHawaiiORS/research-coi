INSTRUCTIONS
================

**Step 1**: download and install [Node.js and npm](https://docs.npmjs.com/getting-started/installing-node) version 4.2.6 or newer. This is the current LTS version of Node.

----------
**Step 2**: clone [research-coi project](https://github.com/kuali/research-coi)
```
cd ~/workspace
git clone https://github.com/kuali/research-coi research-coi
```
----------
**Step 3**: install dependecies
```
cd ~/workspace/research-coi
npm install

If using Oracle:
  npm uninstall mysql
  npm install strong-oracle --save
  Go through the install process listed for [strong-oracle](https://github.com/strongloop/strong-oracle), including drivers.
```
----------
**Step 4**: Create Database
```
For MySQL:
  create database coi;

For Oracle:
  CREATE USER coi IDENTIFIED BY "&pw";
  grant create session to coidemo;
  grant create procedure to coidemo;
  grant create table to coidemo;
  grant create sequence to coidemo;
  create tablespace coi ....
  alter user coi default tablespace coi;
```

----------
**Step 5**: Create knexfile.js
```
For MySQL:

module.exports = {
  kc_coi: {
    client: 'mysql',
    connection: {
      database: 'coi',
      user: 'root',
      password: ''
    }
  },
  pool: {
    min: 2,
    max: 20
  }
};

For Oracle:

module.exports = {
  kc_coi: {
    client: 'strong-oracle',
    connection: {
      database: '<sid>',
      host: '<host name or ip>',
      port: '1521',
      user: 'COI',
      password: `<password>'
    }
  }
};

```
----------

**Step 6**: Apply Migrations:

This will create the tables and insert bootstrap data needed for the application to run.
```
node research-coi/node_modules/knex/lib/bin/cli.js --cwd=db/migration --knexfile <replace with knexfile.js path> migrate:latest --env kc_coi
```



>######**Step 6.5: Optionally Apply Demo Data**
> ```node research-coi/node_modules/knex/lib/bin/cli.js --cwd=db/migration --knexfile <replace with knexfile.js path> seed:run --env kc_coi demo```
>
> This will add some demonstration data to play with.

----------

**Step 7**: Configuration Environment Variables:

System configuration for COI is done with environment variables. Environment variables can either be set in the system or added on the command line when starting the application. Below is a list of configuration environment variables

>####**Environment Configuration Variables**
>**COI_PORT**
>: port for the coi app.
>*Default*: 8090

>**DB_PACKAGE**
>: The node db package to use
>*Default*: strong-oracle

>**DB_HOST**
>: The host name for the database.
>*Default*: localhost

>**DB_PORT**
>: The port for the database.
>*Default*: none

>**DB_USER**
>: The db user name.
>*Default*: root
>
>**DB_PASSWORD**
>: The password for the db user.
>*Default*: none
>
>**DB_NAME**
>:  the name of the database.
>*Default*: coi
>
>**CONNECTION_POOL_SIZE**
>:  the size of the connection pool.
>*Default*: 70
>
>**LOCAL_FILE_DESTINATION**
>:  file system location to store attachments
>*Default*: uploads/
>
>**LOG_LEVEL**
>:  the log level to use.  0 (Info), 1 (Warn), 2 (Error)
>*Default*: 2
>
>**TRUST_PROXY**
>: The value to pass to app.set('trust_proxy', <YOUR STRING HERE>)
>*Default*:  None
>
>**RESEARCH_CORE_URL**
>: The absolute path to the research core application. Used when linking to or calling services from research core.
>  *Default*: https://uit.kuali.dev/res

-------

>###**Auth Service**
>
>Out of the box our reference implementation of the Kuali Core Auth Service is turned off. Please contact Kuali Core Team to find out more about the Auth Service.
>
>A mock auth service has been provided out of the box.  Any username starting with an "a" will be given the admin role, any other name will be given the user role.  Users p1 through p500 have been populated with demo data.
>
>Configuration variables to enable the auth service are below.
>
>**AUTH_ENABLED**
>: Flag as true if you have an auth service instance you can work with, if not present or false app will use a mock auth service.
>*Default*: false
>
>**AUTH_URL**
>: The the absolute path to the authentication service
>*Default*: false
>
>**CACHE_MAX**
>: The maximum number of items in the cache. Used by the auth service.
>*Default*: 500
>
>**CACHE_MAX_AGE**
>: The maximum age in milliseconds for an item to be valid in the cache. Used by the auth service.
>*Default*: 60000
>
>**COI_ADMIN_ROLE**
>: The research core coi admin role name space and name separated by a colon.
> *Default*:  KC-COIDISCLOSURE:COI%20Administrator
>
>**COI_REVIEWER_ROLE**
>: The research core coi reviewer role name space and name separated by a colon.
> *Default*:  KC-COIDISCLOSURE:COI%20Reviewer
>
>**AUTH_OVER_SSL**
> : If your are sure you want to use the auth service over http set this to false.
> *Default*:  true

-------

>###**Notification Service**
>
>In Development
>

**Step 8**: Run Webpack
```
npm run webpack
```
This may take a few minutes. There will likely be some warnings, but there should no errors.

**Step 9**: Start Up Node
```
DB_NAME=<db_name> DB_PACKAGE=<strong-oracle/mysql> npm start
```

**Step 10**: Navigate to hostname:port/coi/
