(function () {

    if (!window.FileReader) return;

    var fileInput = document.querySelector("#file"),
        output = document.querySelector("#html"),
        buttonCopy = document.querySelector("#button"),
        buttonClear = document.querySelector("#clear"),
        buttonInsert = document.querySelector("#insert"),
        buttonClose = document.querySelector("#close"),
        row = document.querySelector(".row"),
        converter = new showdown.Converter(),
        copyCard = document.querySelector("#copy-card"),
        copyArea = copyCard.querySelector("#copy-html");

        clearButtons();

    function insertAs(mode, text) {

        if (text == "") return;

        if (mode == "text")
            copyArea.textContent = text;
        else if (mode == "html")
            copyArea.innerHTML= text;
            
        copyCard.style.display = "";
    }

    fileInput.onchange = function () {
        var file = this.files[0],
            reader = new FileReader();

        reader.onload = function () {
            html = converter.makeHtml(this.result);
            output.value = html;
            showButtons();
        }

        reader.readAsText(file);

    }

    buttonCopy.onclick = function (e) {
        e.stopPropagation();

        insertAs("text", output.value);
    }

    buttonInsert.onclick = function(e) {
        e.stopPropagation();
        insertAs("html", output.value);
    }

    buttonClose.onclick = function (e) {
        e.stopPropagation();
        copyCard.style.display = "none";
    }

    buttonClear.onclick = function (e) {
        e.stopPropagation();

        clearButtons();
        clearDisplay();
    }

    function showButtons() {
        buttonCopy.style.display = "";
        buttonClear.style.display = "";
        buttonInsert.style.display = "";
    }

    function clearButtons() {
        buttonCopy.style.display = "none";
        buttonClear.style.display = "none";
        buttonInsert.style.display = "none";    
        copyCard.style.display = "none";  
    }

    function clearDisplay() {
        output.value = "";
        fileInput.type = '';
        fileInput.type = 'file';
        copyCard.style.display = "none";  
    }

})();