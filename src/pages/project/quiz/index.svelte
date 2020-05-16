<script>
  import { url } from "@sveltech/routify";
  import { getQuizzes } from "../../../utils";
  import Hoverable from "../../_components/Hoverable.svelte";
  import Loading from "../../_components/Loading.svelte";
  import Error from "../../_components/Error.svelte";

  let quizzes;

  const fetchQuizzes = (async function() {
    quizzes = await getQuizzes();
    if (!quizzes) {
      throw quizzes;
    }
  })();
</script>

<h1>Quiz</h1>
<hr />
<p>
  A simple multiple choices quiz. Created to learn NoSQL, AWS, Serverless
  function technologies.
</p>
<div class="mt-4">
  {#await fetchQuizzes}
    <Loading />
  {:then}
    {#each quizzes as quiz}
      <Hoverable let:hovering={shadow}>
        <div class="card" class:shadow>
          <a href={$url('../' + quiz.titleId)} class="stretched-link">{''}</a>
          <div class="card-body">
            <h5 class="card-title">{quiz.title}</h5>
            <p class="card-text">{quiz.description}</p>
          </div>
        </div>
      </Hoverable>
    {:else}
      <p>No quiz found.</p>
    {/each}
  {:catch err}
    <Error {err} msg="Can't fetch quizzes." />
  {/await}
</div>
