BEGIN TRANSACTION;

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_78.36.jpg', '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_78.36.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/4/25',
      '1/5/25',
      'DEL FRISCOS GRIL BRNTWOD',
      'Food & Drink',
      'Sale',
      -78.36,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_78.36.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_65.88.jpg', '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_65.88.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/4/25',
      '1/5/25',
      'DEL FRISCOS GRIL BRNTWOD',
      'Food & Drink',
      'Sale',
      -65.88,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-04_DEL_FRISCOS_GRIL_BRNTWOD_65.88.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-05_THE_GOAT_MOUNT_JULIET_155.6.jpg', '2025-01-05_THE_GOAT_MOUNT_JULIET_155.6.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/5/25',
      '1/6/25',
      'THE GOAT MOUNT JULIET',
      'Food & Drink',
      'Sale',
      -155.6,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-05_THE_GOAT_MOUNT_JULIET_155.6.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-06_METROPOLIS_PARKING_18.47.pdf', '2025-01-06_METROPOLIS_PARKING_18.47.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/6/25',
      '1/7/25',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -18.47,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-06_METROPOLIS_PARKING_18.47.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-06_METROPOLIS_PARKING_15.99.pdf', '2025-01-06_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/6/25',
      '1/7/25',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-06_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-06_THE_DONELSON_PUB_13.5.jpg', '2025-01-06_THE_DONELSON_PUB_13.5.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/6/25',
      '1/7/25',
      'THE DONELSON PUB',
      'Food & Drink',
      'Sale',
      -13.5,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-06_THE_DONELSON_PUB_13.5.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-08_METROPOLIS_PARKING_17.88.pdf', '2025-01-08_METROPOLIS_PARKING_17.88.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/8/25',
      '1/9/25',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -17.88,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-08_METROPOLIS_PARKING_17.88.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-08_CALENDARBRIDGE_10.0.pdf', '2025-01-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/8/25',
      '1/9/25',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-08_CALENDARBRIDGE_10.0.pdf'),
      NULL,
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2025-01-09_METROPOLIS_PARKING_21.0.pdf', '2025-01-09_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '1/9/25',
      '1/9/25',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2025-01-09_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-11_SH_NASHVILLE_-_OTHER_62.04.png', '2024-10-11_SH_NASHVILLE_-_OTHER_62.04.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/11/24',
      '10/13/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -62.04,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-11_SH_NASHVILLE_-_OTHER_62.04.png'),
      'Drinks with Drew Bennett - Eric Church',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-11_SH_NASHVILLE_-_OTHER_27.14.jpg', '2024-10-11_SH_NASHVILLE_-_OTHER_27.14.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/11/24',
      '10/13/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -27.14,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-11_SH_NASHVILLE_-_OTHER_27.14.jpg'),
      'Bobbii Jacobs',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-14_CLOUDFLARE_5.0.pdf', '2024-10-14_CLOUDFLARE_5.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/14/24',
      '10/15/24',
      'CLOUDFLARE',
      'Shopping',
      'Sale',
      -5.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-14_CLOUDFLARE_5.0.pdf'),
      'Downhome.com server',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-15_CHAR_GREEN_HILLS_422.72.jpg', '2024-10-15_CHAR_GREEN_HILLS_422.72.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/15/24',
      '10/17/24',
      'CHAR GREEN HILLS',
      'Food & Drink',
      'Sale',
      -422.72,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-15_CHAR_GREEN_HILLS_422.72.jpg'),
      'Bill Stapleton, Scott Siman, Kelly Clague, Brian Kaplan',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_CORNER_PUB_133.44.jpg', '2024-10-16_CORNER_PUB_133.44.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/18/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -133.44,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_CORNER_PUB_133.44.jpg'),
      'Kevin Sabbe and Arlis Albritton - songwriter',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_SH_NASHVILLE_-_OTHER_37.48.png', '2024-10-16_SH_NASHVILLE_-_OTHER_37.48.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/18/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -37.48,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_SH_NASHVILLE_-_OTHER_37.48.png'),
      'Lunch with Andrew Cohen',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_SH_NASHVILLE_-_OTHER_29.73.png', '2024-10-16_SH_NASHVILLE_-_OTHER_29.73.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/18/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -29.73,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_SH_NASHVILLE_-_OTHER_29.73.png'),
      'Dawn Gates - UMG',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_PMC_-_PAID_PARKING_26.22.jpg', '2024-10-16_PMC_-_PAID_PARKING_26.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/17/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -26.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_PMC_-_PAID_PARKING_26.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_PMC_-_PAID_PARKING_26.22.jpg', '2024-10-16_PMC_-_PAID_PARKING_26.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/17/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -26.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_PMC_-_PAID_PARKING_26.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-16_PMC_-_PAID_PARKING_19.94.jpg', '2024-10-16_PMC_-_PAID_PARKING_19.94.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/16/24',
      '10/17/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -19.94,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-16_PMC_-_PAID_PARKING_19.94.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-18_CHARTMETRIC_160.0.pdf', '2024-10-18_CHARTMETRIC_160.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/18/24',
      '10/20/24',
      'CHARTMETRIC',
      'Shopping',
      'Sale',
      -160.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-18_CHARTMETRIC_160.0.pdf'),
      'Analytics and Industry Metrics',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-22_RUNWAY_STANDARD_PLAN_144.0.pdf', '2024-10-22_RUNWAY_STANDARD_PLAN_144.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/22/24',
      '10/22/24',
      'RUNWAY STANDARD PLAN',
      'Shopping',
      'Sale',
      -144.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-22_RUNWAY_STANDARD_PLAN_144.0.pdf'),
      'Video and Graphics for Presentation',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-23_201_BELCOURT_LOT_6.73.jpg', '2024-10-23_201_BELCOURT_LOT_6.73.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/23/24',
      '10/25/24',
      '201 BELCOURT LOT',
      'Travel',
      'Sale',
      -6.73,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-23_201_BELCOURT_LOT_6.73.jpg'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-25_BONHOMME_PLACE_GARAGE_27.0.jpg', '2024-10-25_BONHOMME_PLACE_GARAGE_27.0.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/25/24',
      '10/27/24',
      'BONHOMME PLACE GARAGE',
      'Travel',
      'Sale',
      -27.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-25_BONHOMME_PLACE_GARAGE_27.0.jpg'),
      'St Louis Parking - Jackie Joyner',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-26_IMDbPro_19.99.png', '2024-10-26_IMDbPro_19.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/26/24',
      '10/27/24',
      'IMDbPro',
      'Bills & Utilities',
      'Sale',
      -19.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-26_IMDbPro_19.99.png'),
      'IMDB Pro Monthly',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-28_JJK_FOUNDATION_60.0.png', '2024-10-28_JJK_FOUNDATION_60.0.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/28/24',
      '10/30/24',
      'JJK FOUNDATION',
      'Gifts & Donations',
      'Sale',
      -60.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-28_JJK_FOUNDATION_60.0.png'),
      'Jackie Joyner-Kersee Event',
      'Conference',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-03_PMC_-_PAID_PARKING_20.76.jpg', '2024-10-03_PMC_-_PAID_PARKING_20.76.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/3/24',
      '10/4/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -20.76,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-03_PMC_-_PAID_PARKING_20.76.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-04_SH_NASHVILLE_-_OTHER_23.27.png', '2024-10-04_SH_NASHVILLE_-_OTHER_23.27.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/4/24',
      '10/6/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -23.27,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-04_SH_NASHVILLE_-_OTHER_23.27.png'),
      'Meeting with Terry Cologne - Merch',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-04_METROPOLIS_PARKING_21.0.pdf', '2024-10-04_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/4/24',
      '10/6/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-04_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-07_SH_NASHVILLE_-_OTHER_52.99.png', '2024-10-07_SH_NASHVILLE_-_OTHER_52.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/7/24',
      '10/9/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -52.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-07_SH_NASHVILLE_-_OTHER_52.99.png'),
      'Sloan Cavitt WME',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-07_SH_NASHVILLE_-_OTHER_29.73.png', '2024-10-07_SH_NASHVILLE_-_OTHER_29.73.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/7/24',
      '10/9/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -29.73,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-07_SH_NASHVILLE_-_OTHER_29.73.png'),
      'Kelly Clague Catch Up',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-08_CORNER_PUB_83.92.jpg', '2024-10-08_CORNER_PUB_83.92.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/8/24',
      '10/10/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -83.92,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-08_CORNER_PUB_83.92.jpg'),
      'Alex Sera - WME',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-08_METROPOLIS_PARKING_26.25.png', '2024-10-08_METROPOLIS_PARKING_26.25.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/8/24',
      '10/8/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-08_METROPOLIS_PARKING_26.25.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-08_CALENDARBRIDGE_10.0.pdf', '2024-10-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/8/24',
      '10/9/24',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-08_CALENDARBRIDGE_10.0.pdf'),
      'Calendar Sync',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-10-09_PMC_-_PAID_PARKING_30.05.jpg', '2024-10-09_PMC_-_PAID_PARKING_30.05.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '10/9/24',
      '10/10/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -30.05,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-10-09_PMC_-_PAID_PARKING_30.05.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-01_SH_NASHVILLE_-_OTHER_23.27.png', '2024-11-01_SH_NASHVILLE_-_OTHER_23.27.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/1/24',
      '11/3/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -23.27,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-01_SH_NASHVILLE_-_OTHER_23.27.png'),
      'TIm Foisset - Spotify',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-01_METROPOLIS_PARKING_21.0.pdf', '2024-11-01_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/1/24',
      '11/3/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-01_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-12_SH_NASHVILLE_-_OTHER_176.99.png', '2024-11-12_SH_NASHVILLE_-_OTHER_176.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/12/24',
      '11/14/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -176.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-12_SH_NASHVILLE_-_OTHER_176.99.png'),
      'Scott, Tim, Bill, Brian - CAA Recap',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-13_METROPOLIS_PARKING_15.99.png', '2024-11-13_METROPOLIS_PARKING_15.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/13/24',
      '11/13/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-13_METROPOLIS_PARKING_15.99.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-14_ANTHROPIC_27.44.pdf', '2024-11-14_ANTHROPIC_27.44.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/14/24',
      '11/15/24',
      'ANTHROPIC',
      'Shopping',
      'Sale',
      -27.44,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-14_ANTHROPIC_27.44.pdf'),
      'Claude Monthly',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-14_METROPOLIS_PARKING_15.99.pdf', '2024-11-14_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/14/24',
      '11/15/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-14_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-14_SH_NASHVILLE_-_OTHER_7.76.png', '2024-11-14_SH_NASHVILLE_-_OTHER_7.76.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/14/24',
      '11/17/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -7.76,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-14_SH_NASHVILLE_-_OTHER_7.76.png'),
      'Jay - Apple Music',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-14_CLOUDFLARE_5.0.pdf', '2024-11-14_CLOUDFLARE_5.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/14/24',
      '11/15/24',
      'CLOUDFLARE',
      'Shopping',
      'Sale',
      -5.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-14_CLOUDFLARE_5.0.pdf'),
      'DownHome.com - Hosting',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-15_METROPOLIS_PARKING_29.4.pdf', '2024-11-15_METROPOLIS_PARKING_29.4.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/15/24',
      '11/17/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -29.4,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-15_METROPOLIS_PARKING_29.4.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-15_SH_NASHVILLE_-_OTHER_16.8.png', '2024-11-15_SH_NASHVILLE_-_OTHER_16.8.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/15/24',
      '11/17/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -16.8,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-15_SH_NASHVILLE_-_OTHER_16.8.png'),
      'Michelle De Leon - Coffee',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-15_METROPOLIS_PARKING_15.99.pdf', '2024-11-15_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/15/24',
      '11/15/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-15_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-16_METROPOLIS_PARKING_26.25.pdf', '2024-11-16_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/16/24',
      '11/17/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-16_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-17_BROADWAY_BREWHOUSE_DOWNTO_47.34.jpg', '2024-11-17_BROADWAY_BREWHOUSE_DOWNTO_47.34.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/17/24',
      '11/19/24',
      'BROADWAY BREWHOUSE DOWNTO',
      'Food & Drink',
      'Sale',
      -47.34,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-17_BROADWAY_BREWHOUSE_DOWNTO_47.34.jpg'),
      'Rae - showrunner ten year town, Kevin Sabbe, Andrew cohen',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-18_CHARTMETRIC_160.0.pdf', '2024-11-18_CHARTMETRIC_160.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/18/24',
      '11/19/24',
      'CHARTMETRIC',
      'Shopping',
      'Sale',
      -160.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-18_CHARTMETRIC_160.0.pdf'),
      'Analytics and Industry Metrics',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-19_Marsh_House_30.69.jpg', '2024-11-19_Marsh_House_30.69.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/19/24',
      '11/21/24',
      'Marsh House',
      'Food & Drink',
      'Sale',
      -30.69,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-19_Marsh_House_30.69.jpg'),
      'CMA Awards',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-20_METROPOLIS_PARKING_20.66.pdf', '2024-11-20_METROPOLIS_PARKING_20.66.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/20/24',
      '11/20/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -20.66,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-20_METROPOLIS_PARKING_20.66.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-21_PARKING_OMNI_NASHVILLE_PA_34.96.jpg', '2024-11-21_PARKING_OMNI_NASHVILLE_PA_34.96.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/21/24',
      '11/22/24',
      'PARKING OMNI NASHVILLE PA',
      'Travel',
      'Sale',
      -34.96,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-21_PARKING_OMNI_NASHVILLE_PA_34.96.jpg'),
      'Parking CMA Awards',
      'Travel Costs - Gas/Rental Car',
      'business',
      0.9
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-21_METROPOLIS_PARKING_26.25.pdf', '2024-11-21_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/21/24',
      '11/22/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-21_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-23_METROPOLIS_PARKING_26.25.pdf', '2024-11-23_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/23/24',
      '11/24/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-23_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-25_METROPOLIS_PARKING_26.25.pdf', '2024-11-25_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/25/24',
      '11/25/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-25_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-04_CORNER_PUB_39.87.jpg', '2024-11-04_CORNER_PUB_39.87.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/4/24',
      '11/6/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -39.87,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-04_CORNER_PUB_39.87.jpg'),
      'Scott Siman and Brian',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-06_PMC_-_PAID_PARKING_23.21.jpg', '2024-11-06_PMC_-_PAID_PARKING_23.21.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/6/24',
      '11/7/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -23.21,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-06_PMC_-_PAID_PARKING_23.21.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-07_METROPOLIS_PARKING_26.25.pdf', '2024-11-07_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/7/24',
      '11/7/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-07_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-08_SH_NASHVILLE_-_OTHER_45.24.png', '2024-11-08_SH_NASHVILLE_-_OTHER_45.24.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/8/24',
      '11/10/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -45.24,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-08_SH_NASHVILLE_-_OTHER_45.24.png'),
      'Kevin Sabbe, Brian Kaplan',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-08_METROPOLIS_PARKING_10.99.pdf', '2024-11-08_METROPOLIS_PARKING_10.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/8/24',
      '11/10/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -10.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-08_METROPOLIS_PARKING_10.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-11-08_CALENDARBRIDGE_10.0.pdf', '2024-11-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '11/8/24',
      '11/10/24',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-11-08_CALENDARBRIDGE_10.0.pdf'),
      'Calendar Sync',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-12_METROPOLIS_PARKING_21.0.pdf', '2024-12-12_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/12/24',
      '12/13/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-12_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-17_METROPOLIS_PARKING_21.0.pdf', '2024-12-17_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/17/24',
      '12/17/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-17_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-18_CHARTMETRIC_160.0.pdf', '2024-12-18_CHARTMETRIC_160.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/18/24',
      '12/19/24',
      'CHARTMETRIC',
      'Shopping',
      'Sale',
      -160.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-18_CHARTMETRIC_160.0.pdf'),
      'Analytics and Industry Metrics',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-18_METROPOLIS_PARKING_15.99.pdf', '2024-12-18_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/18/24',
      '12/19/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-18_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-19_METROPOLIS_PARKING_16.29.pdf', '2024-12-19_METROPOLIS_PARKING_16.29.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/19/24',
      '12/19/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -16.29,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-19_METROPOLIS_PARKING_16.29.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-02_THE_URBAN_JUICER_12.25.jpg', '2024-12-02_THE_URBAN_JUICER_12.25.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/2/24',
      '12/3/24',
      'THE URBAN JUICER',
      'Food & Drink',
      'Sale',
      -12.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-02_THE_URBAN_JUICER_12.25.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-06_COSMOPOL-BANG_BAR_33.38.jpg', '2024-12-06_COSMOPOL-BANG_BAR_33.38.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/6/24',
      '12/8/24',
      'COSMOPOL-BANG BAR',
      'Food & Drink',
      'Sale',
      -33.38,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-06_COSMOPOL-BANG_BAR_33.38.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-06_CURB_LV_TAXI_YCS_18.89.jpg', '2024-12-06_CURB_LV_TAXI_YCS_18.89.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/6/24',
      '12/8/24',
      'CURB LV TAXI YCS',
      'Travel',
      'Sale',
      -18.89,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-06_CURB_LV_TAXI_YCS_18.89.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-07_PIZZA_FORTE_HARD_ROCK_33.16.jpg', '2024-12-07_PIZZA_FORTE_HARD_ROCK_33.16.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/7/24',
      '12/9/24',
      'PIZZA FORTE HARD ROCK',
      'Food & Drink',
      'Sale',
      -33.16,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-07_PIZZA_FORTE_HARD_ROCK_33.16.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-07_DESERT_STAR_LOUNGE_19.0.jpg', '2024-12-07_DESERT_STAR_LOUNGE_19.0.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/7/24',
      '12/9/24',
      'DESERT STAR LOUNGE',
      'Food & Drink',
      'Sale',
      -19.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-07_DESERT_STAR_LOUNGE_19.0.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-08_VHLV-KITCHEN_AT_COMMON_35.0.jpg', '2024-12-08_VHLV-KITCHEN_AT_COMMON_35.0.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/8/24',
      '12/10/24',
      'VHLV-KITCHEN AT COMMON',
      'Food & Drink',
      'Sale',
      -35.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-08_VHLV-KITCHEN_AT_COMMON_35.0.jpg'),
      NULL,
      'Uncategorized',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-12-08_CALENDARBRIDGE_10.0.pdf', '2024-12-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '12/8/24',
      '12/9/24',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-12-08_CALENDARBRIDGE_10.0.pdf'),
      NULL,
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-12_PMC_-_PAID_PARKING_9.29.png', '2024-07-12_PMC_-_PAID_PARKING_9.29.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/12/24',
      '7/14/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -9.29,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-12_PMC_-_PAID_PARKING_9.29.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-12_PMC_-_PAID_PARKING_9.29.png', '2024-07-12_PMC_-_PAID_PARKING_9.29.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/12/24',
      '7/14/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -9.29,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-12_PMC_-_PAID_PARKING_9.29.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-14_CLOUDFLARE_5.0.pdf', '2024-07-14_CLOUDFLARE_5.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/14/24',
      '7/15/24',
      'CLOUDFLARE',
      'Shopping',
      'Sale',
      -5.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-14_CLOUDFLARE_5.0.pdf'),
      'Hosting',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-17_METROPOLIS_PARKING_11.32.pdf', '2024-07-17_METROPOLIS_PARKING_11.32.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/17/24',
      '7/18/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -11.32,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-17_METROPOLIS_PARKING_11.32.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-17_METROPOLIS_PARKING_7.55.pdf', '2024-07-17_METROPOLIS_PARKING_7.55.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/17/24',
      '7/18/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -7.55,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-17_METROPOLIS_PARKING_7.55.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-17_METROPOLIS_PARKING_4.49.pdf', '2024-07-17_METROPOLIS_PARKING_4.49.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/17/24',
      '7/18/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -4.49,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-17_METROPOLIS_PARKING_4.49.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-19_AUDREY_-_SEAN_BROCK_GROU_1487.8.pdf', '2024-07-19_AUDREY_-_SEAN_BROCK_GROU_1487.8.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/19/24',
      '7/21/24',
      'AUDREY - SEAN BROCK GROU',
      'Food & Drink',
      'Sale',
      -1487.8,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-19_AUDREY_-_SEAN_BROCK_GROU_1487.8.pdf'),
      'Project Betty - Dinner in Nashville with Agency, Jason, Brian, Tom, Tyler 4 from team JPG',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-25_ROSTR_PRO_50.0.pdf', '2024-07-25_ROSTR_PRO_50.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/25/24',
      '7/26/24',
      'ROSTR PRO',
      'Shopping',
      'Sale',
      -50.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-25_ROSTR_PRO_50.0.pdf'),
      'Industry Contacts System',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-25_CHAR_GREEN_HILLS_43.6.jpg', '2024-07-25_CHAR_GREEN_HILLS_43.6.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/25/24',
      '7/28/24',
      'CHAR GREEN HILLS',
      'Food & Drink',
      'Sale',
      -43.6,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-25_CHAR_GREEN_HILLS_43.6.jpg'),
      'Lunch with State - Governor Team',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-25_PMC_-_PAID_PARKING_9.29.pdf', '2024-07-25_PMC_-_PAID_PARKING_9.29.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/25/24',
      '7/26/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -9.29,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-25_PMC_-_PAID_PARKING_9.29.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-26_IMDbPro_19.99.png', '2024-07-26_IMDbPro_19.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/26/24',
      '7/26/24',
      'IMDbPro',
      'Bills & Utilities',
      'Sale',
      -19.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-26_IMDbPro_19.99.png'),
      'Contacts App',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-26_SH_NASHVILLE_-_OTHER_9.05.jpg', '2024-07-26_SH_NASHVILLE_-_OTHER_9.05.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/26/24',
      '7/28/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -9.05,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-26_SH_NASHVILLE_-_OTHER_9.05.jpg'),
      'Job Interview - Assistant',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-28_CARTA_NORTH_GARAGE_11.0.jpg', '2024-07-28_CARTA_NORTH_GARAGE_11.0.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/28/24',
      '7/29/24',
      'CARTA NORTH GARAGE',
      'Travel',
      'Sale',
      -11.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-28_CARTA_NORTH_GARAGE_11.0.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-30_SH_NASHVILLE_-_OTHER_24.91.jpg', '2024-07-30_SH_NASHVILLE_-_OTHER_24.91.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/30/24',
      '8/1/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -24.91,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-30_SH_NASHVILLE_-_OTHER_24.91.jpg'),
      'Jason and Jules Wortman - Artist Manager',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-07-30_METROPOLIS_PARKING_15.99.pdf', '2024-07-30_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '7/30/24',
      '7/31/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-07-30_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-01_METROPOLIS_PARKING_15.99.pdf', '2024-08-01_METROPOLIS_PARKING_15.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/1/24',
      '8/2/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -15.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-01_METROPOLIS_PARKING_15.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-13_OPTIMIST_NASHVILLE_896.44.jpg', '2024-08-13_OPTIMIST_NASHVILLE_896.44.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/13/24',
      '8/15/24',
      'OPTIMIST NASHVILLE',
      'Food & Drink',
      'Sale',
      -896.44,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-13_OPTIMIST_NASHVILLE_896.44.jpg'),
      'Team Dinner Nashville - Alix, Anne Marie, Brian, Doug Phillips, Jason, Luanne',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-13_O-KU_NASHVILLE_58.21.jpg', '2024-08-13_O-KU_NASHVILLE_58.21.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/13/24',
      '8/14/24',
      'O-KU NASHVILLE',
      'Food & Drink',
      'Sale',
      -58.21,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-13_O-KU_NASHVILLE_58.21.jpg'),
      'Team Meeting Drinks Nashville - Alix, Anne Marie, Brian -',
      'Company Meetings and Meals',
      'business',
      0.85
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-13_OPTIMIST_NASHVILLE_44.32.jpg', '2024-08-13_OPTIMIST_NASHVILLE_44.32.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/13/24',
      '8/15/24',
      'OPTIMIST NASHVILLE',
      'Food & Drink',
      'Sale',
      -44.32,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-13_OPTIMIST_NASHVILLE_44.32.jpg'),
      'Team Dinner Nashville - Alix, Anne Marie, Brian, Doug Phillips, Jason, Luanne',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-14_SH_NASHVILLE_-_OTHER_27.14.jpg', '2024-08-14_SH_NASHVILLE_-_OTHER_27.14.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/14/24',
      '8/25/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -27.14,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-14_SH_NASHVILLE_-_OTHER_27.14.jpg'),
      'Sheryl Longin - Meeting',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-14_MAFIAOZAS_15.38.jpg', '2024-08-14_MAFIAOZAS_15.38.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/14/24',
      '8/16/24',
      'MAFIAOZAS',
      'Food & Drink',
      'Sale',
      -15.38,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-14_MAFIAOZAS_15.38.jpg'),
      'Kelly Scott Tim Staples Brian meetings',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-14_METROPOLIS_PARKING_10.99.pdf', '2024-08-14_METROPOLIS_PARKING_10.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/14/24',
      '8/14/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -10.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-14_METROPOLIS_PARKING_10.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-14_CLOUDFLARE_5.0.pdf', '2024-08-14_CLOUDFLARE_5.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/14/24',
      '8/15/24',
      'CLOUDFLARE',
      'Shopping',
      'Sale',
      -5.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-14_CLOUDFLARE_5.0.pdf'),
      'Monthly Hosting',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-15_SH_NASHVILLE_-_OTHER_74.97.jpg', '2024-08-15_SH_NASHVILLE_-_OTHER_74.97.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/15/24',
      '8/18/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -74.97,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-15_SH_NASHVILLE_-_OTHER_74.97.jpg'),
      'Sandy Howard - Mcgraw Sister - Lunch',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-17_METROPOLIS_PARKING_42.0.pdf', '2024-08-17_METROPOLIS_PARKING_42.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/17/24',
      '8/18/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -42.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-17_METROPOLIS_PARKING_42.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-18_METROPOLIS_PARKING_31.5.pdf', '2024-08-18_METROPOLIS_PARKING_31.5.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/18/24',
      '8/19/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -31.5,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-18_METROPOLIS_PARKING_31.5.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-19_SH_NASHVILLE_-_OTHER_51.7.png', '2024-08-19_SH_NASHVILLE_-_OTHER_51.7.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/19/24',
      '8/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -51.7,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-19_SH_NASHVILLE_-_OTHER_51.7.png'),
      'Joel, Chandra, Paul, Pitch Outsiders',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-19_SH_NASHVILLE_-_OTHER_47.82.png', '2024-08-19_SH_NASHVILLE_-_OTHER_47.82.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/19/24',
      '8/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -47.82,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-19_SH_NASHVILLE_-_OTHER_47.82.png'),
      'Lunch with Rachel - Spotify',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-19_SH_NASHVILLE_-_OTHER_31.02.png', '2024-08-19_SH_NASHVILLE_-_OTHER_31.02.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/19/24',
      '8/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -31.02,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-19_SH_NASHVILLE_-_OTHER_31.02.png'),
      'Sam Parker - Beach Boys Pitch',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-20_METROPOLIS_PARKING_27.42.pdf', '2024-08-20_METROPOLIS_PARKING_27.42.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/20/24',
      '8/20/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -27.42,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-20_METROPOLIS_PARKING_27.42.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-20_PMC_-_PAID_PARKING_23.21.pdf', '2024-08-20_PMC_-_PAID_PARKING_23.21.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/20/24',
      '8/21/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -23.21,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-20_PMC_-_PAID_PARKING_23.21.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-21_PMC_-_PAID_PARKING_38.03.png', '2024-08-21_PMC_-_PAID_PARKING_38.03.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/21/24',
      '8/22/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -38.03,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-21_PMC_-_PAID_PARKING_38.03.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-22_LinkedIn_JOB_9849229796_174.56.png', '2024-08-22_LinkedIn_JOB_9849229796_174.56.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/22/24',
      '8/23/24',
      'LinkedIn JOB 9849229796',
      'Bills & Utilities',
      'Sale',
      -174.56,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-22_LinkedIn_JOB_9849229796_174.56.png'),
      'LinkedIn Job Post - Assistant',
      'BD: Advertising & Promotion',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-22_PMC_-_PAID_PARKING_29.28.png', '2024-08-22_PMC_-_PAID_PARKING_29.28.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/22/24',
      '8/22/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -29.28,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-22_PMC_-_PAID_PARKING_29.28.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-22_PMC_-_PAID_PARKING_22.51.png', '2024-08-22_PMC_-_PAID_PARKING_22.51.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/22/24',
      '8/22/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -22.51,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-22_PMC_-_PAID_PARKING_22.51.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-23_CORNER_PUB_79.64.jpg', '2024-08-23_CORNER_PUB_79.64.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/23/24',
      '8/25/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -79.64,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-23_CORNER_PUB_79.64.jpg'),
      'Jason Maynard - Oracle - Brian',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-23_METROPOLIS_PARKING_10.99.pdf', '2024-08-23_METROPOLIS_PARKING_10.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/23/24',
      '8/25/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -10.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-23_METROPOLIS_PARKING_10.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-23_SH_NASHVILLE_-_OTHER_9.05.jpg', '2024-08-23_SH_NASHVILLE_-_OTHER_9.05.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/23/24',
      '8/25/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -9.05,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-23_SH_NASHVILLE_-_OTHER_9.05.jpg'),
      'Interview Candidate for assistant',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-25_ROSTR_PRO_50.0.pdf', '2024-08-25_ROSTR_PRO_50.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/25/24',
      '8/26/24',
      'ROSTR PRO',
      'Shopping',
      'Sale',
      -50.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-25_ROSTR_PRO_50.0.pdf'),
      'Industry Contacts System',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-26_PMC_-_PAID_PARKING_23.21.png', '2024-08-26_PMC_-_PAID_PARKING_23.21.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/26/24',
      '8/27/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -23.21,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-26_PMC_-_PAID_PARKING_23.21.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-26_IMDbPro_19.99.png', '2024-08-26_IMDbPro_19.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/26/24',
      '8/26/24',
      'IMDbPro',
      'Bills & Utilities',
      'Sale',
      -19.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-26_IMDbPro_19.99.png'),
      'IMBD Monthly',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-28_PMC_-_PAID_PARKING_26.22.jpg', '2024-08-28_PMC_-_PAID_PARKING_26.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/28/24',
      '8/29/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -26.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-28_PMC_-_PAID_PARKING_26.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-28_SH_NASHVILLE_-_OTHER_18.1.jpg', '2024-08-28_SH_NASHVILLE_-_OTHER_18.1.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/28/24',
      '8/30/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -18.1,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-28_SH_NASHVILLE_-_OTHER_18.1.jpg'),
      'Patrick Humes',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-29_CHAR_GREEN_HILLS_67.81.jpg', '2024-08-29_CHAR_GREEN_HILLS_67.81.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/29/24',
      '9/1/24',
      'CHAR GREEN HILLS',
      'Food & Drink',
      'Sale',
      -67.81,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-29_CHAR_GREEN_HILLS_67.81.jpg'),
      'Todd Cassetty - Nashville Manager and Songwriter / Event Owner',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-29_PMC_-_PAID_PARKING_9.29.pdf', '2024-08-29_PMC_-_PAID_PARKING_9.29.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/29/24',
      '8/30/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -9.29,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-29_PMC_-_PAID_PARKING_9.29.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-30_METROPOLIS_PARKING_16.99.pdf', '2024-08-30_METROPOLIS_PARKING_16.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/30/24',
      '8/30/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -16.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-30_METROPOLIS_PARKING_16.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-05_SH_NASHVILLE_-_OTHER_58.16.jpg', '2024-08-05_SH_NASHVILLE_-_OTHER_58.16.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/5/24',
      '8/7/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -58.16,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-05_SH_NASHVILLE_-_OTHER_58.16.jpg'),
      'Paul Zamek, Brian, Sam Parker Pitch',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-05_SH_NASHVILLE_-_OTHER_38.78.jpg', '2024-08-05_SH_NASHVILLE_-_OTHER_38.78.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/5/24',
      '8/7/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -38.78,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-05_SH_NASHVILLE_-_OTHER_38.78.jpg'),
      'Charly Salvatore - Artist Manager Meeting',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-05_METROPOLIS_PARKING_21.0.pdf', '2024-08-05_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/5/24',
      '8/6/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-05_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-05_SH_NASHVILLE_-_OTHER_9.05.jpg', '2024-08-05_SH_NASHVILLE_-_OTHER_9.05.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/5/24',
      '8/7/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -9.05,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-05_SH_NASHVILLE_-_OTHER_9.05.jpg'),
      'Chandra Laplume - Producer Meeting',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-06_METROPOLIS_PARKING_21.0.pdf', '2024-08-06_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/6/24',
      '8/6/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-06_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-06_METROPOLIS_PARKING_21.0.pdf', '2024-08-06_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/6/24',
      '8/7/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-06_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-06_SH_NASHVILLE_-_OTHER_18.1.jpg', '2024-08-06_SH_NASHVILLE_-_OTHER_18.1.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/6/24',
      '8/8/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -18.1,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-06_SH_NASHVILLE_-_OTHER_18.1.jpg'),
      'Kelly Clague and Brian Kaplan',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-08_PMC_-_PAID_PARKING_38.03.png', '2024-08-08_PMC_-_PAID_PARKING_38.03.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/8/24',
      '8/9/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -38.03,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-08_PMC_-_PAID_PARKING_38.03.png'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-08-08_CALENDARBRIDGE_10.0.pdf', '2024-08-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '8/8/24',
      '8/9/24',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-08-08_CALENDARBRIDGE_10.0.pdf'),
      'Calendar Bridge',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-10_DEL_FRISCOS_GRILL_NASHVL_69.9.png', '2024-09-10_DEL_FRISCOS_GRILL_NASHVL_69.9.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/10/24',
      '9/11/24',
      'DEL FRISCOS GRILL NASHVL',
      'Food & Drink',
      'Sale',
      -69.9,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-10_DEL_FRISCOS_GRILL_NASHVL_69.9.png'),
      'Len Davi - Headphone developer (Beats by Dre)',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-11_CADILLAC_BAR_LAS_VEGAS_86.62.jpg', '2024-09-11_CADILLAC_BAR_LAS_VEGAS_86.62.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/11/24',
      '9/12/24',
      'CADILLAC BAR LAS VEGAS',
      'Food & Drink',
      'Sale',
      -86.62,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-11_CADILLAC_BAR_LAS_VEGAS_86.62.jpg'),
      'Tim Staples, Jason Ross, Brian Kaplan, Matt Weaver, Joel Bergvall - Area 15',
      'DH:  BD:  Client Business Meals',
      'business',
      0.85
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-12_GNLV_THE_GRILLE_27.22.jpg', '2024-09-12_GNLV_THE_GRILLE_27.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/12/24',
      '9/13/24',
      'GNLV THE GRILLE',
      'Food & Drink',
      'Sale',
      -27.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-12_GNLV_THE_GRILLE_27.22.jpg'),
      'Vegas - Travel',
      'DH: Travel costs - Meals',
      'business',
      0.8
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-13_GOLDEN_NUGGET_HOTEL_LV_313.01.png', '2024-09-13_GOLDEN_NUGGET_HOTEL_LV_313.01.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/13/24',
      '9/15/24',
      'GOLDEN NUGGET HOTEL LV',
      'Travel',
      'Sale',
      -313.01,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-13_GOLDEN_NUGGET_HOTEL_LV_313.01.png'),
      'Las Vegas Area 15 Hotel',
      'Travel Costs - Hotel',
      'business',
      0.95
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-14_CLOUDFLARE_5.0.pdf', '2024-09-14_CLOUDFLARE_5.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/14/24',
      '9/15/24',
      'CLOUDFLARE',
      'Shopping',
      'Sale',
      -5.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-14_CLOUDFLARE_5.0.pdf'),
      'downhome.com server',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-16_SH_NASHVILLE_-_OTHER_40.07.jpg', '2024-09-16_SH_NASHVILLE_-_OTHER_40.07.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/16/24',
      '9/18/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -40.07,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-16_SH_NASHVILLE_-_OTHER_40.07.jpg'),
      'Joel, Chandra Laplume, Outsiders Pitch',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-16_PARKINGMANAGEMENTCOMPANY_38.24.jpg', '2024-09-16_PARKINGMANAGEMENTCOMPANY_38.24.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/16/24',
      '9/17/24',
      'PARKINGMANAGEMENTCOMPANY',
      'Travel',
      'Sale',
      -38.24,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-16_PARKINGMANAGEMENTCOMPANY_38.24.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      0.9
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-16_PMC_-_PAID_PARKING_26.22.jpg', '2024-09-16_PMC_-_PAID_PARKING_26.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/16/24',
      '9/17/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -26.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-16_PMC_-_PAID_PARKING_26.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-16_METROPOLIS_PARKING_17.88.pdf', '2024-09-16_METROPOLIS_PARKING_17.88.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/16/24',
      '9/17/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -17.88,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-16_METROPOLIS_PARKING_17.88.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-18_SH_NASHVILLE_-_OTHER_71.09.jpg', '2024-09-18_SH_NASHVILLE_-_OTHER_71.09.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/18/24',
      '9/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -71.09,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-18_SH_NASHVILLE_-_OTHER_71.09.jpg'),
      'Randy Bernard and Patrick Humes',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-18_PMC_-_PAID_PARKING_29.22.jpg', '2024-09-18_PMC_-_PAID_PARKING_29.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/18/24',
      '9/19/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -29.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-18_PMC_-_PAID_PARKING_29.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-18_METROPOLIS_PARKING_10.99.pdf', '2024-09-18_METROPOLIS_PARKING_10.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/18/24',
      '9/18/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -10.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-18_METROPOLIS_PARKING_10.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-19_SH_NASHVILLE_-_OTHER_38.78.jpg', '2024-09-19_SH_NASHVILLE_-_OTHER_38.78.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/19/24',
      '9/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -38.78,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-19_SH_NASHVILLE_-_OTHER_38.78.jpg'),
      'Dan Rowe - Firebird',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-19_SH_NASHVILLE_-_OTHER_11.63.jpg', '2024-09-19_SH_NASHVILLE_-_OTHER_11.63.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/19/24',
      '9/22/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -11.63,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-19_SH_NASHVILLE_-_OTHER_11.63.jpg'),
      'Live in the Winery - Bobbi Jacobs',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-20_METROPOLIS_PARKING_26.25.pdf', '2024-09-20_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/20/24',
      '9/20/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-20_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-21_201_BELCOURT_LOT_5.6.jpg', '2024-09-21_201_BELCOURT_LOT_5.6.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/21/24',
      '9/23/24',
      '201 BELCOURT LOT',
      'Travel',
      'Sale',
      -5.6,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-21_201_BELCOURT_LOT_5.6.jpg'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-24_SH_NASHVILLE_-_OTHER_689.59.jpg', '2024-09-24_SH_NASHVILLE_-_OTHER_689.59.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/24/24',
      '9/26/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -689.59,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-24_SH_NASHVILLE_-_OTHER_689.59.jpg'),
      'Bill, Brian, Scott, Tim, Tyler, Tom, Patrick, Jason',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-25_SH_NASHVILLE_-_OTHER_224.64.png', '2024-09-25_SH_NASHVILLE_-_OTHER_224.64.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/25/24',
      '9/27/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -224.64,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-25_SH_NASHVILLE_-_OTHER_224.64.png'),
      'Bill Stapleton, Tim Staples, Jason Ross, Tyler Stevens, Tom May, Scott Siman',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-25_PMC_-_PAID_PARKING_26.22.jpg', '2024-09-25_PMC_-_PAID_PARKING_26.22.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/25/24',
      '9/26/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -26.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-25_PMC_-_PAID_PARKING_26.22.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-25_LAZGO_NASHVILLE_M32180_5.18.pdf', '2024-09-25_LAZGO_NASHVILLE_M32180_5.18.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/25/24',
      '9/26/24',
      'LAZGO NASHVILLE M32180',
      'Travel',
      'Sale',
      -5.18,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-25_LAZGO_NASHVILLE_M32180_5.18.pdf'),
      'Parking',
      'DH: Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-26_IMDbPro_19.99.png', '2024-09-26_IMDbPro_19.99.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/26/24',
      '9/26/24',
      'IMDbPro',
      'Bills & Utilities',
      'Sale',
      -19.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-26_IMDbPro_19.99.png'),
      'IMDB Pro Monthly',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-26_SH_NASHVILLE_-_OTHER_14.22.png', '2024-09-26_SH_NASHVILLE_-_OTHER_14.22.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/26/24',
      '9/29/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -14.22,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-26_SH_NASHVILLE_-_OTHER_14.22.png'),
      'Andrew Cohen / Brian Kaplan Catch up',
      'Company Meetings and Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-03_METROPOLIS_PARKING_17.88.pdf', '2024-09-03_METROPOLIS_PARKING_17.88.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/3/24',
      '9/4/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -17.88,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-03_METROPOLIS_PARKING_17.88.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-04_CORNER_PUB_45.15.jpg', '2024-09-04_CORNER_PUB_45.15.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/4/24',
      '9/6/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -45.15,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-04_CORNER_PUB_45.15.jpg'),
      'Jason Maynard Oracle',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-04_CORNER_PUB_39.78.jpg', '2024-09-04_CORNER_PUB_39.78.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/4/24',
      '9/6/24',
      'CORNER PUB',
      'Food & Drink',
      'Sale',
      -39.78,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-04_CORNER_PUB_39.78.jpg'),
      'Jason Maynard Oracle',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-04_PMC_-_PAID_PARKING_24.59.jpg', '2024-09-04_PMC_-_PAID_PARKING_24.59.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/4/24',
      '9/5/24',
      'PMC - PAID PARKING',
      'Travel',
      'Sale',
      -24.59,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-04_PMC_-_PAID_PARKING_24.59.jpg'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-05_SH_NASHVILLE_-_OTHER_100.82.jpg', '2024-09-05_SH_NASHVILLE_-_OTHER_100.82.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/5/24',
      '9/8/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -100.82,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-05_SH_NASHVILLE_-_OTHER_100.82.jpg'),
      'Lunch with Clay Hunnicut',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-05_METROPOLIS_PARKING_21.0.pdf', '2024-09-05_METROPOLIS_PARKING_21.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/5/24',
      '9/6/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -21.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-05_METROPOLIS_PARKING_21.0.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-05_METROPOLIS_PARKING_10.99.pdf', '2024-09-05_METROPOLIS_PARKING_10.99.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/5/24',
      '9/6/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -10.99,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-05_METROPOLIS_PARKING_10.99.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-06_SH_NASHVILLE_-_OTHER_40.07.jpg', '2024-09-06_SH_NASHVILLE_-_OTHER_40.07.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/6/24',
      '9/8/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -40.07,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-06_SH_NASHVILLE_-_OTHER_40.07.jpg'),
      'Lunch - Steve Emley',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-06_SH_NASHVILLE_-_OTHER_24.56.jpg', '2024-09-06_SH_NASHVILLE_-_OTHER_24.56.jpg', 'image/jpeg');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/6/24',
      '9/8/24',
      'SH NASHVILLE - OTHER',
      'Travel',
      'Sale',
      -24.56,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-06_SH_NASHVILLE_-_OTHER_24.56.jpg'),
      'Coffee Robert Deaton',
      'DH:  BD:  Client Business Meals',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-07_GOLDEN_NUGGET_HOTEL_LV_100.57.png', '2024-09-07_GOLDEN_NUGGET_HOTEL_LV_100.57.png', 'image/png');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/7/24',
      '9/8/24',
      'GOLDEN NUGGET HOTEL LV',
      'Travel',
      'Sale',
      -100.57,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-07_GOLDEN_NUGGET_HOTEL_LV_100.57.png'),
      'Las Vegas Travel - Area 15',
      'DH: Travel Costs - Hotel',
      'business',
      0.95
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-07_METROPOLIS_PARKING_26.25.pdf', '2024-09-07_METROPOLIS_PARKING_26.25.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/7/24',
      '9/8/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -26.25,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-07_METROPOLIS_PARKING_26.25.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-08_CALENDARBRIDGE_10.0.pdf', '2024-09-08_CALENDARBRIDGE_10.0.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/8/24',
      '9/9/24',
      'CALENDARBRIDGE',
      'Shopping',
      'Sale',
      -10.0,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-08_CALENDARBRIDGE_10.0.pdf'),
      'Calendar Sync Software',
      'Software subscriptions',
      'business',
      1.0
    );
  

        INSERT OR IGNORE INTO receipts (file_key, file_name, content_type)
        VALUES ('2024-09-09_METROPOLIS_PARKING_7.55.pdf', '2024-09-09_METROPOLIS_PARKING_7.55.pdf', 'application/pdf');
      

    INSERT INTO expenses (
      transaction_date, post_date, description, category, type,
      amount, memo, receipt_id, comment, expensify_category,
      expense_type, categorization_confidence
    ) VALUES (
      '9/9/24',
      '9/10/24',
      'METROPOLIS PARKING',
      'Travel',
      'Sale',
      -7.55,
      NULL,
      (SELECT id FROM receipts WHERE file_key = '2024-09-09_METROPOLIS_PARKING_7.55.pdf'),
      'Parking',
      'Travel Costs - Gas/Rental Car',
      'business',
      1.0
    );
  
COMMIT;