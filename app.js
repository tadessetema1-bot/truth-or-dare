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

const createRoomBtn = document.getElementById("createRoomBtn");
const joinRoomBtn = document.getElementById("joinRoomBtn");

const homeSection = document.getElementById("homeSection");
const joinSection = document.getElementById("joinSection");
const roomSection = document.getElementById("roomSection");
const gameSection = document.getElementById("gameSection");

const roomCodeInput = document.getElementById("roomCodeInput");
const playerNameInput = document.getElementById("playerNameInput");
const joinBtn = document.getElementById("joinBtn");

const startGameBtn = document.getElementById("startGameBtn");
const readyBtn = document.getElementById("readyBtn");

const roomCodeDisplay = document.getElementById("roomCode");
const playersList = document.getElementById("playersList");
const scoresList = document.getElementById("scoresList");

const turnText = document.getElementById("turnText");

const choiceButtons = document.getElementById("choiceButtons");
const truthBtn = document.getElementById("truthBtn");
const dareBtn = document.getElementById("dareBtn");

const questionBox = document.getElementById("questionBox");
const questionType = document.getElementById("questionType");
const questionText = document.getElementById("questionText");
const doneBtn = document.getElementById("doneBtn");

const classicThemeBtn = document.getElementById("classicThemeBtn");
const spicyThemeBtn = document.getElementById("spicyThemeBtn");
const themeStatus = document.getElementById("themeStatus");

const round5Btn = document.getElementById("round5Btn");
const round10Btn = document.getElementById("round10Btn");
const round20Btn = document.getElementById("round20Btn");
const roundStatus = document.getElementById("roundStatus");

const winnerBox = document.getElementById("winnerBox");
const winnerName = document.getElementById("winnerName");
const winnerScore = document.getElementById("winnerScore");
const finalScores = document.getElementById("finalScores");
const playAgainBtn = document.getElementById("playAgainBtn");

const shareRoomBtn = document.getElementById("shareRoomBtn");


/* =========================
   CHAT ELEMENTS
========================= */

const chatMessages =
    document.getElementById("chatMessages");

const chatInput =
    document.getElementById("chatInput");

const sendChatBtn =
    document.getElementById("sendChatBtn");

const gameChatMessages =
    document.getElementById("gameChatMessages");

const gameChatInput =
    document.getElementById("gameChatInput");

const sendGameChatBtn =
    document.getElementById("sendGameChatBtn");


/* =========================
   VARIABLES
========================= */

let currentRoomCode = null;
let currentPlayerId = null;

let currentPlayerName = "";

let isHost = false;
let isReady = false;

let selectedTheme = "classic";
let selectedRounds = 5;


/* =========================
   QUESTION DATABASE
   500 TOTAL
========================= */

/* ---------- CLASSIC TRUTHS: 125 ---------- */

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
"What is the funniest nickname you've ever had?",

"What is the longest you've gone without cleaning your room?",
"What is the strangest thing you believed as a child?",
"What is your favorite childhood memory?",
"What is one food you absolutely refuse to eat?",
"What is your most embarrassing autocorrect mistake?",
"What is the weirdest dream you remember?",
"What is the funniest excuse you've used to avoid something?",
"What is one thing you are secretly proud of?",
"What is your favorite thing about yourself?",
"What is one thing you wish you were better at?",
"What is the last thing that made you laugh really hard?",
"What is your favorite movie of all time?",
"What is a movie everyone loves that you don't like?",
"What is your favorite song right now?",
"What song do you secretly know all the words to?",
"What is your most used emoji?",
"What is the first thing you check on your phone?",
"What is your longest screen-time day?",
"What app do you use the most?",
"What is the funniest photo on your phone?",

"Have you ever fallen asleep somewhere unusual?",
"What is the strangest place you've ever fallen asleep?",
"What is the worst haircut you've ever had?",
"Have you ever worn something backwards without noticing?",
"What is your most embarrassing public moment?",
"Have you ever walked into the wrong room?",
"Have you ever called someone by the wrong name?",
"What is the funniest misunderstanding you've had?",
"Have you ever laughed at the wrong time?",
"What is the worst joke you've ever told?",
"Have you ever forgotten someone's birthday?",
"What is the worst gift you've ever received?",
"What is the worst gift you've ever given?",
"Have you ever pretended to understand something when you didn't?",
"Have you ever pretended to like a food you hated?",
"What is your strangest habit?",
"What do you do when nobody is watching?",
"What is something you do that annoys other people?",
"What is your most annoying habit?",
"What is something your friends always tease you about?",

