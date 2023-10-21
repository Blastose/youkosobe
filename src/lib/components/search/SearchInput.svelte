<script lang="ts">
	import { Invidious } from '$lib/invidious/invidious';
	import { mousedownOutside } from '$lib/components/layout/utils';
	import debounce from 'just-debounce-it';
	import { IconSearch, IconX } from '@tabler/icons-svelte';
	import { fade } from 'svelte/transition';
	import Loading from '../layout/Loading.svelte';
	import { goto } from '$app/navigation';

	let searchSuggestions: string[] = [];
	let searchSuggestionsIndex = 0;
	let inputElement: HTMLInputElement;
	let inputText: string = '';
	let inputIsFocused: boolean = false;
	let loadingSearchSuggestions: boolean = false;
	let searchSuggestionsContainer: HTMLDivElement;

	function jumpToSearchInput(_node: HTMLFormElement) {
		const jumpTosearch = (e: KeyboardEvent) => {
			if (e.key === '/') {
				if (document.activeElement !== inputElement) {
					e.preventDefault();
					inputElement.focus();
				}
			}
		};

		addEventListener('keydown', jumpTosearch);

		return {
			destroy() {
				removeEventListener('keydown', jumpTosearch);
			}
		};
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
		if (searchSuggestions.length === 0) return;
		if (loadingSearchSuggestions) return;
		e.preventDefault();
		if (e.key === 'ArrowUp') {
			searchSuggestionsIndex =
				(searchSuggestionsIndex - 1 + searchSuggestions.length) % searchSuggestions.length;
		} else if (e.key === 'ArrowDown') {
			searchSuggestionsIndex = (searchSuggestionsIndex + 1) % searchSuggestions.length;
		}
		inputElement.value = searchSuggestions[searchSuggestionsIndex];
		inputText = inputElement.value;

		highlightSearchSuggestionItem(searchSuggestionsIndex);
	}

	function highlightSearchSuggestionItem(index: number) {
		const bus =
			searchSuggestionsContainer.querySelectorAll<HTMLButtonElement>('button[data-index]');

		for (const i of bus) {
			if (i.dataset.index === String(index)) {
				i.style.backgroundColor = 'rgb(64 64 64)';
			} else {
				i.style.backgroundColor = '';
			}
		}
	}

	function clearAll() {
		inputElement.value = '';
		searchSuggestions = [];
	}

	// For some reason, the invidious api response returns escaped html charaters
	// for other languages like japanese
	function decodeHtml(input: string) {
		const doc = new DOMParser().parseFromString(input, 'text/html');
		return doc.documentElement.textContent ?? '';
	}

	// We load the search suggestions into an array and also add the current
	// search input so we can iterate over it when pressing the up/down keys
	async function getSearchSuggestions(q: string) {
		loadingSearchSuggestions = true;
		const invidious = new Invidious('https://invidious.fdn.fr');
		try {
			const result = await invidious.getSearchSuggestions({ q });
			searchSuggestions = [inputText];
			searchSuggestions = searchSuggestions.concat(result.suggestions.map((v) => decodeHtml(v)));
			searchSuggestionsIndex = 0;
			loadingSearchSuggestions = false;
			console.log(searchSuggestions);
		} catch {
			searchSuggestions = [inputText];
			searchSuggestionsIndex = 0;
			loadingSearchSuggestions = false;
		}
	}

	function setInputText(text: string) {
		inputElement.value = text;
		inputText = text;
	}

	const debounceGetSearchSuggestions = debounce(() => {
		getSearchSuggestions(inputElement.value);
	}, 300);
</script>

<form
	use:jumpToSearchInput
	on:submit={(e) => {
		e.preventDefault();
		goto(`/results?q=${inputElement.value}`);
		inputIsFocused = false;
		inputElement.blur();
		searchSuggestions = [];
	}}
	class="flex-grow flex justify-center"
	method="get"
	action="/results"
>
	<div
		use:mousedownOutside
		on:mouseoutside={() => {
			inputIsFocused = false;
		}}
		class="relative flex w-full max-w-[568px]"
	>
		<input
			autocomplete="off"
			on:focus={() => {
				inputIsFocused = true;
			}}
			on:input={(e) => {
				console.log('ejaskdj');
				searchSuggestions = [];
				searchSuggestionsIndex = 0;
				if (e.currentTarget.value === '') {
					clearAll();
				} else {
					debounceGetSearchSuggestions();
				}
			}}
			on:keydown={handleKeydown}
			bind:value={inputText}
			bind:this={inputElement}
			name="q"
			maxlength={100}
			class="w-full
    outline-none ring-1 ring-[var(--dark-outline)] focus:ring-blue-500
    pl-4 pr-12 py-2 rounded-l-3xl dark:bg-[var(--dark-500)]"
			type="text"
			placeholder="Search"
		/>

		{#if inputText}
			<button
				on:click={clearAll}
				transition:fade={{ duration: 150 }}
				class="absolute right-16 p-2"
				type="button"
				aria-label="Clear input"
			>
				<IconX stroke={1} />
			</button>
		{/if}

		<button
			type="submit"
			class="outline-none ring-1 focus:ring-blue-500 ring-[var(--dark-outline)]
		py-2 px-4 rounded-r-3xl dark:bg-neutral-800"
		>
			<IconSearch stroke={1} />
		</button>

		{#if inputIsFocused}
			{#if loadingSearchSuggestions}
				<div class="w-full absolute top-12 bg-neutral-900 py-4 rounded-lg">
					<Loading />
				</div>
			{:else if searchSuggestions.length > 1}
				<div
					bind:this={searchSuggestionsContainer}
					class="w-full absolute top-12 bg-neutral-900 py-4 rounded-lg"
				>
					{#each searchSuggestions.slice(1) as suggestion, index}
						<button
							type="button"
							tabindex="-1"
							on:click={() => {
								setInputText(suggestion);
								goto(`results?q=${suggestion}`);
								inputIsFocused = false;
								searchSuggestions = [];
							}}
							on:mouseenter={() => {
								highlightSearchSuggestionItem(index + 1);
								searchSuggestionsIndex = index + 1;
							}}
							on:mouseleave={() => {
								highlightSearchSuggestionItem(index + 1);
								searchSuggestionsIndex = index + 1;
							}}
							data-index={index + 1}
							class="w-full text-left flex items-center gap-4 px-4 py-2 font-semibold"
						>
							<IconSearch />
							{suggestion}
						</button>
					{/each}
				</div>
			{/if}
		{/if}
	</div>
</form>
