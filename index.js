window.addEventListener("load", () => {
    let idlead = document.getElementById("leaderboard-content")
    // .style.display = "block";
    console.log(idlead)
    leaderboard();

});

let object = {
    "name": "",
    "totalScore": 0
}

function submit_form() {
    object["name"] = document.getElementById("nameuser").value;
    let genders = document.getElementsByName("gender-radio");
    genders.forEach(gender => {
        if (gender.checked) {
            object["gender"] = gender.value;
        }
    });
    document.getElementById("register").style.display = "none";
    document.getElementById("quiz-content").style.display = "block";
    document.getElementById("greeting-quiz").innerText = object.name;
    document.getElementById("score-quiz").innerText = object.totalScore;
    questionPage();
}

let currentQuestionIndex = 0;

function questionPage() {
    if (currentQuestionIndex < words()[0].length) {
        document.getElementById("question").innerText = words()[0][currentQuestionIndex];
        document.getElementById("hint").innerText = words()[2][currentQuestionIndex];
        currentQuestionIndex++;
    } else {
        console.log("All questions displayed");
        // Implement functionality for when all questions have been answered, like showing the score
    }
}

function checkAnswer() {
    let answer = document.getElementById("answer").value.toLowerCase();
    let correctAnswer = words()[1][currentQuestionIndex - 1].toLowerCase();
    if (answer === correctAnswer) {
        object.totalScore += 10;
        document.getElementById("score-quiz").innerText = object.totalScore;
        document.getElementById("answer").value = '';
        saveToLocalStorage();
    } else {
        document.getElementById("answer").value = "";
    }
    questionPage();
}

function backhome() {
    savetolocal()
    location.reload()
}

function savetolocal() {
    localStorage.setItem("datas", JSON.stringify(object))
}


function words() {
    let correctWords = ["Bunga", "Bantal", "Kacamata", "Handuk", "Sepatu", "Lampu", "Botol", "Pensil", "Pesawat"];
    let hint = ["mempunyai tangkai dan berakar", "Biasa digunakan untuk tidur", "sering digunakan untuk membantu pengelihatan", "alat untuk mengeringkan badan dari air", "sepasang dan digunakan untuk melindungi kaki", "digunakan untuk menerangi ruangan", "wadah untuk menampung air minum", "alat untuk menulis dan dapat dihapus", "alat transportasi udara"]
    let strippedWords = [];

    for (let i = 0; i < correctWords.length; i++) {
        let word = correctWords[i].split('');
        let indices = [];
        while (indices.length < 2 || indices.length > 2) {
            indices = [];
            for (let j = 0; j < word.length; j++) {
                Math.random() > 0.5 ? indices.push(j) : ""
            }
        }
        for (let j = 0; j < indices.length; j++) {
            word[indices[j]] = '_';
        }
        strippedWords.push(word.join(''));
    }

    return [strippedWords, correctWords, hint];
}


function leaderboard() {

    let dummy = [{
            name: "John",
            totalScore: 33
        },
        {
            name: "Alice",
            totalScore: 12
        },
        {
            name: "Bob",
            totalScore: 77
        },
        {
            name: "Sam",
            totalScore: 81
        },
        {
            name: "Lois",
            totalScore: 92
        },
        {
            name: "Mary",
            totalScore: 91
        },
        {
            name: "Manesty",
            totalScore: 999
        },
    ]
    let myscore = localStorage.getItem("name")
    if (myscore) {
        myscore = JSON.parse(myscore)
        if (myscore.totalScore != 0) {
            dummy.push(myscore)
        }
    }



    // var byDate = dummy.slice(0);
    let sortedProducts = dummy.sort(
        (p1, p2) => (p1.totalScore < p2.totalScore) ? 1 : (p1.totalScore > p2.totalScore) ? -1 : 0);

    let idleaderboard = document.getElementById("leader-second")
    let primaryLeader = document.getElementById("leaderboard-content")
    console.log(primaryLeader)
    if (primaryLeader.style.display === "none") {
        primaryLeader.style.display = "block";
    } else {
        primaryLeader.style.display = "none";

    }
    let temp = ""

    sortedProducts.forEach((element, index) => {
        if (index !== 0) {
            temp += `<div class="flex justify-between px-5 py-2 space-x-2 rounded-md bg-slate-100">
            <li>${element["name"]}: ${element["totalScore"]}</li>
        </div>`
        } else {
            document.getElementById("top1-winner").innerHTML = `${element["name"]}: ${element["totalScore"]}`
        }
    });
    idleaderboard.innerHTML = temp
}

function BGmusic() {
    var music = document.getElementById("music")
    var icon = document.getElementById("icon")
    icon.onclick = function () {
        if (music.paused) {
            music.play();
            icon.src = "./img/pause_button.png"
        } else {
            music.pause();
            icon.src = "./img/play_button.png"
        }
    }
}
