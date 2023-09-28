import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

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
  const supabase = await createRouteHandlerClient({ cookies });
  return new NextResponse('Successfull', { status: 200 });
};
