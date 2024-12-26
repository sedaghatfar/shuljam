export const config = {
  runtime: 'nodejs18.x',
};

export default async function handler(req, res) {
  try {
    const deployHook = process.env.VERCEL_DEPLOY_HOOK;

    if (!deployHook) {
      console.error('Deploy hook not configured');
      return res.status(500).json({ error: 'Deploy hook not configured' });
    }

    console.log('Triggering deploy hook:', deployHook);

    const response = await fetch(deployHook, { method: 'POST' });

    if (!response.ok) {
      console.error('Deploy hook failed with status:', response.status);
      throw new Error(`Deploy hook failed with status: ${response.status}`);
    }

    console.log('Deploy hook triggered successfully');
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error triggering deploy hook:', error);
    return res.status(500).json({
      error: 'Failed to trigger build',
      details: error.message,
    });
  }
}
