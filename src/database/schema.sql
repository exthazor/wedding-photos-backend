CREATE TABLE IF NOT EXISTS photos (
    id BIGSERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    s3_key VARCHAR(500) NOT NULL,
    s3_url TEXT NOT NULL,
    uploader_name VARCHAR(100) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    file_size BIGINT,
    content_type VARCHAR(50)
);
