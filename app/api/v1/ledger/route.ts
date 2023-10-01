import { createRouteSupabaseClient } from '@/app/supabase-server';
import {
  UNAUTHENTICATED_OPERATION,
  UNKNOWN_PROBLEM,
  VALIDATION_FAILED,
} from '@/constants';
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
        { status: 422, statusText: VALIDATION_FAILED }
      );
    }
    return NextResponse.json({
      status: 400,
      statusText: UNKNOWN_PROBLEM,
    });
  }
}

// TODO: get only the logged in users ledger
export async function GET(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  try {
    const { data, error } = await supabase.from('ledgers').select();
    if (error) {
      throw error;
    }
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(
      { error: UNAUTHENTICATED_OPERATION },
      {
        status: 404,
        statusText: UNAUTHENTICATED_OPERATION,
      }
    );
  }
}
