BASEDIR=`dirname $0`
export DB_PACKAGE=strong-oracle
export COI_PORT=8070

#export application config env and set using source application.conf
export DB_HOST
export DB_PORT
export DB_NAME
export DB_USER
export DB_PASSWORD
export OCI_HOME
export LOCAL_FILE_DESTINATION
export AUTHZ_HOST
source ${BASEDIR}/application.conf

export CONNECTION_POOL_SIZE=70
export AUTH_ENABLED=false
export CACHE_MAX=500
export CACH_MAX_AGE=60000
export AUTHZ_ADMIN_ROLE=KC-COIDISCLOSURE:COI%20Administrator

# Run webpack to make sure the latest is packaged ?
# node run webpack

# Documented here http://expressjs.com/en/guide/behind-proxies.html
export TRUST_PROXY="true"

export OCI_LIB_DIR=$OCI_HOME
export OCI_INCLUDE_DIR=$OCI_HOME/sdk/include
export DYLD_LIBRARY_PATH=$OCI_LIB_DIR

#note BASEDIR configured in application.conf
if [ -f ${BASEDIR}/running.pid ]
then
    echo "Error seems like it is already running....found running.pid file"
    exit 1
fi

#DB_NAME=kcdev node --debug-brk=51021 --nolazy server/bootstrap
#node-debug server/bootstrap.js
cd ${BASEDIR}
node server/bootstrap 2>&1 >> ${BASEDIR}/node.coi.log &
pid=$!
echo $pid > ${BASEDIR}/running.pid
