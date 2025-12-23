export enum StepType {
  CreateFile = 'file',
  RunScript = 'shell'
}

export interface Step {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'done';
  type: StepType;
  filePath?: string;
  code?: string;
}

export interface TemplateResponse {
  prompts: string[];
  uiPrompts: string[];
}

