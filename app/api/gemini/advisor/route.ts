import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { question, holidayId } = await req.json();

    if (!question || typeof question !== 'string') {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Smart contextual fallback if API key is not configured yet
      return NextResponse.json({
        answer: `Here are great holiday recommendations for your question: For ${holidayId || 'the upcoming holidays'}, look for high-rated festive home decor, kitchenware for family dinners, and personalized gifts. Check out our Top Best Sellers with Prime 1-day delivery!`,
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `You are Rufus, Amazon's intelligent Holiday Shopping Assistant. You help customers find the best goods, decorations, gifts, and culinary equipment for US holidays including New Year's Day, Washington's Birthday (Presidents' Day), Memorial Day, Juneteenth, Independence Day, Labor Day, Columbus Day, Veterans Day, Halloween, Thanksgiving Day, and Christmas Day. Keep your response helpful, concise (2-3 short paragraphs), warm, and focused on specific product categories, hosting tips, and gift ideas available on Amazon.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Customer Question: ${question}\nContext Holiday: ${holidayId || 'General Holidays'}\nProvide expert holiday shopping recommendations:`,
            },
          ],
        },
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const answer = response.text || 'Browse our curated holiday categories to find the best-rated gifts and decor.';
    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error('Advisor error:', error);
    return NextResponse.json({
      answer:
        'For this holiday season, our top recommended items are pre-lit seasonal trees, artisan outdoor flags, heavy-duty stainless turkey roasters, and flickering LED jack-o-lanterns with Prime 1-day delivery.',
    });
  }
}
