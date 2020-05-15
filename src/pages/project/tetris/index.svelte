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

<h1>Tetris</h1>
<hr />
<div class="d-flex">
  <div bind:this={container} />
  <div class="ml-4 flex-fill">
    <p>A simple tetris game created with Pixi.js library.</p>
    <ul>
      <li>
        <b>Left</b>
        - Move to the left.
      </li>
      <li>
        <b>Right</b>
        - Move to the right.
      </li>
      <li>
        <b>S</b>
        - Drop directly.
      </li>
      <li>
        <b>A</b>
        - Rotate counter-clockwise.
      </li>
      <li>
        <b>D</b>
        - Rotate clockwise.
      </li>
    </ul>
  </div>
</div>
