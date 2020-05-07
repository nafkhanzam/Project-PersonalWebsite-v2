<script>
  import CardList from "../_components/CardList.svelte";

  let items = [
    {
      title: "NIM Finder",
      img: "student-id.png",
      desc: "NIM Finder for ITB students.",
      url: "nim",
      version: "Last updated: 2019"
    }
  ];
</script>

<CardList title="Project List" {items} />
