<script>
  import CardList from "../_components/CardList.svelte";

  let items = [
    {
      title: "NIM Finder",
      img: "/student-id.png",
      desc: "NIM Finder for ITB students.",
      url: "nim",
      version: "Last updated: 2019"
    },
    {
      title: "Pattern Matcher",
      img: "/string-matcher.jpg",
      desc:
        "Tugas Kecil 4: String matcher using files with Knuth-Morris-Pratt, Boyer-Moore, and Regular Expression.",
      url: "pattern-matcher",
      version: "Last updated: 28 May 2020"
    }
  ];
</script>

<CardList title="Project List" {items} />
