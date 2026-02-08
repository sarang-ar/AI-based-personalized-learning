
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK using only the environment variable as per strict guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getKnowledgeAssessment(subject: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate 5 high-quality multiple choice questions to assess a student's current knowledge in "${subject}". 
      The goal is to determine if they need fundamental or advanced instruction.
      Return JSON with an array of objects: { question: string, options: string[], correctAnswer: number }.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.NUMBER }
                }
              }
            }
          }
        }
      }
    });
    const text = response.text || '';
    return JSON.parse(text.trim());
  },

  async generatePersonalizedCourse(onboardingData: any, interest: string, assessmentScore: number) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Generate a dynamic 5-module course for "${interest}". 
      Student's initial Assessment Score: ${assessmentScore}/5. 
      Academic Level: ${onboardingData.academicLevel}. 
      Style: ${onboardingData.learningStyle}.
      Instructions:
      - If score < 3: Start with core concepts and definitions.
      - If score >= 3: Skip basics, focus on advanced architectures/logic.
      - Each module MUST include a 3-question quiz.
      - Last module MUST be a micro-project.
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            modules: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                  videoKeyword: { type: Type.STRING },
                  quiz: {
                    type: Type.OBJECT,
                    properties: {
                      questions: {
                        type: Type.ARRAY,
                        items: {
                          type: Type.OBJECT,
                          properties: {
                            question: { type: Type.STRING },
                            options: { type: Type.ARRAY, items: { type: Type.STRING } },
                            correctAnswer: { type: Type.NUMBER }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    const text = response.text || '';
    return JSON.parse(text.trim());
  },

  async analyzeOpportunity(opportunity: any, userSkills: string[]) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this opportunity: ${JSON.stringify(opportunity)}. User Skills: ${userSkills.join(', ')}. 
      Provide: 
      1. A 2-sentence summary.
      2. Missing skills.
      3. A recommended study focus to become 100% ready.
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            studyFocus: { type: Type.STRING }
          }
        }
      }
    });
    const text = response.text || '';
    return JSON.parse(text.trim());
  },

  async exploreTopic(topic: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Perform an industry-grade deep dive on "${topic}". 
      Provide:
      1. Core Sub-topics (Industry Standards).
      2. Top Globally Recognized Certifications.
      3. Precise Job Roles (India Context).
      Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subTopics: { type: Type.ARRAY, items: { type: Type.STRING } },
            certifications: { type: Type.ARRAY, items: { type: Type.STRING } },
            jobRoles: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    const text = response.text || '';
    return JSON.parse(text.trim());
  },

  async getCareerAdvice(profile: any, query: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `User: ${query}. Context: ${JSON.stringify(profile)}. Provide a highly organized India-specific career roadmap with:
      ## 🚀 Executive Summary
      ## 🗺️ Learning Phases (Months 1-6)
      ## 📜 Certification Path
      ## 💼 Target Companies in India
      Use Markdown and bold key terms.`,
    });
    return response.text || '';
  },

  async tutorChat(message: string, context: string) {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: message,
      config: {
        systemInstruction: `You are an elite academic tutor. 
        Your responses must be highly structured using hierarchal headers:
        - Use ## for main topics.
        - Use ### for sub-points.
        - Use bullet points for lists.
        - Be concise but academically rigorous.
        Context: ${context}.`
      }
    });
    return response.text || '';
  }
};
