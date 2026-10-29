import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
export default [{ignores:['dist/**','.astro/**','node_modules/**','design/**']}, ...tseslint.configs.recommended, ...astro.configs.recommended, {files:['**/*.astro'],languageOptions:{parserOptions:{parser:tseslint.parser}}}];
