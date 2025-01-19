-- Import expenses from CSV (Part 3)
INSERT INTO expenses (date, merchant, amount, category, description, status, tag, created_at)
VALUES
-- More August 2024
('2024-08-17', 'METROPOLIS PARKING', -42.00, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-08-18', 'METROPOLIS PARKING', -31.50, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-08-19', 'SH NASHVILLE - OTHER', -51.70, 'Travel', 'Joel, Chandra, Paul, Pitch Outsiders', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-19', 'SH NASHVILLE - OTHER', -47.82, 'Travel', 'Lunch with Rachel - Spotify', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-22', 'LinkedIn JOB 9849229796', -174.56, 'Bills & Utilities', 'LinkedIn Job Post - Assistant', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-08-23', 'CORNER PUB', -79.64, 'Food & Drink', 'Jason Maynard - Oracle - Brian', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-25', 'ROSTR PRO', -50.00, 'Shopping', 'Industry Contacts System', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-08-26', 'IMDbPro', -19.99, 'Bills & Utilities', 'IMBD Monthly', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-08-29', 'CHAR GREEN HILLS', -67.81, 'Food & Drink', 'Todd Cassetty - Nashville Manager and Songwriter / Event Owner', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),

-- More September 2024
('2024-09-16', 'SH NASHVILLE - OTHER', -40.07, 'Travel', 'Joel, Chandra Laplume, Outsiders Pitch', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-16', 'PARKINGMANAGEMENTCOMPANY', -38.24, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-09-18', 'SH NASHVILLE - OTHER', -71.09, 'Travel', 'Randy Bernard and Patrick Humes', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-24', 'SH NASHVILLE - OTHER', -689.59, 'Travel', 'Bill, Brian, Scott, Tim, Tyler, Tom, Patrick, Jason', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-25', 'SH NASHVILLE - OTHER', -224.64, 'Travel', 'Bill Stapleton, Tim Staples, Jason Ross, Tyler Stevens, Tom May, Scott Siman', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),

-- More October 2024
('2024-10-16', 'CORNER PUB', -133.44, 'Food & Drink', 'Kevin Sabbe and Arlis Albritton - songwriter', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-10-16', 'SH NASHVILLE - OTHER', -37.48, 'Travel', 'Lunch with Andrew Cohen', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-10-18', 'CHARTMETRIC', -160.00, 'Shopping', 'Analytics and Industry Metrics', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-10-22', 'RUNWAY STANDARD PLAN', -144.00, 'Shopping', 'Video and Graphics for Presentation', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-10-26', 'IMDbPro', -19.99, 'Bills & Utilities', 'IMDB Pro Monthly', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-10-28', 'JJK FOUNDATION', -60.00, 'Gifts & Donations', 'Jackie Joyner-Kersee Event', 'active', 'Charitable Donations', CURRENT_TIMESTAMP),

-- More November 2024
('2024-11-15', 'METROPOLIS PARKING', -29.40, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-11-15', 'SH NASHVILLE - OTHER', -16.80, 'Travel', 'Michelle De Leon - Coffee', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-11-17', 'BROADWAY BREWHOUSE DOWNTO', -47.34, 'Food & Drink', 'Rae - showrunner ten year town, Kevin Sabbe, Andrew cohen', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-11-18', 'CHARTMETRIC', -160.00, 'Shopping', 'Analytics and Industry Metrics', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-11-19', 'Marsh House', -30.69, 'Food & Drink', 'CMA Awards', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),

-- More December 2024
('2024-12-02', 'THE URBAN JUICER', -12.25, 'Food & Drink', 'Business Meal', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-12-06', 'COSMOPOL-BANG BAR', -33.38, 'Food & Drink', 'Business Meal', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-12-06', 'CURB LV TAXI YCS', -18.89, 'Travel', 'Las Vegas Transportation', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-12-07', 'PIZZA FORTE HARD ROCK', -33.16, 'Food & Drink', 'Business Meal', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-12-07', 'DESERT STAR LOUNGE', -19.00, 'Food & Drink', 'Business Meal', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-12-08', 'VHLV-KITCHEN AT COMMON', -35.00, 'Food & Drink', 'Business Meal', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-12-08', 'CALENDARBRIDGE', -10.00, 'Shopping', 'Software subscriptions', 'active', 'Software subscriptions', CURRENT_TIMESTAMP); 