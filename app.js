import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    get
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


/* =========================
   FIREBASE
========================= */

const firebaseConfig = {
    databaseURL:
        "https://truth-or-dare-5bd94-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


/* =========================
   HTML ELEMENTS
========================= */

const createRoomBtn =
    document.getElementById("createRoomBtn");

const joinRoomBtn =
    document.getElementById("joinRoomBtn");

const homeSection =
    document.getElementById("homeSection");

const joinSection =
    document.getElementById("joinSection");

const roomSection =
    document.getElementById("roomSection");

const gameSection =
    document.getElementById("gameSection");

const roomCodeInput =
    document.getElementById("roomCodeInput");

const playerNameInput =
    document.getElementById("playerNameInput");

const joinBtn =
    document.getElementById("joinBtn");

const startGameBtn =
    document.getElementById("startGameBtn");

const readyBtn =
    document.getElementById("readyBtn");

const roomCodeDisplay =
    document.getElementById("roomCode");

const playersList =
    document.getElementById("playersList");

const scoresList =
    document.getElementById("scoresList");

const turnText =
    document.getElementById("turnText");

const choiceButtons =
    document.getElementById("choiceButtons");

const truthBtn =
    document.getElementById("truthBtn");

const dareBtn =
    document.getElementById("dareBtn");

const questionBox =
    document.getElementById("questionBox");

const questionType =
    document.getElementById("questionType");

const questionText =
    document.getElementById("questionText");

const doneBtn =
    document.getElementById("doneBtn");

const classicThemeBtn =
    document.getElementById("classicThemeBtn");

const spicyThemeBtn =
    document.getElementById("spicyThemeBtn");

const themeStatus =
    document.getElementById("themeStatus");

const round5Btn =
    document.getElementById("round5Btn");

const round10Btn =
    document.getElementById("round10Btn");

const round20Btn =
    document.getElementById("round20Btn");

const roundStatus =
    document.getElementById("roundStatus");


/* WINNER */

const winnerBox =
    document.getElementById("winnerBox");

const winnerName =
    document.getElementById("winnerName");

const winnerScore =
    document.getElementById("winnerScore");

const finalScores =
    document.getElementById("finalScores");

const playAgainBtn =
    document.getElementById("playAgainBtn");


/* SHARE */

const shareRoomBtn =
    document.getElementById("shareRoomBtn");


/* =========================
   VARIABLES
========================= */

let currentRoomCode = null;
let currentPlayerId = null;

let isHost = false;
let isReady = false;

let selectedTheme = "classic";
let selectedRounds = 5;


/* =========================
   QUESTIONS
========================= */

const classicTruths = [
    "What is the most embarrassing thing you've ever done?",
    "Who was your first crush?",
    "What is your biggest fear?",
    "What is the weirdest thing you've searched online?",
    "What is your biggest guilty pleasure?",
    "Who in this room knows you the best?",
    "What is one thing you would change about yourself?",
    "What is the funniest lie you've ever told?",
    "What is your most embarrassing school memory?",
    "What is something childish you still enjoy?",
    "What is the strangest dream you've ever had?",
    "What is your worst habit?",
    "What is the last thing you did that you regret?",
    "Who would you call first in an emergency?",
    "What is one secret talent you have?",
    "What is the funniest thing that happened to you recently?",
    "What is something you are surprisingly good at?",
    "What is the weirdest food combination you enjoy?",
    "What is your most useless skill?",
    "What is the funniest nickname you've ever had?"
];

const classicDares = [
    "Do your best dance for 20 seconds.",
    "Sing the chorus of your favorite song.",
    "Talk in a funny accent for the next round.",
    "Do 15 squats.",
    "Make the funniest face you can.",
    "Act like a celebrity for 30 seconds.",
    "Tell a joke without laughing.",
    "Do your best impression of someone in the room.",
    "Speak only using questions for one minute.",
    "Pretend you're a news reporter and report what is happening.",
    "Do your best victory celebration.",
    "Walk around like a model for 20 seconds.",
    "Say the alphabet backwards as far as you can.",
    "Do an imaginary football celebration.",
    "Make up a short song about another player.",
    "Pretend to be a waiter taking everyone's order.",
    "Do 10 jumping jacks.",
    "Give yourself a ridiculous nickname for the next round.",
    "Try to make another player laugh without touching them.",
    "Act like your favorite movie character for 30 seconds."
];

const spicyTruths = [
    "Who was the last person you had a crush on?",
    "Have you ever liked someone you shouldn't have?",
    "Have you ever flirted with someone just for fun?",
    "What is the biggest secret you've kept from your friends?",
    "Who in this room would you go on a date with?",
    "What is the most attractive quality in someone?",
    "Have you ever had a crush on a friend's friend?",
    "What is the boldest thing you've done to get someone's attention?",
    "Have you ever sent a message and immediately regretted it?",
    "Who was your most unexpected crush?",
    "What is the biggest red flag you have ignored?",
    "Have you ever pretended not to like someone when you actually did?",
    "What is the most romantic thing you've ever done?",
    "What is something that instantly makes someone attractive to you?",
    "Have you ever been caught flirting?",
    "What is your biggest dating mistake?",
    "Have you ever liked two people at the same time?",
    "Who would you trust with your biggest secret?",
    "What is the most daring message you've ever sent?",
    "What is something you've always wanted to ask someone but were too shy?"
];

const spicyDares = [
    "Give another player a genuine compliment.",
    "Let another player choose your profile picture for 10 minutes.",
    "Send a funny emoji to the last person you messaged.",
    "Do your best flirty movie-character impression for 20 seconds.",
    "Let the group choose a ridiculous nickname for you.",
    "Give someone in the room your best pickup line.",
    "Read your last sent message out loud.",
    "Let another player ask you one question and answer honestly.",
    "Do a dramatic romantic movie scene with an imaginary partner.",
    "Say three nice things about the person chosen by the group.",
    "Make up a cheesy pickup line using another player's name.",
    "Call someone a ridiculous romantic nickname for the next round.",
    "Do your best model walk for 20 seconds.",
    "Pretend you're proposing to a random object in the room.",
    "Describe your perfect date in 20 seconds.",
    "Act out a dramatic breakup scene with a chair.",
    "Give the funniest compliment you can.",
    "Let another player choose one word you must use in every sentence for one minute.",
    "Do a dramatic love-song performance.",
    "Tell the group your most embarrassing dating story."
];


/* =========================
   ROOM CODE
========================= */

function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 4; i++) {

        code +=
            characters[
                Math.floor(
                    Math.random() *
                    characters.length
                )
            ];

    }

    return code;
}


