import * as dotenv from 'dotenv';
import { getTdjson } from 'prebuilt-tdlib';
import { configure } from 'tdl';

// Load environment variables from .env file
dotenv.config();

// Validate required environment variables
const requiredEnvVars = ['TELEGRAM_API_ID', 'TELEGRAM_API_HASH', 'TELEGRAM_PHONE_NUMBER'];
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Export environment variables for use in other files
export const TELEGRAM_CONFIG = {
  apiId: parseInt(process.env.TELEGRAM_API_ID!, 10),
  apiHash: process.env.TELEGRAM_API_HASH!,
  phoneNumber: process.env.TELEGRAM_PHONE_NUMBER!,
};

// Configure tdl to use the prebuilt TDLib binary
configure({
  tdjson: getTdjson(),
  verbosityLevel: 2, // Set logging verbosity
});
