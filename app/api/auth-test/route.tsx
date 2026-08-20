import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { isAuthenticated, userId } = await auth();

  return Response.json({
    isAuthenticated,
    userId,
  });
}