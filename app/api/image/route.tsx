import { OpenAI } from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Set the runtime to edge for best performance
export const runtime = 'edge';

export async function POST(req: Request) {
    const { image } = await req.json();

    // Ask OpenAI for a streaming image given the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        stream: true,
        max_tokens: 4096,
        messages: [
            {
                role: "user",
                content: [
                    { type: "text", text: "Analyse cette image. Répond en français." },
                    {
                        type: "image_url",
                        image_url: image,
                    },
                ],
            },
        ],
    });
    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}