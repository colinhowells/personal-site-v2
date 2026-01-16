<script lang="ts">
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { serializeSchema } from '$lib/helpers';
	import resume from '$lib/resume.json';

	// const avatarUrl = `${PUBLIC_SITE_URL}/images/colin-2023.jpg`;
	const avatarUrl = 'https://github.com/colinhowells.png';
	const educationNodeId = `${PUBLIC_SITE_URL}/#education`;
	const personNodeId = `${PUBLIC_SITE_URL}/#person`;
	const siteNodeId = `${PUBLIC_SITE_URL}/#website`;

	let schemaGraphObjects: SchemaGraphObjects = [];

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
			'@id': `${PUBLIC_SITE_URL}/#logo`,
			url: avatarUrl,
			contentUrl: avatarUrl,
			caption: 'Colin Howells'
		},
		publisher: { '@id': personNodeId }
	};
	schemaGraphObjects.push(WebSite);

	let Person = {
		'@type': 'Person',
		'@id': personNodeId,
		subjectOf: { '@id': siteNodeId },
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
		jobTitle: resume.basics.label,
		worksFor: [] as Array<{ '@id': string }>,
		alumniOf: { '@id': educationNodeId },
		knowsAbout: [] as Array<string>
	};
	for (let profile of resume.basics.profiles) {
		Person.sameAs.push(profile.url);
	}
	Person.knowsAbout = [];
	for (const skill of resume.skills) {
		Person.knowsAbout = [...Person.knowsAbout, ...skill.keywords];
	}
	Person.knowsAbout[Person.knowsAbout.indexOf('jQuery')] = 'JQuery';
	Person.knowsAbout.sort();
	Person.knowsAbout[Person.knowsAbout.indexOf('JQuery')] = 'jQuery';
	schemaGraphObjects.push(Person);

	let Education = {
		'@type': 'CollegeOrUniversity',
		'@id': educationNodeId,
		name: 'University of Michigan',
		department: 'School of Art & Architecture (now Penny W. Stamps School of Art and Design)',
		url: 'https://stamps.umich.edu/'
	};
	schemaGraphObjects.push(Education);

	type EmployeeRole = {
		'@type': 'EmployeeRole';
		'@id': string;
		subjectOf: { '@id': string };
		roleName: string;
		description: string;
		highlights?: Array<string>;
		startDate: string;
		endDate?: string;
	};
	for (const [i, job] of resume.work.entries()) {
		const Organization = {
			'@type': 'Organization',
			'@id': `${PUBLIC_SITE_URL}/#experience-${i + 1}`,
			name: job.company,
			url: job.website,
			location: job.location
		};
		let EmployeeRole: EmployeeRole = {
			'@type': 'EmployeeRole',
			'@id': `${PUBLIC_SITE_URL}/#role-${i + 1}`,
			subjectOf: { '@id': `${PUBLIC_SITE_URL}/#experience-${i + 1}` },
			roleName: job.position,
			description: job.summary,
			startDate: job.startDate
		};
		if (job.endDate) {
			EmployeeRole.endDate = job.endDate;
		}
		Person.worksFor.push({ '@id': `${PUBLIC_SITE_URL}/#role-${i + 1}` });
		schemaGraphObjects.push(Organization);
		schemaGraphObjects.push(EmployeeRole);
	}
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