/* =========================
   CREATE ROOM
========================= */

createRoomBtn.addEventListener(
    "click",
    async () => {

        const playerName =
            prompt("Enter your name:");

        if (!playerName) return;

        const roomCode =
            generateRoomCode();

        currentRoomCode =
            roomCode;

        isHost = true;
        isReady = false;

        selectedTheme =
            "classic";

        selectedRounds =
            5;


        const roomRef =
            ref(
                db,
                "rooms/" +
                roomCode
            );


        await set(
            roomRef,
            {
                host: playerName,
                createdAt: Date.now(),
                status: "lobby",
                theme: "classic",
                rounds: 5
            }
        );


        const playerRef =
            push(
                ref(
                    db,
                    "rooms/" +
                    roomCode +
                    "/players"
                )
            );


        currentPlayerId =
            playerRef.key;


        await set(
            playerRef,
            {
                name: playerName,
                host: true,
                ready: false,
                score: 0
            }
        );


        roomCodeDisplay.textContent =
            roomCode;


        homeSection.classList.add(
            "hidden"
        );

        roomSection.classList.remove(
            "hidden"
        );


        listenToPlayers(
            roomCode
        );

        listenToGame(
            roomCode
        );

        listenToTheme(
            roomCode
        );

        listenToRounds(
            roomCode
        );

    }
);


/* =========================
   JOIN SCREEN
========================= */

joinRoomBtn.addEventListener(
    "click",
    () => {

        homeSection.classList.add(
            "hidden"
        );

        joinSection.classList.remove(
            "hidden"
        );

    }
);


