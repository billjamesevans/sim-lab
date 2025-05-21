import os
import openai

# Simple example using the OpenAI Python library
# Ensure OPENAI_API_KEY is set in your environment
api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise SystemExit("OPENAI_API_KEY environment variable not set")

openai_client = openai.OpenAI(api_key=api_key)

response = openai_client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)

print(response.choices[0].message.content)
