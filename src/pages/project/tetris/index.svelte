<script>
  import { onMount } from "svelte";
  import { TetrisGame } from "./tetris";

  let container;

  onMount(() => {
    let app = new TetrisGame(1080, 720, 0, 10, 24, 50);
    app.start();
    container.appendChild(app.view);
  });
</script>

<div bind:this={container}>
  <slot />
</div>
