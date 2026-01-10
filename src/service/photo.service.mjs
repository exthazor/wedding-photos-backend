import pool from "../config/db.mjs";

class PhotoService {
  async getAll() {
    const result = await pool.query(`
      select *
      from photos
      order by uploaded_at desc;
      `);
    return result.rows;
  }

  async getById(id) {
    const result = await pool.query(
      `
      select *
      from photos
      where id = $1;
      `,
      [id],
    );
    return result.rows[0];
  }

  async getByUploader(name) {
    const result = await pool.query(
      `SELECT *
      FROM photos
      WHERE uploader_name ILIKE $1
      ORDER BY uploaded_at DESC`,
      [`%${name}%`],
    );
    return result.rows;
  }

  async create(photo) {
    const result = await pool.query(
      `
      insert into photos (filename, original_filename, s3_key,
                                 uploader_name, file_size, content_type)
      values ($1, $2, $3, $4, $5, $6)
      returning id;
    `,
      [
        photo.filename,
        photo.originalFilename,
        photo.s3Key,
        photo.uploaderName,
        photo.fileSize,
        photo.contentType,
      ],
    );
    return result.rows[0].id;
  }
}

export default new PhotoService();
