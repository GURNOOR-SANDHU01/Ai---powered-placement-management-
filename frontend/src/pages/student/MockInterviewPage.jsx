/*
  @author Gurnoor SINGH (102316101) 
*/
import { useState } from 'react';
import { Video, Mic, MessageSquare, PlayCircle, Settings, StopCircle, User, Loader2 } from 'lucide-react';
import api from '../../services/api';

const MockInterviewPage = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [topic, setTopic] = useState('React & JavaScript');
  const [difficulty, setDifficulty] = useState('Intermediate');
  
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [previousQuestions, setPreviousQuestions] = useState([]);
  
  const [answer, setAnswer] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);

  const startInterview = async () => {
    setIsStarted(true);
    await fetchNextQuestion();
  };

  const fetchNextQuestion = async () => {
    setLoadingQuestion(true);
    try {
      const { data } = await api.post('/ai/interview/question', {
        topic,
        difficulty,
        previousQuestions
      });
      setCurrentQuestion(data);
      setPreviousQuestions(prev => [...prev, data.question]);
      setAnswer('');
    } catch (error) {
      console.error('Error fetching question', error);
      alert('Error connecting to AI Interviewer.');
    } finally {
      setLoadingQuestion(false);
    }
  };

  const submitAnswer = async () => {
    if (!answer.trim() || !currentQuestion) return;
    
    setEvaluating(true);
    try {
      const { data } = await api.post('/ai/interview/evaluate', {
        question: currentQuestion.question,
        expectedConcepts: currentQuestion.expectedConcepts,
        answer
      });
      
      setFeedbackList(prev => [data, ...prev]);
      
      // Auto fetch next question after short delay
      setTimeout(() => {
        fetchNextQuestion();
      }, 3000);
      
    } catch (error) {
      console.error('Error evaluating answer', error);
    } finally {
      setEvaluating(false);
    }
  };

  const endInterview = () => {
    setIsStarted(false);
    setCurrentQuestion(null);
    setPreviousQuestions([]);
    setFeedbackList([]);
    setAnswer('');
  };

  return (
    <div className="space-y-6 flex flex-col h-full max-h-[calc(100vh-6rem)]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Mock Interview</h1>
        <p className="text-muted-foreground mt-1">Practice technical interviews with our advanced AI interviewer.</p>
      </div>

      {!isStarted ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-card rounded-2xl border border-border shadow-sm text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
            <Video size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Ready to practice?</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            The AI will ask you technical questions based on your selected topic, analyze your verbal and technical answers, and provide real-time feedback.
          </p>

          <div className="w-full max-w-sm space-y-4 mb-8 text-left">
            <div>
              <label className="block text-sm font-medium mb-1">Interview Topic</label>
              <select 
                className="w-full p-3 rounded-xl border border-border bg-background"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              >
                <option value="React & JavaScript">React & JavaScript</option>
                <option value="Java & Spring Boot">Java & Spring Boot</option>
                <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                <option value="System Design">System Design</option>
                <option value="HR & Behavioral">HR & Behavioral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Difficulty Level</label>
              <select 
                className="w-full p-3 rounded-xl border border-border bg-background"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          <button 
            onClick={startInterview}
            className="flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/30"
          >
            <PlayCircle size={24} />
            Start Mock Interview
          </button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col md:flex-row gap-6 h-[600px] overflow-hidden">
          {/* Main Video Area */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-black rounded-2xl overflow-hidden relative border border-border shadow-inner min-h-[300px]">
              {/* Dummy Video Feed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-secondary/20 border-4 border-secondary/50 flex items-center justify-center">
                  <User size={64} className="text-muted-foreground" />
                </div>
              </div>
              
              {/* Question Overlay */}
              <div className="absolute top-4 inset-x-4">
                <div className="bg-black/60 backdrop-blur-md text-white p-4 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2 text-primary/80 text-sm font-medium mb-2">
                    <MessageSquare size={16} /> AI Interviewer
                  </div>
                  {loadingQuestion ? (
                    <div className="flex items-center gap-2 text-lg font-medium text-white/70">
                      <Loader2 className="animate-spin" size={20} /> Generating next question...
                    </div>
                  ) : (
                    <p className="text-lg font-medium">"{currentQuestion?.question}"</p>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 inset-x-4 flex justify-center gap-4">
                <button className="w-14 h-14 rounded-full bg-secondary/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                  <Mic size={24} />
                </button>
                <button className="w-14 h-14 rounded-full bg-secondary/80 backdrop-blur-md flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                  <Video size={24} />
                </button>
                <button 
                  onClick={endInterview}
                  className="w-14 h-14 rounded-full bg-destructive flex items-center justify-center text-white hover:bg-destructive/90 transition-colors shadow-lg"
                  title="End Interview"
                >
                  <StopCircle size={24} />
                </button>
              </div>
            </div>
            
            {/* Transcript/Input */}
            <div className="h-48 bg-card rounded-2xl border border-border p-4 flex flex-col shrink-0">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Answer Transcript</span>
                <span className="text-xs text-green-500 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> Recording
                </span>
              </div>
              <textarea 
                className="flex-1 w-full bg-background border border-border rounded-lg p-3 resize-none focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="Start speaking, or type your answer here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={evaluating || loadingQuestion}
              ></textarea>
              <div className="flex justify-end mt-2">
                <button 
                  onClick={submitAnswer}
                  disabled={evaluating || loadingQuestion || !answer.trim()}
                  className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-70 flex items-center gap-2"
                >
                  {evaluating ? <><Loader2 size={16} className="animate-spin"/> Evaluating...</> : 'Submit Answer'}
                </button>
              </div>
            </div>
          </div>

          {/* Feedback Sidebar */}
          <div className="w-full md:w-80 bg-card rounded-2xl border border-border p-4 overflow-y-auto shrink-0">
            <h3 className="font-bold text-lg border-b border-border pb-3 mb-4 sticky top-0 bg-card z-10">Real-time Feedback</h3>
            
            <div className="space-y-4">
              {feedbackList.length === 0 && !evaluating && (
                <p className="text-sm text-muted-foreground text-center mt-8">Submit an answer to see feedback.</p>
              )}
              
              {feedbackList.map((feedback, idx) => (
                <div key={idx} className="space-y-3 pb-4 border-b border-border last:border-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold bg-secondary px-2 py-1 rounded">Score: {feedback.score}/10</span>
                    <span className="text-xs text-muted-foreground">{feedback.pacingTone}</span>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <p className="text-sm font-medium text-green-600 mb-1">What you did well</p>
                    <p className="text-xs text-foreground">{feedback.feedback}</p>
                  </div>
                  
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm font-medium text-amber-600 mb-1">Room for improvement</p>
                    <p className="text-xs text-foreground">{feedback.improvement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockInterviewPage;
