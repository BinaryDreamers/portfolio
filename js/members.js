const memberData = [
  {
    imageUrl: "assets/images/people/abel.jpg",
    name: "Abel Dereje",
    role: "Web Developer",
    telegram: "https://t.me/Abela472",
    linkedin: "https://www.linkedin.com/in/abel-dereje-810816322/",
    github: "https://github.com/abela472",
    banner: "assets/images/abel-banner.png",
    description:
      "I am a web developer with a passion for creating beautiful and functional websites. I am skilled in HTML, CSS, and JavaScript, and I am always eager to learn new technologies and improve my skills. I am a team player and I enjoy collaborating with others to create innovative solutions to complex problems.",
  },
  {
    imageUrl: "assets/images/people/abraham.jpg",
    name: "Abraham Masresha",
    role: "UI/UX Designer",
    telegram: "https://t.me/Eziek95",
    linkedin: "https://www.linkedin.com/in/abraham-masresha-85860229a/",
    github: "https://github.com/ablixM",
    banner: "assets/images/Abraham-banner.png",
    description:
      "I am a UI/UX designer with a passion for creating beautiful and intuitive user interfaces. I have experience working with a variety of design tools, including Adobe XD, Figma, and Sketch. I am always looking for new challenges and opportunities to grow as a designer, and I am excited to be part of the team at Habesha Developers.",
  },
  {
    imageUrl: "assets/images/people/dagi.jpg",
    name: "Dagmawi Fekadu",
    role: "Software Engineer",
    telegram: "https://t.me/Lightweigh1",
    linkedin: "https://et.linkedin.com/in/noah-undefined-80179b322",
    github: "https://github.com/I-hates-debugging",
    banner: "assets/images/dagmawi-banner.png",
    description:
      "I am a software engineer with a passion for building high-quality software solutions. I have experience working with a variety of programming languages, including Python, Java, and C++. I am always looking for new challenges and opportunities to grow as a developer, and I am excited to be part of the team at Habesha Developers.",
  },
  {
    imageUrl: "assets/images/people/eyosi.jpg",
    name: "Eyosiyas Habtemariam",
    role: "Project Manager",
    telegram: "https://t.me/Wanted_person",
    linkedin: "https://www.linkedin.com/in/eyosiyas-habtemariam/",
    github: "https://github.com/theblackethiopiandude",
    banner: "assets/images/eyosias-banner.png",
    description:
      "I am a project manager with a passion for leading teams and delivering successful projects. I have experience managing projects in a variety of industries, including software development, construction, and marketing. I am skilled in project planning, scheduling, and budgeting, and I am always looking for new challenges and opportunities to grow as a project manager.",
  },
  {
    imageUrl: "assets/images/people/hamza.jpg",
    name: "Hamza Adil",
    role: "Software Engineer",
    telegram: "https://t.me/SolanaGMI",
    linkedin: "",
    github: "https://github.com/Hamzaadil101",
    banner: "assets/images/hamza-banner.png",
    description:
      "I am a software engineer with a passion for building high-quality software solutions. I have experience working with a variety of programming languages, including Python, Java, and C++. I am always looking for new challenges and opportunities to grow as a developer, and I am excited to be part of the team at Habesha Developers.",
  },
  {
    imageUrl: "assets/images/people/heran.jpg",
    name: "Heran Habtamu",
    role: "Web Developer",
    telegram: "https://t.me/hheerraann",
    linkedin: "https://www.linkedin.com/in/heran-habtamu-b97a94288/",
    github: "https://github.com/hheran",
    banner: "assets/images/heran-banner.png",
    description:
      "I am a web developer with a passion for creating beautiful and functional websites. I am skilled in HTML, CSS, and JavaScript, and I am always eager to learn new technologies and improve my skills. I am a team player and I enjoy collaborating with others to create innovative solutions to complex problems.",
  },
];

function createMemberCards() {
  const memberCardContainer = document.getElementById("memberCardContainer");

  memberCardContainer.innerHTML = "";

  memberData.forEach((data, index) => {
    const memberCard = document.createElement("div");
    memberCard.classList.add("memberCardContent");

    memberCard.innerHTML = `
        <div class="memberCard">
                <div class="memberImagePlaceholder"><img src="${data.imageUrl}" alt="Project Image"></div>
                <h2 class="memberHeadline">${data.name}</h2>
                <p class="memberDescription">${data.role}</p>
                <div class="memberSocial">
                    <a href="${data.telegram}" target="_blank"><span class="memberIcon"><img src="assets/svg/telegram-members.svg" alt="telegram"></span></a>
                    <a href="${data.linkedin}" target="_blank"><span class="memberIcon"><img src="assets/svg/linkedin-members.svg" alt="linkedin"></span></a>
                    <a href="${data.github}" target="_blank"><span class="memberIcon"><img src="assets/svg/github-members.svg" alt="github"></span></a>
                </div>
                <img class="more" src="assets/svg/dots-three-bold.svg" alt="">
            </div>
        `;

    const more = memberCard.querySelector(".more");
    const img = memberCard.querySelector(".memberImagePlaceholder");
    more.addEventListener("click", () => {
      showPopup(data);
    });
    img.addEventListener("click", () => {
      showPopup(data);
    });
    memberCardContainer.appendChild(memberCard);
  });
}

createMemberCards();

const popup = document.getElementById("popupMembers");
const closeBtn = document.querySelector(".close-btnMembers");
// const popupVideo = document.getElementById("popup-videoMembers");
const popupBanner = document.getElementById("popupBanner");
const profileImage = document.getElementById("proImage");
const dsname = document.getElementById("dsNamePara");
const dsRole = document.getElementById("dsRolePara");
const dsDescription = document.getElementById("dsDescriptionPara");
const telegramSocial = document.getElementById("telegramSocial");
const linkedInaSocial = document.getElementById("linkedInSocial");
const githubSocial = document.getElementById("githubSocial");

function showPopup(data) {
  // popupVideo.querySelector("source").setAttribute("src", data.videoSrc);
  // popupVideo.load();
  popupBanner.src = data.banner;
  profileImage.src = data.imageUrl;
  dsname.textContent = data.name;
  dsRole.textContent = data.role;
  dsDescription.textContent = data.description;
  telegramSocial.href = data.telegram;
  linkedInaSocial.href = data.linkedin;
  githubSocial.href = data.github;

  popup.style.display = "flex";
}

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});
