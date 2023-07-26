export interface ISendMail {
  email: string;
  subject: string;
  message: string;
  messageType?: "text" | "html";
  otp?: string;
}

export interface IUploadFile {
  allowedFileTypes: string[];
  maxFileSize?: number;
  errorMessage?: string;
}
