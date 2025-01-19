-- Clear existing data (optional - comment out if you want to preserve existing data)
-- DELETE FROM expenses;

-- Import expenses
INSERT INTO expenses (
  date,
  merchant,
  amount,
  category,
  tag,
  description,
  status,
  created_at
) VALUES
('2024-01-04', 'DEL FRISCOS GRIL BRNTWOD', 78.36, 'Food & Drink', NULL, 'Dinner at Del Frisco''s', 'active', CURRENT_TIMESTAMP),
('2024-01-04', 'DEL FRISCOS GRIL BRNTWOD', 65.88, 'Food & Drink', NULL, 'Lunch at Del Frisco''s', 'active', CURRENT_TIMESTAMP),
('2024-01-05', 'THE GOAT MOUNT JULIET', 155.60, 'Food & Drink', NULL, 'Dinner at The Goat', 'active', CURRENT_TIMESTAMP),
('2024-01-06', 'METROPOLIS PARKING', 18.47, 'Travel', 'Parking', 'Parking fee', 'active', CURRENT_TIMESTAMP),
('2024-01-06', 'METROPOLIS PARKING', 15.99, 'Travel', 'Parking', 'Parking fee', 'active', CURRENT_TIMESTAMP),
('2024-01-06', 'THE DONELSON PUB', 13.50, 'Food & Drink', NULL, 'Drinks at Donelson Pub', 'active', CURRENT_TIMESTAMP),
('2024-01-08', 'METROPOLIS PARKING', 17.88, 'Travel', 'Parking', 'Parking fee', 'active', CURRENT_TIMESTAMP),
('2024-01-08', 'CALENDARBRIDGE', 10.00, 'Shopping', NULL, 'Calendar subscription', 'active', CURRENT_TIMESTAMP),
('2024-01-09', 'METROPOLIS PARKING', 21.00, 'Travel', 'Parking', 'Parking fee', 'active', CURRENT_TIMESTAMP); 