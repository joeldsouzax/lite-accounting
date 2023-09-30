import { ledger } from '@/lib/validations/ledger';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';

// TODO: unit test https://medium.com/@zachshallbetter/unit-test-next-js-api-routes-with-typescript-longer-version-a59ceb261b1f
export async function POST(request: NextRequest) {
  try {
    const { name = '', description = '' } = ledger.parse(await request.json());
    return NextResponse.json(
      { name, description },
      { status: 200, statusText: 'ledger created' }
    );
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: err },
        { status: 422, statusText: 'validation failed' }
      );
    }
    return NextResponse.json({
      status: 400,
      statusText: 'unknown problem encountered',
    });
  }
}
