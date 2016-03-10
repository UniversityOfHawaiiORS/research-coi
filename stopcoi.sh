# Start coi uses npm start which creates three processes.
# 1-npm 
# 2-node /Users/gouldner/github/research-coi/node_modules/.bin/babel-node server/bootstrap.js
# 3-/Users/gouldner/.nvm/versions/node/v4.2.6/bin/node /Users/gouldner/github/research-coi/node_modules/babel-cli/lib/_babel-node server/bootstrap.js
# We need to kill all three for stop
BASEDIR=`dirname $0`
read pid < ${BASEDIR}/running.pid
childpid=`pgrep -P $pid` 
grandchildpid=`pgrep -P $childpid` 
rm ${BASEDIR}/running.pid
echo Killing $pid,$childpid,$grandchildpid
kill $pid
kill $childpid
kill $grandchildpid
