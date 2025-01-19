-- Clear existing data (optional - comment out if you want to preserve existing data)
-- DELETE FROM expenses;

-- Import expenses from CSV
INSERT INTO expenses (date, merchant, amount, category, description, status, tag, created_at)
VALUES
-- September 2024
('2024-09-20', 'METROPOLIS PARKING', -26.25, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-21', '201 BELCOURT LOT', -5.60, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-24', 'SH NASHVILLE - OTHER', -689.59, 'Travel', 'Bill, Brian, Scott, Tim, Tyler, Tom, Patrick, Jason', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-25', 'SH NASHVILLE - OTHER', -224.64, 'Travel', 'Bill Stapleton, Tim Staples, Jason Ross, Tyler Stevens, Tom May, Scott Siman', 'active', 'Company Meetings and Meals', CURRENT_TIMESTAMP),
('2024-09-25', 'PMC - PAID PARKING', -26.22, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-25', 'LAZGO NASHVILLE M32180', -5.18, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-26', 'IMDbPro', -19.99, 'Bills & Utilities', 'IMDB Pro Monthly', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-09-26', 'SH NASHVILLE - OTHER', -14.22, 'Travel', 'Andrew Cohen / Brian Kaplan Catch up', 'active', 'Company Meetings and Meals', CURRENT_TIMESTAMP),
('2024-09-03', 'METROPOLIS PARKING', -17.88, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-04', 'CORNER PUB', -45.15, 'Food & Drink', 'Jason Maynard Oracle', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-04', 'CORNER PUB', -39.78, 'Food & Drink', 'Jason Maynard Oracle', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-04', 'PMC - PAID PARKING', -24.59, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-05', 'SH NASHVILLE - OTHER', -100.82, 'Travel', 'Lunch with Clay Hunnicut', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-05', 'METROPOLIS PARKING', -21.00, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-05', 'METROPOLIS PARKING', -10.99, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-06', 'SH NASHVILLE - OTHER', -40.07, 'Travel', 'Lunch - Steve Emley', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-06', 'SH NASHVILLE - OTHER', -24.56, 'Travel', 'Coffee Robert Deaton', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-07', 'GOLDEN NUGGET HOTEL LV', -100.57, 'Travel', 'Las Vegas Travel - Area 15', 'active', 'DH: Travel Costs - Hotel', CURRENT_TIMESTAMP),
('2024-09-07', 'METROPOLIS PARKING', -26.25, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-08', 'CALENDARBRIDGE', -10.00, 'Shopping', 'Calendar Sync Software', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-09-09', 'METROPOLIS PARKING', -7.55, 'Travel', 'Parking', 'active', 'Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP); 