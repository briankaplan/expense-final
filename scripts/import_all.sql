-- Insert sample receipts
INSERT INTO receipts (file_key, file_name, content_type, status) VALUES
('uploads/pending/receipt-1.pdf', 'Office Supplies Receipt.pdf', 'application/pdf', 'unmatched'),
('uploads/pending/receipt-2.pdf', 'Software License.pdf', 'application/pdf', 'unmatched'),
('matched/pending/receipt-3.jpg', 'Client Lunch.jpg', 'image/jpeg', 'matched');

-- Insert sample expenses
INSERT INTO expenses (
  date, merchant, amount, category, tag, description, status, receipt_id
) VALUES
('2024-01-15', 'Office Depot', 149.99, 'Office Supplies', 'Q1', 'Printer paper and ink cartridges', 'active', 1),
('2024-01-14', 'Adobe', 299.99, 'Software', 'Subscription', 'Annual Creative Cloud subscription', 'active', 2),
('2024-01-13', 'Olive Garden', 85.50, 'Meals', 'Client Meeting', 'Lunch with client - discussed Q1 plans', 'review', 3),
('2024-01-12', 'Amtrak', 45.00, 'Travel', 'NYC Trip', 'Train ticket to client meeting', 'completed', NULL),
('2024-01-11', 'VistaPrint', 250.00, 'Marketing', 'Trade Show', 'Business cards and brochures', 'active', NULL),
('2024-01-10', 'WeWork', 500.00, 'Office Space', 'Monthly', 'January office space rental', 'active', NULL),
('2024-01-09', 'Staples', 75.25, 'Office Supplies', 'Q1', 'Office supplies for new hire', 'review', NULL),
('2024-01-08', 'Zoom', 149.90, 'Software', 'Subscription', 'Annual Pro subscription', 'active', NULL),
('2024-01-07', 'Delta Airlines', 450.00, 'Travel', 'Conference', 'Flight to tech conference', 'completed', NULL),
('2024-01-06', 'Hotel.com', 299.00, 'Travel', 'Conference', 'Hotel for tech conference', 'completed', NULL); 