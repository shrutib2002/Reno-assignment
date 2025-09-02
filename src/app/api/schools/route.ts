import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
// import formidable from 'formidable'; // Removed formidable import
import mysql from 'mysql2/promise';

// Configure MySQL connection
const dbConfig = {
  host: process.env.DB_HOST ,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD ,
  database: process.env.DB_DATABASE,
};

const uploadDir = path.join(process.cwd(), 'public/schoolImages');

export async function POST(req: NextRequest) {
  try {
    // Use req.formData() for Next.js App Router
    const formData = await req.formData();

    const name = formData.get('name') as string;
    const address = formData.get('address') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const contact = formData.get('contact') as string;
    const email_id = formData.get('email_id') as string;
    const imageFile = formData.get('image') as File | null;

    let imageUrl: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileExtension = path.extname(imageFile.name);
      const fileName = `${uniqueSuffix}${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
      imageUrl = `/schoolImages/${fileName}`;
    }

    if (!name || !address || !city || !state || !contact || !email_id) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    const connection = await mysql.createConnection(dbConfig);
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, address, city, state, contact, imageUrl, email_id]
    );
    await connection.end();

    return NextResponse.json({ message: 'School added successfully!', schoolId: (result as any).insertId }, { status: 201 });
  } catch (error) {
    console.error('Error adding school:', error);
    return NextResponse.json({ message: 'Failed to add school.', error: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT id, name, address, city, image FROM schools');
    await connection.end();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching schools:', error);
    return NextResponse.json({ message: 'Failed to fetch schools.', error: (error as Error).message }, { status: 500 });
  }
}