/* =========================
   JOIN ROOM
========================= */

joinBtn.addEventListener(
    "click",
    async () => {

        const roomCode =
            roomCodeInput.value
                .trim()
                .toUpperCase();

        const playerName =
            playerNameInput.value
                .trim();


        if (!roomCode || !playerName) {

            alert(
                "Enter your name and room code."
            );

            return;
        }


        const roomRef =
            ref(
                db,
                "rooms/" +
                roomCode
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            alert(
                "Room does not exist."
            );

            return;
        }


        currentRoomCode =
            roomCode;

        isHost = false;
        isReady = false;


        const playerRef =
            push(
                ref(
                    db,
                    "rooms/" +
                    roomCode +
                    "/players"
                )
            );


        currentPlayerId =
            playerRef.key;


        await set(
            playerRef,
            {
                name: playerName,
                host: false,
                ready: false,
                score: 0
            }
        );


        roomCodeDisplay.textContent =
            roomCode;


        joinSection.classList.add(
            "hidden"
        );

        roomSection.classList.remove(
            "hidden"
        );


        listenToPlayers(
            roomCode
        );

        listenToGame(
            roomCode
        );

        listenToTheme(
            roomCode
        );

        listenToRounds(
            roomCode
        );

    }
);


/* =========================
   SHARE ROOM
========================= */

shareRoomBtn.addEventListener(
    "click",
    async () => {

        if (!currentRoomCode)
            return;


        const shareText =
            "🎭 Join my Truth or Dare game!\n\n" +
            "Room Code: " +
            currentRoomCode +
            "\n\n" +
            "Come play with us! 🔥";


        try {

            if (
                navigator.share
            ) {

                await navigator.share({

                    title:
                        "Truth or Dare 🎭",

                    text:
                        shareText

                });

            } else {

                await navigator.clipboard.writeText(
                    shareText
                );


                shareRoomBtn.textContent =
                    "✅ Copied!";


                setTimeout(
                    () => {

                        shareRoomBtn.textContent =
                            "📤 Share Room";

                    },
                    2000
                );

            }

        } catch (error) {

            console.log(
                "Share cancelled."
            );

        }

    }
);


/* =========================
   PLAYERS
========================= */

function listenToPlayers(
    roomCode
) {

    const playersRef =
        ref(
            db,
            "rooms/" +
            roomCode +
            "/players"
        );


    onValue(
        playersRef,
        (snapshot) => {

            playersList.innerHTML =
                "";


            if (!snapshot.exists())
                return;


            const players =
                snapshot.val();


            updateScoreboard(
                players
            );


            Object.entries(
                players
            ).forEach(
                ([playerId, player]) => {

                    const playerDiv =
                        document.createElement(
                            "div"
                        );


                    playerDiv.className =
                        player.ready
                            ? "player ready"
                            : "player not-ready";


                    const status =
                        player.ready
                            ? " 🟢 READY"
                            : " ⚪ NOT READY";


                    playerDiv.textContent =
                        player.host
                            ? "👑 " +
                              player.name +
                              status
                            : "👤 " +
                              player.name +
                              status;


                    playersList.appendChild(
                        playerDiv
                    );

                }
            );


            const currentPlayer =
                players[
                    currentPlayerId
                ];


            if (currentPlayer) {

                isReady =
                    currentPlayer.ready === true;


                readyBtn.textContent =
                    isReady
                        ? "❌ Not Ready"
                        : "✅ Ready";

            }


            const allPlayersReady =
                Object.values(
                    players
                ).every(
                    player =>
                        player.ready === true
                );


            if (isHost) {

                startGameBtn.disabled =
                    !allPlayersReady;


                if (allPlayersReady) {

                    startGameBtn.classList.add(
                        "ready-to-start"
                    );

                } else {

                    startGameBtn.classList.remove(
                        "ready-to-start"
                    );

                }

            } else {

                startGameBtn.disabled =
                    true;

            }

        }
    );

}


/* =========================
   SCOREBOARD
========================= */

