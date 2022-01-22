const ver = 0.8;
const inputElementId = "input";
const outputElementId = "output";
const outputStartMessage = "\n===\nType something in the Input text box to get started!";
const phoneticList = JSON.parse(get("/phonetic-html-js/phonetics.json"));

console.log(`phonetic-html-js v${ver} by yuniq-neko!\ngithub.com/yuniq-neko/phonetic-html-js${outputStartMessage}`);
console.log(`Phonetics Available:`);
console.log(phoneticList);
document.getElementById(outputElementId).innerHTML = `phonetic-html-js v${ver} by yuniq-neko!\ngithub.com/yuniq-neko/phonetic-html-js${outputStartMessage}`;
document.getElementById(inputElementId).addEventListener("change", generatePhonetics);

function generatePhonetics() {
    var input = document.getElementById(inputElementId).value;
    console.log(`Received Input: "${input}"`);
    var output = "Single Sentence: \n";
    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        if(RegExp('^[0-9]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched 0-9`)
            output += `${phoneticList[char]} `;
        } else if(RegExp('^[a-z]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched a-z`)
            var x = input.charAt(i).toUpperCase();
            output += `${phoneticList[x].toLowerCase()} `;
        } else if(RegExp('^[A-Z]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched A-Z`)
            output += `${phoneticList[char]} `;
        } else {
            console.log(`${input.charAt(i)} failed to match, treating as whitespace.`)
            output += `${input.charAt(i)}`;
        }
    }
    output += `\n\nList: \n`;
    for (var i = 0; i < input.length; i++) {
        var char = input.charAt(i);
        if(RegExp('^[0-9]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched 0-9`)
            output += `<b>${input.charAt(i)}</b> - ${phoneticList[char]}\n`;
        } else if(RegExp('^[a-z]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched a-z`)
            var x = input.charAt(i).toUpperCase();
            output += `<b>${input.charAt(i)}</b> - ${phoneticList[x].toLowerCase()}\n`;
        } else if(RegExp('^[A-Z]$').test(input.charAt(i))) {
            console.log(`${input.charAt(i)} matched A-Z`)
            output += `<b>${input.charAt(i)}</b> - ${phoneticList[char]}\n`;
        } else {
            console.log(`${input.charAt(i)} failed to match, treating as whitespace.`)
            output += `<b>${input.charAt(i)}</b>\n`;
        }
    }
    document.getElementById(outputElementId).innerHTML = output;
}

function get(url){
    var req = new XMLHttpRequest();
    req.open("GET",url,false);
    req.send(null);
    return req.responseText;          
}