import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/database.types';

/**
 * @swagger
 * /api/v1/account:
 *  delete:
 *      description: deletes the account of the user
 *      responses:
 *          200:
 *              description: "Successfull"
 */

export const DELETE = async (req: NextRequest, context: any) => {
  const requestUrl = new URL(req.url);

  // get supabase client
  const supabase = await createRouteHandlerClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const user = session?.user;

  console.log(user);

  const { error } = await supabase.from('users').delete().eq('id', '');

  return new NextResponse('Successfull', { status: 200 });
};
