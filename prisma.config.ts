import 'dotenv/config'; // Make sure to load your .env file
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'), // Use the DATABASE_URL environment variable
  },
});
