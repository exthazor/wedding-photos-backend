import prisma from "../config/prisma.mjs";

class PhotoService {
  async getAll() {
    return prisma.photo.findMany({
      orderBy: [{ likes: "desc" }, { uploaded_at: "desc" }],
    });
  }

  async getById(id) {
    return prisma.photo.findUnique({
      where: { id: BigInt(id) },
    });
  }

  async getByUploader(name) {
    return prisma.photo.findMany({
      where: {
        uploader_name: { contains: name, mode: "insensitive" },
      },
      orderBy: [{ likes: "desc" }, { uploaded_at: "desc" }],
    });
  }

  async incrementLikes(id) {
    return prisma.photo.update({
      where: { id: BigInt(id) },
      data: { likes: { increment: 1 } },
    });
  }

  async create(photo) {
    const created = await prisma.photo.create({
      data: {
        filename: photo.filename,
        original_filename: photo.originalFilename,
        s3_key: photo.s3Key,
        uploader_name: photo.uploaderName,
        file_size: photo.fileSize ? BigInt(photo.fileSize) : null,
        content_type: photo.contentType,
      },
    });
    return created.id;
  }
}

export default new PhotoService();
