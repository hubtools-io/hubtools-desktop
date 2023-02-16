// We know the files extension when loaded.
// This is our lookup table to map the file extension to language.
export const fileTypeLookup: Record<string, string> = {
    css: 'css',
    html: 'handlebars',
    js: 'javascript',
    json: 'json',
    md: 'markdown',
    mjs: 'javascript',
    php: 'php',
    sass: 'sass',
    scss: 'scss',
    ts: 'typescript',
    yml: 'yml',
};
