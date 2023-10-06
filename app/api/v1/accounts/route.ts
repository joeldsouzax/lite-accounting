import { createRouteSupabaseClient } from '@/app/supabase-server';
import { PAGE_SIZE, UNAUTHENTICATED_OPERATION } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

/**
 * gets the continous list of accounts, page after page
 * @param request
 * @returns
 */
export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const supabase = createRouteSupabaseClient();
  const page = Number(searchParams.get('page')) ?? 0;
  const from = page * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  try {
    const { data, error } = await supabase
      .from('accounts')
      .select('account_code, name, description, id, parent_account, user_id')
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