"What is your favorite sport?",
"What sport would you like to try?",
"What is your favorite football team?",
"Who is your favorite athlete?",
"What is your favorite video game?",
"What game could you play for hours?",
"What is the first video game you remember playing?",
"What is your favorite TV show?",
"What TV show have you watched more than once?",
"What fictional character do you relate to most?",
"What movie character would you want as a friend?",
"What is your favorite type of music?",
"What is the strangest song you enjoy?",
"Who is your favorite singer?",
"What is your favorite holiday?",
"What is your dream travel destination?",
"What is the best place you've ever visited?",
"Where would you live if you could live anywhere?",
"What country would you most like to visit?",
"What is your favorite thing to do on weekends?",

"What is your biggest pet peeve?",
"What sound annoys you the most?",
"What smell do you love?",
"What smell do you hate?",
"What is something you could never live without?",
"What is your favorite possession?",
"What is something you lost that you wish you still had?",
"What is the oldest thing you own?",
"What is something you always carry with you?",
"What is your favorite item of clothing?",
"What is your favorite color?",
"What color do you wear the most?",
"What is your favorite animal?",
"What animal would you never want as a pet?",
"Are you a morning person or a night person?",
"What is your favorite time of day?",
"What is your favorite season?",
"What weather makes you happiest?",
"What is your perfect lazy day?",
"What is your ideal weekend?",

"What is something you are currently learning?",
"What skill would you love to master?",
"What job would you try for one day?",
"What would you do if money wasn't a problem?",
"What is one career you would never choose?",
"What is your biggest goal right now?",
"What is something you want to accomplish this year?",
"What is one place you want to visit before you die?",
"What is one thing on your bucket list?",
"What is something you've always wanted to try?",
"What is something you are afraid to try?",
"What is one thing you would change about the world?",
"What is one invention you wish existed?",
"What would you do with one million dollars?",
"What would you buy first if you became rich?",
"Would you rather be famous or wealthy?",
"What is your dream house like?",
"What is your dream car?",
"What is your dream vacation?",
"What is your idea of a perfect day?",

"Who is the funniest person you know?",
"Who is the most organized person you know?",
"Who is the most chaotic person you know?",
"Who is the most adventurous person you know?",
"Who is the best storyteller you know?",
"Who makes you laugh the most?",
"Who would survive longest in the wilderness?",
"Who would be most likely to become famous?",
"Who would be the best teacher?",
"Who would be the worst teacher?",
"Who would you trust to plan a trip?",
"Who would you trust with your phone?",
"Who would you choose as your teammate?",
"Who would you call for relationship advice?",
"Who gives the best advice?",
"Who has the best sense of humor?",
"Who has the best fashion sense?",
"Who is most likely to be late?",
"Who is most likely to forget something important?",
"Who is most likely to become a millionaire?",

"What is one thing people often misunderstand about you?",
"What is something you wish people knew about you?",
"What makes you feel appreciated?",
"What instantly puts you in a good mood?",
"What instantly ruins your mood?",
"What is something you are grateful for?",
"What is the best compliment you've ever received?",
"What compliment do you like giving people?",
"What is something you wish you had more time for?",
"What is something you spend too much time doing?"
];


/* ---------- CLASSIC DARES: 125 ---------- */

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
"Act like your favorite movie character for 30 seconds.",

"Do your best robot dance.",
"Speak like a sports commentator for one minute.",
"Do five dramatic movie poses.",
"Balance an object on your head for 20 seconds.",
"Sing a song using only humming.",
"Make a commercial for a random object nearby.",
"Act like you're walking on the moon.",
"Pretend you're accepting an award.",
"Give a motivational speech to a chair.",
"Do your best animal impression.",
"Walk backwards for 20 seconds.",
"Do your best slow-motion action scene.",
"Pretend to be a famous chef.",
"Describe your shoes like a luxury product.",
"Make up a new dance move and name it.",
"Do an exaggerated runway walk.",
"Pretend you're a weather presenter.",
"Act like your phone is interviewing you.",
"Give a dramatic reading of the room.",
"Pretend you just won the lottery.",

"Do 10 push-ups or a wall push-up variation.",
"Do 15 jumping jacks.",
"Hold a plank for 20 seconds.",
"Do 10 lunges.",
"Do five slow squats.",
"Stand on one leg for 20 seconds.",
"Do your best stretching routine.",
"Walk around the room like a penguin.",
"Do a victory pose for 15 seconds.",
"Do five star jumps.",
"Pretend you're a boxer training for a fight.",
"Do a slow-motion sprint in place.",
"Do five air punches.",
"Do your best athlete celebration.",
"Pretend you're warming up for the Olympics.",
"Do 10 high knees.",
"Do five dramatic push-ups.",
"Do a silly workout routine.",
"Do a dance while pretending you're exercising.",
"Create a new exercise and demonstrate it.",

