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
      version: "Last updated: 28 April 2020"
    },
    {
      title: "Checkmate Finder",
      img: "/chess.jpg",
      desc:
        "Tugas Makalah: Finding Checkmate in N moves in Chess using Backtracking and Depth Limited Search Algorithm.",
      url: "checkmate-finder",
      version: "Last updated: 3 May 2020"
    },
    {
      title: "Substitution Statistics",
      img: "/substat.png",
      desc: "A live input football matches.",
      url: "substitution-statistics",
      version: "Last updated: early 2019"
    }
  ];
</script>

<CardList title="Project List" {items} />
