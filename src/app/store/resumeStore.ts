// store/resumeStore.ts
import { create } from 'zustand';

interface ResumeState {
    resumeFile: File | null;
    setResumeFile: (file: File | null) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
    resumeFile: null,
    setResumeFile: (file) => set({ resumeFile : file}),
}));