function updateScoreboard(
    players
) {

    scoresList.innerHTML =
        "";


    const sortedPlayers =
        Object.entries(
            players
        ).sort(
            (a, b) =>
                (b[1].score || 0) -
                (a[1].score || 0)
        );


    sortedPlayers.forEach(
        ([playerId, player], index) => {

            const scoreDiv =
                document.createElement(
                    "div"
                );


            scoreDiv.className =
                "score-player";


            const medal =
                index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : "👤";


            scoreDiv.innerHTML = `

                <span>
                    ${medal} ${player.name}
                </span>

                <strong>
                    ${player.score || 0} pts
                </strong>

            `;


            scoresList.appendChild(
                scoreDiv
            );

        }
    );

}


/* =========================
   READY
========================= */

readyBtn.addEventListener(
    "click",
    async () => {

        if (
            !currentRoomCode ||
            !currentPlayerId
        )
            return;


        isReady =
            !isReady;


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/players/" +
                currentPlayerId +
                "/ready"
            ),
            isReady
        );

    }
);


/* =========================
   THEME
========================= */

classicThemeBtn.addEventListener(
    "click",
    async () => {

        if (
            !currentRoomCode ||
            !isHost
        )
            return;


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/theme"
            ),
            "classic"
        );

    }
);


spicyThemeBtn.addEventListener(
    "click",
    async () => {

        if (
            !currentRoomCode ||
            !isHost
        )
            return;


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/theme"
            ),
            "spicy"
        );

    }
);


function listenToTheme(
    roomCode
) {

    const themeRef =
        ref(
            db,
            "rooms/" +
            roomCode +
            "/theme"
        );


    onValue(
        themeRef,
        (snapshot) => {

            const theme =
                snapshot.val() ||
                "classic";


            selectedTheme =
                theme;


            if (theme === "classic") {

                classicThemeBtn.classList.add(
                    "selected"
                );

                spicyThemeBtn.classList.remove(
                    "selected"
                );

                themeStatus.textContent =
                    "💜 Classic theme selected";

            } else {

                classicThemeBtn.classList.remove(
                    "selected"
                );

                spicyThemeBtn.classList.add(
                    "selected"
                );

                themeStatus.textContent =
                    "🔥 Spicy theme selected";

            }

        }
    );

}


/* =========================
   ROUNDS
========================= */

round5Btn.addEventListener(
    "click",
    () => {

        if (!isHost) return;

        setRounds(5);

    }
);


round10Btn.addEventListener(
    "click",
    () => {

        if (!isHost) return;

        setRounds(10);

    }
);


round20Btn.addEventListener(
    "click",
    () => {

        if (!isHost) return;

        setRounds(20);

    }
);


async function setRounds(
    rounds
) {

    selectedRounds =
        rounds;


    await set(
        ref(
            db,
            "rooms/" +
            currentRoomCode +
            "/rounds"
        ),
        rounds
    );

}


function listenToRounds(
    roomCode
) {

    const roundsRef =
        ref(
            db,
            "rooms/" +
            roomCode +
            "/rounds"
        );


    onValue(
        roundsRef,
        (snapshot) => {

            const rounds =
                snapshot.val() || 5;


            selectedRounds =
                rounds;


            round5Btn.classList.remove(
                "selected"
            );

            round10Btn.classList.remove(
                "selected"
            );

            round20Btn.classList.remove(
                "selected"
            );


            if (rounds === 5)
                round5Btn.classList.add(
                    "selected"
                );


            if (rounds === 10)
                round10Btn.classList.add(
                    "selected"
                );


            if (rounds === 20)
                round20Btn.classList.add(
                    "selected"
                );


            roundStatus.textContent =
                rounds +
                " rounds selected";

        }
    );

}


/* =========================
   START GAME
========================= */

startGameBtn.addEventListener(
    "click",
    async () => {

        if (!currentRoomCode) {

            alert(
                "No room found."
            );

            return;
        }


        if (!isHost) {

            alert(
                "Only the host can start the game."
            );

            return;
        }


        const playersRef =
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/players"
            );


        const snapshot =
            await get(
                playersRef
            );


        if (!snapshot.exists()) {

            alert(
                "No players found."
            );

            return;
        }


        const players =
            snapshot.val();


        const playerIds =
            Object.keys(
                players
            );


        const everyoneReady =
            Object.values(
                players
            ).every(
                player =>
                    player.ready === true
            );


        if (!everyoneReady) {

            alert(
                "Everyone must be READY before starting."
            );

            return;
        }


        const firstPlayerId =
            playerIds[0];


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/game"
            ),
            {
                status: "playing",
                currentPlayerId:
                    firstPlayerId,
                choice: null,
                question: null,
                round: 1,
                totalRounds:
                    selectedRounds
            }
        );

    }
);


