import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	ENVIRONMENT: { static: true },
	PUBLIC_SITE_URL: { public: true, static: true },
});
