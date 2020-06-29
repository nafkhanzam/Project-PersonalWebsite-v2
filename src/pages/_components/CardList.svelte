<script>
  import Card from "./Card.svelte";

  export let title;
  export let items;
  export let withImage = true;
</script>

<h1 class="text-center">{title}</h1>
<hr />
<div class="d-flex flex-wrap justify-content-around">
  {#each items as item}
    <div class="p-2 w-50">
      <Card {item} {withImage} />
    </div>
  {/each}
</div>
