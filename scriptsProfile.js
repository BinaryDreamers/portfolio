// window.history.pushState({}, "members", "members");
const url = "https://glacial-fortress-83834-37d6fcfdc937.herokuapp.com";

import { cacheMembers, getMembersCache } from "./membersProfile.js";

// Function to show the skeleton loader
function showSkeletonLoader() {
  const skeletonBody = document.getElementById("skeleton-loader");

  // Clear any existing skeleton rows (if you call this multiple times)
  skeletonBody.innerHTML = "";

  // Create 6 skeleton rows to simulate loading
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("tr");
    row.classList.add("skeleton-row");

    row.innerHTML = `
      <td class="skeleton-cell small skeleton"></td>
      <td>
        <div class="profile-skeleton">
          <div class="profile-img-skeleton skeleton"></div>
          <div class="name-skeleton skeleton"></div>
        </div>
      </td>
      <td class="skeleton-cell medium skeleton"></td>
      <td class="skeleton-cell medium skeleton"></td>
      <td class="skeleton-cell large skeleton"></td>
      <td class="skeleton-cell small skeleton"></td>
    `;

    skeletonBody.appendChild(row);
  }
}

function hideSkeletonLoader() {
  const skeletonBody = document.getElementById("skeleton-loader");
  skeletonBody.innerHTML = "";
}

async function fetchUserData() {
  showSkeletonLoader();
  if (getMembersCache().length === 0) {
    try {
      const response = await fetch(`${url}/api/members`);

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      console.log("REQUEST SENT FOR MEMBERS");
      const data = await response.json();
      cacheMembers(data.members);
      hideSkeletonLoader();
      populateTable(data.members);
    } catch (error) {
      console.error("Error fetching data:", error.message);
      hideSkeletonLoader();
    }
  } else {
    console.log("READ FROM CACHE");
    populateTable(getMembersCache());
    hideSkeletonLoader();
  }
}

function populateTable(members) {
  const tableBody = document.querySelector(".tbody");
  const ranks = ["first", "second", "third", "other"];
  // loadingIndicator.style.display = "block";
  tableBody.innerHTML = "";

  members.forEach((member, index) => {
    const row = document.createElement("tr");
    row.className = "profile";
    const rankClass = ranks[index] || "other";
    row.classList.add(rankClass);
    row.addEventListener("click", () => {
      window.location.href = `profile.html?id=${member.id}`;
    });
    // Populate the row with user data
    row.innerHTML = `
    <td><div class="rank"><p>${index + 1}</p></div></td>
    <td>
      <div class="name-wrapper">
        <img src="${member.profileUrl}" alt="${member.name}">
        <div>
          <span class="username">${member.name}</span>
          <span class="fullname">${member.leetcode}</span>  
        </div>
      </div>
    </td>
    <td class="progresTags tds">
      <div class="easyTag"><p>${member.solved.easy}</p></div>
      <div class="mediumTag"><p>${member.solved.medium}</p></div>
      <div class="hardTag"><p>${member.solved.hard}</p></div>
    </td>
    <td class=" tds">${member.solved.total}</td>
    <td class=" tds">${member.role}</td>
    <td class=" tds">${member.dateAdded}</td>
  `;

    tableBody.appendChild(row);
  });
}

// document.addEventListener("onLoad", () => {
//   fetchUserData();
// });
fetchUserData();
// teamData.forEach((member, index) => {
//   const row = document.createElement("tr");
//   row.className = "profile";
//   const rankClass = ranks[index] || "other";
//   row.classList.add(rankClass);
//   row.innerHTML = `
//       <td ><div class="rank">${index + 1}</div></td>
//       <td>
//         <div class="name-wrapper">
//           <img src="${member.profileImage}" alt="${member.fullname}">
//           <div>
//             <span class="username">${member.username}</span>
//             <span class="fullname">${member.fullname}</span>
//           </div>
//         </div>
//       </td>
//       <td class="progresTags">
//         <div class="easyTag"><p>${member.easy}</p></div>
//         <div class="mediumTag"><p>${member.medium}</p></div>
//         <div class="hardTag"><p>${member.hard}</p></div>
//       </td>
//       <td>${member.easy + member.medium + member.hard}</td>
//       <td>${member.role}</td>
//       <td>${member.dateAdded}</td>
//     `;

//   row.addEventListener("click", () => {
//     window.location.href = `profile.html?username=${member.username}`;
//   });

//   tableBody.appendChild(row);
// });

// Function to show the skeleton loader

// Function to hide the skeleton loader

// Function to fetch user data and populate the table
// async function fetchUserData() {
//   showSkeletonLoader(); // Show skeleton loader while fetching data

//   try {
//     const response = await fetch("https://api.example.com/users"); // Replace with your actual API URL
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const users = await response.json();

//     hideSkeletonLoader(); // Hide the skeleton once data is fetched

//     const dataBody = document.getElementById("data-rows");
//     populateTable(users);
//     dataBody.style.display = "table-row-group"; // Show the data rows
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//     alert("Failed to fetch user data.");
//     hideSkeletonLoader(); // Hide the skeleton even on error
//   }
// }

// // Function to populate the table with user data
// function populateTable(users) {
//   const tableBody = document.getElementById("data-rows");
//   tableBody.innerHTML = ""; // Clear any existing rows

//   users.forEach((user, index) => {
//     const row = document.createElement("tr");

//     row.innerHTML = `
//       <td>${index + 1}</td>
//       <td>
//         <img src="${user.profileImage}" class="profile-img" alt="${
//       user.fullname
//     }">
//         <span class="username">${user.fullname}</span>
//       </td>
//       <td>${user.progress}</td>
//       <td>${user.acceptedSubmission}</td>
//       <td>${user.role}</td>
//       <td>${user.dateAdded}</td>
//     `;

//     tableBody.appendChild(row);
//   });
// }

// // Call the fetchUserData function when the page loads
// fetchUserData();
