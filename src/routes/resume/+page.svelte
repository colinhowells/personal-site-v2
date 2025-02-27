<script lang="ts">
	import resume from '$lib/resume.json';
	import { getYear } from '$lib/helpers.ts';
</script>

<article class="h-resume">
	<h2 hidden class="p-name">{resume.basics.name}</h2>

	<section class="contact">
		<address class="p-contact h-card">
			<span class="p-name"><strong>{resume.basics.name}</strong></span><br />
			<span
				>Email: <a class="email" href="mailto:colin+contact@colinhowells.com"
					>{resume.basics.email}</a
				></span
			><br />
			<span>Homepage: <a class="url" href={resume.basics.website}>{resume.basics.website}</a></span
			><br />
			<span
				>Resume as JSON: <a class="url" href="/resume.json" data-sveltekit-reload
					>{resume.basics.website}/resume.json</a
				></span
			>
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
									>{getYear(job.endDate).toString()}</time
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
</article>

<style>
	section {
		margin-bottom: calc(var(--gap) / 2);
		width: 100%;
		& > * {
			width: 100%;
		}
		& > div {
			margin-bottom: calc(var(--padding) * 2);
			width: 100%;
		}
	}
	h3 {
		margin: 0 0 calc(var(--padding) * 2) 0;
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
