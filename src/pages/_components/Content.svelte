<script>
  export let item;
</script>

<div class="my-4">
  <h2 class="mb-4 font-weight-bold">{item.title}</h2>
  <div style="margin-left: 3em;">
    {#each item.contents || [] as content}
      <div class="d-flex mt-4">
        {#if content.img}
          <img
            src={content.img}
            alt={content.title}
            style="height: 100px; width: 100px;"
          />
        {:else}
          <div style="width: 100px;" />
        {/if}
        <div style="width: 32px; max-width: 32px; min-width: 32px; " />
        <div class="d-flex" style="flex-grow: 1;">
          <div style="width: 100%">
            <div class="d-flex justify-content-between">
              <div>
                <h4 class="font-weight-bold">{content.title}</h4>
                <p>
                  {@html content.desc}
                </p>
              </div>
              <div>
                <p>{content.time}</p>
              </div>
            </div>
            {#if content.subdesc}
              <p style="font-size: 15px; text-align: justify;">
                {@html content.subdesc}
              </p>
            {/if}
          </div>
        </div>
      </div>
      <hr />
    {:else}
      <slot />
    {/each}
  </div>
</div>

<style>
  p {
    font-size: 1.25em;
  }
</style>
