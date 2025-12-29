import type { FileAction } from '../types';

export interface FileNode {
    name: string;
    type: 'file' | 'folder';
    children?: FileNode[];
    content?: string;
    path: string;
}

/**
 * Builds a tree structure from flat file paths
 */
export function buildFileTree(fileActions: FileAction[]): FileNode[] {
    const root: FileNode[] = [];

    for (const action of fileActions) {
        const parts = action.filePath.split('/');
        let currentLevel = root;

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            const isFile = i === parts.length - 1;
            const currentPath = parts.slice(0, i + 1).join('/');

            let existing = currentLevel.find(node => node.name === part);

            if (!existing) {
                const newNode: FileNode = {
                    name: part,
                    type: isFile ? 'file' : 'folder',
                    path: currentPath,
                    ...(isFile ? { content: action.content } : { children: [] })
                };
                currentLevel.push(newNode);
                existing = newNode;
            }

            if (!isFile && existing.children) {
                currentLevel = existing.children;
            }
        }
    }

    // Sort: folders first, then files, both alphabetically
    const sortNodes = (nodes: FileNode[]): FileNode[] => {
        return nodes.sort((a, b) => {
            if (a.type === b.type) return a.name.localeCompare(b.name);
            return a.type === 'folder' ? -1 : 1;
        }).map(node => {
            if (node.children) {
                node.children = sortNodes(node.children);
            }
            return node;
        });
    };

    return sortNodes(root);
}
