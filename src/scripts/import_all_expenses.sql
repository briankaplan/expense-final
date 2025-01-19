-- Clear existing data
DELETE FROM expenses;

-- Import expenses from CSV (Part 1)
INSERT INTO expenses (date, merchant, amount, category, description, status, tag, created_at)
VALUES
-- January 2025
('2025-01-04', 'DEL FRISCOS GRIL BRNTWOD', -78.36, 'Food & Drink', 'Business Meal', 'active', NULL, CURRENT_TIMESTAMP),
('2025-01-04', 'DEL FRISCOS GRIL BRNTWOD', -65.88, 'Food & Drink', 'Business Meal', 'active', NULL, CURRENT_TIMESTAMP),
('2025-01-05', 'THE GOAT MOUNT JULIET', -155.60, 'Food & Drink', 'Business Meal', 'active', NULL, CURRENT_TIMESTAMP),
('2025-01-06', 'METROPOLIS PARKING', -18.47, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2025-01-06', 'METROPOLIS PARKING', -15.99, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2025-01-06', 'THE DONELSON PUB', -13.50, 'Food & Drink', 'Business Meal', 'active', NULL, CURRENT_TIMESTAMP),
('2025-01-08', 'METROPOLIS PARKING', -17.88, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2025-01-08', 'CALENDARBRIDGE', -10.00, 'Shopping', 'Calendar Sync Software', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2025-01-09', 'METROPOLIS PARKING', -21.00, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),

-- July 2024
('2024-07-12', 'PMC - PAID PARKING', -9.29, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-12', 'PMC - PAID PARKING', -9.29, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-14', 'CLOUDFLARE', -5.00, 'Shopping', 'Hosting', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-07-17', 'METROPOLIS PARKING', -11.32, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-17', 'METROPOLIS PARKING', -7.55, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-17', 'METROPOLIS PARKING', -4.49, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-19', 'AUDREY - SEAN BROCK GROU', -1487.80, 'Food & Drink', 'Project Betty - Dinner in Nashville with Agency, Jason, Brian, Tom, Tyler 4 from team JPG', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-07-25', 'ROSTR PRO', -50.00, 'Shopping', 'Industry Contacts System', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-07-25', 'CHAR GREEN HILLS', -43.60, 'Food & Drink', 'Lunch with State - Governor Team', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-07-25', 'PMC - PAID PARKING', -9.29, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-26', 'IMDbPro', -19.99, 'Bills & Utilities', 'Contacts App', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-07-26', 'SH NASHVILLE - OTHER', -9.05, 'Travel', 'Job Interview - Assistant', 'active', 'Company Meetings and Meals', CURRENT_TIMESTAMP),
('2024-07-28', 'CARTA NORTH GARAGE', -11.00, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-07-30', 'SH NASHVILLE - OTHER', -24.91, 'Travel', 'Jason and Jules Wortman - Artist Manager', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-07-30', 'METROPOLIS PARKING', -15.99, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP); 