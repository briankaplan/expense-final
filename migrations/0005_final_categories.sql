-- Final refinement of expense categories
BEGIN TRANSACTION;

-- Music Industry Meetings
UPDATE expenses 
SET 
    category = 'BD: Client Entertainment',
    category_details = 'Music Industry',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%UMG%' OR
        description LIKE '%WME%' OR
        description LIKE '%CAA%' OR
        description LIKE '%Artist Manager%' OR
        description LIKE '%showrunner%' OR
        description LIKE '%Spotify%' OR
        description LIKE '%Apple Music%'
    )
    AND category = 'BD: Other Costs';

-- Team Meetings (with multiple attendees)
UPDATE expenses 
SET 
    category = 'BD: Team Events',
    category_details = 'Team Meeting',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%, %' AND
        description LIKE '%Brian%' AND
        (
            description LIKE '%Bill%' OR
            description LIKE '%Scott%' OR
            description LIKE '%Tim%' OR
            description LIKE '%Kevin%'
        )
    )
    AND category = 'BD: Other Costs';

-- Restaurants without descriptions
UPDATE expenses 
SET 
    category = 'BD: Meals & Entertainment',
    category_details = 'Restaurant/Dining',
    categorization_confidence = 0.7,
    needs_review = 1
WHERE 
    (
        merchant LIKE '%PIZZA%' OR
        merchant LIKE '%JUICER%' OR
        merchant LIKE '%BREWHOUSE%' OR
        merchant LIKE '%HILLS%'
    )
    AND category = 'BD: Other Costs';

-- Mark any remaining SH NASHVILLE - OTHER as Client Entertainment
UPDATE expenses 
SET 
    category = 'BD: Client Entertainment',
    category_details = 'Business Meeting',
    categorization_confidence = 0.7,
    needs_review = 1
WHERE 
    merchant = 'SH NASHVILLE - OTHER'
    AND category = 'BD: Other Costs';

COMMIT; 