import type { BoltAction, ParsedArtifact } from '../types';

/**
 * Parses the boltArtifact XML from the LLM response
 * Extracts artifact metadata and all boltAction elements
 */
export function parseArtifact(response: string): ParsedArtifact | null {
    // Match the boltArtifact tag with its attributes
    const artifactMatch = response.match(/<boltArtifact\s+([^>]*)>([\s\S]*?)<\/boltArtifact>/);
    
    if (!artifactMatch) {
        console.warn('No boltArtifact found in response');
        return null;
    }

    const attributesStr = artifactMatch[1];
    const artifactContent = artifactMatch[2];

    // Extract id and title attributes
    const idMatch = attributesStr.match(/id="([^"]*)"/);
    const titleMatch = attributesStr.match(/title="([^"]*)"/);

    const id = idMatch ? idMatch[1] : '';
    const title = titleMatch ? titleMatch[1] : '';

    // Parse all boltAction elements
    const actions = parseActions(artifactContent);

    return {
        id,
        title,
        actions
    };
}

/**
 * Parses all boltAction elements from artifact content
 */
function parseActions(content: string): BoltAction[] {
    const actions: BoltAction[] = [];
    
    // Match all boltAction tags - handles both self-closing and content-containing tags
    const actionRegex = /<boltAction\s+([^>]*)>([\s\S]*?)<\/boltAction>/g;
    let match;

    while ((match = actionRegex.exec(content)) !== null) {
        const attributesStr = match[1];
        const actionContent = match[2];

        const typeMatch = attributesStr.match(/type="([^"]*)"/);
        const type = typeMatch ? typeMatch[1] : '';

        if (type === 'file') {
            const filePathMatch = attributesStr.match(/filePath="([^"]*)"/);
            const filePath = filePathMatch ? filePathMatch[1] : '';
            
            actions.push({
                type: 'file',
                filePath,
                content: actionContent.trim()
            });
        } else if (type === 'shell') {
            actions.push({
                type: 'shell',
                command: actionContent.trim()
            });
        }
    }

    return actions;
}

/**
 * Extracts the boltExplanation content from inside the artifact
 */
export function extractExplanation(response: string): string {
    const explanationMatch = response.match(/<boltExplanation>([\s\S]*?)<\/boltExplanation>/);
    if (!explanationMatch) {
        return '';
    }
    return explanationMatch[1].trim();
}
