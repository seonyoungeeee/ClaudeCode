const keywords = [
  { category: "관계", text: "서먹해진 친구", hint: "멀어진 사이를 다시 이어가고 싶은 마음을 노래로 풀어보세요." },
  { category: "관계", text: "말하지 못한 고마움", hint: "평소에는 표현하지 못한 감사의 순간을 가사로 만들어보세요." },
  { category: "관계", text: "우리 반의 하루", hint: "교실, 쉬는 시간, 급식, 하교길 같은 장면을 엮어보세요." },
  { category: "자아", text: "처음 보는 나", hint: "새로운 취향, 용기, 실수 속에서 발견한 나를 노래해보세요." },
  { category: "자아", text: "불안과 기대 사이", hint: "시험, 진로, 관계 앞에서 흔들리는 마음을 솔직하게 담아보세요." },
  { category: "자아", text: "내 속도의 꿈", hint: "남과 비교하지 않고 자기 속도로 가는 이야기에 어울립니다." },
  { category: "미래", text: "10년 뒤의 편지", hint: "미래의 내가 지금의 나에게 보내는 응원을 상상해보세요." },
  { category: "미래", text: "아직 정하지 못한 길", hint: "진로가 확실하지 않아도 움직이는 청춘의 장면을 만들어보세요." },
  { category: "미래", text: "작은 시작", hint: "거창하지 않은 첫걸음이 변화가 되는 이야기에 좋습니다." },
  { category: "사회", text: "알림이 멈춘 밤", hint: "스마트폰과 SNS에서 잠시 떨어진 시간을 노래해보세요." },
  { category: "사회", text: "보이지 않는 선", hint: "편견, 규칙, 시선 같은 주제를 은유적으로 다룰 수 있습니다." },
  { category: "사회", text: "지구를 위한 약속", hint: "환경 문제를 일상 속 실천과 연결해보세요." },
  { category: "자연", text: "비 오는 운동장", hint: "젖은 흙냄새, 빈 골대, 우산 소리를 음악적 이미지로 써보세요." },
  { category: "자연", text: "여름 밤의 바람", hint: "계절감과 청춘의 기억을 함께 담기에 좋은 키워드입니다." },
  { category: "자연", text: "노을진 버스 창가", hint: "하교길 풍경과 마음의 변화를 연결해보세요." },
  { category: "기술", text: "AI와 나의 듀엣", hint: "사람의 감정과 기술의 도움을 함께 바라보는 노래를 만들어보세요." },
  { category: "기술", text: "삭제하지 못한 사진", hint: "디지털 기억과 감정의 흔적을 소재로 삼아보세요." },
  { category: "기술", text: "이어폰 속 우주", hint: "음악을 들을 때 혼자만의 세계가 열리는 느낌을 표현해보세요." },
  { category: "감정", text: "괜찮은 척", hint: "겉으로는 웃지만 속으로는 흔들리는 마음을 다뤄보세요." },
  { category: "감정", text: "다시 켜진 용기", hint: "포기하고 싶던 순간 이후 다시 움직이는 장면에 어울립니다." },
  { category: "감정", text: "이름 없는 설렘", hint: "정확히 설명하기 어려운 기대와 떨림을 음악으로 바꿔보세요." }
];

const lyricImages = [
  "복도 끝 창문", "초록 불빛", "구겨진 시간표", "흔들리는 이어폰", "책상 위 낙서",
  "비친 내 얼굴", "덜 마른 운동화", "조용한 단체 채팅", "하교길 횡단보도", "잠깐의 정적"
];

const drawButton = document.querySelector("#drawButton");
const copyButton = document.querySelector("#copyButton");
const refreshLyrics = document.querySelector("#refreshLyrics");
const keywordCategory = document.querySelector("#keywordCategory");
const keywordText = document.querySelector("#keywordText");
const keywordHint = document.querySelector("#keywordHint");
const genreSelect = document.querySelector("#genreSelect");
const moodSelect = document.querySelector("#moodSelect");
const voiceSelect = document.querySelector("#voiceSelect");
const promptOutput = document.querySelector("#promptOutput");
const lyricsOutput = document.querySelector("#lyricsOutput");
const copyStatus = document.querySelector("#copyStatus");

