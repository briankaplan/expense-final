-- Clear existing data
DELETE FROM receipts;

-- Import receipts
INSERT INTO receipts (
  file_key,
  file_name,
  content_type,
  upload_date
) VALUES
('uploads/pending/2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_78.36.jpg', '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_78.36.jpg', 'image/jpeg', '2025-01-04'),
('uploads/pending/2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_65.88.jpg', '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_65.88.jpg', 'image/jpeg', '2025-01-04'),
('uploads/pending/2025-01-05_THE_GOAT_MOUNT_JULIET_155.6.jpg', '2025-01-05_THE_GOAT_MOUNT_JULIET_155.6.jpg', 'image/jpeg', '2025-01-05'),
('uploads/pending/2025-01-06_METROPOLIS_PARKING_18.47.pdf', '2025-01-06_METROPOLIS_PARKING_18.47.pdf', 'application/pdf', '2025-01-06'),
('uploads/pending/2025-01-06_METROPOLIS_PARKING_15.99.pdf', '2025-01-06_METROPOLIS_PARKING_15.99.pdf', 'application/pdf', '2025-01-06'),
('uploads/pending/2025-01-06_THE_DONELSON_PUB_13.5.jpg', '2025-01-06_THE_DONELSON_PUB_13.5.jpg', 'image/jpeg', '2025-01-06'),
('uploads/pending/2025-01-08_METROPOLIS_PARKING_17.88.pdf', '2025-01-08_METROPOLIS_PARKING_17.88.pdf', 'application/pdf', '2025-01-08'),
('uploads/pending/2025-01-08_CALENDARBRIDGE_10.0.pdf', '2025-01-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf', '2025-01-08'),
('uploads/pending/2025-01-09_METROPOLIS_PARKING_21.0.pdf', '2025-01-09_METROPOLIS_PARKING_21.0.pdf', 'application/pdf', '2025-01-09'); 