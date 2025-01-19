-- Update expense categories based on defined rules
BEGIN TRANSACTION;

-- Add columns if they don't exist
CREATE TABLE IF NOT EXISTS temp_info (dummy INTEGER);
INSERT INTO temp_info (dummy) VALUES (1);

-- Try to add columns, ignore errors if they already exist
SELECT CASE 
    WHEN NOT EXISTS (SELECT 1 FROM pragma_table_info('expenses') WHERE name = 'category_details')
    THEN (SELECT sql FROM (SELECT 'ALTER TABLE expenses ADD COLUMN category_details TEXT' as sql) WHERE 1)
END FROM temp_info;

SELECT CASE 
    WHEN NOT EXISTS (SELECT 1 FROM pragma_table_info('expenses') WHERE name = 'needs_review')
    THEN (SELECT sql FROM (SELECT 'ALTER TABLE expenses ADD COLUMN needs_review INTEGER DEFAULT 0' as sql) WHERE 1)
END FROM temp_info;

DROP TABLE temp_info;

-- Restaurants/Dining
UPDATE expenses 
SET 
    category = 'BD: Meals & Entertainment',
    category_details = 'Restaurant/Dining',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%GRIL%' OR 
        merchant LIKE '%RESTAURANT%' OR 
        merchant LIKE '%CAFE%' OR 
        merchant LIKE '%DINER%' OR 
        merchant LIKE '%BAR%' OR 
        merchant LIKE '%GOAT%' OR 
        merchant LIKE '%DEL FRISCOS%' OR
        merchant LIKE '%KITCHEN%' OR
        merchant LIKE '%LOUNGE%' OR
        merchant LIKE '%PUB%' OR
        description LIKE '%Lunch with%' OR
        description LIKE '%Dinner with%'
    )
    AND category != 'BD: Meals & Entertainment';

-- Parking
UPDATE expenses 
SET 
    category = 'BD: Travel',
    category_details = 'Parking',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%PARKING%' OR 
        merchant LIKE '%GARAGE%' OR
        merchant LIKE '%PMC%'
    )
    AND category != 'BD: Travel';

-- Travel
UPDATE expenses 
SET 
    category = 'BD: Travel',
    category_details = 'Travel Expense',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%HOTEL%' OR 
        merchant LIKE '%FLIGHT%' OR 
        merchant LIKE '%AIRLINE%' OR 
        merchant LIKE '%AIRFARE%' OR 
        merchant LIKE '%CAR RENTAL%' OR 
        merchant LIKE '%TAXI%' OR 
        merchant LIKE '%UBER%' OR 
        merchant LIKE '%LYFT%'
    )
    AND category != 'BD: Travel';

-- Office Supplies
UPDATE expenses 
SET 
    category = 'BD: Office Supplies',
    category_details = 'Office Materials',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%OFFICE%' OR 
        merchant LIKE '%SUPPLIES%' OR 
        merchant LIKE '%STAPLES%' OR 
        merchant LIKE '%PRINTER%' OR 
        merchant LIKE '%INK%'
    )
    AND category != 'BD: Office Supplies';

-- Software Subscriptions
UPDATE expenses 
SET 
    category = 'BD: Software & Services',
    category_details = 'Software Subscription',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%CALENDARBRIDGE%' OR
        merchant LIKE '%ANTHROPIC%' OR
        merchant LIKE '%CHARTMETRIC%' OR
        merchant LIKE '%ROSTR%' OR
        description LIKE '%server%' OR
        description LIKE '%subscription%'
    )
    AND category != 'BD: Software & Services';

-- Business Development
UPDATE expenses 
SET 
    category = 'BD: Client Entertainment',
    category_details = 'Business Meeting',
    categorization_confidence = 0.8,
    needs_review = 0
WHERE 
    description LIKE '% with %'
    AND category NOT IN (
        'BD: Meals & Entertainment',
        'BD: Travel',
        'BD: Office Supplies',
        'BD: Software & Services'
    );

-- Mark remaining uncategorized expenses for review
UPDATE expenses 
SET 
    category = 'BD: Other Costs',
    category_details = 'Needs Classification',
    categorization_confidence = 0.3,
    needs_review = 1
WHERE 
    category NOT IN (
        'BD: Meals & Entertainment',
        'BD: Travel',
        'BD: Office Supplies',
        'BD: Software & Services',
        'BD: Client Entertainment'
    );

COMMIT; 