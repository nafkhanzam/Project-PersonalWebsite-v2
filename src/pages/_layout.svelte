<script>
  import { BaseTransition } from "@sveltech/routify/decorators";
  import { fade } from "svelte/transition";
  import NavBar from "./_components/NavBar.svelte";

  const configs = [
    {
      condition: () => true,
      transition: fade
    }
  ];
</script>

<NavBar />
<div class="container mt-4">
  <BaseTransition {configs}>
    <slot />
  </BaseTransition>
</div>
