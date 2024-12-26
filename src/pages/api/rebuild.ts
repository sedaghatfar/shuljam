export const prerender = false;

export async function POST() {
  try {
    console.log('API endpoint triggered'); // Debug log

    if (!import.meta.env.VERCEL_DEPLOY_HOOK) {
      console.error('Missing VERCEL_DEPLOY_HOOK');
      return new Response(JSON.stringify({
        error: 'Configuration error: Deploy hook not found'
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK;
    console.log('Attempting to trigger deploy hook');

    const response = await fetch(deployHook, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Deploy hook failed with status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Deploy hook response:', result);

    return new Response(JSON.stringify({
      success: true,
      message: 'Deployment triggered'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error in rebuild endpoint:', error);
    return new Response(JSON.stringify({
      error: 'Failed to trigger deployment',
      details: error.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
