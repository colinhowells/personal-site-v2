<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { getHash, getSchemaNodeId, serializeSchema } from '$lib/helpers';
	import resume from '$lib/resume.json';

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

	// thanks to  for assistance

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
			caption: 'Colin Howells'
		},
		publisher: { '@id': personNodeId }
	};
	schemaGraphObjects.push(WebSite);

	// person ------------------------------------------------------------------------------------

	let Person: Record<string, any> = {
		'@type': 'Person',
		'@id': personNodeId,
		name: resume.basics.name,
		givenName: 'Colin',
		familyName: 'Howells',
		nationality: 'US',
		image: avatarUrl,
		birthDate: '1971',
		birthPlace: 'Bloomington, IN',
		gender: 'http://schema.org/Male',
		url: resume.basics.website,
		email: resume.basics.email,
		address: {
			'@type': 'PostalAddress',
			// postalCode: resume.basics.location.postalCode,
			// streetAddress: resume.basics.location.address,
			addressLocality: resume.basics.location.city,
			addressRegion: resume.basics.location.region,
			addressCountry: resume.basics.location.countryCode
		},
		description: resume.basics.summary,
		sameAs: [] as Array<string>,
		knowsAbout: [] as Array<string>,
		hasCredential: [] as Array<Record<string, any>>,
		jobTitle: resume.basics.label,
		hasOccupation: [] as Array<Record<string, any>>
	};

	// socials -----------------------------------------------------------------------------------

	for (const profile of resume.basics.profiles) {
		Person.sameAs.push(profile.url);
	}

	// skills ------------------------------------------------------------------------------------

	Person.knowsAbout = [];
	for (const skill of resume.skills) {
		Person.knowsAbout = [...Person.knowsAbout, ...skill.keywords];
	}
	Person.knowsAbout[Person.knowsAbout.indexOf('jQuery')] = 'JQuery';
	Person.knowsAbout.sort();
	Person.knowsAbout[Person.knowsAbout.indexOf('JQuery')] = 'jQuery';

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
			startDate: '1989-09-09',
			endDate: '1993-05-09',
			provider: {
				'@type': 'CollegeOrUniversity',
				'@id': universityNodeId,
				name: 'University of Michigan',
				department: {
					'@type': 'Organization',
					'@id': universityNodeId + '/department',
					name: 'School of Art & Architecture (now Penny W. Stamps School of Art and Design)',
					url: 'https://stamps.umich.edu/'
				}
			}
		}
	};
	Person.hasCredential.push(EducationalOccupationalCredential);

	// companies, jobs ---------------------------------------------------------------------------

	let companies = new Set<string>();

	for (const [i, job] of resume.work.entries()) {
		const organizationNodeId = getSchemaNodeId('Organization', getHash(job.company));

		// first the company as an independent node in the graph, avoiding dupes …
		if (!companies.has(organizationNodeId)) {
			let Organization = {
				'@type': 'Organization',
				'@id': organizationNodeId,
				name: job.company,
				url: job.website,
				location: job.location
			};
			schemaGraphObjects.push(Organization);
			companies.add(organizationNodeId);
		}

		if (job.endDate) {
			// … then the (past) employee role, as a part of the Person …
			const EmployeeRole: Record<string, any> = {
				'@type': 'EmployeeRole',
				'@id': getSchemaNodeId('EmployeeRole', i + 1),
				owner: { '@id': organizationNodeId },
				roleName: job.position,
				description: job.summary,
				startDate: job.startDate,
				endDate: job.endDate
			};
			Person.hasOccupation.push(EmployeeRole);
		} else {
			// … or when employed, the current occupation
			const Occupation = {
				'@type': 'Occupation',
				'@id': getSchemaNodeId('Occupation'),
				name: job.position,
				description: job.summary,
				owner: { '@id': organizationNodeId }
			};
			Person.hasOccupation.push(Occupation);
			Person.worksFor = [{ '@id': organizationNodeId }];
		}
	}

	// render ------------------------------------------------------------------------------------

	schemaGraphObjects.push(Person);
</script>

<svelte:head>
	<meta name="author" content={resume.basics.name} />
	<meta property="fediverse:creator" content="@colin_howells@toot.cafe" />
	<link rel="me" href="https://toot.cafe/@colin_howells" />
	<link rel="me" href="https://bsky.app/profile/colinhowells.com" />
	<link rel="me" href="https://github.com/colinhowells" />
	<link rel="me" href="https://bandcamp.com/colinhowells" />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={resume.basics.name} />
	{@html serializeSchema(schemaGraphObjects)}
</svelte:head>
