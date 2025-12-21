
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisInputs, AnalysisResult, InterviewQuestion } from "../types/index";

export const analyzeResume = async (inputs: AnalysisInputs): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
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

    INSTRUCTIONS:
    - Include 3 specific portfolio project ideas to bridge the missing critical skills.
    - Generate a high-conversion cold email and LinkedIn message with [GitHub Link] and [Resume Link] placeholders.
    - Provide a detailed ATS score and skill gap analysis.

    Provide analysis in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        required: ["atsScore", "skillsMatch", "pros", "cons", "improvements", "verdict", "emailTemplate", "linkedInTemplate", "recruiterTip", "projectSuggestions"],
        properties: {
          atsScore: {
            type: Type.OBJECT,
            required: ["score", "issues"],
            properties: {
              score: { type: Type.NUMBER },
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
                  properties: { old: { type: Type.STRING }, new: { type: Type.STRING } }
                }
              }
            }
          },
          verdict: {
            type: Type.OBJECT,
            required: ["status", "reasoning"],
            properties: {
              status: { type: Type.STRING },
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
          recruiterTip: { type: Type.STRING },
          projectSuggestions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              required: ["title", "description", "difficulty"],
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                difficulty: { type: Type.STRING }
              }
            }
          }
        }
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  const result = JSON.parse(text) as AnalysisResult;
  
  // Tag with metadata for history
  result.id = Math.random().toString(36).substring(2, 15);
  result.timestamp = Date.now();
  result.jobTitle = inputs.jobTitle;

  return result;
};

export const generateInterviewQuestions = async (result: AnalysisResult): Promise<InterviewQuestion[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Based on the following resume analysis for the role of ${result.jobTitle}, generate 5 challenging interview questions.
    Focus on:
    - Bridging the missing skills: ${result.skillsMatch.missingCritical.join(', ')}
    - Probing the strengths: ${result.pros.join(', ')}
    - Role-specific behavioral scenarios.

    Analysis Verdict: ${result.verdict.reasoning}

    Provide in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          required: ["question", "type", "idealAnswerPoints"],
          properties: {
            question: { type: Type.STRING },
            type: { type: Type.STRING },
            idealAnswerPoints: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    }
  });

  return JSON.parse(response.text || '[]') as InterviewQuestion[];
};
