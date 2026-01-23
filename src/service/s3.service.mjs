import s3 from "../config/s3.mjs";
import { v4 as uuidv4 } from "uuid";
import config from "../config/env.mjs";

class S3Service {
  async uploadFile(buffer, fileName, fileType) {
    const fileExtension = fileName.split(".").pop();
    const key = `photos/${uuidv4()}.${fileExtension}`;
    const params = {
      Bucket: config.aws.bucketName,
      Key: key,
      Body: buffer,
      ContentType: fileType,
    };

    const result = await s3.upload(params).promise();
    return {
      key: result.Key,
    };
  }

  getPresignedUrl(fileName, fileType) {
    const fileExtension = fileName.split(".").pop();
    const key = `photos/${uuidv4()}.${fileExtension}`;
    const params = {
      Bucket: config.aws.bucketName,
      Key: key,
      ContentType: fileType,
      Expires: 300, // URL valid for 5 minutes
    };

    const uploadUrl = s3.getSignedUrl("putObject", params);
    return { uploadUrl, key };
  }

  getPresignedUrls(files) {
    return files.map(({ fileName, fileType }) =>
      this.getPresignedUrl(fileName, fileType),
    );
  }

  getCdnUrl(s3Key) {
    return `https://${config.aws.cloudfrontDomain}/${s3Key}`;
  }

  async deleteFile(key) {
    const params = {
      Bucket: config.aws.bucketName,
      Key: key,
    };

    await s3.deleteObject(params).promise();
  }
}

export default new S3Service();
