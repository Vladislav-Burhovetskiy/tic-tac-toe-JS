export default class View {
  $ = {};
  $$ = {};

  constructor() {
    this.$.menu = this.#qS('[data-id="menu"]');
    this.$.menuBtn = this.#qS('[data-id="menu-btn"]');
    this.$.menuItems = this.#qS('[data-id="menu-items"]');
    this.$.resetBtn = this.#qS('[data-id="reset-btn"]');
    this.$.newRoundBtn = this.#qS('[data-id="new-round-btn"]');
    this.$.modal = this.#qS('[data-id="modal"]');
    this.$.modalText = this.#qS('[data-id="modal-text"]');
    this.$.modalResetBtn = this.#qS('[data-id="modal-btn"]');
    this.$.turn = this.#qS('[data-id="turn"]');

    this.$$.squares = this.#qSAll('[data-id="square"]');

    // UI only
    this.$.menuBtn.addEventListener("click", (event) => {
      this.#toggleMenu();
    });
  }

  // register all event listeners
  bindGameResetEvent(handler) {
    this.$.resetBtn.addEventListener("click", handler);
    this.$.modalResetBtn.addEventListener("click", handler);
  }
  bindNewRoundEvent(handler) {
    this.$.newRoundBtn.addEventListener("click", handler);
  }
  bindPlayerMoveEvent(handler) {
    this.$$.squares.forEach((square) => {
      square.addEventListener("click", () => handler(square));
    });
  }

  // Utility DOM helper methods
  openModal(message) {
    this.$.modal.classList.remove("hidden");
    this.$.modalText.innerText = message;
  }

  closeModal() {
    this.$.modal.classList.add("hidden");
  }

  clearMoves() {
    this.$$.squares.forEach((square) => {
      square.replaceChildren();
    });
  }

  closeMenu() {
    this.$.menuItems.classList.add("hidden");
    this.$.menuBtn.classList.remove("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.remove("fa-chevron-up");
    icon.classList.add("fa-chevron-down");
  }

  #toggleMenu() {
    this.$.menuItems.classList.toggle("hidden");
    this.$.menuBtn.classList.toggle("border");

    const icon = this.$.menuBtn.querySelector("i");
    icon.classList.toggle("fa-chevron-down");
    icon.classList.toggle("fa-chevron-up");
  }

  handlePlayerMove(squarEl, player) {
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", player.iconClass, player.colorClass);
    squarEl.replaceChildren(icon);
  }

  // Player 1 | 2
  setTurnIndicator(player) {
    const icon = document.createElement("i");
    const label = document.createElement("p");

    icon.classList.add("fa-solid", player.colorClass, player.iconClass);

    label.classList.add(player.colorClass);
    label.innerText = `${player.name}, you're up!`;

    this.$.turn.replaceChildren(icon, label);
  }

  // querySelector
  #qS(selector, parent) {
    const el = parent
      ? parent.querySelector(selector)
      : document.querySelector(selector);

    if (!el) throw new Error("Could not find element!");

    return el;
  }

  #qSAll(selector) {
    const elList = document.querySelectorAll(selector);

    if (!elList) throw new Error("Could not find elements!");

    return elList;
  }
}
