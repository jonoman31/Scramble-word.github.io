let names = document.getElementById("nameuser");
let greet = document.getElementById("greet");
let currentQuestion = 0;
let mypoint = 0
let wordlist = [];
let object = {
    "name": "",
    "totalScore": 0
}
let ms = localStorage.getItem("name")
ms = JSON.parse(ms)
names.addEventListener("change", () => {
    greet.innerHTML = "Halo " + names.value;
    object.name = names.value
    localStorage.setItem("name", JSON.stringify(object))
    names.remove();
    wordlist = words();
    let gotohome = document.getElementById("back-home")
    gotohome.addEventListener("click", () => {
        location.reload()
    })
    gotohome.style.display = "block"
    document.getElementById("idjawaban").style.display = "flex";
    updateQuestion();
});



document.getElementById("idjawaban").addEventListener("change", () => {
    checkAnswer();
});

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

function updateQuestion() {
    if (currentQuestion < wordlist[0].length) {
        let question = document.getElementById("pertanyaan");
        question.innerHTML = wordlist[0][currentQuestion];
    } else {
        popup(); // menampilkan popup ketika game selesai
    }
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
            totalScore: 1337
        },
    ]
    let myscore = localStorage.getItem("name")
    myscore = JSON.parse(myscore)
    console.log(myscore["totalScore"])
    if (myscore.totalScore != 0) {
        dummy.push(myscore)
    }


    // var byDate = dummy.slice(0);
    let sortedProducts = dummy.sort(
        (p1, p2) => (p1.totalScore < p2.totalScore) ? 1 : (p1.totalScore > p2.totalScore) ? -1 : 0);

    let idleaderboard = document.getElementById("list-leaderboard")

    if (idleaderboard.style.display === "none") {
        idleaderboard.style.display = "block";
    } else {
        idleaderboard.style.display = "none";

    }
    let temp = ""

    sortedProducts.forEach(element => {
        temp += `<li>${element["name"]}: ${element["totalScore"]}</li>`
    });
    idleaderboard.innerHTML = temp
}

function popup() {
    let pop = document.getElementById("popup")
    let pops = document.getElementById('popup-msg')
    pops.innerHTML = "You got score " + mypoint
    object.totalScore = mypoint
    pop.style.display = "flex"
    localStorage.setItem(object)
}

function closePopup() {
    let popup = document.getElementById('popup');

    popup.style.display = 'none';
    location.reload()
}

function checkAnswer() {
    if (currentQuestion < wordlist[0].length) {
        let point = document.getElementById("mypoint");
        let answerInput = document.getElementById("idjawaban");
        let resAnswer = document.getElementById("result-jawaban");
        if (answerInput.value.toLowerCase() === wordlist[1][currentQuestion].toLowerCase()) {
            resAnswer.style.color = "yellow";
            mypoint += 10;
            resAnswer.innerHTML = "jawaban anda benar";
            point.innerHTML = `Point anda ${mypoint}`;
            object.totalScore = mypoint
            localStorage.setItem("name", JSON.stringify(object))

        } else {
            resAnswer.style.color = "red";
            resAnswer.innerHTML = "jawaban anda salah";
        }
        currentQuestion++;
        updateQuestion();
        answerInput.value = "";
    }
}

function words() {
    let correctWords = ["Bunga", "Kursi", "Kacamata", "Handuk", "Sepatu", "Malang", "Lampu", "Botol", "Pensil", "Pesawat"];
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

    return [strippedWords, correctWords];
}



// function play() {
//     console.clear()
//     let name = "Jason"
//     let maxHint = 3
//     let score = 0
//     let myans = ""
//     let listWord = words()
//     console.log("Hello ", name, "Ayo main tebak Kata")
//     for (let index = 0; index < listWord[0].length; index++) {
//         const element = listWord[0][index];
//         console.log("Tebak kata berikut: " + element)
//         myans = readline.question("Jawaban: ")
//         if (myans === "h") {

//         }
//         console.clear()

//         if (myans.toLowerCase() === listWord[1][index].toLowerCase()) {
//             score += 10
//             console.log("Jawaban anda benar !", "Score anda sekarang:", score)
//         } else {
//             console.log("Jawaban anda Salah !")
//             console.log("Jawaban benar:", listWord[1][index])
//         }

//     }
//     console.log()

// }
// play()