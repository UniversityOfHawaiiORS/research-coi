export OCI_HOME=/opt/oracle/instantclient_11_2
export OCI_LIB_DIR=$OCI_HOME
export OCI_INCLUDE_DIR=$OCI_HOME/sdk/include
export DYLD_LIBRARY_PATH=$OCI_LIB_DIR

export COI_PORT=8090
export DB_PACKAGE=strong-oracle
export DB_HOST=localhost
export DB_PORT=1530
export DB_USER=coidemo
export DB_PASSWORD=coidemokualico
export DB_NAME=kcdev
export CONNECTION_POOL_SIZE=70
export LOCAL_FILE_DESTINATION=~/coidemo/attachments

export AUTH_ENABLED=false
export CACHE_MAX=500
export CACH_MAX_AGE=60000
export AUTHZ_HOST=kcdev.ors.hawaii.edu
export AUTHZ_ADMIN_ROLE=KC-COIDISCLOSURE:COI%20Administrator

# Run webpack to make sure the latest is packaged ?
./node_modules/.bin/webpack

#DB_NAME=kcdev node --debug-brk=51021 --nolazy server/bootstrap
#node-debug server/bootstrap.js
node server/bootstrap
