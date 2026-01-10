export const ErrorTypes = {
  NO_FILE_UPLOADED: { status: 400, message: "No file uploaded" },
  UPLOADER_NAME_REQUIRED: { status: 400, message: "Uploader name is required" },
  PHOTO_NOT_FOUND: { status: 404, message: "Photo not found" },
  INVALID_FILE_TYPE: { status: 415, message: "Invalid file type" },
  FILE_TOO_LARGE: { status: 413, message: "File too large" },
  NOT_FOUND: { status: 404, message: "Resource not found" },
  UNAUTHORIZED: { status: 401, message: "Unauthorized" },
  FORBIDDEN: { status: 403, message: "Forbidden" },
};

export default class AppError extends Error {
  constructor(type, customMessage) {
    const { status, message } = type;
    super(customMessage || message);
    this.status = status;
    this.isOperational = true;
  }
}
