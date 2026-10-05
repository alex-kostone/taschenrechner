const prompt = require("prompt-sync")({ sigint: true });

while (true) {
    let eingabe = prompt("Aufgabe oder exit: ");
    eingabe = eingabe.trim();
    eingabe = eingabe.replaceAll(" ", "");

    if (eingabe === "exit") {
        break;
    }

    let zahlen = [];
    let operatoren = [];
    let zahl = "";
    let fehler = false;

    for (let i = 0; i < eingabe.length; i++) {
        let zeichen = eingabe[i];

        if ("0123456789.".includes(zeichen)) {
            zahl = zahl + zeichen;
        } else if (zeichen === "-" && zahl === "") {
            zahl = "-";
        } else if ("+-*/".includes(zeichen)) {
            if (zahl === "" || !Number.isFinite(Number(zahl))) {
                fehler = true;
                break;
            }
            zahlen.push(Number(zahl));
            operatoren.push(zeichen);
            zahl = "";
        } else {
            fehler = true;
            break;
        }
    }

    if (fehler || zahl === "" || !Number.isFinite(Number(zahl))) {
        console.log("Falsche Eingabe!");
        continue;
    }
    zahlen.push(Number(zahl));

    let i = 0;
    while (i < operatoren.length) {
        if (operatoren[i] === "*" || operatoren[i] === "/") {
            if (operatoren[i] === "*") {
                zahlen[i] = zahlen[i] * zahlen[i + 1];
            } else {
                if (zahlen[i + 1] === 0) {
                    fehler = true;
                    break;
                }
                zahlen[i] = zahlen[i] / zahlen[i + 1];
            }
            zahlen.splice(i + 1, 1);
            operatoren.splice(i, 1);
        } else {
            i++;
        }
    }

    if (fehler) {
        console.log("Durch 0 darf man nicht teilen!");
        continue;
    }

    let ergebnis = zahlen[0];
    for (let i = 0; i < operatoren.length; i++) {
        if (operatoren[i] === "+") {
            ergebnis = ergebnis + zahlen[i + 1];
        } else {
            ergebnis = ergebnis - zahlen[i + 1];
        }
    }

    console.log("Ergebnis:", ergebnis);
}