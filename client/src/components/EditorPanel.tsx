import type { FileAction } from '../types'
import { buildFileTree } from '../utils/fileTree'
import type { FileNode } from '../utils/fileTree'

interface EditorPanelProps {
    files: FileAction[]
}

function FileTreeNode({ node, depth = 0 }: { node: FileNode; depth?: number }) {
    return (
        <div style={{ paddingLeft: `${depth * 12}px` }}>
            <div style={{ cursor: 'pointer', padding: '2px 0' }}>
                {node.type === 'folder' ? '📁' : '📄'} {node.name}
            </div>
            {node.children?.map((child, index) => (
                <FileTreeNode key={index} node={child} depth={depth + 1} />
            ))}
        </div>
    )
}

export function EditorPanel({ files }: EditorPanelProps) {
    const fileTree = buildFileTree(files)

    return (
        <div style={{ width: '60%', display: 'flex', height: '100%' }}>
            {/* File Explorer - 20% */}
            <div style={{ width: '20%', borderRight: '1px solid #ccc', padding: '1rem', overflowY: 'auto' }}>
                <h3>File Explorer</h3>
                {fileTree.map((node, index) => (
                    <FileTreeNode key={index} node={node} />
                ))}
            </div>

            {/* Code Block - 80% */}
            <div style={{ width: '80%', padding: '1rem', overflowY: 'auto' }}>
                <h3>Code</h3>
            </div>
        </div>
    )
}
