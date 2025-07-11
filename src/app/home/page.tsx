'use client';
import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

type AnalysisResult = {
  score?: string | number;
  strengths?: string[];
  weaknesses?: string[];
  suggestedRoles?: string[];
  recommendation?: string;
};

export default function UploadPage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const{ resumeFile, setResumeFile }= useResumeStore();
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if(!resumeFile){
      alert('Please upload a resume before analysing');
      return ;
    }
    setLoading(true);
    setError('');

    const formData =new FormData();
    formData.append('resume', resumeFile);

    try {
      const res = await fetch('/api/users/parser', { method: 'POST', body: formData });
      const data = await res.json();

      if (res.ok && data.answer) {
        setResult(data.answer);
      } else {
        setError('Failed to get valid AI feedback. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e293b] text-white">
      <h1 className="text-4xl font-bold mb-6 tracking-wide text-white">Resume Analyzer AI</h1>
      
      {/* File Upload */}
      <input type="file" accept=".pdf" onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
          }
        }} className="mb-4"
      />

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className={`bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
        }`}
      >
        {loading ? 'Analyzing...' : 'Analyze My Resume'}
      </button>

      {error && (
        <p className="mt-6 text-red-400 text-center max-w-md">{error}</p>
      )}

      {result && (
        <div className="mt-10 bg-[#334155] p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-blue-500 text-gray-200 space-y-6">
          <h2 className="text-2xl font-semibold text-blue-300">AI Feedback</h2>

          <p>
            <span className="font-semibold text-white">ATS Compatibility Score:</span>{' '}
            <span className="text-blue-400">{result.score || 'N/A'}</span>
          </p>

          <FeedbackSection title="Strengths" items={result.strengths} />
          <FeedbackSection title="Weaknesses" items={result.weaknesses} />
          <FeedbackSection title="Suggested Job Roles" items={result.suggestedRoles} ordered />
          
          {result.recommendation && (
            <div>
              <h3 className="font-bold text-lg text-white mb-2">Recommendation</h3>
              <p className="text-gray-300">{result.recommendation}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface FeedbackSectionProps {
  title: string;
  items?: string[];
  ordered?: boolean;
}

function FeedbackSection({ title, items, ordered = false }: FeedbackSectionProps) {
  if (!items || items.length === 0) return null;

  const ListTag = ordered ? 'ol' : 'ul';
  const listStyles = ordered ? 'list-decimal' : 'list-disc';

  return (
    <div>
      <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
      <ListTag className={`${listStyles} list-inside space-y-1 text-gray-300`}>
        {items.map((item: string, index: number) => (
          <li key={index}>{item}</li>
        ))}
      </ListTag>
    </div>
  );
}