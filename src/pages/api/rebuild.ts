// src/pages/api/rebuild.ts
export const prerender = false;

// Define the response type
type APIResponse = {
  json: () => Promise<Response>;
}

export async function POST(): Promise<Response> {
  try {
    if (!import.meta.env.VERCEL_DEPLOY_HOOK) {
      return new Response(
        JSON.stringify({
          error: 'Deploy hook not configured'
        }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const response = await fetch(import.meta.env.VERCEL_DEPLOY_HOOK, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`Deploy hook failed: ${response.status}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Build triggered successfully'
      }), 
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error'
      }), 
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
