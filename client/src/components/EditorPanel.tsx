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
}

function FileTreeNode({ node, depth = 0, selectedFile, onSelectFile }: FileTreeNodeProps) {
    const isSelected = selectedFile?.path === node.path
    
    return (
        <div style={{ paddingLeft: `${depth * 12}px` }}>
            <div 
                style={{ 
                    cursor: 'pointer', 
                    padding: '2px 4px',
                    backgroundColor: isSelected ? '#e0e0e0' : 'transparent',
                    borderRadius: '2px'
                }}
                onClick={() => {
                    if (node.type === 'file') {
                        onSelectFile(node)
                    }
                }}
            >
                {node.type === 'folder' ? '📁' : '📄'} {node.name}
            </div>
            {node.children?.map((child, index) => (
                <FileTreeNode 
                    key={index} 
                    node={child} 
                    depth={depth + 1}
                    selectedFile={selectedFile}
                    onSelectFile={onSelectFile}
                />
            ))}
        </div>
    )
}

export function EditorPanel({ files }: EditorPanelProps) {
    const [selectedFile, setSelectedFile] = useState<FileNode | null>(null)
    const fileTree = buildFileTree(files)

    return (
        <div style={{ width: '60%', display: 'flex', height: '100%' }}>
            {/* File Explorer - 20% */}
            <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '1rem', overflowY: 'auto' }}>
                <h3>File Explorer</h3>
                {fileTree.map((node, index) => (
                    <FileTreeNode 
                        key={index} 
                        node={node}
                        selectedFile={selectedFile}
                        onSelectFile={setSelectedFile}
                    />
                ))}
            </div>

            {/* Code Block - 80% */}
            <div style={{ width: '80%', padding: '1rem', overflowY: 'auto' }}>
                <h3>Code</h3>
                {selectedFile ? (
                    <pre style={{ background: '#f5f5f5', padding: '1rem', borderRadius: '4px', height: '100%', overflow: 'auto' }}>
                        <code>{selectedFile.content}</code>
                    </pre>
                ) : (
                    <p>Select a file to view its content.</p>
                )}
            </div>
        </div>
    )
}
