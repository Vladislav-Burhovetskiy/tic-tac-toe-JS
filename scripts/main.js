import View from "./view.js";
import Store from "./store.js";

// const App = {
//   $: {
//     menu: document.querySelector('[data-id="menu"]'),
//     menuItems: document.querySelector('[data-id="menu-items"]'),
//     resetBtn: document.querySelector('[data-id="reset-btn"]'),
//     newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
//     squares: document.querySelectorAll('[data-id="square"]'),
//     modal: document.querySelector('[data-id="modal"]'),
//     modalText: document.querySelector('[data-id="modal-text"]'),
//     modalResetBtn: document.querySelector('[data-id="modal-btn"]'),
//     turn: document.querySelector('[data-id="turn"]'),
//   },

//   state: {
//     moves: [],
//   },

//   getGameStatus(moves) {
//     const p1Moves = moves
//       .filter((move) => move.playerId === 1)
//       .map((move) => move.squareId);
//     const p2Moves = moves
//       .filter((move) => move.playerId === 2)
//       .map((move) => move.squareId);

//     const winningPatterns = [
//       [1, 2, 3],
//       [1, 5, 9],
//       [1, 4, 7],
//       [2, 5, 8],
//       [3, 5, 7],
//       [3, 6, 9],
//       [4, 5, 6],
//       [7, 8, 9],
//     ];

//     let winner = null;

//     winningPatterns.forEach((winingPatern) => {
//       const p1Wins = winingPatern.every((v) => p1Moves.includes(v));
//       const p2Wins = winingPatern.every((v) => p2Moves.includes(v));

//       if (p1Wins) winner = 1;
//       if (p2Wins) winner = 2;
//     });

//     return {
//       status:
//         winner !== null || moves.length === 9 ? "completed" : "in-progress",
//       winner,
//     };
//   },

//   init: () => {
//     App.registerEventListeners();
//   },

//   registerEventListeners: () => {
//     App.$.menu.addEventListener("click", (event) => {
//       App.$.menuItems.classList.toggle("hidden");
//     });

//     App.$.resetBtn.addEventListener("click", (event) => {
//       console.log("Resent Button clicked");
//     });

//     App.$.newRoundBtn.addEventListener("click", (event) => {
//       console.log("New Round Button clicked");
//     });

//     App.$.modalResetBtn.addEventListener("click", (event) => {
//       App.state.moves = [];
//       App.$.squares.forEach((square) => square.replaceChildren());
//       App.$.modal.classList.add("hidden");
//     });

//     App.$.squares.forEach((square) => {
//       square.addEventListener("click", (event) => {
//         // check if in this (square.id with moves.squareId) is already play
//         function hasMove(sId) {
//           const matchId = App.state.moves.find((move) => move.squareId === sId);
//           return matchId !== undefined;
//         }
//         if (hasMove(+square.id)) {
//           return;
//         }
//         // if (square.hasChildNodes()) {
//         //   return;
//         // }

//         // add element to squares
//         const lastMove = App.state.moves.at(-1);
//         const changePlayer = (player) => {
//           return player === 1 ? 2 : 1;
//         };
//         const currentPlayer =
//           App.state.moves.length === 0 ? 1 : changePlayer(lastMove.playerId);
//         // const currentPlayer = App.state.moves.length === 0
//         // ? 1
//         // : lastMove.playerId === 1 ? 2 : 1;
//         const nextPlayer = changePlayer(currentPlayer);

//         const squareIcon = document.createElement("i");
//         const turnIcon = document.createElement("i");
//         const turnLabel = document.createElement("p");
//         turnLabel.innerText = `Player ${nextPlayer}, you're up!`;

//         if (currentPlayer === 1) {
//           squareIcon.classList.add("fa-solid", "fa-x", "turquoise");
//           turnIcon.classList.add("fa-solid", "fa-o", "yellow");
//           turnLabel.classList = "yellow";
//         } else {
//           squareIcon.classList.add("fa-solid", "fa-o", "yellow");
//           turnIcon.classList.add("fa-solid", "fa-x", "turquoise");
//           turnLabel.classList = "turquoise";
//         }
//         App.$.turn.replaceChildren(turnIcon, turnLabel);

//         App.state.moves.push({
//           squareId: +square.id,
//           playerId: currentPlayer,
//         });

//         square.replaceChildren(squareIcon);

//         // check if players win / tie the game
//         const game = App.getGameStatus(App.state.moves);
//         if (game.status === "completed") {
//           App.$.modal.classList.remove("hidden");

//           let message = "";

//           if (game.winner) {
//             message = `Player ${game.winner} wins!`;
//           } else {
//             message = "Tie game!";
//           }

//           App.$.modalText.textContent = message;
//         }
//       });
//     });
//   },
// };

// window.addEventListener("load", () => {
//   App.init();
// });

// const menu = document.querySelector(".menu");
// const menuItems = document.querySelector(".items")
// menu.addEventListener("click", (event) => {
//   menuItems.classList.toggle("hidden")
// });

const players = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store(players);

  view.bindGameResetEvent((event) => {
    view.closeModal();
    store.reset();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    // or
    // view.setTurnIndicator(players[0]);
    view.closeMenu();
  });

  view.bindNewRoundEvent((event) => {
    view.closeMenu()
    store.reset();
    view.clearMoves();
    view.setTurnIndicator(store.game.currentPlayer);
    console.log("New Round clicked");
    console.log(event);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (movie) => movie.squareId === +square.id
    );
    if (existingMove) {
      return;
    }

    view.handlePlayerMove(square, store.game.currentPlayer);

    store.playerMove(+square.id);

    if (store.game.status.isComplete) {
      view.openModal(
        store.game.status.winner
          ? `${store.game.status.winner.name} wins!`
          : "Tie game!"
      );

      return;
    }

    // Set the next player's turn indicator
    view.setTurnIndicator(store.game.currentPlayer);
  });
}

window.addEventListener("load", init);