let currentKeyword = keywords[0];

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function drawKeyword() {
  let nextKeyword = pickRandom(keywords);
  if (nextKeyword.text === currentKeyword.text && keywords.length > 1) {
    nextKeyword = keywords[(keywords.indexOf(nextKeyword) + 1) % keywords.length];
  }
  currentKeyword = nextKeyword;
  render();
}

function buildPrompt() {
  return [
    `주제 키워드: ${currentKeyword.text}`,
    `장르: ${genreSelect.value}`,
    `분위기: ${moodSelect.value}`,
    `화자: ${voiceSelect.value}`,
    "",
    "요청:",
    "- 고등학생이 부르기에 자연스러운 한국어 가사로 만들어줘.",
    "- 벌스 1, 프리코러스, 후렴, 벌스 2, 브릿지, 마지막 후렴 구조로 작성해줘.",
    "- 후렴에는 따라 부르기 쉬운 반복구를 넣어줘.",
    "- 너무 유치하지 않고, 교실과 일상 이미지가 떠오르게 해줘.",
    "- 선정적이거나 폭력적인 표현은 피하고 수업 활동에 적합하게 만들어줘."
  ].join("\n");
}

function buildLyrics() {
  const imageA = pickRandom(lyricImages);
  const imageB = pickRandom(lyricImages.filter((item) => item !== imageA));
  const hook = currentKeyword.text.replace(/\s+/g, " ");

  return `[Verse 1]\n${imageA} 아래 멈춰 선 마음\n오늘의 나는 조금 다른 표정\n말로는 다 못한 ${hook}\n작은 박자 위에 올려봐\n\n[Pre-Chorus]\n느린 숨을 맞추고\n흔들린 하루를 접으면\n아직 끝나지 않은 이야기가\n우리 쪽으로 걸어와\n\n[Chorus]\n${hook}, 지금 이 순간\n작은 목소리도 노래가 돼\n${hook}, 다시 한 번 더\n내일의 나에게 닿을 때까지\n\n[Verse 2]\n${imageB}처럼 반짝인 장면\n서툰 마음도 리듬이 되고\n괜찮아, 늦어도 괜찮아\n우린 우리 속도로 가\n\n[Bridge]\n아무도 정답을 모르는 밤\n그래도 불러보는 이름\n희미한 빛을 따라가면\n처음의 내가 기다려\n\n[Final Chorus]\n${hook}, 지금 이 순간\n작은 목소리도 노래가 돼\n${hook}, 다시 한 번 더\n우리의 계절이 들릴 때까지`;
}

function render() {
  keywordCategory.textContent = currentKeyword.category;
  keywordText.textContent = currentKeyword.text;
  keywordHint.textContent = currentKeyword.hint;
  promptOutput.value = buildPrompt();
  lyricsOutput.textContent = buildLyrics();
  copyStatus.textContent = "";
}

async function copyPrompt() {
  try {
    await navigator.clipboard.writeText(promptOutput.value);
    copyStatus.textContent = "프롬프트를 복사했습니다.";
  } catch {
    promptOutput.select();
    document.execCommand("copy");
    copyStatus.textContent = "프롬프트를 선택해 복사했습니다.";
  }
}

drawButton.addEventListener("click", drawKeyword);
copyButton.addEventListener("click", copyPrompt);
refreshLyrics.addEventListener("click", () => {
  lyricsOutput.textContent = buildLyrics();
  copyStatus.textContent = "";
});

[genreSelect, moodSelect, voiceSelect].forEach((control) => {
  control.addEventListener("change", render);
});

render();
