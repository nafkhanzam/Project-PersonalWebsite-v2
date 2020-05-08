<script>
  import CardList from "./_components/CardList.svelte";

  let items = [
    {
      title: "Portfolio",
      img: "/photo.jpg",
      desc: "Information about me.",
      url: "/portfolio",
      version: "Last updated: 07/05/2020"
    },
    {
      title: "Blogs",
      img: "/blog.jpg",
      desc: "Anything I want to write.",
      url: "/blog"
    },
    {
      title: "Projects",
      img: "/project.jpg",
      desc:
        "Projects that I've made from my own interest, clients, and college.",
      url: "/project"
    },
    {
      title: "Tell me something!",
      img: "/message.png",
      desc: "Send me a message.",
      url: "/tell"
    }
  ];
</script>

<CardList title="Welcome!" {items} />
