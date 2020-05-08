<script>
  import { BaseTransition } from "@sveltech/routify/decorators";
  import { fade } from "svelte/transition";
  import NavBar from "./_components/NavBar.svelte";
  import Footer from "./_components/Footer.svelte";

  const configs = [
    {
      condition: () => true,
      transition: fade
    }
  ];
</script>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .content {
    flex: 1;
  }
</style>

<div class="layout">
  <NavBar />
  <div class="content container my-4">
    <BaseTransition {configs}>
      <slot />
    </BaseTransition>
  </div>
  <Footer />
</div>
