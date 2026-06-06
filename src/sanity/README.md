# Sanity Studio — setup

The site ships with a local data layer (`src/lib/data`) that mirrors the
Sanity schema shapes exactly. To switch to a live CMS:

1. Install packages:

   ```bash
   npm i sanity next-sanity @sanity/vision @sanity/image-url
   ```

2. Set env vars in `.env.local`:

   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token
   ```

3. Wrap each object in `src/sanity/schema.ts` with `defineType` from `sanity`.

4. Create `sanity.config.ts` at the repo root importing `schemaTypes`.

5. Replace `src/app/studio/page.tsx` with the embedded Studio at
   `src/app/studio/[[...tool]]/page.tsx`:

   ```tsx
   "use client";
   import { NextStudio } from "next-sanity/studio";
   import config from "../../../../sanity.config";
   export default function StudioPage() {
     return <NextStudio config={config} />;
   }
   ```

6. Implement GROQ-backed versions of the accessors in `src/lib/data/index.ts`,
   guarded by `isSanityConfigured()` from `src/lib/integrations/sanity.ts`.
   Page components never change — they only import from the data layer.
