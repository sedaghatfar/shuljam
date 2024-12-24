// src/pages/api/rebuild.ts
export const prerender = false;

export async function POST({ request }) {
  if (!import.meta.env.VERCEL_DEPLOY_HOOK) {
    return new Response('Deploy hook not configured', { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(import.meta.env.VERCEL_DEPLOY_HOOK, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Deploy hook failed: ${response.status}`);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Build triggered successfully' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      success: false, 
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
