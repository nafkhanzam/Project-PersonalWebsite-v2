<script>
  import NavBar from "./_components/NavBar.svelte";
  import Footer from "./_components/Footer.svelte";
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
    <slot />
  </div>
  <Footer />
</div>
