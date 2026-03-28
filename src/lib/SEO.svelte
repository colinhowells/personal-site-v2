<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { getSchemaNodeId, serializeSchema } from '$lib/helpers';

	// const avatarUrl = `${PUBLIC_SITE_URL}/images/colin-2023.jpg`;
	const avatarUrl = 'https://github.com/colinhowells.png';
	const personNodeId = getSchemaNodeId('Person');
	const siteNodeId = getSchemaNodeId('WebSite');
	const logoNodeId = getSchemaNodeId('ImageObject', 'logo');

	/**
	 * @see https://developer.yoast.com/features/schema/pieces/
	 * @see https://jsonldresume.github.io/lab-web/
	 */
	let schemaGraphObjects: SchemaGraphObjects = [];

	// site --------------------------------------------------------------------------------------

	const WebSite = {
		'@type': 'WebSite',
		'@id': siteNodeId,
		url: PUBLIC_SITE_URL,
		name: 'Colin Howells',
		description:
			'Personal website of Colin Howells, a web developer and designer living in Seattle',
		inLanguage: 'en-US',
		image: {
			'@type': 'ImageObject',
			'@id': logoNodeId,
			url: avatarUrl,
			contentUrl: avatarUrl,
			caption: 'Colin Howells',
		},
		publisher: { '@id': personNodeId },
	};
	schemaGraphObjects.push(WebSite);

	// person ------------------------------------------------------------------------------------

	let Person: Record<string, any> = {
		'@type': 'Person',
		'@id': personNodeId,
		name: 'Colin Glyn Howells',
		givenName: 'Colin',
		additionalName: 'Glyn',
		familyName: 'Howells',
		nationality: 'US',
		image: avatarUrl,
		gender: 'http://schema.org/Male',
		url: PUBLIC_SITE_URL,
		address: {
			'@type': 'PostalAddress',
			addressLocality: 'Seattle',
			addressRegion: 'Washington',
			addressCountry: 'US',
		},
		description:
			'Tenacious learner with 12 years of all-round design, web development, and engineering experience: creating branding, architecting back-end services, optimizing front-end performance, and improving user experiences.',
		sameAs: [
			'https://github.com/colinhowells',
			'https://www.linkedin.com/in/colinhowells',
			'https://sifa.id/p/colinhowells.com',
			'https://toot.cafe/@colin_howells',
			'https://bsky.app/profile/colinhowells.com',
		],
		hasCredential: [] as Array<Record<string, any>>,
		jobTitle: 'Senior Web Developer',
	};

	// education ---------------------------------------------------------------------------------

	const universityNodeId = getSchemaNodeId('CollegeOrUniversity');
	let EducationalOccupationalCredential = {
		'@type': 'EducationalOccupationalCredential',
		'@id': getSchemaNodeId('EducationalOccupationalCredential'),
		credentialCategory: 'degree',
		educationalLevel: 'Bachelor of Fine Arts',
		about: {
			'@type': 'EducationalOccupationalProgram',
			'@id': getSchemaNodeId('EducationalOccupationalProgram'),
			educationalCredentialAwarded: 'Graphic Design',
			provider: {
				'@type': 'CollegeOrUniversity',
				'@id': universityNodeId,
				name: 'University of Michigan',
				department: {
					'@type': 'Organization',
					'@id': universityNodeId + '/department',
					name: 'School of Art & Architecture (now Penny W. Stamps School of Art and Design)',
					url: 'https://stamps.umich.edu/',
				},
			},
		},
	};
	Person.hasCredential.push(EducationalOccupationalCredential);

	// render ------------------------------------------------------------------------------------

	schemaGraphObjects.push(Person);
</script>

<svelte:head>
	<meta name="author" content="Colin Howells" />
	<meta property="fediverse:creator" content="@colin_howells@toot.cafe" />
	<link rel="me" href="https://toot.cafe/@colin_howells" />
	<link rel="me" href="https://bsky.app/profile/colinhowells.com" />
	<link rel="me" href="https://sifa.id/p/colinhowells.com" />
	<link rel="me" href="https://github.com/colinhowells" />
	<link rel="me" href="https://bandcamp.com/colinhowells" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content="Colin Howells" />
	{@html serializeSchema(schemaGraphObjects)}
</svelte:head>
