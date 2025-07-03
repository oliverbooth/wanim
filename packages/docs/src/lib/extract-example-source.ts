export function extractExampleSource(code: string): string {
    return code.match(/class\s+(\w+)\s+extends\s+WanimScene\s*{([\s\S]*?)^}/m)?.[0] ?? "";
}
