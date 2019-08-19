# database

- https://github.com/99xt/serverless-dynamodb-local
- run dynamodb locally before starting the other apis

- sls dynamodb install
- sls dynamodb start

- then can view shell http://localhost:8008/shell/

```javascript
var params = {
    TableName: 'dev-earth-stories'
};
dynamodb.scan(params, function(err, data) {
    if (err) ppJson(err); // an error occurred
    else ppJson(data); // successful response
});
```

- using my dynamodb forked repo
- sls dynamodb start --userStop
