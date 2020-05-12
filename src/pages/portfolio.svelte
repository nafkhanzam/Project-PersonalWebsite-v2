<script>
  import Content from "./_components/Content.svelte";

  const workExperience = {
    title: "WORK EXPERIENCE",
    contents: [
      {
        title: "XTREMAX",
        desc: "Back End Developer - Part-time",
        time: "August 2019 - February 2020"
      }
    ]
  };

  const skillExperience = {
    title: "SKILL EXPERIENCE"
  };

  const education = {
    title: "EDUCATION",
    contents: [
      {
        title: "INSTITUT TEKNOLOGI BANDUNG",
        desc:
          "Computer Science - Bachelor's degree<br />Currently on the 4th semester with the current GPA 3.8/4.0",
        time: "August 2018 - Present"
      }
    ]
  };

  const achievement = {
    title: "ACHIEVEMENT",
    contents: [
      {
        title: "ARKAVIDIA 5.0 COMPETITIVE PROGRAMMING",
        desc: "Finalist",
        time: "2019"
      },
      {
        title: "INTERNATIONAL COLLEGIATE PROGRAMMING CONTEST",
        desc: "Regional Finalist",
        time: "2018"
      }
    ]
  };
</script>

<style>
  .photo {
    width: 200px;
    border: 4px solid black;
  }
  p,
  span,
  li {
    font-size: 1.25em;
  }
</style>

<div class="mb-4 d-flex">
  <div class="mr-4">
    <img class="photo" src="/portfolio-photo.jpg" alt="self-potrait" />
  </div>
  <div class="mr-4">
    <h1 class="font-weight-bold">MOCH. NAFKHAN ALZAMZAMI</h1>
    <h4>Computer Science Student</h4>
    <p class="text-justify">
      A 4th semester undergraduate computer science student that’s passionate in
      software engineering, computer science, and any other IT related. Learning
      by trial and error method by teaching, creating projects, and solving
      problems. Easy to adapt in new environments.
    </p>
  </div>
</div>
<div class="d-flex justify-content-between">
  <div class="mr-4 flex-fill">
    <img class="mr-2" src="/email.png" alt="Email" style="width: 30px;" />
    <span>nafkhanalzamzami@gmail.com</span>
  </div>
  <div class="mr-4 flex-fill">
    <img class="mr-2" src="/phone.png" alt="Phone" style="width: 30px;" />
    <span>+62 85815805174</span>
  </div>
</div>
<hr class="my-4" style="border: 1px solid black;" />
<Content item={workExperience} />
<Content item={skillExperience}>
  <h4 class="font-weight-bold">PROGRAMMING LANGUAGE</h4>
  <p>Java, C#, Javascript, Typescript, C/C++, Python</p>
  <h4 class="font-weight-bold mt-4">WEB DEVELOPMENT</h4>
  <ul>
    <li>
      <b>Backend:</b>
      Node.js, .NET
    </li>
    <li>
      <b>Frontend:</b>
      React, Svelte
    </li>
    <li>
      <b>Cloud:</b>
      Git, AWS, Docker, CI/CD
    </li>
    <li>
      <b>Database:</b>
      MongoDB, SQL Server
    </li>
  </ul>
  <h4 class="font-weight-bold">OTHERS</h4>
  <p>Linux, JavaFX, Java Swing, Electron.js, PyQt, OpenGL</p>
</Content>
<Content item={education} />
<Content item={achievement} />
