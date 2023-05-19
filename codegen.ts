import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://graphql.anilist.co',
    documents: 'src/app/services/anilist/**/*.graphql',
    generates: {
        './src/app/services/anilist/generated-anilist.ts': {
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
