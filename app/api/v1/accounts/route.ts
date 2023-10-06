import { createRouteSupabaseClient } from '@/app/supabase-server';
import { UNAUTHENTICATED_OPERATION } from '@/constants';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const supabase = createRouteSupabaseClient();
  try {
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
