window.addEventListener("load", () => {
    leaderboard();
});

let object = {
    "name": "",
    "totalScore": 0,
    "gender": ""
}

function submit_form() {
    let username = document.getElementById("nameuser").value;
    object["name"] = username
    if (!username) {
        alert("Silahkan masukan nama")
    } else {
        let genders = document.getElementsByName("gender-radio");
        genders.forEach(gender => {
            if (gender.checked) {
                object["gender"] = gender.value;
            }
        });
        savetolocal();
        document.getElementById("register").style.display = "none";
        document.getElementById("quiz-content").style.display = "block";
        document.getElementById("greeting-quiz").innerText = object.name;
        document.getElementById("score-quiz").innerText = object.totalScore;
        questionPage();
    }

}
let currentQuestionIndex = 0;

function questionPage() {
    if (currentQuestionIndex < words()[0].length) {
        document.getElementById("question").innerText = words()[0][currentQuestionIndex];
        document.getElementById("hint").innerText = words()[2][currentQuestionIndex];
        currentQuestionIndex++;
    } else {
        showPopUp()
        // Implement functionality for when all questions have been answered, like showing the score
    }
}

function checkAnswer() {
    var correct = document.getElementById("correct-answer")
    var wrong = document.getElementById("wrong-answer")
    let answer = document.getElementById("answer").value.toLowerCase();
    let correctAnswer = words()[1][currentQuestionIndex - 1].toLowerCase();
    if (answer === correctAnswer) {
        bgmCorrect()
        correct.style.display = "block"
        object.totalScore += 10;
        document.getElementById("score-quiz").innerText = object.totalScore;
        document.getElementById("answer").value = '';
        savetolocal();
    } else {
        bgmWrong()
        wrong.style.display = "block"
        document.getElementById("answer").value = "";
    }
    setTimeout(function () {
        correct.style.display = "none";
        wrong.style.display = "none";
        questionPage();
    }, 600);
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

function showPopUp() {
    let pop = document.getElementById("pop-up")
    pop.style.display = "flex"
    let popupname = document.getElementById("popup-name")
    let findIndex = findMyIndex() + 1
    let popupmessage = document.getElementById("popup-message")
    popupname.innerHTML = "Hi, " + object["name"]

    popupmessage.innerHTML = `Anda menempati peringkat ${findIndex} dengan score ${object["totalScore"]}`
}

function findMyIndex() {
    let sortedProducts = leaderboard()
    let posisition = sortedProducts.map(i => i["name"]).indexOf(object["name"]);
    return posisition
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
    let myscore = localStorage.getItem("datas")
    if (myscore) {
        myscore = JSON.parse(myscore)
        if (myscore.totalScore != 0) {
            dummy.push(myscore)
        }
    }

    let sortedProducts = dummy.sort(
        (p1, p2) => (p1.totalScore < p2.totalScore) ? 1 : (p1.totalScore > p2.totalScore) ? -1 : 0);

    let idleaderboard = document.getElementById("leader-second")
    let primaryLeader = document.getElementById("leaderboard-content")
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
    return sortedProducts
}

function BGmusic() {
    let music = document.getElementById("music")
    var musicon = document.getElementById("music-on")
    let musicoff = document.getElementById("music-off")
    if (!music.paused) {
        music.pause()
        musicoff.style.display = "none"
        musicon.style.display = "block"
    } else {
        musicon.style.display = "none"
        musicoff.style.display = "block"
        music.play()

    }
}

function bgmCorrect() {
    let musicID = document.getElementById("music-correct");
    musicID.muted = false;
    musicID.currentTime = 0;
    musicID.play();
}

function bgmWrong() {
    let musicID = document.getElementById("music-wrong");
    musicID.muted = false;
    musicID.currentTime = 0;
    musicID.play();
}


function closePopUp() {
    document.getElementById("pop-up").style.display = "none";
    location.reload()

}