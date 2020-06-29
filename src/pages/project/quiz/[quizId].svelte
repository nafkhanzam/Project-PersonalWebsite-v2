<script>
  import { url } from "@sveltech/routify";
  import axios from "axios";
  import { getQuiz, postQuizAnswer } from "../../../utils";
  import Hoverable from "../../_components/Hoverable.svelte";
  import Loading from "../../_components/Loading.svelte";
  import PageNotFound from "../../_components/PageNotFound.svelte";
  import Error from "../../_components/Error.svelte";

  export let quizId;

  let quiz;
  let name = "";
  let start = false;

  const fetchQuiz = (async function() {
    quiz = await getQuiz(quizId);
    if (!quiz) {
      throw quiz;
    }
  })();

  let curr = 0;
  $: q = quiz && quiz.questions ? quiz.questions[curr] : null;
  $: len = quiz && quiz.questions ? quiz.questions.length : 0;

  let selectedAnswers = [];
  let fetchResult = null;

  function submitAnswer(answer) {
    selectedAnswers.push({ question: q.question, answer });
    ++curr;
    if (curr >= len) {
      fetchResult = (async function() {
        const res = await postQuizAnswer({
          titleId: quizId,
          name: name || "Anonymous",
          answers: selectedAnswers
        });
        if (!res) {
          throw res;
        }
        return res;
      })();
    }
  }
</script>

<style>
  .answer:hover {
    cursor: pointer;
  }
</style>

{#await fetchQuiz}
  <Loading />
{:then}
  {#if quiz && quiz.questions}
    <h3>Quiz: {quiz.title}</h3>
    <hr />
    {#if start}
      <div class="card">
        <div class="card-body">
          {#if q}
            <h5 class="card-title mb-4">{q.question}</h5>
            {#each q.answers as answer}
              <Hoverable let:hovering={shadow}>
                <div
                  class="answer card my-2"
                  class:shadow
                  on:click={() => submitAnswer(answer)}>
                  <div class="card-body">
                    <p class="card-text">{answer}</p>
                  </div>
                </div>
              </Hoverable>
            {/each}
            <p class="text-center font-weight-bolder">{curr + 1} / {len}</p>
          {:else if fetchResult}
            {#await fetchResult}
              <Loading />
            {:then result}
              <h5 class="card-title mb-4">Result!</h5>
              <hr />
              <p>Correct {result.corrects} / {len}</p>
              <p>Score: {Math.round((result.corrects / len) * 100)} / 100</p>
              {#if result.corrects === len}
                <p class="text-primary font-weight-bold">BRAVO!!</p>
              {:else}
                <p class="text-danger font-weight-bold">Pathetic.</p>
              {/if}
              <br />
              <a href={$url('../')}>&lt; Back to list</a>
            {:catch error}
              <Error />
            {/await}
          {:else}
            <Error />
          {/if}
        </div>
      </div>
    {:else}
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Anonymous"
          bind:value={name} />
        <button
          class="btn btn-primary mt-4"
          type="button"
          on:click={() => (start = true)}>
          Start the quiz!
        </button>
      </div>
    {/if}
  {:else}
    <PageNotFound />
  {/if}
{:catch error}
  <PageNotFound />
{/await}
