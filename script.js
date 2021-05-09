const spinner = document.querySelector('#spinner');
const newAdviceBtn = document.querySelector('#refresh');
const adviceText = document.querySelector('#text');

newAdviceBtn.addEventListener('click', getAdvice);

async function getAdvice() {
    spinner.classList.remove('hidden');
    newAdviceBtn.disabled = true;
    const url = 'https://api.adviceslip.com/advice';
    try {
        const adviceData = await fetch(url);
        if (!adviceData.ok) {
            throw Error(adviceData.statusText);
        }
        const adviceObj = await adviceData.json();
        console.log(adviceObj.slip.advice);
        adviceText.innerHTML = adviceObj.slip.advice;
    } catch (error) {
        alert('Failed to fetch new quote');
    } finally {
        newAdviceBtn.disabled = false;
        spinner.classList.add('hidden');
    }
}

// tweet
const tweet = document.getElementById("tweet");
const textE = document.getElementById("text");
tweet.addEventListener("click", tweetNow);

function tweetNow() {
    const url = "https://twitter.com/intent/tweet?text="+ document.getElementById("text").innerHTML;
    window.open(url);
}

// copy to clipboard
const textElement = document.getElementById("text");
const copyButton = document.getElementById("copy");

const copyText = (e) => {
    window.getSelection().selectAllChildren(textElement);
    document.execCommand("copy");
    e.target.setAttribute("tooltip", "Copied! ✅");
};

const resetTooltip = (e) => {
    e.target.setAttribute("tooltip", "Copy to clipboard");
};

copyButton.addEventListener("click", (e) => copyText(e));
copyButton.addEventListener("mouseover", (e) => resetTooltip(e));