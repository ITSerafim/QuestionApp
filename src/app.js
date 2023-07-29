import "../styles/main.css";
import { Question } from "./question";
import { createModal, isValid } from "./utils";
import { authForm, authWithEmailAndPass } from "./auth";

const form = document.getElementById("form");
const input = form.querySelector("#question-input");
const btnSub = form.querySelector("#submit");
const modalBtn = document.getElementById("modal-btn");

window.addEventListener("load", Question.renderList);
modalBtn.addEventListener("click", openModal);
form.addEventListener("submit", submitFormHandler);
input.addEventListener("input", () => {
  btnSub.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    btnSub.disabled = true;
    // Ассинхронный запрос на сервер
    Question.create(question).then(() => {
      input.value = "";
      input.className = "";
      btnSub.disabled = false;
    });
  }
}

function openModal() {
  createModal("Авторизация", authForm());
  document
    .getElementById("auth-form")
    .addEventListener("submit", authFormHandler, { once: true });
}

function authFormHandler(event) {
  event.preventDefault();

  const btn = event.target.querySelector("button");
  const email = event.target.querySelector("#email").value;
  const password = event.target.querySelector("#password").value;

  btn.disabled = true;
  authWithEmailAndPass(email, password)
    .then(Question.fetch)
    .then(renderModal)
    .then(() => (btn.disabled = false));
}

function renderModal(content) {
  if (typeof content === "string") {
    createModal("Ошибка!", content);
  } else {
    createModal("Список вопросов", Question.listToHTML(content));
  }
}
