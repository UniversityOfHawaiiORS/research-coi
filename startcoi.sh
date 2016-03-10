usage()
{
cat << HERE
usage: $0 options

Start COI
OPTIONS:
        -h show this message
        -d Debug Mode
	-c Y/N (default Y)
HERE
}

DEBUG=N
CLEARLOG=Y
while getopts "hcd" OPTION
do
        case $OPTION in
                h) usage
                   exit 1
                   ;;
                d)
                   DEBUG=Y
                   ;;
                c)
                   CLEARLOG=${OPTARG}
                   ;;
                ?)
                   usage
                   exit
                   ;;
        esac
done


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

export RESEACH_CORE_URL=https://kcdev3.ors.hawaii.edu/mygrant

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
cd ${BASEDIR}
export LOG_LEVEL=0
if [ "${DEBUG}" == "Y" ]
then
    node debug server/bootstrap
else
    if [ "${CLEARLOG}" == "Y" ]
    then
        rm ${BASEDIR}/coi.log
    fi
    npm start >> ${BASEDIR}/coi.log 2>&1 &
    pid=$!
    echo $pid > ${BASEDIR}/running.pid
fi
