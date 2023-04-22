// import { createClient, type ClientConfig } from '@sanity/client';

// const config:ClientConfig = {
//   projectId: process.env.SANITY_PROJECT_ID,
//   dataset: process.env.SANITY_DATASET,
//   useCdn: false,
//   apiVersion: '2023-04-22',
//   token: process.env.SANITY_SECRET_TOKEN,
// };

// const client = createClient(config)

import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: '2023-04-22',
  token: process.env.SANITY_SECRET_TOKEN,
});
