<script lang="ts">
	import { createDialog, melt } from '@melt-ui/svelte';
	import { fade, fly } from 'svelte/transition';
	import { IconFilter, IconX } from '@tabler/icons-svelte';
	import InputGroup from './InputGroup.svelte';
	import { page } from '$app/stores';
	import {
		dateArrayRadio,
		durationArrayRadio,
		featuresArrayRadio,
		sortByArrayRadio,
		typeArrayRadio
	} from './types';

	const {
		elements: { overlay, content, title, close, portalled, trigger },
		states: { open }
	} = createDialog({
		forceVisible: true,
		preventScroll: false
	});
</script>

<button
	class="flex gap-1 rounded-3xl dark:hover:bg-neutral-700 w-fit px-4 py-2"
	use:melt={$trigger}
>
	Filters
	<IconFilter />
</button>

<div use:melt={$portalled}>
	{#if $open}
		<div
			transition:fade={{ duration: 150 }}
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 h-[75vh] w-[75vw]
            max-h-[470px] max-w-[768px]
            translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
            dark:bg-neutral-800
            p-6 shadow-lg overflow-y-auto"
			use:melt={$content}
			transition:fly={{
				duration: 150,
				y: -10,
				opacity: 0
			}}
		>
			<form method="get" action="/results" class="flex h-full flex-col gap-2 justify-between">
				<div class="flex flex-col gap-4">
					<p use:melt={$title} class="text-lg font-semibold">Search filters</p>
					<input type="hidden" name="q" value={$page.url.searchParams.get('q')} />
					<div>
						<div class="grid grid-cols-5 gap-2">
							<InputGroup
								checkFirst={true}
								type="radio"
								displayName="UPLOAD DATE"
								name="date"
								values={dateArrayRadio}
							/>
							<InputGroup
								checkFirst={true}
								type="radio"
								displayName="TYPE"
								name="type"
								values={typeArrayRadio}
							/>
							<InputGroup
								checkFirst={true}
								type="radio"
								displayName="DURATION"
								name="duration"
								values={durationArrayRadio}
							/>
							<InputGroup
								checkFirst={false}
								type="checkbox"
								displayName="FEATURES"
								name="features"
								values={featuresArrayRadio}
							/>
							<InputGroup
								checkFirst={true}
								type="radio"
								displayName="SORT BY"
								name="sort"
								values={sortByArrayRadio}
							/>
						</div>
						<!-- Upload date => radio -->
						<!-- Type => radio -->
						<!-- Duration => radio -->
						<!-- Features => checkbox group -->
						<!-- Sort by => radio -->
					</div>
				</div>

				<button use:melt={$close} type="submit">Apply filters</button>
			</form>

			<button
				use:melt={$close}
				aria-label="Close"
				class="absolute right-[10px] top-[10px] inline-flex p-1
            appearance-none items-center justify-center rounded-full
            dark:text-neutral-200
            dark:hover:bg-neutral-700 focus:shadow-neutral-400 focus:outline-none focus:ring-2
            focus:ring-neutral-400"
			>
				<IconX />
			</button>
		</div>
	{/if}
</div>
