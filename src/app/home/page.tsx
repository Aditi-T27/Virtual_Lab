'use client';
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


// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export default function LaunchPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="flex items-center justify-between p-6">
//         <div className="flex items-center space-x-2">
//           <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//             <span className="text-white font-bold text-lg">IL</span>
//           </div>
//           <span className="text-xl font-bold text-gray-800">Intern Lab</span>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <main className="flex flex-col items-center justify-center px-6 py-20 text-center">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
//             Welcome to{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Intern Lab
//             </span>
//           </h1>

//           <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto">
//             Your AI-powered platform for resume analysis, mock interviews, and career guidance. Get ready to land your
//             dream internship!
//           </p>

//           {/* CTA Buttons */}
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link href="/auth/login">
//               <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700">
//                 Login
//               </Button>
//             </Link>
//             <Link href="/auth/signup">
//               <Button
//                 size="lg"
//                 variant="outline"
//                 className="w-full sm:w-auto px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
//               >
//                 Sign Up
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Animated Background Elements */}
//         <div className="absolute inset-0 -z-10 overflow-hidden">
//           <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
//           <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
//           <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse delay-500"></div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="absolute bottom-0 w-full p-6 text-center">
//         <p className="text-gray-500">Powered by Abhyudaya Softech</p>
//       </footer>
//     </div>
//   )
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LaunchPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-6 animate-slideDown">
        <div className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
            <span className="text-white font-bold text-lg">IL</span>
          </div>
          <span className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-blue-600">Intern Lab</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center px-6 py-20 text-center relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-fadeInUp">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-shift">
              Intern Lab
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fadeInUp animation-delay-300 opacity-0">
            Your AI-powered platform for resume analysis, mock interviews, and career guidance. Get ready to land your
            dream internship!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-600 opacity-0">
            <Link href="/auth/login">
              <Button 
                size="lg" 
                className="w-full sm:w-auto px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:-translate-y-1"
              >
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="w-full sm:w-auto px-8 py-4 text-lg bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 hover:-translate-y-1"
              >
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        {/* Enhanced Floating Elements */}
        <div className="absolute top-20 left-10 w-6 h-6 bg-blue-400 rounded-full opacity-60 animate-float"></div>
        <div className="absolute top-40 right-20 w-4 h-4 bg-purple-400 rounded-full opacity-60 animate-float animation-delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-8 h-8 bg-pink-300 rounded-full opacity-50 animate-float animation-delay-500"></div>
        <div className="absolute top-60 right-40 w-3 h-3 bg-blue-500 rounded-full opacity-70 animate-float animation-delay-2000"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200 rounded-full opacity-20 animate-pulse-slow animate-drift-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-200 rounded-full opacity-20 animate-pulse-slow animation-delay-1000 animate-drift-reverse"></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-pink-200 rounded-full opacity-20 animate-pulse-slow animation-delay-500 animate-drift-slow"></div>
        </div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 -z-20 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full p-6 text-center animate-slideUp">
        <p className="text-gray-500 transition-colors duration-300 hover:text-gray-700">
          Powered by Abhyudaya Softech
        </p>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes drift-slow {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(30px, -20px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes drift-reverse {
          0% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(-30px, 20px);
          }
          66% {
            transform: translate(20px, -20px);
          }
          100% {
            transform: translate(0px, 0px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slideDown {
          animation: slideDown 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.6s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-drift-slow {
          animation: drift-slow 20s ease-in-out infinite;
        }

        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease-in-out infinite;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-1000 {
          animation-delay: 1s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .opacity-0 {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
