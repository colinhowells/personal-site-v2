<script lang="ts">
	import type { PageData } from './$types';
	import { PUBLIC_SITE_URL } from '$env/static/public';
	import { page } from '$app/stores';
	import resume from '$lib/resume.json';
	import { serializeSchema, getISODate } from '$lib/helpers.ts';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	const articleNodeId = `${$page.url.toString()}/#article`;
	// const avatarUrl = `${PUBLIC_SITE_URL}/images/colin-2023.jpg`;
	const avatarUrl = 'https://github.com/colinhowells.png';
	const defaultDate = '2024-09-05';
	const educationNodeId = `${PUBLIC_SITE_URL}/#education`;
	const isArticle = '/[slug]' === $page.route.id;
	const personNodeId = `${PUBLIC_SITE_URL}/#person`;
	const publishedDateTime = getISODate(data.metadata.datePublished ?? defaultDate);
	const siteNodeId = `${PUBLIC_SITE_URL}/#website`;
	const updatedDateTime = getISODate(data.metadata.dateModified ?? defaultDate);
	const webPageNodeId = $page.url.toString();

	let schemaGraphObjects = [] as Array<Record<string, any>>;

	const WebSite = {
		'@type': 'WebSite',
		'@id': siteNodeId,
		url: PUBLIC_SITE_URL,
		name: 'Colin Howells',
		description:
			'Personal website of Colin Howells, a web developer and designer living in Seattle.',
		inLanguage: 'en-US',
		image: {
			'@type': 'ImageObject',
			'@id': `${PUBLIC_SITE_URL}/#logo`,
			url: avatarUrl,
			contentUrl: avatarUrl,
			caption: 'Colin Howells'
		},
		publisher: {
			'@id': personNodeId
		}
	};
	schemaGraphObjects.push(WebSite);

	const WebPage = {
		'@type': 'WebPage',
		'@id': webPageNodeId,
		isPartOf: {
			'@id': siteNodeId
		},
		url: $page.url.toString(),
		name: data.metadata.title,
		datePublished: publishedDateTime,
		dateModified: updatedDateTime,
		author: {
			'@id': personNodeId
		}
	};
	schemaGraphObjects.push(WebPage);

	if (isArticle) {
		const Article = {
			'@type': 'Article',
			'@id': articleNodeId,
			isPartOf: {
				'@id': webPageNodeId
			},
			mainEntityOfPage: {
				'@id': webPageNodeId
			},
			url: $page.url.toString(),
			headline: data.metadata.title,
			description: data.metadata.description,
			inLanguage: 'en-US',
			datePublished: publishedDateTime,
			dateModified: updatedDateTime,
			author: {
				'@id': personNodeId
			}
		};
		schemaGraphObjects.push(Article);
	}

	let Person = {
		'@type': 'Person',
		'@id': personNodeId,
		subjectOf: {
			'@id': siteNodeId
		},
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
			addressLocality: resume.basics.location.city,
			addressRegion: resume.basics.location.region,
			postalCode: resume.basics.location.postalCode,
			streetAddress: resume.basics.location.address
		},
		description: resume.basics.summary,
		sameAs: [] as Array<string>,
		jobTitle: resume.basics.label,
		worksFor: [] as Array<{ '@id': string }>,
		alumniOf: {
			'@id': educationNodeId
		},
		knowsAbout: [] as Array<string>
	};
	for (let profile of resume.basics.profiles) {
		Person.sameAs.push(profile.url);
	}
	for (let skill of resume.skills) {
		Person.knowsAbout.push(skill.name);
	}
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
		subjectOf: {
			'@id': string;
		};
		roleName: string;
		description: string;
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
			subjectOf: {
				'@id': `${PUBLIC_SITE_URL}/#experience-${i + 1}`
			},
			roleName: job.position,
			description: job.summary,
			startDate: job.startDate
		};
		if (job.endDate) {
			EmployeeRole.endDate = job.endDate;
		}
		Person.worksFor.push({
			'@id': `${PUBLIC_SITE_URL}/#role-${i + 1}`
		});
		schemaGraphObjects.push(Organization);
		schemaGraphObjects.push(EmployeeRole);
	}
</script>

<svelte:head>
	<title>{data.metadata.title} | Colin Howells</title>
	<meta name="description" content={data.metadata.description} />
	<meta name="author" content={resume.basics.name} />
	<meta property="fediverse:creator" content="@colin_howells@toot.cafe" />
	<link rel="me" href="https://toot.cafe/@colin_howells" />
	<link rel="me" href="https://bsky.app/profile/colinhowells.com" />
	<link rel="me" href="https://github.com/colinhowells" />
	<link rel="me" href="https://bandcamp.com/colinhowells" />
	<link rel="canonical" href={$page.url.toString()} />
	<meta property="og:title" content={data.metadata.title} />
	<meta property="og:description" content={data.metadata.description} />
	<meta property="og:locale" content="en_US" />
	<meta property="og:site_name" content={resume.basics.name} />
	<meta property="og:type" content={isArticle ? 'article' : 'website'} />
	<meta property="og:url" content={$page.url.toString()} />
	<meta property="og:updated_time" content={updatedDateTime} />
	{#if isArticle}
		<meta property="article:author" content="https://www.facebook.com/cghowells" />
		<meta property="article:published_time" content={publishedDateTime} />
		<meta property="article:modified_time" content={updatedDateTime} />
	{/if}
	{@html serializeSchema(schemaGraphObjects)}
</svelte:head>