"Speak in a whisper for the next two minutes.",
"Speak extremely slowly for one minute.",
"Speak extremely quickly for 30 seconds.",
"End every sentence with 'your majesty' for one minute.",
"Use a different accent for one minute.",
"Talk like a robot for one minute.",
"Talk like a pirate for one minute.",
"Talk like a sports commentator for one minute.",
"Only answer with yes or no for one minute.",
"Only use three-word sentences for one minute.",
"Don't say the word 'I' for one minute.",
"Don't laugh for one minute while everyone tries to make you laugh.",
"Say everything dramatically for one minute.",
"Use your most serious voice to tell a silly story.",
"Speak as if you're giving a presidential speech.",
"Pretend you're on a cooking show.",
"Pretend you're hosting a game show.",
"Pretend you're giving a weather forecast.",
"Pretend you're being interviewed on television.",
"Pretend you're a tour guide showing everyone the room.",

"Give every player a sincere compliment.",
"Tell another player why they're a good friend.",
"Make up a nickname for everyone.",
"Choose someone and give them a funny award.",
"Give a 20-second motivational speech to another player.",
"Tell another player their best quality.",
"Invent a superhero name for another player.",
"Describe another player as a movie character.",
"Choose someone and make up their imaginary job.",
"Give someone an exaggerated introduction.",
"Choose someone to be your teammate for the next round.",
"Give another player a high-five.",
"Tell someone a clean joke.",
"Make up a funny handshake with another player.",
"Choose someone and imitate their laugh.",
"Describe someone's outfit like a fashion critic.",
"Give someone a fictional trophy.",
"Create a slogan for another player.",
"Give another player a funny but friendly challenge.",
"Choose someone and make them laugh.",

"Make a funny face and hold it for 15 seconds.",
"Take a dramatic selfie pose.",
"Pretend you're taking a professional model photo.",
"Pose like a superhero.",
"Pose like a movie villain.",
"Pose like you've just scored the winning goal.",
"Pretend you're on a magazine cover.",
"Make three different surprised faces.",
"Make your most serious face.",
"Make your most confused face.",
"Pretend you're shocked by something completely normal.",
"Act like you just saw a ghost.",
"Pretend the floor is lava for 20 seconds.",
"Pretend an invisible spider is chasing you.",
"Act like you stepped on something freezing.",
"Pretend you're trapped in an invisible box.",
"Pretend you're trying to open an invisible door.",
"Act like your chair is moving by itself.",
"Pretend you're flying a plane.",
"Pretend you're driving a race car.",

"Create a 10-second song about the room.",
"Rap about your favorite food.",
"Make up a song about another player.",
"Sing a song in a completely different style.",
"Hum a famous song and let people guess it.",
"Make a beat using only your hands.",
"Create a silly rap about yourself.",
"Sing like an opera singer for 15 seconds.",
"Sing like a rock star for 15 seconds.",
"Perform an imaginary concert.",
"Make up a football chant.",
"Create a theme song for the group.",
"Sing your favorite childhood song.",
"Make up a commercial jingle.",
"Rap using three random words chosen by the group.",
"Sing without using the letter 'A'.",
"Make a dramatic musical entrance.",
"Pretend you're a DJ introducing a song.",
"Create a song about today's game.",
"Give a 20-second karaoke performance.",

"Pretend you're late for an important meeting.",
"Pretend you're meeting an alien.",
"Pretend you're a detective solving a crime.",
"Pretend you're a secret agent.",
"Pretend you're a teacher with a strange class.",
"Pretend you're a flight attendant.",
"Pretend you're a taxi driver.",
"Pretend you're a professional wrestler.",
"Pretend you're a football referee.",
"Pretend you're a goalkeeper making a save.",
"Pretend you're a commentator during a dramatic match.",
"Pretend you're a magician whose trick failed.",
"Pretend you're a comedian performing to a huge crowd.",
"Pretend you're a famous actor giving an interview.",
"Pretend you're a musician backstage.",
"Pretend you're a superhero saving the room.",
"Pretend you're a detective interviewing another player.",
"Pretend you're a news anchor reporting breaking news.",
"Pretend you're a motivational coach.",
"Pretend you're a personal trainer.",

"Tell a story using three random objects in the room.",
"Explain how to make tea as dramatically as possible.",
"Describe your morning routine like an action movie.",
"Give a dramatic speech about your favorite food.",
"Explain football to someone who has never seen it.",
"Explain your favorite movie without naming it.",
"Describe your dream vacation in 20 seconds.",
"Sell a random object like it's worth a million dollars.",
"Explain why your favorite team is the greatest.",
"Give a fake product review of your shoes.",
"Describe the room like it's a haunted house.",
"Describe yourself like a documentary narrator.",
"Give a dramatic explanation for why you're hungry.",
"Explain why sleep is the greatest invention.",
"Give a speech defending an obviously silly opinion."
];


/* ---------- SPICY TRUTHS: 125 ---------- */

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
"What is something you've always wanted to ask someone but were too shy?",

