const paragraph = [
    'The sun peeked through the clouds as the morning breeze swept across the quiet street. Birds chirped from the trees, welcoming a brand new day. A paperboy rode past, tossing newspapers onto porches with practiced precision. The smell of fresh bread drifted from a nearby bakery. Children skipped to school with backpacks bouncing and laughter in the air. It was a peaceful start to what seemed like a perfect morning.',
    'Technology has changed the way we live in countless ways. From smartphones to smart homes, convenience is just a tap away. While some argue that we’ve become too dependent on our devices, others see them as tools for productivity. The key lies in finding balance and using tech mindfully. Whether it’s checking emails or streaming music, digital habits shape our daily routines. In the end, it’s up to us to set healthy limits.',
    'A cup of hot tea can be incredibly comforting on a rainy day. The gentle sound of raindrops hitting the window creates a calming rhythm. Wrapped in a blanket, with a good book in hand, time seems to slow down. It’s a small moment of peace in an otherwise busy world. Such cozy moments remind us to pause and breathe. Sometimes, the simplest things bring the greatest joy.',
    'Traveling allows us to see the world from a fresh perspective. Each destination tells its own story through sights, sounds, and flavors. Whether it’s exploring bustling cities or quiet mountain trails, there’s always something new to learn. Meeting people from different cultures expands our understanding of the world. Every journey, big or small, adds to the richness of our lives. Memories made along the way often stay with us forever.',
    'Exercise is not just good for the body—it’s great for the mind too. A short walk, a bike ride, or a dance session can lift your mood almost instantly. It helps reduce stress, boosts energy, and sharpens focus. You don’t need fancy equipment or a gym membership to get moving. The important thing is to find something you enjoy and stick with it. Consistency makes all the difference over time.'
];

let words = [];
let wordIndex = 0;
let startTime = null;

const paraElement = document.getElementById('Paragraph');
const messageElement = document.getElementById('message');
const typeValueElement = document.getElementById('type-value');

document.getElementById('start').addEventListener('click', () => {
    const paraIndex = Math.floor(Math.random() * paragraph.length);
    const para = paragraph[paraIndex];

    words = para.split(' ');
    wordIndex = 0;

    const spanWords = words.map(word => `<span>${word}</span>`);
    paraElement.innerHTML = spanWords.join(' ');

    // highlight the first word
    paraElement.children[0].className = 'highlight';

    // reset messages and input
    messageElement.innerText = '';
    typeValueElement.value = '';
    typeValueElement.focus();

    startTime = new Date().getTime();
});

typeValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typeValueElement.value;

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = new Date().getTime() - startTime;
        messageElement.innerText = `🎉 CONGRATULATIONS! You finished in ${elapsedTime / 1000} seconds.`;
        typeValueElement.disabled = true;
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
        typeValueElement.value = '';
        wordIndex++;

        // reset all spans
        for (const span of paraElement.children) {
            span.className = '';
        }

        // highlight next word
        paraElement.children[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
        typeValueElement.className = '';
    } else {
        typeValueElement.className = 'error';
    }
});
