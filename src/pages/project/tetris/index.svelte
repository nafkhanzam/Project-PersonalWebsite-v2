<script>
  import { onMount } from "svelte";
  import { TetrisGame } from "./tetris";

  let container;

  onMount(() => {
    let w = 200;
    let game = new TetrisGame(w, w * 2.4, 0, 10, 24, 20);
    container.appendChild(game.app.view);
    game.start();
    return () => {
      game.app.destroy();
    };
  });
</script>

<div bind:this={container}>
  <slot />
</div>
