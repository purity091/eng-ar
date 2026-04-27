import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
// Initialize AI client only if API key is present to prevent errors on load
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const getTutorResponse = async (
  query: string,
  educationalContext: string
): Promise<string> => {
  if (!apiKey) {
    return "مفتاح API مفقود. يرجى إعداد متغيرات البيئة.";
  }

  try {
    if (!ai) {
      return "لم يتم تكوين مفتاح API الخاص بالمعلم الذكي.";
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // Updated to a stable model name if preview is not desired
      contents: {
        parts: [{ text: query }]
      } as any, // Temporary fix for type mismatch if needed, or adjust based on SDK version
      config: {
        systemInstruction: {
          parts: [{
            text: `أنت معلم خاص خبير، مشجع، وصبور للطلاب في العالم العربي. 
            هدفك هو مساعدة الطلاب على فهم المواضيع المعقدة، حل المشكلات، والاستعداد للامتحانات.
            السياق التعليمي الحالي للطالب هو: ${educationalContext}.
            قدم شروحات واضحة ومبسطة خطوة بخطوة باللغة العربية.
            اجعل الإجابات موجزة ومناسبة للقراءة على شاشات الهاتف المحمول.
            استخدم لهجة ودودة ومشجعة.` }]
        },
      }
    });

    return response.text || "لم أتمكن من إنشاء رد في الوقت الحالي.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "عذراً، واجهت مشكلة أثناء محاولة المساعدة. يرجى المحاولة مرة أخرى لاحقاً.";
  }
};