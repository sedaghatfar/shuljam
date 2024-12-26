// src/pages/api/rebuild.ts
import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const deployHook = import.meta.env.VERCEL_DEPLOY_HOOK;
    
    if (!deployHook) {
      return new Response(JSON.stringify({ error: 'Deploy hook not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const response = await fetch(deployHook, {
      method: 'POST'
    });

    if (!response.ok) {
      throw new Error('Deploy hook failed');
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to trigger build' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
