// src/pages/api/rebuild.ts
export const prerender = false;

export async function POST() {
  // Log to help debug
  console.log('Rebuild endpoint hit');
  
  if (!import.meta.env.VERCEL_DEPLOY_HOOK) {
    console.error('Missing VERCEL_DEPLOY_HOOK environment variable');
    return new Response(JSON.stringify({
      error: 'Deploy hook not configured'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    console.log('Triggering deploy hook...');
    const response = await fetch(import.meta.env.VERCEL_DEPLOY_HOOK, {
      method: 'POST'
    });

    const responseText = await response.text();
    console.log('Deploy hook response:', response.status, responseText);

    if (!response.ok) {
      throw new Error(`Deploy failed with status: ${response.status}`);
    }

    return new Response(JSON.stringify({
      success: true,
      message: 'Build triggered successfully'
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Deploy error:', error);
    return new Response(JSON.stringify({
      error: error.message || 'Failed to trigger build'
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
