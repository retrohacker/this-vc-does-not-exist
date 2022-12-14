/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import { ChatGPTAPI } from "chatgpt";

export interface Env {
  SESSION_KEY: string;
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const api = new ChatGPTAPI({
      sessionToken: env.SESSION_KEY,
      markdown: false,
    });
    await api.ensureAuth();
    const message = await request.text();
    const prompt =
      "How would you word this if you were talking to a silicon valley venture capitalist: \n\n" +
      message;
    const resp = await api.sendMessage(prompt);
    return new Response(resp);
  },
};
