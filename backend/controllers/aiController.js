/*
  @author Gurnoor SINGH (102316101) 
*/
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import Job from '../models/Job.js';
import StudentProfile from '../models/StudentProfile.js';
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Resume Analysis
export const analyzeResume = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    if (!resumeText) {
      return res.status(400).json({ message: 'Resume text is required for analysis' });
    }

    const prompt = `
      You are an expert ATS (Applicant Tracking System) analyzer. 
      Review the following resume text against the provided job description (if any).
      
      Resume:
      ${resumeText}

      Job Description:
      ${jobDescription || 'General Software Engineering Role'}

      Provide your analysis in JSON format with exactly these fields:
      - atsScore: A number from 0 to 100 representing the match/quality.
      - feedback: A short string (1-2 sentences) summarizing the resume's strength.
      - missingSkills: An array of strings representing key skills missing from the resume.
      - formatting: A string indicating formatting issues (if discernible) or 'Good'.
      
      Do NOT wrap the output in markdown code blocks like \`\`\`json. Return pure JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);

    res.status(200).json(resultJson);
  } catch (error) {
    console.error('Error analyzing resume:', error);
    res.status(500).json({ message: 'Error analyzing resume with AI' });
  }
};

// Candidate Match for Recruiters
export const matchCandidateToJob = async (req, res) => {
  try {
    const { jobId, candidateId } = req.body;
    
    const jobDetails = await Job.findById(jobId);
    const candidateProfile = await StudentProfile.findOne({ user: candidateId });

    if (!jobDetails || !candidateProfile) {
        return res.status(404).json({ message: 'Job or Candidate Profile not found' });
    }
    
    const prompt = `
      You are an expert IT technical recruiter. Compare the candidate's profile to the job details.
      
      Candidate Profile:
      ${JSON.stringify(candidateProfile)}

      Job Details:
      ${JSON.stringify(jobDetails)}

      Provide a JSON response with:
      - matchScore: Number (0-100) representing overall compatibility.
      - skillMatch: Number (0-100).
      - experienceMatch: Number (0-100).
      - summary: A 2-sentence summary of why this candidate is or isn't a good fit.
      
      Do NOT wrap the output in markdown code blocks like \`\`\`json. Return pure JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);

    res.status(200).json(resultJson);
  } catch (error) {
    console.error('Error matching candidate:', error);
    res.status(500).json({ message: 'Error performing AI match' });
  }
};

// Mock Interview Question Generation
export const generateInterviewQuestion = async (req, res) => {
  try {
    const { topic, difficulty, previousQuestions } = req.body;

    const prompt = `
      You are a strict but fair technical interviewer for a software company.
      The candidate wants to practice an interview on the topic of "${topic}" at a "${difficulty}" difficulty level.
      
      Here are the questions you have already asked them (so do not repeat them):
      ${previousQuestions ? JSON.stringify(previousQuestions) : 'None'}

      Generate exactly ONE technical interview question for them to answer next.
      Return a JSON object with:
      - question: The interview question string.
      - expectedConcepts: An array of strings representing concepts the candidate should mention to get full marks.
      
      Do NOT wrap the output in markdown code blocks like \`\`\`json. Return pure JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);

    res.status(200).json(resultJson);
  } catch (error) {
    console.error('Error generating question:', error);
    res.status(500).json({ message: 'Error generating mock interview question' });
  }
};

// Mock Interview Answer Evaluation
export const evaluateInterviewAnswer = async (req, res) => {
  try {
    const { question, answer, expectedConcepts } = req.body;

    const prompt = `
      You are a technical interviewer evaluating a candidate's answer.
      
      Question: ${question}
      Candidate's Answer: ${answer}
      Expected Concepts to Cover: ${JSON.stringify(expectedConcepts)}

      Evaluate the candidate's answer. Return a JSON object with:
      - score: Number (0-10) indicating the quality of the answer.
      - feedback: A brief encouraging message pointing out what they did well.
      - improvement: A brief message pointing out what they missed or got wrong.
      - pacingTone: A string evaluating how confident they sounded based on the text.
      
      Do NOT wrap the output in markdown code blocks like \`\`\`json. Return pure JSON only.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text;
    const resultJson = JSON.parse(resultText);

    res.status(200).json(resultJson);
  } catch (error) {
    console.error('Error evaluating answer:', error);
    res.status(500).json({ message: 'Error evaluating mock interview answer' });
  }
};
