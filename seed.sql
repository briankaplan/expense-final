-- Insert sample receipts
INSERT INTO receipts (file_key, file_name, content_type) VALUES
('receipt-1.pdf', 'Office Supplies Receipt.pdf', 'application/pdf'),
('receipt-2.pdf', 'Software License.pdf', 'application/pdf'),
('receipt-3.jpg', 'Client Lunch.jpg', 'image/jpeg');

-- Insert sample expenses
INSERT INTO expenses (date, merchant, amount, category, tag, description, status, receipt_id) VALUES
('2024-01-15', 'Office Depot', 149.99, 'Office Supplies', 'Q1', 'Printer paper and ink cartridges', 'active', 1),
('2024-01-14', 'Adobe', 299.99, 'Software', 'Subscription', 'Annual Creative Cloud subscription', 'active', 2),
('2024-01-13', 'Olive Garden', 85.50, 'Meals', 'Client Meeting', 'Lunch with client - discussed Q1 plans', 'review', 3),
('2024-01-12', 'Amtrak', 45.00, 'Travel', 'NYC Trip', 'Train ticket to client meeting', 'completed', NULL),
('2024-01-11', 'VistaPrint', 250.00, 'Marketing', 'Trade Show', 'Business cards and brochures', 'active', NULL); 