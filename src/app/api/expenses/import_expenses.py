import csv
import sqlite3
from datetime import datetime

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, '%m/%d/%y').strftime('%Y-%m-%d')
    except ValueError:
        return None

def import_expenses():
    conn = sqlite3.connect('src/app/api/expenses/expenses.db')
    cursor = conn.cursor()
    
    with open('src/app/api/expenses/data.csv', 'r') as file:
        csv_reader = csv.DictReader(file)
        for row in csv_reader:
            # Convert amount to negative (expense) if it's a sale
            amount = float(row['Amount'])
            if row['Type'].lower() == 'sale':
                amount = abs(amount) * -1  # Make sure it's negative for expenses
                
            cursor.execute('''
                INSERT INTO expenses (
                    transaction_date,
                    post_date,
                    description,
                    category,
                    type,
                    amount,
                    memo,
                    receipt_url,
                    comment,
                    expensify_category,
                    expense_type,
                    categorization_confidence
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', (
                parse_date(row['Transaction Date']),
                parse_date(row['Post Date']),
                row['Description'],
                row['Category'],
                row['Type'],
                amount,
                row['Memo'],
                row['receipt_url'],
                row['comment'],
                row['expensify_category'],
                row['expense_type'],
                float(row['categorization_confidence']) if row['categorization_confidence'] else None
            ))
    
    conn.commit()
    conn.close()

if __name__ == '__main__':
    import_expenses()
    print("Import completed successfully!") 