"Who was your first celebrity crush?",
"What is your biggest dating green flag?",
"What is your biggest dating red flag?",
"Have you ever had feelings for a friend?",
"Have you ever hidden a crush from your friends?",
"Have you ever had a crush on someone much older than you?",
"Have you ever had a crush on someone much younger than you?",
"What personality trait attracts you the most?",
"What physical feature do you notice first?",
"What is your idea of a perfect date?",
"Have you ever gone on a date you regretted?",
"Have you ever cancelled a date at the last minute?",
"Have you ever pretended to be busy to avoid someone?",
"Have you ever left someone on read intentionally?",
"Have you ever checked someone's profile because you liked them?",
"Have you ever re-read old romantic messages?",
"Have you ever written a message and deleted it because you were nervous?",
"Have you ever practiced what you would say to a crush?",
"Have you ever dressed differently to impress someone?",
"Have you ever changed your plans because of someone you liked?",

"Who was the last person you thought about romantically?",
"Have you ever developed a crush unexpectedly?",
"Have you ever liked someone who didn't like you back?",
"Have you ever rejected someone and regretted it?",
"Have you ever been rejected and pretended you didn't care?",
"Have you ever been jealous because of someone you liked?",
"Have you ever tried to make someone jealous?",
"Have you ever flirted through text?",
"Have you ever flirted through social media?",
"Have you ever deleted a message because it sounded too flirty?",
"Have you ever sent a heart emoji to the wrong person?",
"Have you ever accidentally liked an old post?",
"Have you ever stalked someone's social media?",
"Have you ever asked a friend about someone's relationship status?",
"Have you ever asked someone for their number because you liked them?",
"Have you ever made an excuse just to see someone?",
"Have you ever stayed somewhere longer because someone you liked was there?",
"Have you ever imagined dating someone you know?",
"Have you ever imagined marrying someone you know?",
"Have you ever had a secret admirer?",

"What is your biggest relationship insecurity?",
"What makes you lose interest in someone?",
"What makes you immediately interested in someone?",
"What is your biggest romantic weakness?",
"What is your biggest romantic strength?",
"Do you fall for personality or looks first?",
"Would you rather make the first move or have someone approach you?",
"Would you date someone who is your complete opposite?",
"Would you date your best friend if they asked?",
"Would you date someone your friends disliked?",
"Would you date someone who lived far away?",
"Would you date someone famous?",
"Would you date someone much more successful than you?",
"Would you date someone who earned less than you?",
"Would you forgive a small lie in a relationship?",
"Would you give someone a second chance after a breakup?",
"Could you stay friends with an ex?",
"Have you ever stayed friends with an ex?",
"Have you ever missed an ex?",
"Have you ever compared a new crush to an ex?",

"What is the sweetest thing someone has done for you?",
"What is the sweetest thing you've done for someone?",
"What is the most romantic message you've received?",
"What is the nicest compliment you've received from someone you liked?",
"What is the nicest compliment you've given someone you liked?",
"Have you ever received flowers from someone?",
"Have you ever given someone flowers?",
"Have you ever planned a surprise for someone you liked?",
"Have you ever written a romantic note?",
"Have you ever kept a romantic message because it meant something?",
"Have you ever made a playlist for someone?",
"Have you ever dedicated a song to someone?",
"Have you ever stayed awake talking to someone you liked?",
"Have you ever talked all night with someone?",
"Have you ever gone somewhere just because someone you liked asked?",
"Have you ever learned something new because of someone?",
"Have you ever remembered tiny details about someone you liked?",
"Have you ever saved a photo because you liked the person in it?",
"Have you ever smiled at your phone because of a message?",
"Have you ever had butterflies because of someone?",

"Who in this room has the best smile?",
"Who in this room has the best style?",
"Who in this room has the most attractive personality?",
"Who in this room would make the best partner?",
"Who in this room would be the best date?",
"Who in this room would be hardest to impress?",
"Who in this room would be easiest to flirt with?",
"Who in this room would you trust to choose your date outfit?",
"Who in this room would give the best relationship advice?",
"Who in this room would be the most romantic?",
"Who in this room would be the funniest partner?",
"Who in this room would be most likely to fall in love first?",
"Who in this room would be most likely to have a secret crush?",
"Who in this room would be most likely to receive a love letter?",
"Who in this room would be most likely to get married first?",
"Who in this room would be most likely to have a long-distance relationship?",
"Who in this room would be most likely to go on a spontaneous date?",
"Who in this room would be most likely to make the first move?",
"Who in this room would be hardest to forget?",
"Who in this room has the most charming personality?",

"Have you ever lied about having a crush?",
"Have you ever lied about being single?",
"Have you ever hidden a relationship from someone?",
"Have you ever pretended to be less interested than you were?",
"Have you ever acted uninterested to get someone's attention?",
"Have you ever ignored someone because you liked them too much?",
"Have you ever gotten nervous around someone you liked?",
"Have you ever forgotten what to say around a crush?",
"Have you ever embarrassed yourself in front of a crush?",
"Have you ever accidentally said something romantic?",
"Have you ever called someone by an ex's name?",
"Have you ever dreamed about someone you liked?",
"Have you ever imagined what your wedding would be like?",
"Have you ever planned a future with someone too early?",
"Have you ever had a crush on someone unavailable?",
"Have you ever liked someone your friend also liked?",
"Have you ever kept a crush secret for years?",
"Have you ever confessed your feelings first?",
"Have you ever regretted not confessing your feelings?",
"Have you ever wished you could go back to a relationship?",

