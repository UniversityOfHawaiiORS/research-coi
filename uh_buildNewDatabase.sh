echo "Running knex migrate" > coi_databuild.log
echo "====================" >> coi_databuild.log
node ./node_modules/knex/lib/bin/cli.js --cwd=db/migration --knexfile ./knexfile.mac.js migrate:latest --env kc_coi >> coi_databuild.log 2>&1


echo "Running knex seed (with demo data)" >> coi_databuild.log
echo "====================" >> coi_databuild.log
node ./node_modules/knex/lib/bin/cli.js --cwd=db/migration --knexfile ./knexfile.mac.js seed:run --env kc_coi demo >> coi_databuild.log 2>&1
