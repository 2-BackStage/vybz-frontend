import { nextJsConfig } from '@repo/eslint-config/next-js';
import eslintPluginTurbo from 'eslint-plugin-turbo';

/** @type {import("eslint").Linter.Config} */
export default [
  ...nextJsConfig,
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      turbo: eslintPluginTurbo,
    },
    rules: {
      'turbo/no-undeclared-env-vars': [
        'error',
        {
          allowList: [
            'KAKAO_CLIENT_ID',
            'KAKAO_CLIENT_SECRET',
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'BASE_API_URL',
            'NEXTAUTH_URL',
            'AWS_REGION',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
            'AWS_S3_BUCKET_NAME',
            'ANALYZE',
            'NEXTAUTH_SECRET',
          ],
        },
      ],
    },
  },
];
