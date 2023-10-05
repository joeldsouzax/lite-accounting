import { createRouteSupabaseClient } from '@/app/supabase-server';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  name: z.string(),
  description: z.string(),
});

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}
