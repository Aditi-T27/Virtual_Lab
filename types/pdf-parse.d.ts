declare module 'pdf-parse' {
  interface PDFInfo {
    numpages: number;
    numrender: number;
    info: Record<string, any>;
    metadata: any;
    version: string;
  }

  interface PDFText {
    text: string;
    info: PDFInfo;
    metadata: any;
  }

  function pdf(dataBuffer: Buffer | Uint8Array): Promise<PDFText>;

  export default pdf;
}
