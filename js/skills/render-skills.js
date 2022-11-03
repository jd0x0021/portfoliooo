// how to add child in a div
// design badge element
// create the data
// iterate  the data the render the elements
import { skillsData } from "/js/skills/data.js";

const skillsArea = document.querySelector("#skills");

const badgeElement = (skill) => {
  const badge = document.createElement("div");

  // add icon
  const icon = document.createElement("img");
  icon.setAttribute("src", skill.icon);

  // add label
  const label = document.createElement("span");
  label.textContent = skill.label;

  badge.append(icon);
  badge.append(label);

  badge.classList.add("badge");

  return badge;
};

skillsData.forEach((e) => {
  skillsArea.append(badgeElement(e));
});

// const badges = document.querySelectorAll(".badge");

// badges.forEach((badge) => {
//   badge.setAttribute("data-animate-el", "");
// });
