# Serverless REST API with DynamoDB and offline support


https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb-and-offline

This example demonstrates how to run a service locally, using the
[serverless-offline](https://github.com/dherault/serverless-offline) plugin. It
provides a REST API to manage stories stored in a DynamoDB, similar to the
[aws-node-rest-api-with-dynamodb](https://github.com/serverless/examples/tree/master/aws-node-rest-api-with-dynamodb)
example. A local DynamoDB instance is provided by the
[serverless-dynamodb-local](https://github.com/99xt/serverless-dynamodb-local)
plugin.

## Use-case

Test your service locally, without having to deploy it first.

## Setup

```bash
npm install
serverless dynamodb install
serverless offline start
serverless dynamodb migrate (this imports schema)
```

## Run service offline

```bash
serverless offline start
```

## Usage

You can create, retrieve, update, or delete stories with the following commands:

### Create a Story

```bash
curl -X POST -H "Content-Type:application/json" http://localhost:3000/stories --data '{ "text": "Learn Serverless" }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### List all stories

```bash
curl -H "Content-Type:application/json" http://localhost:3000/stories
```

Example output:
```bash
[{"text":"Deploy my first service","id":"ac90feaa11e6-9ede-afdfa051af86","checked":true,"updatedAt":1479139961304},{"text":"Learn Serverless","id":"206793aa11e6-9ede-afdfa051af86","createdAt":1479139943241,"checked":false,"updatedAt":1479139943241}]%
```

### Get one Story

```bash
# Replace the <id> part with a real id from your stories table
curl -H "Content-Type:application/json" http://localhost:3000/stories/<id>
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":false,"updatedAt":1479138570824}%
```

### Update a Story

```bash
# Replace the <id> part with a real id from your stories table
curl -X PUT -H "Content-Type:application/json" http://localhost:3000/stories/<id> --data '{ "text": "Learn Serverless", "checked": true }'
```

Example Result:
```bash
{"text":"Learn Serverless","id":"ee6490d0-aa11e6-9ede-afdfa051af86","createdAt":1479138570824,"checked":true,"updatedAt":1479138570824}%
```

### Delete a Story

```bash
# Replace the <id> part with a real id from your stories table
curl -X DELETE -H "Content-Type:application/json" http://localhost:3000/stories/<id>
```

No output





---

npx aws-api-gateway-cli-test \
--username='admin@example.com' \
--password='Passw0rd!' \
--user-pool-id='us-west-2_YleYELg2d' \
--app-client-id='4es8r3hacndorjq8bdl89fm8ac' \
--cognito-region='us-west-2' \
--identity-pool-id='us-west-2:d702d309-1152-4616-ad6b-8a1025e8fdcb' \
--invoke-url='https://2g0vjyabsa.execute-api.us-west-2.amazonaws.com/dev' \
--api-gateway-region='us-west-2' \
--path-template='/stories' \
--method='POST' \
--body='{"title":"hello world","document":"hello.jpg"}'

