
CREATE OR REPLACE VIEW view_image_assets AS (
  SELECT
    image_assets.*,
    (
      SELECT ROW_TO_JSON(images.*)
      FROM images
      WHERE image_assets.image_id = images.id
      LIMIT 1
    ) AS image
);
