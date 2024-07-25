<script lang="ts">
	import resume from './resume.json';
	import { getYear, serializeSchema } from '$lib/helpers.ts';

	let schema = {
		'@context': 'http://schema.org',
		'@graph': [] as Array<{ '@id': string }>
	};
	let schemaPerson = {
		'@type': 'Person',
		'@id': `${resume.basics.website}/resume/#person`,
		subjectOf: {
			'@id': `${resume.basics.website}/resume/#page`
		},
		name: resume.basics.name,
		givenName: 'Colin',
		familyName: 'Howells',
		nationality: 'US',
		image: 'https://github.com/colinhowells.png',
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
			'@id': `${resume.basics.website}/resume/#education`
		},
		knowsAbout: [] as Array<string>
	};
	for (let profile of resume.basics.profiles) {
		schemaPerson.sameAs.push(profile.url);
	}
	for (let skill of resume.skills) {
		schemaPerson.knowsAbout.push(skill.name);
	}
	schema['@graph'].push(schemaPerson);

	let schemaEducation = {
		'@type': 'CollegeOrUniversity',
		'@id': `${resume.basics.website}/resume/#education`,
		name: 'University of Michigan',
		department: 'School of Art & Architecture (now Penny W. Stamps School of Art and Design)',
		url: 'https://stamps.umich.edu/'
	};
	schema['@graph'].push(schemaEducation);

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
		const schemaOrganization = {
			'@type': 'Organization',
			'@id': `${resume.basics.website}/resume/#experience-${i + 1}`,
			name: job.company,
			url: job.website,
			location: job.location
		};
		let schemaEmployeeRole: EmployeeRole = {
			'@type': 'EmployeeRole',
			'@id': `${resume.basics.website}/resume/#role-${i + 1}`,
			subjectOf: {
				'@id': `${resume.basics.website}/resume/#experience-${i + 1}`
			},
			roleName: job.position,
			description: job.summary,
			startDate: job.startDate
		};
		if (job.endDate) {
			schemaEmployeeRole.endDate = job.endDate;
		}
		schemaPerson.worksFor.push({
			'@id': `${resume.basics.website}/resume/#role-${i + 1}`
		});
		schema['@graph'].push(schemaOrganization);
		schema['@graph'].push(schemaEmployeeRole);
	}
</script>

<svelte:head>
	{@html serializeSchema(schema)}
</svelte:head>

<div class="h-resume">
	<h1 hidden class="p-name">{resume.basics.name}</h1>

	<section class="contact">
		<address class="p-contact h-card">
			<span class="p-name"><strong>{resume.basics.name}</strong></span><br />
			<span class="adr">
				<span class="street-address">1621 17th Ave Apt 203</span>
				<span class="locality">Seattle</span>, <span class="region">WA</span>
				<span class="postal-code">98122-2764</span>
			</span><br />
			<span
				>Email: <a class="email" href="mailto:colin+contact@colinhowells.com"
					>{resume.basics.email}</a
				></span
			><br />
			<span>Homepage: <a class="url" href={resume.basics.website}>{resume.basics.website}</a></span
			><br />
		</address>
	</section>

	<section class="summary">
		<p class="p-summary">{resume.basics.summary}</p>
	</section>

	<section class="experience">
		<h3 class="experience-dt">Experience</h3>
		{#each resume.work as job}
			<div class="p-experience h-event">
				<span class="h-card">
					<h4 class="title">{job.position}</h4>
					<h5 class="p-name">
						<a class="url" href={job.website}>{job.company}</a>,
						<span class="dt-duration">
							<time datetime={job.startDate} class="dt-start"
								>{getYear(job.startDate).toString()}</time
							>{#if job.endDate}–<time datetime={job.endDate} class="dt-end"
									>{getYear(job.endDate).toString()}}</time
								>{/if},
						</span>
						<span class="p-location">{job.location}</span>
					</h5>
				</span>
				<p class="p-summary">{job.summary}</p>
				{#if job.highlights}
					<ul>
						{#each job.highlights as highlight}
							<li class="p-description">{highlight}</li>
						{/each}
					</ul>
				{/if}
			</div>
		{/each}
	</section>

	<section class="education">
		<h3 class="education-dt">Education</h3>
		{#each resume.education as schooling}
			<div class="p-education h-event">
				<span class="h-card">
					<h4>{schooling.studyType} in {schooling.area}</h4>
					<h5 class="p-name">
						{schooling.institution},
						<span class="dt-duration">
							<time datetime={schooling.startDate} class="dt-start"
								>{getYear(schooling.startDate).toString()}</time
							>
							{#if schooling.endDate}
								–<time datetime="" class="dt-end">{getYear(schooling.endDate).toString()}</time>
							{/if}
						</span>
					</h5>
				</span>
			</div>
		{/each}
	</section>

	<section class="skills">
		<h3 class="skills-dt">Skills</h3>
		{#each resume.skills as skill}
			<div>
				<h4>{skill.name}, {skill.level}</h4>
				<ul>
					{#each skill.keywords as keyword}
						<li class="p-skill">{keyword}</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>

	<section class="interests">
		<h3>Interests</h3>
		<p>
			{#each resume.interests as interest, i}
				{interest.name}{#if i < resume.interests.length - 1}{`, `}{/if}
			{/each}
		</p>
	</section>
</div>

<style>
	section {
		margin-bottom: var(--gap);
		& > div {
			margin-bottom: calc(var(--padding) * 4);
		}
	}
	h3 {
		margin-bottom: calc(var(--padding) * 2);
		color: var(--color-cool-500);
		font-size: x-large;
		font-family: var(--font-sans);
		letter-spacing: 1px;
		text-transform: uppercase;
	}
	h4 {
		margin-top: 0;
		margin-bottom: var(--padding);
	}
	h5 {
		margin-top: 0;
		margin-bottom: var(--padding);
	}
</style>