"What is the most attractive thing someone can say to you?",
"What is the best first-date idea you can imagine?",
"What is your biggest dating pet peeve?",
"What is one thing that makes a date unforgettable?",
"What is the worst dating advice you've ever received?",
"What is the best dating advice you've ever received?",
"What is something you would never tolerate in a relationship?",
"What is something you absolutely need in a relationship?",
"What makes you feel special in a relationship?",
"What makes you feel ignored in a relationship?",
"What is one romantic gesture you would love to receive?",
"What is one romantic gesture you would love to give?",
"What is something you've learned from your past relationships?",
"What is one thing you would do differently in your next relationship?",
"What is your ideal relationship?",
"Do you believe in love at first sight?",
"Do you believe people can have more than one soulmate?",
"Do you think opposites attract?",
"What is your biggest romantic dream?",
"What is one question about love you've always wondered about?"
];


/* ---------- SPICY DARES: 125 ---------- */

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
"Tell the group your most embarrassing dating story.",

"Give someone your best smile for 10 seconds.",
"Give another player your best movie-style introduction.",
"Deliver a cheesy pickup line with complete confidence.",
"Do a dramatic wink at the camera.",
"Give someone a compliment without using the words beautiful or handsome.",
"Pretend you're meeting your celebrity crush.",
"Act out asking someone on a first date.",
"Pretend you're on a romantic reality show.",
"Give a 20-second speech about your ideal partner.",
"Describe your dream date like a movie trailer.",
"Act like you're receiving a romantic award.",
"Pretend you're writing a love letter to a fictional character.",
"Create a romantic nickname for yourself.",
"Give another player a fictional dating profile.",
"Pretend you're introducing your future partner to your friends.",
"Do a dramatic slow-motion entrance.",
"Give someone a compliment in a fake accent.",
"Say a cheesy romantic line without laughing.",
"Act like you've just received a surprise date invitation.",
"Pretend you're the star of a romantic movie.",

"Choose someone and give them three genuine compliments.",
"Choose someone and tell them what makes them memorable.",
"Choose someone and describe their ideal date.",
"Choose someone and invent their perfect romantic movie role.",
"Choose someone and give them a funny dating award.",
"Choose someone and make up a dating-show introduction for them.",
"Choose someone and describe their best quality.",
"Choose someone and create a romantic nickname for them.",
"Choose someone and give them a fictional relationship horoscope.",
"Choose someone and pretend to interview them about love.",
"Choose someone and give them a dramatic compliment.",
"Choose someone and tell them what kind of movie character they would date.",
"Choose someone and describe their perfect vacation date.",
"Choose someone and make them laugh using a pickup line.",
"Choose someone and give them a funny but respectful proposal.",
"Choose someone and create a slogan for their dating profile.",
"Choose someone and describe them using only positive words.",
"Choose someone and give them a fictional trophy.",
"Choose someone and perform a 10-second romantic commercial for them.",
"Choose someone and introduce them as the star of a dating show.",

"Read your last sent message in a dramatic voice.",
"Read your last received message in a news-anchor voice.",
"Send a heart emoji to a friend you trust.",
"Send a funny compliment to someone you know.",
"Change your status to a funny romantic phrase for 10 minutes.",
"Use a romantic movie quote as your next status for 10 minutes.",
"Send a funny pickup line to a friend, if appropriate.",
"Send a genuine compliment to someone you haven't complimented recently.",
"Take a selfie making your best confident pose.",
"Take a selfie pretending you're on a first date.",
"Take a dramatic movie-poster pose.",
"Take a photo with your best model expression.",
"Pretend your camera is your secret admirer.",
"Give the camera your best smile.",
"Record a 10-second fake dating-show introduction.",
"Record a 10-second fake romantic movie trailer.",
"Record a dramatic confession to an imaginary person.",
"Record a funny voice note introducing yourself as a bachelor or bachelorette.",
"Make a 10-second romantic advertisement for yourself.",
"Do a dramatic selfie pose chosen by the group.",

"Perform a 20-second slow dance with yourself.",
"Do your best romantic movie dance.",
"Do a dramatic ballroom dance with an imaginary partner.",
"Perform a fake wedding entrance.",
"Walk like you're arriving at a red-carpet event.",
"Do your best confident runway walk.",
"Perform a dramatic spin and pose.",
"Act like you're trying to impress someone at a party.",
"Pretend you're dancing at your dream wedding.",
"Do a 20-second dance while maintaining a serious face.",
"Perform your best 'first date' entrance.",
"Do a dramatic slow-motion hair flip.",
"Act like you're in a music video.",
"Pretend you're dancing with a celebrity.",
"Perform a romantic scene without saying anything.",
"Do a dramatic movie kiss reaction without actually kissing anyone.",
"Act like you've just received a surprise proposal.",
"Pretend you're walking toward your crush in a movie.",
"Perform a dramatic goodbye scene.",
"Act out a romantic reunion with an imaginary partner.",

