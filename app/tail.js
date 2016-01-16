var AWS = require('aws-sdk');

AWS.config.loadFromPath('config.json');
var cloudwatchlogs = new AWS.CloudWatchLogs();

if (!process.env.LOG_GROUP_NAME) {
    console.log('The LOG_GROUP_NAME environment variable is required!');
    return;
}
if (!process.env.LOG_STREAM_NAME) {
    console.log('The LOG_STREAM_NAME environment variable is required!');
    return;
}

process.on('SIGINT', function() {
    console.log('\ncaught SIGINT, stopping gracefully');
    process.exit(1);
});


var initialParams = {
  logGroupName: process.env.LOG_GROUP_NAME,
  logStreamName: process.env.LOG_STREAM_NAME,
  startTime: new Date().getTime()-30000,
  startFromHead: false
};

function getLogs(params) {
    params.endTime = new Date().getTime()-30000;

    cloudwatchlogs.getLogEvents(params, function(error, data) {
        if (error) {
            console.log(error)
        }

        if (data.events.length !== 0) {
            data.events.forEach(function(event) {
                console.log(new Date(event.timestamp) + ' : ' + event.message);
            });
        }

        params.startTime = undefined;

        params.nextToken = data.nextForwardToken;

        setTimeout(getLogs, 2000, params)
    })
}

setTimeout(getLogs, 2000, initialParams);
