<script lang="ts">
	export let data;
</script>

<div>
	{data}
	<!-- svelte-ignore a11y-media-has-caption -->
	<video src={data.vid.formatStreams[1].url} controls muted />
	<p>
		{@html data.vid.descriptionHtml}
	</p>
</div>
