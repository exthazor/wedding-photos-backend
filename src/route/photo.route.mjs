import { Router } from "express";
import photoController from "../controller/photos.controller.mjs";
import upload from "../middleware/upload.mjs";

const router = Router();

router.post("/photos/upload", upload.single("photo"), photoController.upload);
router.post(
  "/photos/upload-multiple",
  upload.array("photos", 25),
  photoController.uploadMultiple,
);
router.get("/photos/uploader/:name", photoController.getByUploaderName);
router.get("/photos/download/:id", photoController.download);
router.get("/photos", photoController.getAll);
router.get("/photos/:id", photoController.getById);

export default router;
