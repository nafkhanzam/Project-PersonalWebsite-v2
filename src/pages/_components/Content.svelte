<script>
  export let item;
</script>

<style>
  p {
    font-size: 1.25em;
  }
</style>

<div class="my-4">
  <h2 class="mb-4 font-weight-bold">{item.title}</h2>
  <div style="margin-left: 3em;">
    {#each item.contents || [] as content}
      <div class="d-flex justify-content-between mt-4">
        <div class="d-flex">
          {#if content.img}
            <img
              src={content.img}
              alt={content.title}
              style="height: 100%; width: 100px;" />
            <div style="width: 32px;" />
          {/if}
          <div>
            <h4 class="font-weight-bold">{content.title}</h4>
            <p>
              {@html content.desc}
            </p>
          </div>
        </div>
        <div>
          <p>{content.time}</p>
        </div>
      </div>
      <hr />
    {:else}
      <slot />
    {/each}
  </div>
</div>
