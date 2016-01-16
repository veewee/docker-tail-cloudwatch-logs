# Docker tail cloudwatch logs

This container provides an easy way to tail cloudwatch logs in your terminal.
 Internally it runs a slightly altered version of the node application
 [cloudwatch-logs-tail](https://github.com/liamoehlman/cloudwatch-logs-tail.git).


## Config file

For cnnecting with AWS, a config.json needs to be added to the container:

```js
// config.json
{
    "accessKeyId": "aws-acceskeyid",
    "secretAccessKey": "aws-secretAccessKey",
    "region": "eu-west-1"
}
```

## Run

Running the container is done with following command:

```sh
docker run -ti --rm \
    --name=tailcloudwatch-logs \
    -v "$PWD/config.json":"/app/config.json" \
    -e LOG_GROUP_NAME=aws-cloudwatch-logs-group-name \
    -e LOG_STREAM_NAME=aws-cloudwatch-logs-stream-name \
    veewee/tail-cloudwatch-logs
```

### Volumes

- **config.json**: Your aws config file needs to be synced to the `/app/config.json` file in the container.

### Envorinment variables

- **LOG_GROUP_NAME**: The name of a group in cloudwatch logs.
- **LOG_STREAM_NAME**: The name of a stream in cloudwatch logs.


## Building the container
```
docker build --no-cache -t veewee/tail-cloudwatch-logs .
```