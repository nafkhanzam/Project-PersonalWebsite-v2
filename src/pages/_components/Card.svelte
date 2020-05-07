<script>
  import { onMount } from "svelte";
  import { url } from "@sveltech/routify";
  import Hoverable from "./Hoverable.svelte";

  export let item;
</script>

<style>
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
  }
  .under-construction {
    color: orangered;
  }
</style>

{#if item}
  <Hoverable let:hovering={hovered}>
    <div class="card" class:shadow={hovered && item.url}>
      {#if item.url}
        <a
          href={item.url.startsWith('/') ? item.url : $url('../' + item.url)}
          class="stretched-link">
          {''}
        </a>
      {/if}
      <div class="row no-gutters">
        <div class="col-md-4">
          <img class="card-img" src={item.img} alt={item.alt || item.title} />
        </div>
        <div class="col-md-8">
          <div class="card-body d-flex flex-column" style="height: 100%;">
            <div>
              <h5 class="card-title">{item.title}</h5>
              <p class="card-text">{item.desc}</p>
            </div>
            <div class="mt-auto">
              <small class:under-construction={!item.url}>
                {item.url ? item.version || '' : 'Under construction'}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Hoverable>
{/if}
