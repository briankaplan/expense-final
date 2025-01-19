import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { DB } = process.env;
    if (!DB) {
      throw new Error('Database connection not available');
    }

    const report = await request.json();
    
    // Insert the report into the reports table
    const result = await DB.prepare(
      `INSERT INTO reports (date, total, data) VALUES (?, ?, ?)`
    )
    .bind(
      report.date,
      report.total,
      JSON.stringify(report)
    )
    .run();

    return NextResponse.json({ 
      success: true, 
      report: { ...report, id: result.lastRowId } 
    });
  } catch (error) {
    console.error('Error creating report:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create report' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { DB } = process.env;
    if (!DB) {
      throw new Error('Database connection not available');
    }

    const reports = await DB.prepare(
      `SELECT * FROM reports ORDER BY date DESC`
    )
    .all();

    // Parse the JSON data field for each report
    const parsedReports = reports.results.map((report: any) => ({
      ...report,
      data: JSON.parse(report.data)
    }));

    return NextResponse.json({ 
      success: true, 
      reports: parsedReports 
    });
  } catch (error) {
    console.error('Error fetching reports:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reports' },
      { status: 500 }
    );
  }
} 