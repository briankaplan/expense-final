-- Import expenses from CSV (Part 2)
INSERT INTO expenses (date, merchant, amount, category, description, status, tag, created_at)
VALUES
-- August 2024
('2024-08-13', 'OPTIMIST NASHVILLE', -896.44, 'Food & Drink', 'Team Dinner Nashville - Alix, Anne Marie, Brian, Doug Phillips, Jason, Luanne', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-13', 'O-KU NASHVILLE', -58.21, 'Food & Drink', 'Team Meeting Drinks Nashville', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-14', 'MAFIAOZAS', -15.38, 'Food & Drink', 'Kelly Scott Tim Staples Brian meetings', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-08-14', 'CLOUDFLARE', -5.00, 'Shopping', 'Monthly Hosting', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-08-15', 'SH NASHVILLE - OTHER', -74.97, 'Travel', 'Sandy Howard - Mcgraw Sister - Lunch', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),

-- September 2024
('2024-09-10', 'DEL FRISCOS GRILL NASHVL', -69.90, 'Food & Drink', 'Len Davi - Headphone developer (Beats by Dre)', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-11', 'CADILLAC BAR LAS VEGAS', -86.62, 'Food & Drink', 'Tim Staples, Jason Ross, Brian Kaplan, Matt Weaver, Joel Bergvall - Area 15', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-09-13', 'GOLDEN NUGGET HOTEL LV', -313.01, 'Travel', 'Las Vegas Area 15 Hotel', 'active', 'DH: Travel Costs - Hotel', CURRENT_TIMESTAMP),
('2024-09-14', 'CLOUDFLARE', -5.00, 'Shopping', 'downhome.com server', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),

-- October 2024
('2024-10-11', 'SH NASHVILLE - OTHER', -62.04, 'Travel', 'Drinks with Drew Bennett - Eric Church', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-10-14', 'CLOUDFLARE', -5.00, 'Shopping', 'Downhome.com server', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-10-15', 'CHAR GREEN HILLS', -422.72, 'Food & Drink', 'Bill Stapleton, Scott Siman, Kelly Clague, Brian Kaplan', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),

-- November 2024
('2024-11-12', 'SH NASHVILLE - OTHER', -176.99, 'Travel', 'Scott, Tim, Bill, Brian - CAA Recap', 'active', 'DH:  BD:  Client Business Meals', CURRENT_TIMESTAMP),
('2024-11-14', 'ANTHROPIC', -27.44, 'Shopping', 'Claude Monthly', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-11-14', 'CLOUDFLARE', -5.00, 'Shopping', 'DownHome.com - Hosting', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),

-- December 2024
('2024-12-12', 'METROPOLIS PARKING', -21.00, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-12-17', 'METROPOLIS PARKING', -21.00, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-12-18', 'CHARTMETRIC', -160.00, 'Shopping', 'Analytics and Industry Metrics', 'active', 'Software subscriptions', CURRENT_TIMESTAMP),
('2024-12-18', 'METROPOLIS PARKING', -15.99, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP),
('2024-12-19', 'METROPOLIS PARKING', -16.29, 'Travel', 'Parking', 'active', 'DH: Travel Costs - Gas/Rental Car', CURRENT_TIMESTAMP); 