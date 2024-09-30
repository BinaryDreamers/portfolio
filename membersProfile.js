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
  console.log(JSON.parse(localStorage.getItem("members_info_cache")));
}

// Function to retrieve the cache
export function getMembersInfoCache(id) {
  const cache = JSON.parse(localStorage.getItem("members_info_cache"));
  return (cache && cache[id]) || {};
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
