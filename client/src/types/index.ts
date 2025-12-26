export type ExpectedTemplateResponse = {
    prompts: string[];
    uiPrompts: string[];
}

export type TemplateErrorResponse = {
    msg: string;
}

export type TemplateResponse = ExpectedTemplateResponse | TemplateErrorResponse;

// Chat endpoint types
export interface FileAction {
    type: 'file';
    filePath: string;
    content: string;
}

export interface ShellAction {
    type: 'shell';
    command: string;
}

export type BoltAction = FileAction | ShellAction;

export interface ParsedArtifact {
    id: string;
    title: string;
    actions: BoltAction[];
}

export interface ChatResponse {
    response: string;
}