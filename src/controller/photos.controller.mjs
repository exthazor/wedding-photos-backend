import photoService from "../service/photo.service.mjs";
import s3Service from "../service/s3.service.mjs";
import AppError, { ErrorTypes } from "../utils/AppError.mjs";

class PhotoController {
  async upload(req, res, next) {
    try {
      if (!req.file) {
        throw new AppError(ErrorTypes.NO_FILE_UPLOADED);
      }
      const { uploaderName } = req.body;
      if (uploaderName == null) {
        throw new AppError(ErrorTypes.UPLOADER_NAME_REQUIRED);
      }
      const { key } = await s3Service.uploadFile(
        req.file.buffer,
        req.file.originalname,
        req.file.mimetype,
      );

      const photo = await photoService.create({
        filename: key,
        originalFilename: req.file.originalname,
        s3Key: key,
        uploaderName: uploaderName,
        fileSize: req.file.size,
        contentType: req.file.mimetype,
      });
      res.status(201).json(photo);
    } catch (err) {
      next(err);
    }
  }

  async uploadMultiple(req, res, next) {
    try {
      if (!req.files || req.files.length === 0) {
        throw new AppError(ErrorTypes.NO_FILE_UPLOADED);
      }
      const { uploaderName } = req.body;
      if (uploaderName == null) {
        throw new AppError(ErrorTypes.UPLOADER_NAME_REQUIRED);
      }

      const photoIds = await Promise.all(
        req.files.map(async (file) => {
          const { key } = await s3Service.uploadFile(
            file.buffer,
            file.originalname,
            file.mimetype,
          );
          return photoService.create({
            filename: key,
            originalFilename: file.originalname,
            s3Key: key,
            uploaderName: uploaderName,
            fileSize: file.size,
            contentType: file.mimetype,
          });
        }),
      );

      res.status(201).json({ ids: photoIds, count: photoIds.length });
    } catch (err) {
      next(err);
    }
  }

  async download(req, res, next) {
    try {
      const photo = await photoService.getById(req.params.id);
      if (!photo) {
        throw new AppError(ErrorTypes.PHOTO_NOT_FOUND);
      }
      const url = s3Service.getCdnUrl(photo.s3_key);
      res.redirect(url);
    } catch (err) {
      next(err);
    }
  }

  async getByUploaderName(req, res, next) {
    try {
      const photos = await photoService.getByUploader(req.params.name);
      res.status(200).json({ photos, count: photos.length });
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const photos = await photoService.getAll();
      res.status(200).json({ photos, count: photos.length });
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const photos = await photoService.getById(req.params.id);
      res.status(200).json(photos);
    } catch (err) {
      next(err);
    }
  }

  async likePhoto(req, res, next) {
    try {
      const photo = await photoService.incrementLikes(req.params.id);
      res.status(200).json(photo);
    } catch (err) {
      if (err.code === "P2025") {
        return next(new AppError(ErrorTypes.PHOTO_NOT_FOUND));
      }
      next(err);
    }
  }
}

export default new PhotoController();
