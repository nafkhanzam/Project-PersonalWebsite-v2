<script>
  export let msg = "Unexpected error occured.";
  export let err = null;
  if (err) {
    console.log(err);
  }
</script>

<style>
  p {
    color: red;
  }
</style>

<p>{msg}</p>
