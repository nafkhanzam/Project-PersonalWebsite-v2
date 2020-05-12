<script>
  import { url } from "@sveltech/routify";
  import { getJSON, toPrettyDate } from "../../utils";
  import Loading from "../_components/Loading.svelte";

  let tags = new Set();
  let selectedTags = new Set();

  let blogsPromise = getBlogs();
  async function getBlogs() {
    tags.clear();
    blogsPromise = await Promise.all(
      (await getJSON("/assets/blogs.json")).data
        .map(async val => {
          const blogData = await getJSON(`/assets/blogs/${val}.json`);
          if (!blogData) return null;
          if (blogData.tags) blogData.tags.forEach(tag => tags.add(tag));
          return { url: val, ...blogData };
        })
        .sort(data => data.date)
    );
  }
</script>

<h1 class="text-center">Blogs</h1>
<hr />
{#await blogsPromise}
  <Loading />
{:then list}
  <div class="row">
    <div class="col-8">
      <ul>
        {#each list as blog}
          {#if blog && blog.title}
            <li>
              <a href={$url(`../${blog.url}`)}>
                [{toPrettyDate(blog.date)}] {blog.title} [by {blog.author}]
              </a>
            </li>
          {/if}
        {/each}
      </ul>
    </div>
    <div class="col-4">
      <h5 style="display: inline;">Tags:</h5>
      {#if selectedTags.size}
        <button
          on:click={() => {
            selectedTags.clear();
            selectedTags = selectedTags;
          }}
          class="badge badge-pill badge-primary ml-2">
          Clear &times;
        </button>
      {/if}
      <br />
      <div class="mt-2">
        {#each Array.from(tags) as tag}
          <button
            on:click={() => {
              if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
              } else {
                selectedTags.add(tag);
              }
              selectedTags = selectedTags;
            }}
            class={`badge badge-pill badge-${selectedTags.has(tag) ? 'warning' : 'dark'} m-1`}>
            {tag}
          </button>
        {/each}
      </div>
    </div>
  </div>
{/await}
