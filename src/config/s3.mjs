import AWS from "aws-sdk";
import config from "./env.mjs";

// When running on Elastic Beanstalk, credentials are automatically
// provided via the IAM instance role. Only use explicit credentials
// for local development.
const s3Config = {
  region: config.aws.region,
};

// Use explicit credentials only if provided (local development)
if (config.aws.accessKeyId && config.aws.secretAccessKey) {
  s3Config.accessKeyId = config.aws.accessKeyId;
  s3Config.secretAccessKey = config.aws.secretAccessKey;
}

const s3 = new AWS.S3(s3Config);

export default s3;
