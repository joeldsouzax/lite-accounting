import { NextRequest, NextResponse } from 'next/server';

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
  console.log(context);
  return new NextResponse('Successfull', { status: 200 });
};