/* =========================
   GAME LISTENER
========================= */

function listenToGame(
    roomCode
) {

    const gameRef =
        ref(
            db,
            "rooms/" +
            roomCode +
            "/game"
        );


    onValue(
        gameRef,
        async (snapshot) => {

            if (!snapshot.exists())
                return;


            const game =
                snapshot.val();


            if (
                game.status ===
                "finished"
            ) {

                await showWinnerScreen(
                    roomCode
                );

                return;
            }


            if (
                game.status !==
                "playing"
            )
                return;


            roomSection.classList.add(
                "hidden"
            );

            gameSection.classList.remove(
                "hidden"
            );


            winnerBox.classList.add(
                "hidden"
            );


            const playersSnapshot =
                await get(
                    ref(
                        db,
                        "rooms/" +
                        roomCode +
                        "/players"
                    )
                );


            if (
                !playersSnapshot.exists()
            )
                return;


            const players =
                playersSnapshot.val();


            const currentPlayer =
                players[
                    game.currentPlayerId
                ];


            if (currentPlayer) {

                turnText.textContent =
                    "🎯 " +
                    currentPlayer.name +
                    "'s turn";

            }


            if (
                game.choice &&
                game.question
            ) {

                choiceButtons.classList.add(
                    "hidden"
                );

                questionBox.classList.remove(
                    "hidden"
                );

                doneBtn.classList.remove(
                    "hidden"
                );


                questionType.textContent =
                    game.choice === "truth"
                        ? "❤️ TRUTH"
                        : "🔥 DARE";


                questionText.textContent =
                    game.question;

            } else {

                choiceButtons.classList.remove(
                    "hidden"
                );

                questionBox.classList.add(
                    "hidden"
                );

            }

        }
    );

}


/* =========================
   TRUTH / DARE
========================= */

truthBtn.addEventListener(
    "click",
    async () => {

        await chooseQuestion(
            "truth"
        );

    }
);


dareBtn.addEventListener(
    "click",
    async () => {

        await chooseQuestion(
            "dare"
        );

    }
);


async function chooseQuestion(
    type
) {

    if (!currentRoomCode)
        return;


    const gameSnapshot =
        await get(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/game"
            )
        );


    if (!gameSnapshot.exists())
        return;


    const game =
        gameSnapshot.val();


    if (game.choice)
        return;


    if (
        game.currentPlayerId !==
        currentPlayerId
    ) {

        alert(
            "It's not your turn!"
        );

        return;
    }


    let list;


    if (
        selectedTheme ===
        "spicy"
    ) {

        list =
            type === "truth"
                ? spicyTruths
                : spicyDares;

    } else {

        list =
            type === "truth"
                ? classicTruths
                : classicDares;

    }


    const question =
        list[
            Math.floor(
                Math.random() *
                list.length
            )
        ];


    await set(
        ref(
            db,
            "rooms/" +
            currentRoomCode +
            "/game"
        ),
        {
            status: "playing",

            currentPlayerId:
                game.currentPlayerId,

            choice:
                type,

            question:
                question,

            round:
                game.round || 1,

            totalRounds:
                game.totalRounds ||
                selectedRounds
        }
    );

}


/* =========================
   DONE
========================= */

