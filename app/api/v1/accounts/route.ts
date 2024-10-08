import { createRouteSupabaseClient } from '@/app/supabase-server';
import { DEFAULT_PAGE_SIZE, UNAUTHENTICATED_OPERATION } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

// TODO: orderby more balance
// TODO: show most used
// TODO: search account numbers
/**
 * gets the continous list of accounts, page after page
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const supabase = createRouteSupabaseClient();
  const page = Number(searchParams.get('page')) ?? 0;
  const size = Number(searchParams.get('size')) ?? DEFAULT_PAGE_SIZE;
  const account_term = String(searchParams.get('q')) ?? '';
  const from = page * size;
  const to = from + size - 1;

  try {
    const { data, error } = await supabase
      .rpc('search_accounts', {
        account_term,
      })
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
};
