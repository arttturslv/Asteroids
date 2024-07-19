
var index = 0;

document.body.addEventListener("keydown", function (e) {
    if (!isGameStarted) {
        showMenu(e.key);
    }
});

function showMenu(key) {
    const menuList = document.getElementById("list");

    /** User clicks up */
    if (key == 'w' || key == "ArrowUp") {
        menuList.getElementsByTagName("li")[index].classList.remove("selected");
        index = (index + 3) % 4;
        menuList.getElementsByTagName("li")[index].classList.add("selected");
    }
    /** User clicks down */
    if (key == 's' || key == "ArrowDown") {
        menuList.getElementsByTagName("li")[index].classList.remove("selected");
        index = ((index + 1) % 4);
        menuList.getElementsByTagName("li")[index].classList.add("selected");
    }
    /**User clicks something */
    if (key == 'Enter' || key =="Backspace" || key =="Space") {
        showOptions(index);
    }
}

function showOptions(index) {

    const records = document.getElementById("records");
    const instrucoes = document.getElementById("instrucoes");
    const extra = document.getElementById("extra");

    switch (index) {
        case 0:
            play();
            break;
        case 1:
            list.style.display = "none"
            records.style.display = "flex"
            break;
        case 2:
            list.style.display = "none"
            instrucoes.style.display = "flex"
            break;
        case 3:

            list.style.display = "none"
            extra.style.display = "flex"
            break;
        default:
            list.style.display = "block"
            instrucoes.style.display = "none"
            records.style.display = "none"
            extra.style.display = "none"
            break;
    }
}