<script>
  import { url } from "@sveltech/routify";
  import { getBlog, toPrettyDate } from "../../utils";
  import PageNotFound from "../_components/PageNotFound.svelte";
  import Loading from "../_components/Loading.svelte";
  export let blog;

  let message = `Blog "${blog}" can't be found!`;
  let contentPromise;
  function updateContent() {
    contentPromise = (async function() {
      return await getBlog(blog);
    })();
  }
  updateContent();
</script>

{#await contentPromise}
  <Loading />
{:then result}
  {#if !result || result.length < 2 || !result[0] || !result[1]}
    <PageNotFound />
  {:else}
    <h1>{result[0].title}</h1>
    Posted {toPrettyDate(result[0].date)} by
    <u>{result[0].author || 'nafkhanzam'}</u>
    <hr />
    {@html result[1]}
  {/if}
{/await}
