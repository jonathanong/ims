
CREATE OR REPLACE VIEW view_image_tags AS (
  SELECT
    images_to_tags.image_id AS image_id,
    JSON_AGG(tags) AS tags
  FROM images_to_tags
  JOIN tags ON images_to_tags.tag_id = tags.id
  GROUP BY 1
  ORDER BY 1 ASC
);

CREATE OR REPLACE VIEW view_images AS (
  SELECT
    images.*,
    COALESCE(view_image_tags.tags, '[]') AS tags
  FROM images
  LEFT OUTER JOIN view_image_tags ON images.id = view_image_tags.image_id
);
