// 'use client';
// import { useState } from 'react';
// import { useResumeStore } from '../store/resumeStore';

// type AnalysisResult = {
//   score?: string | number;
//   strengths?: string[];
//   weaknesses?: string[];
//   suggestedRoles?: string[];
//   recommendation?: string;
// };

// export default function UploadPage() {
//   const [result, setResult] = useState<AnalysisResult | null>(null);
//   const [loading, setLoading] = useState(false);
//   const{ resumeFile, setResumeFile }= useResumeStore();
//   const [error, setError] = useState('');

//   const handleAnalyze = async () => {
//     if(!resumeFile){
//       alert('Please upload a resume before analysing');
//       return ;
//     }
//     setLoading(true);
//     setError('');

//     const formData =new FormData();
//     formData.append('resume', resumeFile);

//     try {
//       const res = await fetch('/api/users/parser', { method: 'POST', body: formData });
//       const data = await res.json();

//       if (res.ok && data.answer) {
//         setResult(data.answer);
//       } else {
//         setError('Failed to get valid AI feedback. Please try again.');
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e293b] text-white">
//       <h1 className="text-4xl font-bold mb-6 tracking-wide text-white">Resume Analyzer AI</h1>
      
//       {/* File Upload */}
//       <input type="file" accept=".pdf" onChange={(e) => {
//           if (e.target.files && e.target.files[0]) {
//             setResumeFile(e.target.files[0]);
//           }
//         }} className="mb-4"
//       />

//       {/* Analyze Button */}
//       <button
//         onClick={handleAnalyze}
//         disabled={loading}
//         className={`bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 ${
//           loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
//         }`}
//       >
//         {loading ? 'Analyzing...' : 'Analyze My Resume'}
//       </button>

//       {error && (
//         <p className="mt-6 text-red-400 text-center max-w-md">{error}</p>
//       )}

//       {result && (
//         <div className="mt-10 bg-[#334155] p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-blue-500 text-gray-200 space-y-6">
//           <h2 className="text-2xl font-semibold text-blue-300">AI Feedback</h2>

//           <p>
//             <span className="font-semibold text-white">ATS Compatibility Score:</span>{' '}
//             <span className="text-blue-400">{result.score || 'N/A'}</span>
//           </p>

//           <FeedbackSection title="Strengths" items={result.strengths} />
//           <FeedbackSection title="Weaknesses" items={result.weaknesses} />
//           <FeedbackSection title="Suggested Job Roles" items={result.suggestedRoles} ordered />
          
//           {result.recommendation && (
//             <div>
//               <h3 className="font-bold text-lg text-white mb-2">Recommendation</h3>
//               <p className="text-gray-300">{result.recommendation}</p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// interface FeedbackSectionProps {
//   title: string;
//   items?: string[];
//   ordered?: boolean;
// }

// function FeedbackSection({ title, items, ordered = false }: FeedbackSectionProps) {
//   if (!items || items.length === 0) return null;

//   const ListTag = ordered ? 'ol' : 'ul';
//   const listStyles = ordered ? 'list-decimal' : 'list-disc';

//   return (
//     <div>
//       <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
//       <ListTag className={`${listStyles} list-inside space-y-1 text-gray-300`}>
//         {items.map((item: string, index: number) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ListTag>
//     </div>
//   );
// }



'use client';
import { useState } from 'react';
import { useResumeStore } from '../store/resumeStore';
import { MessageCircle } from 'lucide-react';

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
  const [chatOpen, setChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [userInput, setUserInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [error, setError] = useState('');

  const { resumeFile, setResumeFile } = useResumeStore();

  const handleAnalyze = async () => {
    if (!resumeFile) {
      alert('Please upload a resume before analysing');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('resume', resumeFile);

    try {
      const res = await fetch('/api/users/parser', {
        method: 'POST',
        body: formData,
      });

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

  const handleAskQuestion = async () => {
    if (!userInput.trim()) return;

    const newHistory = [...chatHistory, `🧑: ${userInput}`];
    setChatHistory(newHistory);
    setUserInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/users/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userInput }),
      });

      const data = await res.json();
      const aiReply = data.answer || 'Sorry, I could not understand that.';

      setChatHistory((prev) => [...prev, `🤖: ${aiReply}`]);
    } catch (err) {
      console.error(err);
      setChatHistory((prev) => [...prev, `🤖: Failed to fetch response.`]);
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-[#1e293b] text-white relative">
      <h1 className="text-4xl font-bold mb-6 tracking-wide text-white">Resume Analyzer AI</h1>

      {/* File Upload */}
      <input
        type="file"
        accept=".pdf"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setResumeFile(e.target.files[0]);
          }
        }}
        className="mb-4"
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

      {error && <p className="mt-6 text-red-400 text-center max-w-md">{error}</p>}

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

      {/* Chat Icon (Floating) */}
      <button
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-4 rounded-full shadow-lg z-50"
        onClick={() => setChatOpen((prev) => !prev)}
      >
        <MessageCircle className="text-white w-6 h-6" />
      </button>

      {/* Chat Modal */}
   {chatOpen && (
  <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white text-black rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-300">
    
    {/* Chat Header */}
    <div className="p-4 bg-blue-700 text-white font-semibold text-lg">
      Resume Chat Assistant
    </div>

    {/* Chat Messages Area */}
    <div
      className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50 scroll-smooth"
      id="chatBox"
    >
      {chatHistory.map((msg, idx) => {
        const isUser = msg.startsWith("🧑:");
        const message = msg.replace(/^🧑:\s?|^🤖:\s?/, '');
        return (
          <div
            key={idx}
            className={`max-w-[80%] px-4 py-2 rounded-xl text-sm shadow ${
              isUser
                ? 'ml-auto bg-blue-600 text-white rounded-br-none'
                : 'mr-auto bg-gray-200 text-gray-800 rounded-bl-none'
            }`}
          >
            {message}
          </div>
        );
      })}
    </div>

    {/* Chat Input Area */}
    <div className="p-3 border-t bg-white flex gap-2">
      <input
        type="text"
        placeholder="Ask about your resume..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
        className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleAskQuestion}
        disabled={chatLoading}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition"
      >
        {chatLoading ? '...' : 'Ask'}
      </button>
    </div>
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
