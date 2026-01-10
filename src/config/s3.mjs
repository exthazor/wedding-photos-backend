import AWS from "aws-sdk";
import { env } from "config";

const s3 = new AWS.S3({
  accessKeyId: env.aws.accessKeyId,
  secretAccessKey: env.aws.secretAccessKey,
  region: env.aws.region,
});

export default s3;
