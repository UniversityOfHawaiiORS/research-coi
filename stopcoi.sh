BASEDIR=`dirname $0`
read pid < ${BASEDIR}/running.pid
childpid=`pgrep -P $pid` 
rm ${BASEDIR}/running.pid
kill $pid
kill $childpid
