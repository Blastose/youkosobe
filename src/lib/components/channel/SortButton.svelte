<script lang="ts">
	export let name: string;
	export let href: string;
	export let active: boolean;
</script>

<a
	{href}
	class="py-2 px-4 rounded-xl
  {active ? 'bg-white text-black' : 'bg-neutral-800 hover:bg-neutral-700'}"
>
	{name}
</a>
