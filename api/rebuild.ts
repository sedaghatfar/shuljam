export const config = {
  runtime: 'edge', // Use the "edge" runtime
};

export default async function handler(req: Request): Promise<Response> {
  try {
    const deployHook = process.env.VERCEL_DEPLOY_HOOK;

    if (!deployHook) {
      console.error('Deploy hook not configured');
      return new Response(
        JSON.stringify({ error: 'Deploy hook not configured' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('Triggering deploy hook:', deployHook);

    const response = await fetch(deployHook, { method: 'POST' });

    if (!response.ok) {
      console.error('Deploy hook failed with status:', response.status);
      throw new Error(`Deploy hook failed with status: ${response.status}`);
    }

    console.log('Deploy hook triggered successfully');
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error triggering deploy hook:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to trigger build',
        details: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
