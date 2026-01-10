import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || "development",
  cors: process.env.CORS_ORIGIN || "http://localhost:3000",

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    user: process.env.DB_USER,
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    bucketName: process.env.AWS_BUCKET_NAME,
    cloudfrontDomain: process.env.CLOUDFRONT_DOMAIN,
  },
};
