import {
  getMembersCache,
  getMembersInfoCache,
  cacheMembersInfo,
  cacheMembers,
  getQuestionCache,
  getSubmissionsCache,
  cacheSubmissionsInfo,
} from "./membersProfile.js";

function showSkeletonLoaderProfile() {
  document.getElementById("profile-skeleton").classList.remove("hidden");
  document.getElementById("skeleton-list").classList.remove("hidden");
  document.getElementById("container").classList.remove("hidden");
}

function hideSkeletonLoaderProfile() {
  document.getElementById("profile-skeleton").classList.add("hidden");
  document.getElementById("skeleton-list").classList.add("hidden");
  document.getElementById("container").classList.add("hidden");
}

const url = "https://glacial-fortress-83834-37d6fcfdc937.herokuapp.com";
async function fetchSubmissions(user_id) {
  try {
    const submissions = getSubmissionsCache(user_id);
    if (submissions) return submissions;
    const response = await fetch(`${url}/api/submissions/${user_id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("API Data:", data);
    cacheSubmissionsInfo(user_id, data.submissions);
    return data.submissions;
  } catch (error) {
    console.error("Error fetching the data:", error);
  }
}

async function fetchUserData(user_id) {
  showSkeletonLoaderProfile();
  if (Object.keys(getMembersInfoCache(user_id)).length === 0) {
    try {
      const response = await fetch(`${url}/api/members/${user_id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch member data");
      }

      const data = await response.json();
      cacheMembersInfo(user_id, data);
      window.onload = function () {
        hideSkeletonLoaderProfile();
      };
      let members = getMembersCache();
      if (members.length === 0) {
        members = (await (await fetch(`${url}/api/members`)).json()).members;
        cacheMembers(members);
        console.log("Request sent to merge member data");
      }

      const member = {
        ...data,
        ...members.find((member) => member.id === user_id),
      };

      if (member) {
        cacheMembersInfo(user_id, member);
        hideSkeletonLoaderProfile();
        displayUserProfile(member);
      } else {
        displayError("User not found");
        hideSkeletonLoaderProfile();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      displayError("Error fetching member data");
      hideSkeletonLoaderProfile();
    }
  } else {
    let memberInfo = getMembersInfoCache(user_id);
    let members = getMembersCache();
    if (members.length === 0) {
      members = (await (await fetch(`${url}/api/members`)).json()).members;
      cacheMembers(members);
    }
    if (Object.keys(memberInfo).length === 0) {
      members = (await (await fetch(`${url}/api/members/${user_id}`)).json())
        .members;
    }

    const member = {
      ...memberInfo,
      ...members.find((member) => member.id === user_id),
    };

    if (member) {
      cacheMembersInfo(user_id, member);
      hideSkeletonLoaderProfile();
      displayUserProfile(member);
    } else {
      hideSkeletonLoaderProfile();
      displayError("User not found");
    }
  }
}

async function displayUserProfile(member) {
  const main_container = document.getElementById("main_container");
  main_container.innerHTML = `
      <section class="sectionOne">
          <div class="banner">
             <img class="bannerImage" src=${member.bannerUrl} alt="banner">
            <div class="profileDiv">
                <img class="profileImage" src=${
                  member.profileUrl
                } alt="Profile">
            </div>
          </div>
      </section >

      <section class="sectionTwo">
        <div class="infoprofile">
          <div class="infoProfilePictureInfo">
            <h3>${member.name}</h3>
            <p>@${member.leetcode}</p>
            <p>${member.email}</p>
          </div>

          <div class="description">
            <p>${member.description}</p>
          </div>
        </div>

        <div class="infoSocial">
          <a href=""><span><img src="assets/svg/telegram.svg" alt="telegram"></span></a>
          <a href=""><span><img src="assets/svg/linkedin-members.svg" alt="linkedIn"></span></a>
          <a href=""><span><img src="assets/svg/github.svg" alt="github"></span></a>
        </div>    
      </section>

      <section class="sectionThree">
        <div class="questionStatus">
          <div class="easyDiv divs">
            Easy
            <div class="status">
              <div class="totalEasy">${member.solved.easy}</div>
              /
              <div class="total">${(await getQuestionCache()).easy}</div>
            </div>
          </div>
          <div class="mediumDiv divs">
            Medium
            <div class="status">
              <div class="totalMedium">${member.solved.medium}</div>
              /
              <div class="total">${(await getQuestionCache()).medium}</div>
            </div>
          </div>
          <div class="hardDiv divs">
            Hard
            <div class="status">
              <div class="totalHard">${member.solved.hard}</div>
              /
              <div class="total">${(await getQuestionCache()).hard}</div>
            </div>
          </div>
        </div>

        <div class="totalQuestDiv">
          <span class="totalSpan">${
            member.solved.total
          }</span> Total Submissions
        </div>
      </section>


      <div class="container">
      <h1>Submitted LeetCode Questions</h1>
      
     
      <table id="leetcodeTable">
        <tbody id="submission-list">
          
        </tbody>
      </table>
    </div>
    `;
  const header = document.createElement("tr");
  header.classList.add("hide");
  const submittedQuestions = document.createElement("th");
  submittedQuestions.textContent = "Submitted question";
  const status = document.createElement("th");
  status.textContent = "Status";
  const language = document.createElement("th");
  language.textContent = "Used language";
  const time = document.createElement("th");
  time.textContent = "Time";
  const submissionList = document.getElementById("submission-list");
  header.appendChild(submittedQuestions);
  header.appendChild(status);
  header.appendChild(language);
  header.appendChild(time);

  submissionList.appendChild(header);

  async function fetchSubmit() {
    const submissions = await fetchSubmissions(user_id);
    submissions.forEach((submission) => {
      const row = document.createElement("tr");

      // Title Cell
      const titleCell = document.createElement("td");
      titleCell.textContent = submission.title;

      // Time Cell
      const statusCell = document.createElement("td");
      statusCell.textContent = submission.statusDisplay;
      statusCell.classList.add("time");
      status.classList.add("hide");
      const languageCell = document.createElement("td");
      languageCell.textContent = submission.lang;
      languageCell.classList.add("time");
      languageCell.classList.add("hide");
      const timeCell = document.createElement("td");
      timeCell.textContent = timeAgo(submission.timestamp);
      timeCell.classList.add("time");
      timeCell.classList.add("hide");

      row.appendChild(titleCell);
      row.appendChild(statusCell);
      row.appendChild(languageCell);
      row.appendChild(timeCell);

      submissionList.appendChild(row);
    });
  }
  fetchSubmit();
}

// Function to display an error message
function displayError(message) {
  document.getElementById("main_container").innerHTML = `<p>${message}</p>`;
}

// Get the id from the URL query parameters
const urlParams = new URLSearchParams(window.location.search);
const user_id = urlParams.get("id");

// Fetch and display the member data
if (user_id) {
  fetchUserData(user_id);
} else {
  hideSkeletonLoaderProfile();
  displayError("No id provided");
}

// window.history.pushState({}, "profile", "profile");

function timeAgo(timestamp) {
  const now = Date.now();
  const secondsPast = Math.floor((now - timestamp * 1000) / 1000);

  if (secondsPast < 60) {
    return secondsPast <= 30
      ? "a few second ago"
      : `${secondsPast} seconds ago`;
  }
  if (secondsPast < 3600) {
    const minutesPast = Math.floor(secondsPast / 60);
    return minutesPast === 1 ? "a minute ago" : `${minutesPast} minutes ago`;
  }
  if (secondsPast < 86400) {
    const hoursPast = Math.floor(secondsPast / 3600);
    return hoursPast === 1 ? "an hour ago" : `${hoursPast} hours ago`;
  }
  if (secondsPast < 604800) {
    const daysPast = Math.floor(secondsPast / 86400);
    return daysPast === 1 ? "a day ago" : `${daysPast} days ago`;
  }
  if (secondsPast < 2592000) {
    const weeksPast = Math.floor(secondsPast / 604800);
    return weeksPast === 1 ? "a week ago" : `${weeksPast} weeks ago`;
  }
  const monthsPast = Math.floor(secondsPast / 2592000);
  return monthsPast === 1 ? "a month ago" : `${monthsPast} months ago`;
}
