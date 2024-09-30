// Function to add data to the cache
export function cacheMembers(members) {
  if (JSON.parse(localStorage.getItem("members_cache"))) return;
  localStorage.setItem("members_cache", JSON.stringify(members));
}

// Function to retrieve the cache
export function getMembersCache() {
  return JSON.parse(localStorage.getItem("members_cache")) || [];
}

export function cacheMembersInfo(id, info) {
  let cache = JSON.parse(localStorage.getItem("members_info_cache"));
  if (cache && cache[id]) return;

  if (!cache) cache = {};
  cache[id] = info;
  localStorage.setItem("members_info_cache", JSON.stringify(cache));
}

// Function to retrieve the cache
export function getMembersInfoCache(id) {
  const cache = JSON.parse(localStorage.getItem("members_info_cache"));
  return cache && cache[id] ? cache[id] : {};
}

export function getSubmissionsCache(id) {
  const cache = JSON.parse(localStorage.getItem("submissions_cache"));
  return cache && cache[id] ? cache[id] : null;
}

export function cacheSubmissionsInfo(id, info) {
  let cache = JSON.parse(localStorage.getItem("submissions_cache"));
  if (cache && cache[id]) return;

  if (!cache) cache = {};
  cache[id] = info;
  localStorage.setItem("submissions_cache", JSON.stringify(cache));
}

export async function getQuestionCache() {
  const cache = JSON.parse(localStorage.getItem("questions_cache"));
  if (cache) return cache;
  try {
    const data = await fetch(
      `https://glacial-fortress-83834-37d6fcfdc937.herokuapp.com/api/questions`
    );
    const questions = await data.json();
    localStorage.setItem("questions_cache", JSON.stringify(questions));
  } catch (error) {
    console.error(error);
  }
}

// Set up the interval to run every minute
setInterval(() => {
  console.log("Clearing Cache");
  localStorage.removeItem("members_cache");
  localStorage.removeItem("members_info_cache");
  localStorage.removeItem("submissions_cache");
  fetchMembersAndCache();
}, 15000); // 10000 ms = 15 sec

async function fetchMembersAndCache() {
  try {
    const response = await fetch(
      `https://glacial-fortress-83834-37d6fcfdc937.herokuapp.com/api/members`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    cacheMembers(data.members);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}
