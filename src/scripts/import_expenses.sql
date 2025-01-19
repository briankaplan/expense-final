-- Clear existing data
DELETE FROM expenses;

-- Import expenses
INSERT INTO expenses (
  date,
  merchant,
  amount,
  category,
  tag,
  description,
  status
) VALUES
('2025-01-04', 'DEL FRISCOS GRIL BRNTWOD', 78.36, 'Food & Drink', NULL, NULL, 'active'),
('2025-01-04', 'DEL FRISCOS GRIL BRNTWOD', 65.88, 'Food & Drink', NULL, NULL, 'active'),
('2025-01-05', 'THE GOAT MOUNT JULIET', 155.60, 'Food & Drink', NULL, NULL, 'active'),
('2025-01-06', 'METROPOLIS PARKING', 18.47, 'Travel', 'Parking', NULL, 'active'),
('2025-01-06', 'METROPOLIS PARKING', 15.99, 'Travel', 'Parking', NULL, 'active'),
('2025-01-06', 'THE DONELSON PUB', 13.50, 'Food & Drink', NULL, NULL, 'active'),
('2025-01-08', 'METROPOLIS PARKING', 17.88, 'Travel', 'Parking', NULL, 'active'),
('2025-01-08', 'CALENDARBRIDGE', 10.00, 'Shopping', NULL, NULL, 'active'),
('2025-01-09', 'METROPOLIS PARKING', 21.00, 'Travel', 'Parking', NULL, 'active'); 