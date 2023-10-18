<script lang="ts">
	export let data;
	console.log(data.vid);
</script>

<div class="container-youko">
	<!-- svelte-ignore a11y-media-has-caption -->
	<video src={data.vid.formatStreams[1].url} controls muted />
	<p class="youtube-html">
		{@html data.vid.descriptionHtml}
	</p>
</div>