doneBtn.addEventListener(
    "click",
    async () => {

        if (!currentRoomCode)
            return;


        const gameSnapshot =
            await get(
                ref(
                    db,
                    "rooms/" +
                    currentRoomCode +
                    "/game"
                )
            );


        if (!gameSnapshot.exists())
            return;


        const game =
            gameSnapshot.val();


        if (
            game.currentPlayerId !==
            currentPlayerId
        ) {

            alert(
                "Only the current player can finish."
            );

            return;
        }


        const playersSnapshot =
            await get(
                ref(
                    db,
                    "rooms/" +
                    currentRoomCode +
                    "/players"
                )
            );


        if (
            !playersSnapshot.exists()
        )
            return;


        const players =
            playersSnapshot.val();


        players[
            game.currentPlayerId
        ].score =
            (
                players[
                    game.currentPlayerId
                ].score || 0
            ) + 1;


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/players"
            ),
            players
        );


        const playerIds =
            Object.keys(
                players
            );


        const currentIndex =
            playerIds.indexOf(
                game.currentPlayerId
            );


        const nextIndex =
            (
                currentIndex + 1
            ) %
            playerIds.length;


        const nextPlayerId =
            playerIds[
                nextIndex
            ];


        const currentRound =
            game.round || 1;


        const totalRounds =
            game.totalRounds ||
            selectedRounds;


        if (
            currentRound >=
            totalRounds
        ) {

            await set(
                ref(
                    db,
                    "rooms/" +
                    currentRoomCode +
                    "/game"
                ),
                {
                    status: "finished",
                    round:
                        currentRound,
                    totalRounds:
                        totalRounds
                }
            );

            return;
        }


        const nextRound =
            currentRound + 1;


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/game"
            ),
            {
                status: "playing",

                currentPlayerId:
                    nextPlayerId,

                choice:
                    null,

                question:
                    null,

                round:
                    nextRound,

                totalRounds:
                    totalRounds
            }
        );

    }
);


/* =========================
   WINNER SCREEN
========================= */

async function showWinnerScreen(
    roomCode
) {

    const playersSnapshot =
        await get(
            ref(
                db,
                "rooms/" +
                roomCode +
                "/players"
            )
        );


    if (
        !playersSnapshot.exists()
    )
        return;


    const players =
        playersSnapshot.val();


    const sortedPlayers =
        Object.values(
            players
        ).sort(
            (a, b) =>
                (b.score || 0) -
                (a.score || 0)
        );


    if (
        sortedPlayers.length === 0
    )
        return;


    const winner =
        sortedPlayers[0];


    roomSection.classList.add(
        "hidden"
    );

    gameSection.classList.remove(
        "hidden"
    );


    choiceButtons.classList.add(
        "hidden"
    );

    questionBox.classList.add(
        "hidden"
    );


    winnerBox.classList.remove(
        "hidden"
    );


    winnerName.textContent =
        winner.name;


    winnerScore.textContent =
        (winner.score || 0) +
        " points";


    finalScores.innerHTML =
        "<h3>🏆 Final Scores</h3>";


    sortedPlayers.forEach(
        (player, index) => {

            const scoreDiv =
                document.createElement(
                    "div"
                );


            scoreDiv.className =
                "score-player";


            const medal =
                index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : "👤";


            scoreDiv.innerHTML = `

                <span>
                    ${medal} ${player.name}
                </span>

                <strong>
                    ${player.score || 0} pts
                </strong>

            `;


            finalScores.appendChild(
                scoreDiv
            );

        }
    );

}


/* =========================
   PLAY AGAIN
========================= */

playAgainBtn.addEventListener(
    "click",
    async () => {

        if (!currentRoomCode)
            return;


        if (!isHost) {

            alert(
                "Only the host can start a new game."
            );

            return;
        }


        const playersRef =
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/players"
            );


        const snapshot =
            await get(
                playersRef
            );


        if (!snapshot.exists())
            return;


        const players =
            snapshot.val();


        Object.keys(
            players
        ).forEach(
            playerId => {

                players[
                    playerId
                ].score = 0;

                players[
                    playerId
                ].ready = false;

            }
        );


        await set(
            playersRef,
            players
        );


        await set(
            ref(
                db,
                "rooms/" +
                currentRoomCode +
                "/game"
            ),
            {
                status: "lobby"
            }
        );


        winnerBox.classList.add(
            "hidden"
        );

        gameSection.classList.add(
            "hidden"
        );

        roomSection.classList.remove(
            "hidden"
        );


        isReady = false;

    }
);