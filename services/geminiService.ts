
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisInputs, AnalysisResult } from "../types";

export const analyzeResume = async (inputs: AnalysisInputs): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });
  
  const prompt = `
    Analyze the following resume for the target job role and job description.
    
    RESUME:
    ${inputs.resumeText}

    TARGET JOB ROLE:
    ${inputs.jobTitle}

    JOB DESCRIPTION:
    ${inputs.jobDescription}

    CANDIDATE EXPERIENCE LEVEL:
    ${inputs.experienceLevel}

    Provide a highly detailed analysis in JSON format following the requested structure.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["atsScore", "skillsMatch", "pros", "cons", "improvements", "verdict", "emailTemplate", "linkedInTemplate", "recruiterTip"],
        properties: {
          atsScore: {
            type: Type.OBJECT,
            required: ["score", "issues"],
            properties: {
              score: { type: Type.NUMBER, description: "Estimated ATS compatibility score 0-100" },
              issues: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          skillsMatch: {
            type: Type.OBJECT,
            required: ["matched", "missingCritical", "missingNiceToHave"],
            properties: {
              matched: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingCritical: { type: Type.ARRAY, items: { type: Type.STRING } },
              missingNiceToHave: { type: Type.ARRAY, items: { type: Type.STRING } }
            }
          },
          pros: { type: Type.ARRAY, items: { type: Type.STRING } },
          cons: { type: Type.ARRAY, items: { type: Type.STRING } },
          improvements: {
            type: Type.OBJECT,
            required: ["sectionWise", "keywords", "bulletRewrites"],
            properties: {
              sectionWise: { type: Type.ARRAY, items: { type: Type.STRING } },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } },
              bulletRewrites: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  required: ["old", "new"],
                  properties: {
                    old: { type: Type.STRING },
                    new: { type: Type.STRING }
                  }
                }
              }
            }
          },
          verdict: {
            type: Type.OBJECT,
            required: ["status", "reasoning"],
            properties: {
              status: { type: Type.STRING, description: "Hire / Borderline / Not Ready" },
              reasoning: { type: Type.STRING }
            }
          },
          emailTemplate: {
            type: Type.OBJECT,
            required: ["subject", "body", "cta"],
            properties: {
              subject: { type: Type.STRING },
              body: { type: Type.STRING },
              cta: { type: Type.STRING }
            }
          },
          linkedInTemplate: {
            type: Type.OBJECT,
            required: ["connectionRequest", "followUp"],
            properties: {
              connectionRequest: { type: Type.STRING },
              followUp: { type: Type.STRING }
            }
          },
          recruiterTip: { type: Type.STRING }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as AnalysisResult;
};
