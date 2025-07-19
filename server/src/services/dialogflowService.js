import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';
import { SessionsClient } from '@google-cloud/dialogflow';
import CREDENTIALS_JSON from '../../credentials/dialogflow-key.json' assert { type: 'json' };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = CREDENTIALS_JSON.project_id;

const sessionClient = new SessionsClient({
  credentials: {
    private_key: CREDENTIALS_JSON.private_key,
    client_email: CREDENTIALS_JSON.client_email,
  },
});

export async function detectIntent(message, sessionId) {
  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'vi',
      },
    },
  };

  const [response] = await sessionClient.detectIntent(request);

  return response.queryResult;
}
