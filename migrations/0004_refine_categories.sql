-- Refine expense categories based on identified patterns
BEGIN TRANSACTION;

-- Hosting & Infrastructure
UPDATE expenses 
SET 
    category = 'BD: Software & Services',
    category_details = 'Hosting & Infrastructure',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    merchant LIKE '%CLOUDFLARE%'
    AND category = 'BD: Other Costs';

-- Industry Subscriptions
UPDATE expenses 
SET 
    category = 'BD: Software & Services',
    category_details = 'Industry Subscriptions',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%IMDbPro%' OR
        description LIKE '%IMDB%' OR
        description LIKE '%Contacts App%'
    )
    AND category = 'BD: Other Costs';

-- Team Events
UPDATE expenses 
SET 
    category = 'BD: Team Events',
    category_details = 'Team Dinner',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%Team Dinner%' OR
        description LIKE '%Team Meeting%'
    )
    AND category = 'BD: Other Costs';

-- Business Development Meetings
UPDATE expenses 
SET 
    category = 'BD: Client Entertainment',
    category_details = 'Business Development',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    merchant = 'SH NASHVILLE - OTHER'
    AND (
        description LIKE '%Pitch%' OR
        description LIKE '%Meeting%' OR
        description LIKE '%Coffee%' OR
        description LIKE '%Lunch%' OR
        description LIKE '%Catch up%'
    )
    AND category = 'BD: Other Costs';

-- Industry Events
UPDATE expenses 
SET 
    category = 'BD: Events',
    category_details = 'Industry Events',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%Event%' OR
        description LIKE '%Awards%' OR
        description LIKE '%CMA%'
    )
    AND category = 'BD: Other Costs';

-- Marketing & Presentation
UPDATE expenses 
SET 
    category = 'BD: Marketing',
    category_details = 'Presentation Materials',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%Video%' OR
        description LIKE '%Graphics%' OR
        description LIKE '%Presentation%'
    )
    AND category = 'BD: Other Costs';

-- Recruitment
UPDATE expenses 
SET 
    category = 'BD: HR',
    category_details = 'Recruitment',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        description LIKE '%Interview%' OR
        description LIKE '%Candidate%'
    )
    AND category = 'BD: Other Costs';

-- Donations & Sponsorships
UPDATE expenses 
SET 
    category = 'BD: Donations',
    category_details = 'Charitable Contributions',
    categorization_confidence = 0.9,
    needs_review = 0
WHERE 
    (
        merchant LIKE '%FOUNDATION%' OR
        description LIKE '%Event%'
    )
    AND amount <= -50
    AND category = 'BD: Other Costs';

COMMIT; 