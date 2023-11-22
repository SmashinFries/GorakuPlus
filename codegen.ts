import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co',
    documents: 'src/store/services/anilist/**/*.graphql',
    generates: {
        './src/store/services/anilist/generated-anilist.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                {
                    'typescript-rtk-query': {
                        importBaseApiFrom: './baseAnilist',
                        exportHooks: true,
                    },
                },
            ],
        },
    },
};
export default config;
