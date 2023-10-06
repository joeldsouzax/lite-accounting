import { createRouteSupabaseClient } from '@/app/supabase-server';
import { UNAUTHENTICATED_OPERATION } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

// TODO: get limit
// TODO: get next
export const GET = async (request: NextRequest) => {
  const supabase = createRouteSupabaseClient();
  try {
    const { data, error, count } = await supabase
      .from('accounts')
      .select('account_code, name, description, id, parent_account, user_id', {
        count: 'exact',
      })
      .limit(20);

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    if (data === null) {
      return NextResponse.json(
        { accounts: [], count: 0 },
        { status: 200, statusText: 'no accounts found' }
      );
    }

    return NextResponse.json({ accounts: data, count }, { status: 200 });
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
