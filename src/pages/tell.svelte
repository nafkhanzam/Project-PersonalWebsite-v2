<script>
  import axios from "axios";

  let name = "";
  let message = "";
  let server = "https://getform.io/f/25c86abd-1584-4a13-997e-05fc0c13e963";
  let sending = false;

  function send() {
    if (sending) {
      return;
    }
    if (!message) {
      alert("No message written!");
      return;
    }
    sending = true;
    (async function() {
      await axios({
        url: server,
        method: "POST",
        data: {
          name: name,
          email: "",
          tel: message
        }
      });
      message = "";
      sending = false;
      alert("Message sent to Camcam!");
    })();
  }
</script>

<style>
  .disabled {
    cursor: default;
  }
</style>

<h3>Tell me something!</h3>
<hr />
<form>
  <div class="form-group">
    <label for="name">Name</label>
    <input
      type="text"
      class="form-control"
      id="name"
      placeholder="Name?"
      bind:value={name} />
  </div>
  <div class="form-group">
    <label for="message">Message</label>
    <textarea class="form-control" id="message" rows="4" bind:value={message} />
  </div>
  <button
    class="btn btn-primary"
    class:disabled={sending}
    type="button"
    on:click={send}>
    {sending ? 'Sending...' : 'Send!'}
  </button>
</form>
