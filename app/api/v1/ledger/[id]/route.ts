import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

interface Context {
  params: { id: number };
}

// TODO: get only the logged in users ledger
export async function GET(request: NextRequest, context: Context) {
  console.log(context);
  return NextResponse.json({ name: '', description: '' });
}
