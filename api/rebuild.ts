// /api/rebuild.ts
export const config = {
  runtime: 'edge',
}

export default async function handler(request: Request) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  // Verify the deploy hook exists
  if (!process.env.VERCEL_DEPLOY_HOOK) {
    console.error('VERCEL_DEPLOY_HOOK environment variable is not set');
    return new Response('Deploy hook not configured', { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    // Trigger the deploy
    const response = await fetch(process.env.VERCEL_DEPLOY_HOOK, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Deploy hook failed with status: ${response.status}`);
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Build triggered successfully' }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Failed to trigger build:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to trigger build' }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
