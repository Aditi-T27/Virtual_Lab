'use client';
import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';

export default function UploadPage() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const{ resumeFile, setResumeFile }= useResumeStore();


  const handleAnalyze = async () => {

    if(!resumeFile){
      alert('Please upload a resume before analysing');
      return ;
    }
    setLoading(true);

    const formData =new FormData();
    formData.append('resume', resumeFile);
    const res= await fetch('api/users/parser', { method:'POST', body:formData});

    // const res = await fetch('/api/users/analyser', { method: 'POST' });
    const data = await res.json();
    setResult(data.answer);
    console.log(data.answer);
    setLoading(false);
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
        className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
      >
        {loading ? 'Analyzing...' : 'Analyze My Resume'}
      </button>

      {result && (
  <div className="mt-10 bg-[#334155] p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-blue-500 text-gray-200 space-y-6">
    
    <h2 className="text-2xl font-semibold text-blue-300">AI Feedback:</h2>

    <div className="space-y-4 leading-relaxed">
      
      <p><span className="font-semibold text-white">ATS Compatibility Score:</span> <span className="text-blue-400">35/100</span></p>

      <div>
        <h3 className="font-bold text-lg text-white mb-2">Strengths:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          <li><span className="font-semibold text-white">Core Skills Mentioned:</span> The resume lists some relevant technical skills (React, Node.js, Python, AI), though without much context.</li>
          <li><span className="font-semibold text-white">Experience Mentioned:</span> 3 years at XYZ Company is a good sign, but lacks details.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg text-white mb-2">Weaknesses:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-300">
          <li><span className="font-semibold text-white">No Quantifiable Achievements:</span> Needs measurable results and specific projects.</li>
          <li><span className="font-semibold text-white">Vague Skills:</span> Skills are listed without examples or depth.</li>
          <li><span className="font-semibold text-white">Missing Keywords:</span> Lacks industry-specific terms for ATS.</li>
          <li><span className="font-semibold text-white">No Project Details:</span> Projects missing completely.</li>
          <li><span className="font-semibold text-white">Missing Contact Info:</span> No phone number, limited recruiter access.</li>
          <li><span className="font-semibold text-white">Poor Formatting:</span> Resume likely not ATS-friendly visually.</li>
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg text-white mb-2">Suggested Job Roles:</h3>
        <ol className="list-decimal list-inside space-y-1 text-gray-300">
          <li>Junior Frontend Developer</li>
          <li>Junior Backend Developer</li>
          <li>Data Scientist (Entry Level)</li>
        </ol>
      </div>

      <div>
        <h3 className="font-bold text-lg text-white mb-2">Recommendation:</h3>
        <p className="text-gray-300">
          Rewrite the resume with quantifiable results, project details, keyword optimization, proper formatting, and complete contact info (phone, LinkedIn).
        </p>
      </div>
    </div>

  </div>
)}

    </div>
  );
}
