const memberData = [
  {
    imageUrl: "assets/images/people/abel.jpg",
    name: "Abel Dereje",
    role: "Web Developer",
    telegram: "https://t.me/Abela472",
    linkedin: "https://www.linkedin.com/in/abel-dereje-810816322/",
    github: "https://github.com/abela472",
  },
  {
    imageUrl: "assets/images/people/abraham.jpg",
    name: "Abraham Masresha",
    role: "UI/UX Designer",
    telegram: "https://t.me/Eziek95",
    linkedin: "https://www.linkedin.com/in/abraham-masresha-85860229a/",
    github: "https://github.com/ablixM",
  },
  {
    imageUrl: "assets/images/people/dagi.jpg",
    name: "Dagmawi Fekadu",
    role: "UI Designer",
    telegram: "https://t.me/Lightweigh1",
    linkedin: "https://et.linkedin.com/in/noah-undefined-80179b322",
    github: "https://github.com/I-hates-debugging",
  },
  {
    imageUrl: "assets/images/people/eyosi.jpg",
    name: "Eyosiyas Habtemariam",
    role: "Software Engineer",
    telegram: "https://t.me/Wanted_person",
    linkedin: "https://www.linkedin.com/in/eyosiyas-habtemariam/",
    github: "https://github.com/theblackethiopiandude",
  },
  {
    imageUrl: "assets/images/people/hamza.jpg",
    name: "Hamza Adil",
    role: "Tech Enthusiast",
    telegram: "https://t.me/SolanaGMI",
    linkedin: "",
    github: "https://github.com/Hamzaadil101",
  },
  {
    imageUrl: "assets/images/people/heran.jpg",
    name: "Heran Habtamu",
    role: "Web Developer",
    telegram: "https://t.me/hheerraann",
    linkedin: "https://www.linkedin.com/in/heran-habtamu-b97a94288/",
    github: "https://github.com/hheran",
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
            </div>
        `;

    memberCardContainer.appendChild(memberCard);
  });
}

createMemberCards();
