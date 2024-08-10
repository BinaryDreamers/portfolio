const contentData = [
  {
    imageUrl: "assets/images/SWIFT-image.png",
    title: "SWIFT-SALES",
    description:
      "For small enterprises, Swift-Sales is a desktop program that facilitates effective item administration. It facilitates seamless sales transactions, including credit sales, and makes inventory activities like adding, modifying, and removing products easier. Easy database integration makes it possible for users to register goods. For information on sales patterns and inventory turnover, the program provides analytics and reporting. It is appropriate for companies of all sizes due to its customizable features and user-friendly design, which promote efficient operations and well-informed decision-making.",
    tag: "Business",
    date: "2024-08-07",
    buttonLabel: "See More",
    link: "https://github.com/theblackethiopiandude/SWIFT-SALES",
  },
  {
    imageUrl: "assets/images/GMS-image.png",
    title: "Garage Management System (GMS)",
    description:
      "Welcome to the Garage Management System (GMS) repository. GMS is a software solution designed to streamline and optimize garage management operations.",
    tag: "Buisness",
    date: "2024-08-08",
    buttonLabel: "See More",
    link: "https://github.com/theblackethiopiandude/GMS",
  },
  {
    imageUrl: "assets/images/Minesweeper-Image.png",
    title: "Habeshan Minesweeper",
    description:
      "An exciting take on the beloved minesweeper game, you may explore the depths of the Habeshan mines! Set off on a thrilling adventure, where each step might be the difference between success and failure. Play this clever and fascinating game of strategy .Stay away from lethal mines. Minesweeper is a compelling game for players of all ages, with beautiful graphics influenced by Habeshan settings and simple gaming principles.",
    tag: "Game",
    date: "2024-08-09",
    buttonLabel: "See More",
    link: "https://github.com/theblackethiopiandude/Minesweeper",
  },
];

function createProjectCards() {
  const mainContainer = document.getElementById("mainContainer");

  mainContainer.innerHTML = "";

  contentData.forEach((data, index) => {
    const card = document.createElement("div");
    card.classList.add("project-card");

    card.innerHTML = `
            <img src="${data.imageUrl}" alt="Project Image">
            <h2 class="card-title">${data.title}</h2>
            <div class="card-content">
                <div class="card-description" id="desc-${index}">${data.description}</div>
                <button class="expand-button" data-index="${index}">Expand</button>
                <div class="card-info">
                    <span class="card-tag">${data.tag}</span>
                    <span>${data.date}</span>
                </div>
                <a href="${data.link}" class="card-button" target="_blank">${data.buttonLabel} 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                 <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z" fill="white"></path>
                </svg>
                </a>
            </div>
        `;

    mainContainer.appendChild(card);
  });

  const expandButtons = document.querySelectorAll(".expand-button");
  expandButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      const description = document.getElementById(`desc-${index}`);
      if (description.style.maxHeight === "none") {
        description.style.maxHeight = "80px";
        button.textContent = "Expand";
      } else {
        description.style.maxHeight = "none";
        button.textContent = "Collapse";
      }
    });
  });
}

createProjectCards();