"Say three romantic compliments without repeating a word.",
"Create a new pickup line in five seconds.",
"Make up a romantic poem using three random words.",
"Create a cheesy love song about pizza.",
"Make up a romantic movie title starring yourself.",
"Create a dating-app bio for yourself in 20 seconds.",
"Describe yourself as a romantic superhero.",
"Make up a love story involving two random objects.",
"Create a romantic slogan for the group.",
"Invent a fictional dating app.",
"Create the perfect first-date restaurant name.",
"Make up a romantic horoscope for another player.",
"Create a fictional celebrity couple name.",
"Write an imaginary one-sentence love letter.",
"Make up a romantic song title.",
"Create a funny wedding hashtag for yourself.",
"Describe your dream date using only five words.",
"Create a fictional romantic movie ending.",
"Make up a dramatic proposal speech to a chair.",
"Create a romantic commercial for your favorite snack.",

"Pretend you're meeting someone you haven't seen in years.",
"Pretend you're asking someone to dance at a wedding.",
"Pretend you're meeting your crush's parents.",
"Pretend you're introducing your date to your best friend.",
"Pretend you're on a first date and the restaurant loses your reservation.",
"Pretend you're trying to impress someone with your cooking.",
"Pretend you're a celebrity being asked about your love life.",
"Pretend you're a dating coach.",
"Pretend you're a relationship therapist.",
"Pretend you're hosting a dating show.",
"Pretend you're choosing between two fictional dates.",
"Pretend you're planning a surprise anniversary.",
"Pretend you're giving relationship advice on television.",
"Pretend you're explaining why you're single.",
"Pretend you're explaining your ideal partner to an interviewer.",
"Pretend you're accepting an award for Best Date.",
"Pretend you're announcing your fictional engagement.",
"Pretend you're giving a speech at a fictional wedding.",
"Pretend you're writing vows for an imaginary wedding.",
"Pretend you're starring in the final scene of a romance movie.",

"Give another player your best respectful pickup line.",
"Give another player a compliment using only food comparisons.",
"Give another player a compliment like a sports commentator.",
"Give another player a compliment like a news reporter.",
"Give another player a compliment like a movie narrator.",
"Give another player a compliment in a dramatic whisper.",
"Give another player a compliment using exactly five words.",
"Give another player a compliment without mentioning appearance.",
"Give another player a compliment about their personality.",
"Give another player a compliment about their sense of humor.",
"Give another player a compliment about their confidence.",
"Give another player a compliment about their style.",
"Give another player a compliment about their kindness.",
"Give another player a compliment about their energy.",
"Give another player a compliment about their intelligence.",
"Give another player a compliment about their creativity.",
"Give another player a compliment about their friendship.",
"Give another player a compliment as if they're famous.",
"Give another player a compliment as if they're a superhero.",
"Give another player a compliment as if they're winning an award.",

"Describe your perfect date without saying the word 'date'.",
"Describe your ideal partner without mentioning looks.",
"Give a 20-second speech about what makes someone attractive.",
"Explain your perfect romantic movie ending.",
"Describe the perfect first message to someone you like.",
"Give a dramatic speech about why communication matters.",
"Explain what makes a great relationship.",
"Describe your dream romantic vacation.",
"Explain what makes someone unforgettable.",
"Give a funny speech about modern dating.",
"Describe the funniest possible first date.",
"Describe the most chaotic possible first date.",
"Give advice to someone going on their first date.",
"Explain how to impress someone without spending money.",
"Give a 20-second speech about confidence.",
"Explain why personality matters.",
"Describe the perfect romantic surprise.",
"Give a funny speech about being single.",
"Describe your dream relationship in 30 seconds.",
"Give your best advice for making a good first impression."
];


/* =========================
   VERIFY QUESTION COUNTS
========================= */

console.log(
    "Question counts:",
    {
        classicTruths: classicTruths.length,
        classicDares: classicDares.length,
        spicyTruths: spicyTruths.length,
        spicyDares: spicyDares.length,
        total:
            classicTruths.length +
            classicDares.length +
            spicyTruths.length +
            spicyDares.length
    }
);


/* =========================
   ROOM CODE
========================= */

