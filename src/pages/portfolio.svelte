<script>
  import Content from "./_components/Content.svelte";

  const workExperience = {
    title: "WORK EXPERIENCE",
    contents: [
      {
        img: "pesanpesta.png",
        title: "pesanpesta",
        desc: "Chief Technology Officer - Full time",
        time: "January 2021 - Present",
      },
      {
        img: "https://d2w51pw0y636wu.cloudfront.net/assets/images/favicon.png",
        title: "AlinaMed",
        desc: "Chief Technology Officer - Full time",
        time: "August 2020 - December 2020",
      },
      {
        img:
          "https://pbs.twimg.com/profile_images/1054733450006220806/zEJycNpH_400x400.jpg",
        title: "Impulse ITB 2020",
        desc: "Back End Developer - Full time",
        time: "July 2020 - Present",
      },
      {
        img: "https://d2w51pw0y636wu.cloudfront.net/assets/images/favicon.png",
        title: "AlinaMed",
        desc: "Lead Project Engineer - Full time",
        time: "June 2020 - August 2020",
      },
      {
        img:
          "https://media-exp1.licdn.com/dms/image/C4D0BAQHpXhPivbZyzA/company-logo_200_200/0/1519934507071?e=2159024400&v=beta&t=sP2XLm6Yhpfa61YpLaIG-_YPu7QUxfO4opQ5kdb6I6I",
        title: "GDP Labs",
        desc: "Software Development Engineer - Internship",
        time: "June 2020 - August 2020",
      },
      {
        img:
          "https://media-exp1.licdn.com/dms/image/C560BAQGZUTKmp-2Jjw/company-logo_200_200/0/1537436986424?e=2159024400&v=beta&t=arxDEGPzK8y4qGMru3LyAn0Oa3wvNcNIBJBVD_WQWF0",
        title: "Xtremax",
        desc: "Back End Developer - Part time",
        time: "August 2019 - February 2020",
      },
    ],
  };

  const skillExperience = {
    title: "SKILL EXPERIENCE",
  };

  const education = {
    title: "EDUCATION",
    contents: [
      {
        title: "INSTITUT TEKNOLOGI BANDUNG",
        desc:
          "Computer Science - Bachelor's degree<br />Currently on the 6th semester with the current GPA 3.75/4.0",
        time: "August 2018 - Present",
      },
    ],
  };

  const achievement = {
    title: "ACHIEVEMENT",
    contents: [
      {
        title: "ARKAVIDIA 5.0 COMPETITIVE PROGRAMMING",
        desc: "Finalist",
        time: "2019",
      },
      {
        title: "INTERNATIONAL COLLEGIATE PROGRAMMING CONTEST",
        desc: "Regional Finalist",
        time: "2018",
      },
    ],
  };
</script>

<div class="mb-4 d-flex">
  <div class="mr-4">
    <img class="photo" src="/portfolio-photo.jpg" alt="self-potrait" />
  </div>
  <div class="mr-4">
    <h1 class="font-weight-bold">MOCH. NAFKHAN ALZAMZAMI</h1>
    <h4>Computer Science Student</h4>
    <p class="text-justify">
      A 6<sup>th</sup>
      semester undergraduate computer science student that's passionate in software
      engineering, computer science, and any other IT related. Learning by trial
      and error method by teaching, creating projects, and solving problems. Easy
      to adapt in new environments.
    </p>
  </div>
</div>
<div class="d-flex justify-content-between">
  <div class="mr-4 flex-fill">
    <img class="mr-2" src="/website.png" alt="Website" style="width: 30px;" />
    <span>nafkhanzam.com</span>
  </div>
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
  <p>Java, C#, Javascript, Typescript, C/C++, Python, Go, Rust</p>
  <h4 class="font-weight-bold mt-4">WEB DEVELOPMENT</h4>
  <ul>
    <li><b>Backend:</b> Node.js, .NET, Java, GraphQL</li>
    <li><b>Frontend:</b> React, React-Native, Vue, Svelte, Flutter</li>
    <li><b>Cloud:</b> Git, AWS, Docker, Firebase</li>
    <li>
      <b>Database:</b>
      PostgreSQL, MongoDB, SQL Server, MySQL, FaunaDB, DynamoDB, Firestore
    </li>
  </ul>
  <h4 class="font-weight-bold">OTHERS</h4>
  <p>Linux, JavaFX, Java Swing, Electron.js, PyQt, OpenGL</p>
</Content>
<Content item={education} />
<Content item={achievement} />

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
