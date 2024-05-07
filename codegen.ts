import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8085/graphql',
  documents: './src/**/*.graphql',
  generates: {
    'src/gql/types.ts': {
      plugins: ['typescript'],
      presetConfig: {
        baseTypesPath: '/src/gql/types.ts',
        extension: '.ts',
      },
    },
    src: {
      preset: 'near-operation-file',
      plugins: ['typescript-operations', 'typed-document-node'],
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '/gql/types.ts',
      },
    },
  },
}
export default config
