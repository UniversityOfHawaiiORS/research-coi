BASEDIR=`dirname $0`
# if process dies but running.pid file remains then stop script
# wasn't used to restart
# this is done to address the fact that the node process seems to keep dying.
while [ 1 ]
do
    date >> ${BASEDIR}/coi.log
    node server/bootstrap >> ${BASEDIR}/coi.log 2>&1
    echo "Process died restarting" >> ${BASEDIR}/coi.log
done

