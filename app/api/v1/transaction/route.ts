import { createRouteSupabaseClient } from '@/app/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DEFAULT_PAGE_SIZE, UNAUTHENTICATED_OPERATION } from '@/constants';
import createError from 'http-errors';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const supabase = createRouteSupabaseClient();
  const page = Number(searchParams.get('page')) ?? 0;
  const from = page * DEFAULT_PAGE_SIZE;
  const to = from + DEFAULT_PAGE_SIZE - 1;

  try {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .range(from, to);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    if (data === null) {
      return NextResponse.json(data, {
        status: 200,
        statusText: 'no accounts found',
      });
    }

    return NextResponse.json(data, { status: 200 });
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

export const entrySchema = z
  .object({
    amount: z
      .number()
      .nonnegative({ message: 'amount should be greater than 0' }),
    name: z
      .string()
      .max(160, { message: 'length is more than 160 characters long' }),
    company_id: z.string(),
    transaction_date: z.string().datetime().optional(),
    description: z.string().optional(),
    debit: z.number(),
    credit: z.number(),
  })
  .strict({ message: 'bad request' });

export async function POST(request: NextRequest) {
  const supabase = createRouteSupabaseClient();
  try {
    const { amount, name, company_id, debit, credit } = entrySchema.parse(
      await request.json()
    );
    const { data, error } = await supabase
      .from('entries')
      .insert({ amount, name, company_id: Number(company_id), credit, debit })
      .select()
      .single();

    if (data === null) {
      return NextResponse.json(createError.Gone, { status: 410 });
    }

    if (error) {
      return NextResponse.json(createError.NotAcceptable, { status: 406 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(err, { status: 400 });
    }

    if ((err as Error).name === 'SyntaxError') {
      return NextResponse.json(createError.BadRequest(), {
        status: 400,
        statusText: (err as Error).message,
      });
    }
    return NextResponse.json(createError.Unauthorized(), {
      status: 401,
    });
  }
}
