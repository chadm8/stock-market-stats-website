const AWS = require('aws-sdk');
const STAGE = process.env.STAGE;
STAGE;

AWS.config.apiVersions = {
  s3: '2006-03-01'
  // other service API versions
};

AWS.config.update({
  region: 'us-east-1'
});

//const s3Bucket = //TODO: my bucket name;
/**
 * Begin execution of Upload Form Lambda Function
 */
async function start(event) {
  try {
    // return 200 status code and submission id
    console.log('hello world');
    console.log(event.body);
    return {
      statusCode: 200,
      body: 'this is a test',
      headers: {
        // This is ALSO required for CORS to work. When browsers issue cross origin requests, they make a
        // preflight request (HTTP Options) which is responded automatically based on SAM configuration.
        // But the actual HTTP request (GET/POST etc) also needs to contain the AllowOrigin header.
        //
        // NOTE: This value is *not* double quoted: ie. "'www.example.com'" is wrong
        'Access-Control-Allow-Origin': '*'
      }
    };
  } catch (err) {
    console.info(err);
    throw err;
  }
} // start

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/
 *   developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
async function handler(event) {
  let response;
  try {
    response = await start(event);
  } catch (err) {
    console.info(err);
    return err;
  }

  return response;
}

module.exports = { handler };
