# n8n agent — Taxi Chomedey chat

Replaces the former **z-ai-web-dev-sdk** chat backend.

## What the Next.js app does

`POST /api/chat` sends:

```json
{
  "messages": [{ "role": "user", "content": "..." }, ...],
  "systemPrompt": "... full Taxi Chomedey prompt ..."
}
```

to `N8N_CHAT_WEBHOOK_URL` and expects:

```json
{ "response": "texte de l'assistant en français" }
```

Optional header: `X-Webhook-Secret` = `N8N_WEBHOOK_SECRET`.

## n8n workflow (build once)

1. **Webhook** (POST) — path e.g. `taxi-chat` — Respond: "Using Respond to Webhook node".
2. **(Optional) IF** — if `N8N_WEBHOOK_SECRET` is set, check `{{ $json.headers["x-webhook-secret"] }}`.
3. **HTTP Request** (or **OpenAI / DeepSeek / Anthropic** node)  
   - Model of your choice (DeepSeek is often cheap/free-tier friendly).  
   - Messages:
     - system: `{{ $json.body.systemPrompt }}`
     - then: `{{ $json.body.messages }}`
4. **Code** (optional) — extract assistant text into `response`.
5. **Respond to Webhook** — body:

```json
{ "response": "{{ $json.choices[0].message.content }}" }
```

(Adjust the expression to match your LLM node output.)

6. **Activate** the workflow and copy the **Production** webhook URL.

## Vercel / env

```
N8N_CHAT_WEBHOOK_URL=https://YOUR-N8N.host/webhook/taxi-chat
N8N_WEBHOOK_SECRET=optional-shared-secret
```

Remove any old `ZAI_*` variables.

## Local test

```bash
curl -X POST "$N8N_CHAT_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Bonjour"}],"systemPrompt":"Tu es l agent Taxi Chomedey."}'
```

You should get `{ "response": "..." }`.
