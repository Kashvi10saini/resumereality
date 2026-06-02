import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Middleware for parsing JSON with a larger limit to handle base64 PDFs
app.use(express.json({ limit: "15mb" }));

// Lazy initializer for Gemini client to prevent crashing on server startup if keys are not configured yet
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environmental variable is required. Please check your secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API endpoint for scanning a resume
app.post("/api/scan", async (req, res): Promise<any> => {
  try {
    const { textContent, pdfBase64, filename, targetRole } = req.body;

    if (!textContent && !pdfBase64) {
      return res.status(400).json({
        error: "Please provide either typed/copied resume text content or a PDF document base64 payload."
      });
    }

    const ai = getGeminiClient();

    // Prepare content parts for Gemini
    const contents: any[] = [];

    const targetContext = targetRole 
      ? `Verify and score this candidate specifically against the criteria of being a high-level candidate for a "${targetRole}" role.` 
      : "Predict the candidate's most likely target role based on their text or default to Software Engineer if ambiguous, and evaluate them accordingly.";

    if (pdfBase64) {
      // Send the high-fidelity base64 PDF document straight to Gemini
      contents.push({
        inlineData: {
          mimeType: "application/pdf",
          data: pdfBase64,
        }
      });
      contents.push({
        text: `Analyze this uploaded resume document named "${filename || 'resume.pdf'}". ${targetContext} Examine its language, clarity of formatting, structure, use of generic buzzwords or placeholder AI fluff, presence of quantifiable key achievements, and general professional layout readability.`
      });
    } else {
      // Analyze text/typed content
      contents.push({
        text: `Analyze the following pasted resume content. ${targetContext} Perform a comprehensive review:\n\n${textContent}`
      });
    }

    // System instruction detailing the exact Recruiters / Roasters persona
    const systemInstruction = 
      "You are the ResumeReality AI Engine, a world-class executive recruiter and cynical talent advisor. " +
      "Your sole purpose is to evaluate resumes and highlight the 'reality' of their impact versus generic filler, AI-generated fluff, or exaggerated claims. " +
      "Tone guidelines:\n" +
      "- Witty, raw, highly direct, cynical, and authoritative. Speak like a hiring manager who reviews 500 documents a day.\n" +
      "- Flag and roast any fluff, buzzwords, or exaggerations (such as 'synergistic lead', 'highly motivated self-starter', 'passionate growth driver').\n" +
      "- Celebrate tangible, clear, high-contrast, quantifiable achievements (percentages, revenue, active code delivery).\n" +
      "Examine and calculate exactly 12 metrics: \n" +
      "1. Resume Reality Score (score) and shortlistProbability (integer 0-100)\n" +
      "2. Recruiter Psychology (flags and overall impression)\n" +
      "3. Proof-of-Skill Builder (projects, certificates matching gaps)\n" +
      "4. ATS + Human Score (evaluate ATS parsing versus raw human eye separately)\n" +
      "5. Gap Intelligence (what experiences, keywords, or tooling clusters are missing)\n" +
      "6. Career Roadmap (immediate 30-day, 60-day, and 90-day progress markers)\n" +
      "7. Suggested Revisions (Achievement Rewriter converting original weak bullet points to measurable assets)\n" +
      "8. Competitor Benchmarking (compare them against upper percentile applicants)\n" +
      "9. Interview Predictor (objections and probable recruiter friction points)\n" +
      "10. Experience Simulator (micro-tasks/problems they can solve right now to prove hands-on capability)\n" +
      "11. LinkedIn & Portfolio optimization details\n" +
      "12. Trust Layer (believability metrics validating if their bullets feel hyper-inflated or realistic).\n\n" +
      "Be highly objective and diagnostic. Provide exact structured feedback matching the requested schema.";

    // Define strict response schema matching our updated TypeScript types
    const scanResultSchema = {
      type: Type.OBJECT,
      properties: {
        score: {
          type: Type.INTEGER,
          description: "An overall reality quality score from 10 to 99 summarizing the resume's competitiveness."
        },
        overallComment: {
          type: Type.STRING,
          description: "A punchy, witty 1-2 sentence overall roaster verdict summarizing the candidate's core vibe."
        },
        targetRoleEstimated: {
          type: Type.STRING,
          description: "The estimated professional or target role being used as the benchmark."
        },
        shortlistProbability: {
          type: Type.INTEGER,
          description: "Estimates the likelihood of making the final shortlist, from 0 to 100."
        },
        scoringMatrix: {
          type: Type.OBJECT,
          properties: {
            believableScore: { 
              type: Type.INTEGER, 
              description: "Authenticity rating from 0 to 100 based on phrasing. Highly customized human wording gets high, templated AI filler gets very low." 
            },
            believableRating: { 
              type: Type.STRING, 
              description: "Witty status indicator matching the believableScore (e.g., '85% REAL', '40% BOT-LIKE', 'AI FLOODED')." 
            },
            competitiveScore: { 
              type: Type.INTEGER, 
              description: "Competitiveness in the modern market from 0 to 100 based on achievements or specific tech skills." 
            },
            competitiveRating: { 
              type: Type.STRING, 
              description: "A concise rating reflecting level of impact (e.g., 'TOP 15%', 'OUTSTANDER', 'AVERAGE BULLETS')." 
            },
            internReadyScore: { 
              type: Type.INTEGER, 
              description: "How ready they are for immediate enterprise placements from 0 to 100." 
            },
            internReadyRating: { 
              type: Type.STRING, 
              description: "Ready indicator (e.g., 'FAANG READY', 'UNREADY', 'MID-TIER ELITE', 'STUDENT PRO')." 
            },
            overstuffedScore: { 
              type: Type.INTEGER, 
              description: "Visual clutter, non-human padding, or keyword-stretching density from 0 to 100 (where low score means minimal risk)." 
            },
            overstuffedRating: { 
              type: Type.STRING, 
              description: "Risk indicator matching the padding/stuffing score (e.g., 'LOW RISK', 'AI OVERSTUFFED', 'BUZZWORD ACCUMULATION')." 
            }
          },
          required: [
            "believableScore", "believableRating",
            "competitiveScore", "competitiveRating",
            "internReadyScore", "internReadyRating",
            "overstuffedScore", "overstuffedRating"
          ]
        },
        critiques: {
          type: Type.ARRAY,
          description: "Precisely three distinct high-level critiques. Place one 'error' (warning/fluff), one 'success' (competitive edge), and one 'info' (layout structure advice).",
          items: {
            type: Type.OBJECT,
            properties: {
              type: { 
                type: Type.STRING, 
                description: "Must be exactly one of: 'error', 'success', 'info'." 
              },
              title: { 
                type: Type.STRING, 
                description: "Actionable, punchy label for the critique." 
              },
              description: { 
                type: Type.STRING, 
                description: "A precise, detailed 1-2 sentence breakdown explaining exactly where the issue lies and how to solve it." 
              }
            },
            required: ["type", "title", "description"]
          }
        },
        suggestedRevisions: {
          type: Type.ARRAY,
          description: "Up to 3 high-impact direct line rewrites from the resume. Identify exact weak, placeholder, or generic sentences/bullets.",
          items: {
            type: Type.OBJECT,
            properties: {
              original: { 
                type: Type.STRING, 
                description: "The original boring or generic line/phrase found in the content." 
              },
              suggested: { 
                type: Type.STRING, 
                description: "The redesigned high-impact line replacing generic phrasing with action-verbs or concrete placeholder numbers." 
              },
              reason: { 
                type: Type.STRING, 
                description: "Brief recruiter explanation of the scientific rationale behind this rewrite." 
              }
            },
            required: ["original", "suggested", "reason"]
          }
        },
        recruiterPsychology: {
          type: Type.OBJECT,
          properties: {
            overallImpression: {
              type: Type.STRING,
              description: "Recruiter psychology summary showing how you perceive their professional confidence and career direction."
            },
            flags: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  riskLevel: { type: Type.STRING, description: "Must be 'low', 'medium' or 'high'." },
                  label: { type: Type.STRING, description: "One of: Exaggerated, Generic Verbose, Weak Metrics, Template AI." },
                  explanation: { type: Type.STRING },
                  fixSuggestion: { type: Type.STRING }
                },
                required: ["section", "riskLevel", "label", "explanation", "fixSuggestion"]
              }
            }
          },
          required: ["overallImpression", "flags"]
        },
        proofOfSkillBuilder: {
          type: Type.ARRAY,
          description: "Up to 2 weak areas that require concrete proof of skill along with structural mini-projects or certifications.",
          items: {
            type: Type.OBJECT,
            properties: {
              weakSection: { type: Type.STRING, description: "Name of the weak section or skill gap." },
              recommendations: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    type: { type: Type.STRING, description: "Must be 'project', 'certification', 'simulation', or 'experience'." },
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    difficulty: { type: Type.STRING, description: "Must be 'Beginner', 'Intermediate', or 'Advanced'." },
                    timeToComplete: { type: Type.STRING },
                    deliverable: { type: Type.STRING }
                  },
                  required: ["type", "title", "description", "difficulty", "timeToComplete", "deliverable"]
                }
              }
            },
            required: ["weakSection", "recommendations"]
          }
        },
        atsAndHumanScore: {
          type: Type.OBJECT,
          properties: {
            atsScore: { type: Type.INTEGER, description: "Compatibility score with systems (0-100)" },
            atsFeedback: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            humanRecruiterScore: { type: Type.INTEGER, description: "Impression score with a human hiring manager (0-100)" },
            humanRecruiterFeedback: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["atsScore", "atsFeedback", "humanRecruiterScore", "humanRecruiterFeedback"]
        },
        gapIntelligence: {
          type: Type.OBJECT,
          properties: {
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            missingExperiencesOrProjects: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["missingSkills", "missingKeywords", "missingExperiencesOrProjects"]
        },
        careerRoadmap: {
          type: Type.OBJECT,
          properties: {
            thirtyDays: {
              type: Type.OBJECT,
              properties: {
                focus: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["focus", "tasks"]
            },
            sixtyDays: {
              type: Type.OBJECT,
              properties: {
                focus: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["focus", "tasks"]
            },
            ninetyDays: {
              type: Type.OBJECT,
              properties: {
                focus: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["focus", "tasks"]
            }
          },
          required: ["thirtyDays", "sixtyDays", "ninetyDays"]
        },
        competitorBenchmarking: {
          type: Type.OBJECT,
          properties: {
            percentile: { type: Type.INTEGER, description: "What percentile of applicants they fall in (e.g. 75)" },
            comparisonPoint: { type: Type.STRING, description: "Anchor comparison text (e.g., 'vs Entry-Level Core applicants')" },
            strengthsVsTopCandidates: { type: Type.ARRAY, items: { type: Type.STRING } },
            gapsVsTopCandidates: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["percentile", "comparisonPoint", "strengthsVsTopCandidates", "gapsVsTopCandidates"]
        },
        interviewPredictor: {
          type: Type.OBJECT,
          properties: {
            probabilityValue: { type: Type.INTEGER, description: "Likelihood of final interview selection (0-100)" },
            objections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  recruiterObjection: { type: Type.STRING },
                  tacticalResponse: { type: Type.STRING }
                },
                required: ["recruiterObjection", "tacticalResponse"]
              }
            },
            coreStrengthsTested: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["probabilityValue", "objections", "coreStrengthsTested"]
        },
        experienceSimulator: {
          type: Type.ARRAY,
          description: "Exactly two simulation task challenges the user can solve to demonstrate capability.",
          items: {
            type: Type.OBJECT,
            properties: {
              simulatedCompany: { type: Type.STRING },
              title: { type: Type.STRING },
              businessProblem: { type: Type.STRING },
              deliverables: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["simulatedCompany", "title", "businessProblem", "deliverables"]
          }
        },
        linkedInPortfolio: {
          type: Type.OBJECT,
          properties: {
            headlineSuggestion: { type: Type.STRING },
            aboutSectionSnippet: { type: Type.STRING },
            portfolioHighlightIdea: { type: Type.STRING }
          },
          required: ["headlineSuggestion", "aboutSectionSnippet", "portfolioHighlightIdea"]
        },
        trustLayer: {
          type: Type.OBJECT,
          properties: {
            believabilityScore: { type: Type.INTEGER, description: "Believability assessment from 0 to 100" },
            riskLevel: { type: Type.STRING, description: "Must be 'verifiable', 'exaggerated_risk', or 'unverifiable'." },
            critique: { type: Type.STRING }
          },
          required: ["believabilityScore", "riskLevel", "critique"]
        }
      },
      required: [
        "score", "overallComment", "targetRoleEstimated", "shortlistProbability", "scoringMatrix", 
        "critiques", "suggestedRevisions", "recruiterPsychology", "proofOfSkillBuilder", 
        "atsAndHumanScore", "gapIntelligence", "careerRoadmap", "competitorBenchmarking", 
        "interviewPredictor", "experienceSimulator", "linkedInPortfolio", "trustLayer"
      ]
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: scanResultSchema,
        temperature: 0.8,
      }
    });

    const outputText = response.text;
    if (!outputText) {
      throw new Error("Empty response received from the Gemini analysis backend.");
    }

    const scanResult = JSON.parse(outputText.trim());
    return res.json(scanResult);

  } catch (error: any) {
    console.error("Gemini Scanning Error:", error);
    return res.status(500).json({
      error: error.message || "Failed to analyze resume. Please review alignment requirements or try a different format."
    });
  }
});

// Configure Vite middleware in development or serve built files in production
async function mountServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`ResumeReality application running at http://localhost:${PORT}`);
  });
}

mountServer();
