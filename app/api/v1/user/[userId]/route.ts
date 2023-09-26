import { NextRequest } from 'next/server';

export const DELETE = async (req: NextRequest, context: any) => {
  console.log(context);
};
