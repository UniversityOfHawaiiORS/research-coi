BASEDIR=`dirname $0`
read pid < ${BASEDIR}/running.pid
kill $pid
rm ${BASEDIR}/running.pid

