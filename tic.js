const player_1 = "O";
const player_2 = "X";
let turn = 0;    ///turn=0 means player 1's turn,turn=1 means player 2's turn
let score_player_1=0;
let score_player_2=0;
let full_board = false;
let board = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".play-area");
const score_container = document.querySelector(".container_header");
const winner = document.getElementById("winner");

check_board_complete = () => {
  let flag = true;
  board.forEach(x => {
    if (x != player_1 && x != player_2) {
      flag = false;
    }
  });
  full_board = flag;
};

const check_line = (a, b, c) => {
  return (
    board[a] == board[b] &&
    board[b] == board[c] &&
    (board[a] == player_1 || board[a] == player_2)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      return board[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      return board[i];
    }
  }
  if (check_line(0, 4, 8)) {
    return board[0];
  }
  if (check_line(2, 4, 6)) {
    return board[2];
  }
  return "";
};

const check_winner = () => {
  let result = check_match()
  if (result == player_1) {
    winner.innerText = "WINNER: PLAYER 1";
    winner.classList.add("PLAYER_1_WIN");
    full_board = true
    score_player_1=score_player_1+1;
    document.getElementById('1').innerHTML = score_player_1;
  } else if (result == player_2) {
    winner.innerText = "WINNER: PLAYER 2";
    winner.classList.add("PLAYER_2_WIN");
    full_board = true
    score_player_2=score_player_2+1;
    document.getElementById('2').innerHTML = score_player_2;
  } else if (full_board) {
    winner.innerText = "DRAW";
    winner.classList.add("DRAW");
  }
};

const render_board = () => {
  board_container.innerHTML = ""
  board.forEach((c, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${board[i]}</div>`
    if (c == player_1 || c == player_2) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const loop = () => {
  render_board();
  check_board_complete();
  check_winner();
}

const addPlayerMove = e =>{
    if (!full_board && board[e] == ""){
      if(turn==0){
        board[e] = player_1;
      }
      else{
        board[e] = player_2;
      }
      turn=1-turn;
      loop();
    }
};
const reset_board = () => {
  board = ["", "", "", "", "", "", "", "", ""];
  turn=0;
  full_board = false;
  winner.classList.remove("PLAYER_1_WIN");
  winner.classList.remove("PLAYER_2_WIN");
  winner.classList.remove("DRAW");
  winner.innerText = "";
  render_board();
};

//initial render
const reset_score= () =>
{
  document.getElementById('2').innerHTML = 0;
  score_player_2=0;
  document.getElementById('1').innerHTML = 0;
  score_player_1=0;
}
reset_score();
render_board();