function generateRoomCode() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let code = "";

    for (let i = 0; i < 4; i++) {

        code += characters[
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

        currentPlayerName =
            playerName.trim();

        const roomCode =
            generateRoomCode();

        currentRoomCode = roomCode;

        isHost = true;
        isReady = false;

        selectedTheme = "classic";
        selectedRounds = 5;


        const roomRef =
            ref(
                db,
                "rooms/" + roomCode
            );


        await set(
            roomRef,
            {
                host: currentPlayerName,
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
                name: currentPlayerName,
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


        listenToPlayers(roomCode);
        listenToGame(roomCode);
        listenToTheme(roomCode);
        listenToRounds(roomCode);

        listenToChat(roomCode);

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
                "rooms/" + roomCode
            );


        const snapshot =
            await get(roomRef);


        if (!snapshot.exists()) {

            alert(
                "Room does not exist."
            );

            return;
        }


        currentRoomCode = roomCode;

        currentPlayerName =
            playerName;

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
                name: currentPlayerName,
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


        listenToPlayers(roomCode);
        listenToGame(roomCode);
        listenToTheme(roomCode);
        listenToRounds(roomCode);

        listenToChat(roomCode);

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


        const inviteUrl =
            window.location.origin +
            window.location.pathname +
            "?room=" +
            encodeURIComponent(
                currentRoomCode
            );


        const shareText =
            "🎭 Join my Truth or Dare game!\n\n" +
            "Room: " +
            currentRoomCode +
            "\n\n" +
            "Tap this link to join:\n" +
            inviteUrl +
            "\n\n" +
            "Come play with us! 🔥";


        try {

            if (navigator.share) {

                await navigator.share({

                    title:
                        "Truth or Dare 🎭",

                    text:
                        shareText,

                    url:
                        inviteUrl

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

function listenToPlayers(roomCode) {

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


            updateScoreboard(players);


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
                players[currentPlayerId];


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

function updateScoreboard(players) {

    scoresList.innerHTML = "";


    const sortedPlayers =
        Object.entries(players)
            .sort(
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


        isReady = !isReady;


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


function listenToTheme(roomCode) {

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


async function setRounds(rounds) {

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


function listenToRounds(roomCode) {

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
            await get(playersRef);


        if (!snapshot.exists()) {

            alert(
                "No players found."
            );

            return;
        }


        const players =
            snapshot.val();


        const playerIds =
            Object.keys(players);


        const everyoneReady =
            Object.values(players).every(
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
                    selectedRounds,

                usedQuestions: {}
            }
        );

    }
);


/* =========================
   GAME LISTENER
========================= */

function listenToGame(roomCode) {

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

                doneBtn.classList.add(
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


/* =========================
   RANDOM QUESTION
   NO REPEATS
========================= */

async function chooseQuestion(type) {

    if (!currentRoomCode)
        return;


    const gameRef =
        ref(
            db,
            "rooms/" +
            currentRoomCode +
            "/game"
        );


    const gameSnapshot =
        await get(gameRef);


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


    if (selectedTheme === "spicy") {

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


    let usedQuestions =
        game.usedQuestions || {};


    const availableQuestions =
        list.filter(
            question =>
                !usedQuestions[
                    question
                ]
        );


    let questionPool =
        availableQuestions;


    if (questionPool.length === 0) {

        questionPool =
            list;

        list.forEach(
            question => {

                delete usedQuestions[
                    question
                ];

            }
        );

    }


    const question =
        questionPool[
            Math.floor(
                Math.random() *
                questionPool.length
            )
        ];


    usedQuestions[
        question
    ] = true;


    await set(
        gameRef,
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
                selectedRounds,

            usedQuestions:
                usedQuestions
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


        if (!playersSnapshot.exists())
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
            Object.keys(players);


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
            playerIds[nextIndex];


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
                        totalRounds,

                    usedQuestions:
                        game.usedQuestions || {}
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
                    totalRounds,

                usedQuestions:
                    game.usedQuestions || {}
            }
        );

    }
);


/* =========================
   WINNER SCREEN
========================= */

async function showWinnerScreen(roomCode) {

    const playersSnapshot =
        await get(
            ref(
                db,
                "rooms/" +
                roomCode +
                "/players"
            )
        );


    if (!playersSnapshot.exists())
        return;


    const players =
        playersSnapshot.val();


    const sortedPlayers =
        Object.values(players)
            .sort(
                (a, b) =>
                    (b.score || 0) -
                    (a.score || 0)
            );


    if (sortedPlayers.length === 0)
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

    doneBtn.classList.add(
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
            await get(playersRef);


        if (!snapshot.exists())
            return;


        const players =
            snapshot.val();


        Object.keys(players).forEach(
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


/* =========================
   CHAT
========================= */

/*
    Firebase structure:

    rooms
      ROOMCODE
        chat
          messageId
            name
            text
            timestamp
*/


function listenToChat(roomCode) {

    const chatRef =
        ref(
            db,
            "rooms/" +
            roomCode +
            "/chat"
        );


    onValue(
        chatRef,
        (snapshot) => {

            if (!snapshot.exists()) {

                showEmptyChat();

                return;
            }


            const messages =
                Object.entries(
                    snapshot.val()
                );


            messages.sort(
                (a, b) =>
                    (a[1].timestamp || 0) -
                    (b[1].timestamp || 0)
            );


            renderChat(
                messages
            );

        }
    );

}


/* =========================
   RENDER CHAT
========================= */

function renderChat(messages) {

    if (chatMessages) {

        chatMessages.innerHTML =
            "";

    }


    if (gameChatMessages) {

        gameChatMessages.innerHTML =
            "";

    }


    messages.forEach(
        ([messageId, message]) => {

            const lobbyMessage =
                createChatMessage(
                    message
                );


            const gameMessage =
                createChatMessage(
                    message
                );


            if (chatMessages) {

                chatMessages.appendChild(
                    lobbyMessage
                );

            }


            if (gameChatMessages) {

                gameChatMessages.appendChild(
                    gameMessage
                );

            }

        }
    );


    scrollChatToBottom();

}


/* =========================
   CREATE CHAT MESSAGE
========================= */

function createChatMessage(message) {

    const messageDiv =
        document.createElement(
            "div"
        );


    messageDiv.className =
        "chat-message";


    const nameDiv =
        document.createElement(
            "div"
        );


    nameDiv.className =
        "chat-message-name";


    const textDiv =
        document.createElement(
            "div"
        );


    textDiv.className =
        "chat-message-text";


    const timeDiv =
        document.createElement(
            "div"
        );


    timeDiv.className =
        "chat-message-time";


    /*
       textContent is used instead of
       innerHTML for user messages.
       This prevents someone from
       injecting HTML or scripts.
    */

    nameDiv.textContent =
        message.name ||
        "Player";


    textDiv.textContent =
        message.text ||
        "";


    timeDiv.textContent =
        formatChatTime(
            message.timestamp
        );


    messageDiv.appendChild(
        nameDiv
    );


    messageDiv.appendChild(
        textDiv
    );


    messageDiv.appendChild(
        timeDiv
    );


    return messageDiv;

}


/* =========================
   EMPTY CHAT
========================= */

function showEmptyChat() {

    if (chatMessages) {

        chatMessages.innerHTML = `
            <div class="chat-empty">
                No messages yet. Say hello! 👋
            </div>
        `;

    }


    if (gameChatMessages) {

        gameChatMessages.innerHTML = `
            <div class="chat-empty">
                Chat with your friends 💬
            </div>
        `;

    }

}


/* =========================
   SEND CHAT MESSAGE
========================= */

async function sendChatMessage(input) {

    if (!currentRoomCode)
        return;


    if (!currentPlayerId)
        return;


    if (!currentPlayerName)
        return;


    const text =
        input.value.trim();


    if (!text)
        return;


    /*
       Limit message length.
    */

    const messageText =
        text.substring(
            0,
            200
        );


    const chatRef =
        ref(
            db,
            "rooms/" +
            currentRoomCode +
            "/chat"
        );


    const newMessageRef =
        push(chatRef);


    await set(
        newMessageRef,
        {
            name:
                currentPlayerName,

            text:
                messageText,

            timestamp:
                Date.now()
        }
    );


    input.value =
        "";

}


/* =========================
   LOBBY CHAT SEND
========================= */

if (sendChatBtn) {

    sendChatBtn.addEventListener(
        "click",
        async () => {

            await sendChatMessage(
                chatInput
            );

            chatInput.focus();

        }
    );

}


/* =========================
   GAME CHAT SEND
========================= */

if (sendGameChatBtn) {

    sendGameChatBtn.addEventListener(
        "click",
        async () => {

            await sendChatMessage(
                gameChatInput
            );

            gameChatInput.focus();

        }
    );

}


/* =========================
   ENTER TO SEND
========================= */

if (chatInput) {

    chatInput.addEventListener(
        "keydown",
        async (event) => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                await sendChatMessage(
                    chatInput
                );

            }

        }
    );

}


if (gameChatInput) {

    gameChatInput.addEventListener(
        "keydown",
        async (event) => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                await sendChatMessage(
                    gameChatInput
                );

            }

        }
    );

}


/* =========================
   CHAT TIME
========================= */

function formatChatTime(timestamp) {

    if (!timestamp)
        return "";


    const date =
        new Date(timestamp);


    return date.toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =========================
   SCROLL CHAT
========================= */

function scrollChatToBottom() {

    if (chatMessages) {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    if (gameChatMessages) {

        gameChatMessages.scrollTop =
            gameChatMessages.scrollHeight;

    }

}


/* =========================
   AUTO JOIN FROM INVITE LINK
========================= */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const inviteRoom =
    urlParams.get("room");


if (inviteRoom) {

    roomCodeInput.value =
        inviteRoom.toUpperCase();


    homeSection.classList.add(
        "hidden"
    );


    joinSection.classList.remove(
        "hidden"
    );

}