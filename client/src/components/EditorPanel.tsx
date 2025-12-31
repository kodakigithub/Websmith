import { useState } from 'react'
import type { FileAction } from '../types'
import { buildFileTree } from '../utils/fileTree'
import type { FileNode } from '../utils/fileTree'

interface EditorPanelProps {
    files: FileAction[]
}

interface FileTreeNodeProps {
    node: FileNode
    depth?: number
    selectedFile: FileNode | null
    onSelectFile: (file: FileNode) => void
    expandedFolders: Set<string>
    toggleFolder: (path: string) => void
}

function FileTreeNode({ node, depth = 0, selectedFile, onSelectFile, expandedFolders, toggleFolder }: FileTreeNodeProps) {
    const isSelected = selectedFile?.path === node.path
    const isExpanded = expandedFolders.has(node.path)
    
    return (
        <div style={{ paddingLeft: `${depth * 12}px` }}>
            <div 
                style={{ 
                    cursor: 'pointer', 
                    padding: '2px 4px',
                    backgroundColor: isSelected ? '#094771' : 'transparent',
                    borderRadius: '2px',
                    color: '#e0e0e0'
                }}
                onClick={() => {
                    if (node.type === 'file') {
                        onSelectFile(node)
                    } else {
                        toggleFolder(node.path)
                    }
                }}
            >
                {node.type === 'folder' ? '📁' : '📄'} {node.name}
            </div>
            {node.type === 'folder' && isExpanded && node.children?.map((child, index) => (
                <FileTreeNode 
                    key={index} 
                    node={child} 
                    depth={depth + 1}
                    selectedFile={selectedFile}
                    onSelectFile={onSelectFile}
                    expandedFolders={expandedFolders}
                    toggleFolder={toggleFolder}
                />
            ))}
        </div>
    )
}

export function EditorPanel({ files }: EditorPanelProps) {
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set())
    const fileTree = buildFileTree(files)

    const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
        const next = new Set(prev)
        if (next.has(path)) {
            next.delete(path)  // collapse
        } else {
            next.add(path)     // expand
        }
        return next
    })
}

    return (
        <div style={{ width: '60%', display: 'flex', height: '100%' }}>
            {/* File Explorer - 20% */}
            <div style={{ 
                width: '20%', 
                borderRight: '1px solid #3a3a3a', 
                padding: '1rem', 
                overflowY: 'auto',
                backgroundColor: '#252526'
            }}>
                <h3>File Explorer</h3>
                {fileTree.map((node, index) => (
                    <FileTreeNode 
                        key={index} 
                        node={node}
                        selectedFile={selectedFile}
                        onSelectFile={setSelectedFile}
                        expandedFolders={expandedFolders}
                        toggleFolder={toggleFolder}
                    />
                ))}
            </div>

            {/* Code Block - 80% */}
            <div style={{ 
                width: '80%', 
                padding: '1rem', 
                overflowY: 'auto',
                backgroundColor: '#1e1e1e'
            }}>
                <h3>{selectedFile?.name}</h3>
                {selectedFile ? (
                    <pre style={{ 
                        background: '#2d2d2d', 
                        padding: '1rem', 
                        borderRadius: '4px', 
                        height: '100%', 
                        overflow: 'auto',
                        color: '#e0e0e0'
                    }}>
                        <code>{selectedFile.content}</code>
                    </pre>
                ) : (
                    <p style={{ color: '#808080' }}>Select a file to view its content.</p>
                )}
            </div>
        </div>
    )
}
