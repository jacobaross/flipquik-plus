// App State
const state = {
    currentDeck: null,
    currentCards: [],
    currentCardIndex: 0,
    correctCount: 0,
    skipCount: 0,
    results: [],
    timeRemaining: 60,
    timerInterval: null,
    editingDeckIndex: null,
    tiltLocked: false,
    tiltHandler: null,
    settings: {
        timerDuration: 60,
        audioEnabled: true,
        tiltSensitivity: 'medium'
    }
};

// Default Decks
const defaultDecks = [
    {
        id: 'movies',
        name: 'Movies',
        cards: ['The Matrix', 'Inception', 'Titanic', 'Jurassic Park', 'Avatar', 'Star Wars', 'The Godfather', 'Pulp Fiction', 'The Dark Knight', 'Forrest Gump', 'The Shawshank Redemption', 'Gladiator', 'The Lion King', 'Toy Story', 'Finding Nemo', 'Harry Potter', 'Lord of the Rings', 'Pirates of the Caribbean', 'Spider-Man', 'Iron Man']
    },
    {
        id: 'animals',
        name: 'Animals',
        cards: ['Elephant', 'Giraffe', 'Lion', 'Tiger', 'Bear', 'Monkey', 'Penguin', 'Dolphin', 'Shark', 'Octopus', 'Kangaroo', 'Koala', 'Panda', 'Zebra', 'Hippopotamus', 'Rhinoceros', 'Cheetah', 'Gorilla', 'Crocodile', 'Eagle']
    },
    {
        id: 'famous-people',
        name: 'Famous People',
        cards: ['Albert Einstein', 'Leonardo da Vinci', 'Abraham Lincoln', 'Martin Luther King Jr.', 'Mahatma Gandhi', 'Nelson Mandela', 'William Shakespeare', 'Mozart', 'Beethoven', 'Elvis Presley', 'Michael Jackson', 'Madonna', 'Oprah Winfrey', 'Steve Jobs', 'Bill Gates', 'Elon Musk', 'Barack Obama', 'Queen Elizabeth II', 'Princess Diana', 'Marilyn Monroe']
    },
    {
        id: 'actions',
        name: 'Actions',
        cards: ['Dancing', 'Singing', 'Swimming', 'Running', 'Jumping', 'Cooking', 'Painting', 'Writing', 'Reading', 'Sleeping', 'Eating', 'Laughing', 'Crying', 'Skiing', 'Surfing', 'Flying', 'Driving', 'Climbing', 'Fishing', 'Gardening']
    },
    {
        id: 'food',
        name: 'Food & Drinks',
        cards: ['Pizza', 'Sushi', 'Tacos', 'Burger', 'Pasta', 'Ice Cream', 'Chocolate', 'Coffee', 'Wine', 'Beer', 'Steak', 'Salad', 'Sandwich', 'Cake', 'Cookies', 'Donuts', 'Nachos', 'Hot Dog', 'Popcorn', 'Milkshake']
    },
    {
        id: 'countries',
        name: 'Countries',
        cards: ['United States', 'China', 'Japan', 'Germany', 'France', 'United Kingdom', 'Italy', 'Canada', 'Australia', 'Brazil', 'Mexico', 'India', 'Russia', 'Spain', 'Egypt', 'Greece', 'Thailand', 'South Korea', 'Netherlands', 'Switzerland']
    },
    {
        id: 'sports',
        name: 'Sports',
        cards: ['Soccer', 'Basketball', 'Baseball', 'Football', 'Tennis', 'Golf', 'Hockey', 'Volleyball', 'Boxing', 'Swimming', 'Track and Field', 'Gymnastics', 'Skiing', 'Snowboarding', 'Surfing', 'Skateboarding', 'Cricket', 'Rugby', 'Wrestling', 'Cycling']
    },
    {
        id: 'occupations',
        name: 'Occupations',
        cards: ['Doctor', 'Teacher', 'Police Officer', 'Firefighter', 'Chef', 'Lawyer', 'Engineer', 'Nurse', 'Artist', 'Musician', 'Actor', 'Pilot', 'Astronaut', 'Scientist', 'Writer', 'Photographer', 'Architect', 'Dentist', 'Farmer', 'Plumber']
    },
    {
        id: 'tv-shows',
        name: 'TV Shows',
        cards: ['Friends', 'Game of Thrones', 'Breaking Bad', 'The Office', 'Stranger Things', 'The Crown', 'Seinfeld', 'The Simpsons', 'Lost', 'The Sopranos', 'Mad Men', 'Westworld', 'Black Mirror', 'Sherlock', 'The Mandalorian', 'Succession', 'The Wire', 'Parks and Recreation', 'Community', 'Brooklyn Nine-Nine']
    },
    {
        id: 'brands',
        name: 'Brands',
        cards: ['Apple', 'Nike', 'Coca-Cola', 'McDonald\'s', 'Google', 'Amazon', 'Facebook', 'Disney', 'Netflix', 'Starbucks', 'Samsung', 'Microsoft', 'Tesla', 'Adidas', 'BMW', 'Mercedes', 'Toyota', 'Sony', 'Louis Vuitton', 'Gucci']
    },
    {
        id: 'music-artists',
        name: 'Music Artists',
        cards: ['Taylor Swift', 'Beyoncé', 'Drake', 'Ed Sheeran', 'Ariana Grande', 'Justin Bieber', 'Rihanna', 'Kanye West', 'Lady Gaga', 'Billie Eilish', 'The Weeknd', 'Bruno Mars', 'Adele', 'Post Malone', 'Eminem', 'Coldplay', 'Imagine Dragons', 'BTS', 'Bad Bunny', 'Dua Lipa']
    },
    {
        id: 'cartoon-characters',
        name: 'Cartoon Characters',
        cards: ['Mickey Mouse', 'SpongeBob', 'Bugs Bunny', 'Homer Simpson', 'Pikachu', 'Scooby-Doo', 'Tom and Jerry', 'Elsa', 'Bart Simpson', 'Donald Duck', 'Shrek', 'Woody', 'Buzz Lightyear', 'Goofy', 'Garfield', 'Fred Flintstone', 'Winnie the Pooh', 'Peter Griffin', 'Patrick Star', 'Dora']
    },
    {
        id: 'video-games',
        name: 'Video Games',
        cards: ['Minecraft', 'Fortnite', 'Grand Theft Auto', 'Call of Duty', 'Super Mario', 'Pokémon', 'The Legend of Zelda', 'FIFA', 'Tetris', 'Pac-Man', 'Mario Kart', 'Among Us', 'Roblox', 'Overwatch', 'League of Legends', 'World of Warcraft', 'The Sims', 'Animal Crossing', 'Sonic', 'Donkey Kong']
    },
    {
        id: 'superheroes',
        name: 'Superheroes',
        cards: ['Spider-Man', 'Batman', 'Superman', 'Iron Man', 'Captain America', 'Wonder Woman', 'Thor', 'Hulk', 'Black Panther', 'Wolverine', 'Deadpool', 'Flash', 'Aquaman', 'Black Widow', 'Doctor Strange', 'Ant-Man', 'Green Lantern', 'Captain Marvel', 'Scarlet Witch', 'Hawkeye']
    },
    {
        id: 'instruments',
        name: 'Musical Instruments',
        cards: ['Guitar', 'Piano', 'Drums', 'Violin', 'Saxophone', 'Trumpet', 'Flute', 'Clarinet', 'Cello', 'Bass Guitar', 'Harmonica', 'Banjo', 'Ukulele', 'Harp', 'Accordion', 'Trombone', 'Tambourine', 'Xylophone', 'Bagpipes', 'French Horn']
    },
    {
        id: 'emotions',
        name: 'Emotions',
        cards: ['Happy', 'Sad', 'Angry', 'Excited', 'Nervous', 'Surprised', 'Confused', 'Scared', 'Disgusted', 'Proud', 'Embarrassed', 'Jealous', 'Grateful', 'Bored', 'Anxious', 'Content', 'Frustrated', 'Relaxed', 'Curious', 'Lonely']
    },
    {
        id: 'things-in-nature',
        name: 'Things in Nature',
        cards: ['Mountain', 'Ocean', 'Forest', 'Desert', 'River', 'Lake', 'Volcano', 'Rainbow', 'Waterfall', 'Cave', 'Beach', 'Island', 'Canyon', 'Valley', 'Glacier', 'Jungle', 'Meadow', 'Cliff', 'Sunset', 'Aurora']
    },
    {
        id: 'household-items',
        name: 'Household Items',
        cards: ['Refrigerator', 'Microwave', 'Television', 'Couch', 'Bed', 'Lamp', 'Mirror', 'Toaster', 'Vacuum', 'Washing Machine', 'Oven', 'Coffee Maker', 'Blender', 'Iron', 'Clock', 'Fan', 'Curtains', 'Pillow', 'Blanket', 'Trash Can']
    },
    {
        id: 'vehicles',
        name: 'Vehicles',
        cards: ['Car', 'Truck', 'Motorcycle', 'Bicycle', 'Bus', 'Train', 'Airplane', 'Helicopter', 'Boat', 'Submarine', 'Rocket', 'Taxi', 'Ambulance', 'Fire Truck', 'Police Car', 'Tractor', 'Scooter', 'Skateboard', 'Hot Air Balloon', 'Cruise Ship']
    },
    {
        id: 'holidays',
        name: 'Holidays & Events',
        cards: ['Christmas', 'Halloween', 'Thanksgiving', 'Easter', 'Valentine\'s Day', 'New Year\'s Eve', 'Independence Day', 'Birthday', 'Wedding', 'Graduation', 'Father\'s Day', 'Mother\'s Day', 'St. Patrick\'s Day', 'Hanukkah', 'Diwali', 'Memorial Day', 'Labor Day', 'Veterans Day', 'Mardi Gras', 'Cinco de Mayo']
    },
    {
        id: 'book-titles',
        name: 'Book Titles',
        cards: ['Harry Potter', '1984', 'The Great Gatsby', 'To Kill a Mockingbird', 'Pride and Prejudice', 'The Hobbit', 'The Catcher in the Rye', 'Moby Dick', 'The Odyssey', 'Lord of the Flies', 'Animal Farm', 'Brave New World', 'The Alchemist', 'Frankenstein', 'Dracula', 'The Hunger Games', 'Twilight', 'Sherlock Holmes', 'The Bible', 'The Diary of Anne Frank']
    },
    {
        id: 'things-you-wear',
        name: 'Things You Wear',
        cards: ['Hat', 'Shoes', 'Jacket', 'Dress', 'Jeans', 'T-Shirt', 'Socks', 'Gloves', 'Scarf', 'Belt', 'Watch', 'Sunglasses', 'Tie', 'Sneakers', 'Boots', 'Sweater', 'Hoodie', 'Skirt', 'Shorts', 'Necklace']
    },
    {
        id: 'mythical-creatures',
        name: 'Mythical Creatures',
        cards: ['Dragon', 'Unicorn', 'Phoenix', 'Griffin', 'Mermaid', 'Vampire', 'Werewolf', 'Zombie', 'Ghost', 'Fairy', 'Elf', 'Dwarf', 'Centaur', 'Minotaur', 'Medusa', 'Kraken', 'Yeti', 'Loch Ness Monster', 'Bigfoot', 'Cyclops']
    },
    {
        id: 'hobbies',
        name: 'Hobbies',
        cards: ['Reading', 'Photography', 'Hiking', 'Gaming', 'Knitting', 'Gardening', 'Collecting', 'Birdwatching', 'Yoga', 'Meditation', 'Blogging', 'Traveling', 'Camping', 'Fishing', 'Scrapbooking', 'Drawing', 'Crafting', 'Woodworking', 'Cooking', 'Dancing']
    },
    {
        id: 'us-states',
        name: 'US States',
        cards: ['California', 'Texas', 'Florida', 'New York', 'Pennsylvania', 'Illinois', 'Ohio', 'Georgia', 'North Carolina', 'Michigan', 'Arizona', 'Colorado', 'Washington', 'Oregon', 'Nevada', 'Massachusetts', 'Virginia', 'Tennessee', 'Louisiana', 'Hawaii']
    }
];

// Initialize App
function init() {
    loadSettings();
    setupEventListeners();
    showScreen('home-screen');
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Event Listeners
function setupEventListeners() {
    // Home Screen
    document.getElementById('play-btn').addEventListener('click', () => {
        loadDeckSelection();
        showScreen('deck-selection-screen');
    });

    document.getElementById('create-deck-btn').addEventListener('click', () => {
        document.getElementById('deck-name').value = '';
        document.getElementById('deck-cards').value = '';
        state.editingDeckIndex = null;
        showScreen('create-deck-screen');
    });

    document.getElementById('manage-decks-btn').addEventListener('click', () => {
        loadManageDecks();
        showScreen('manage-decks-screen');
    });

    document.getElementById('settings-btn').addEventListener('click', () => {
        loadSettingsScreen();
        showScreen('settings-screen');
    });

    // Deck Selection
    document.getElementById('deck-back-btn').addEventListener('click', () => {
        showScreen('home-screen');
    });

    // Ready Screen
    document.getElementById('start-game-btn').addEventListener('click', startGame);
    document.getElementById('ready-back-btn').addEventListener('click', () => {
        showScreen('deck-selection-screen');
    });

    // Summary Screen
    document.getElementById('play-again-btn').addEventListener('click', () => {
        showScreen('ready-screen');
    });

    document.getElementById('summary-home-btn').addEventListener('click', () => {
        showScreen('home-screen');
    });

    // Create Deck
    document.getElementById('save-deck-btn').addEventListener('click', saveCustomDeck);
    document.getElementById('create-back-btn').addEventListener('click', () => {
        showScreen('home-screen');
    });

    // Manage Decks
    document.getElementById('manage-back-btn').addEventListener('click', () => {
        showScreen('home-screen');
    });

    // Settings
    document.getElementById('settings-back-btn').addEventListener('click', () => {
        saveSettings();
        showScreen('home-screen');
    });
}

// Deck Management
function loadDeckSelection() {
    const deckList = document.getElementById('deck-list');
    deckList.innerHTML = '';

    // Add default decks
    defaultDecks.forEach(deck => {
        const deckItem = createDeckItem(deck);
        deckList.appendChild(deckItem);
    });

    // Add custom decks
    const customDecks = getCustomDecks();
    customDecks.forEach(deck => {
        const deckItem = createDeckItem(deck);
        deckList.appendChild(deckItem);
    });
}

function createDeckItem(deck) {
    const div = document.createElement('div');
    div.className = 'deck-item';
    div.innerHTML = `
        <div class="deck-name">${deck.name}</div>
        <div class="deck-count">${deck.cards.length} cards</div>
    `;
    div.addEventListener('click', () => selectDeck(deck));
    return div;
}

function selectDeck(deck) {
    state.currentDeck = deck;
    showScreen('ready-screen');
}

function getCustomDecks() {
    const decks = localStorage.getItem('customDecks');
    return decks ? JSON.parse(decks) : [];
}

function saveCustomDeck() {
    const name = document.getElementById('deck-name').value.trim();
    const cardsInput = document.getElementById('deck-cards').value.trim();

    if (!name) {
        alert('Please enter a deck name');
        return;
    }

    if (!cardsInput) {
        alert('Please enter at least one card');
        return;
    }

    // Parse cards (support both newline and comma separation)
    let cards = cardsInput.split(/[\n,]+/).map(card => card.trim()).filter(card => card.length > 0);

    if (cards.length === 0) {
        alert('Please enter at least one valid card');
        return;
    }

    const customDecks = getCustomDecks();

    // Check if we're editing an existing deck
    if (state.editingDeckIndex !== null) {
        // Update existing deck
        customDecks[state.editingDeckIndex] = {
            ...customDecks[state.editingDeckIndex],
            name: name,
            cards: cards
        };
        state.editingDeckIndex = null;
    } else {
        // Create new deck
        const newDeck = {
            id: 'custom-' + Date.now(),
            name: name,
            cards: cards,
            custom: true
        };
        customDecks.push(newDeck);
    }

    localStorage.setItem('customDecks', JSON.stringify(customDecks));

    showScreen('home-screen');
}

function loadManageDecks() {
    const customDeckList = document.getElementById('custom-deck-list');
    const customDecks = getCustomDecks();

    if (customDecks.length === 0) {
        customDeckList.innerHTML = '<p style="text-align: center; color: var(--text-dim);">No custom decks yet</p>';
        return;
    }

    customDeckList.innerHTML = '';
    customDecks.forEach((deck, index) => {
        const div = document.createElement('div');
        div.className = 'custom-deck-item';
        div.innerHTML = `
            <div class="deck-info">
                <div class="deck-name">${deck.name}</div>
                <div class="deck-count">${deck.cards.length} cards</div>
            </div>
            <div class="deck-actions">
                <button class="btn btn-small btn-secondary" onclick="editCustomDeck(${index})">Edit</button>
                <button class="btn btn-small btn-danger" onclick="deleteCustomDeck(${index})">Delete</button>
            </div>
        `;
        customDeckList.appendChild(div);
    });
}

function editCustomDeck(index) {
    const customDecks = getCustomDecks();
    const deck = customDecks[index];

    // Populate the create deck form with existing deck data
    document.getElementById('deck-name').value = deck.name;
    document.getElementById('deck-cards').value = deck.cards.join('\n');

    // Store the index being edited
    state.editingDeckIndex = index;

    showScreen('create-deck-screen');
}

function deleteCustomDeck(index) {
    if (confirm('Are you sure you want to delete this deck?')) {
        const customDecks = getCustomDecks();
        customDecks.splice(index, 1);
        localStorage.setItem('customDecks', JSON.stringify(customDecks));
        loadManageDecks();
    }
}

// Game Logic
function startGame() {
    // Request device orientation permission for iOS 13+
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    initializeGame();
                } else {
                    alert('Device orientation permission is required to play. Please enable it in your browser settings.');
                }
            })
            .catch(console.error);
    } else {
        initializeGame();
    }
}

function initializeGame() {
    // Reset state
    state.currentCards = shuffleArray([...state.currentDeck.cards]);
    state.currentCardIndex = 0;
    state.correctCount = 0;
    state.skipCount = 0;
    state.results = [];
    state.timeRemaining = state.settings.timerDuration;

    // Update UI
    document.getElementById('correct-count').textContent = '0';
    document.getElementById('skip-count').textContent = '0';
    document.getElementById('timer-text').textContent = state.timeRemaining;
    document.getElementById('timer-fill').style.width = '100%';

    showScreen('gameplay-screen');

    // Lock to landscape (if supported)
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
    }

    // Countdown and start
    countdown();
}

function countdown() {
    let count = 3;
    const cardText = document.getElementById('card-text');

    cardText.textContent = count;
    if (state.settings.audioEnabled) {
        playSound('countdown');
    }

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            cardText.textContent = count;
            if (state.settings.audioEnabled) {
                playSound('countdown');
            }
        } else {
            cardText.textContent = 'GO!';
            if (state.settings.audioEnabled) {
                playSound('go');
            }
            setTimeout(() => {
                clearInterval(countdownInterval);
                startRound();
            }, 500);
        }
    }, 1000);
}

function startRound() {
    showCurrentCard();
    startTimer();

    // Reset tilt state
    state.tiltLocked = false;

    setupTiltControls();
    setupDesktopControls();
}

function showCurrentCard() {
    if (state.currentCardIndex < state.currentCards.length) {
        document.getElementById('card-text').textContent = state.currentCards[state.currentCardIndex];
    } else {
        // Reshuffle if we run out of cards
        state.currentCards = shuffleArray([...state.currentDeck.cards]);
        state.currentCardIndex = 0;
        document.getElementById('card-text').textContent = state.currentCards[state.currentCardIndex];
    }
}

function startTimer() {
    const timerFill = document.getElementById('timer-fill');
    const timerText = document.getElementById('timer-text');
    const totalTime = state.settings.timerDuration;

    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        timerText.textContent = state.timeRemaining;

        const percentage = (state.timeRemaining / totalTime) * 100;
        timerFill.style.width = percentage + '%';

        if (state.timeRemaining === 10) {
            timerFill.classList.add('warning');
            if (state.settings.audioEnabled) {
                playSound('warning');
            }
        }

        if (state.timeRemaining <= 0) {
            endRound();
        }
    }, 1000);
}

function setupTiltControls() {
    // Remove any existing listener
    if (state.tiltHandler) {
        window.removeEventListener('deviceorientation', state.tiltHandler);
    }

    const sensitivity = {
        low: 30,
        medium: 40,
        high: 50
    };

    const threshold = sensitivity[state.settings.tiltSensitivity] || 40;
    let baselineBeta = null;
    let calibrationCount = 0;
    const CALIBRATION_SAMPLES = 10; // Average first 10 readings
    let betaSum = 0;

    state.tiltHandler = function handleTilt(event) {
        // If tilt is locked (cooldown period), ignore all events
        if (state.tiltLocked) {
            return;
        }

        const beta = event.beta; // Front-to-back tilt (-180 to 180)
        const gamma = event.gamma; // Left-to-right tilt (-90 to 90)

        // Skip if we don't have valid readings
        if (beta === null || gamma === null) return;

        // Calibrate baseline position over multiple samples for stability
        if (calibrationCount < CALIBRATION_SAMPLES) {
            betaSum += beta;
            calibrationCount++;
            if (calibrationCount === CALIBRATION_SAMPLES) {
                baselineBeta = betaSum / CALIBRATION_SAMPLES;
            }
            return;
        }

        // Calculate change from baseline
        const deltaFromBaseline = beta - baselineBeta;

        // Tilted down (screen facing down) = correct
        // Need significant tilt AND not already locked
        if (deltaFromBaseline > threshold && !state.tiltLocked) {
            state.tiltLocked = true;
            markCorrect();
        }
        // Tilted up (screen facing up) = skip
        else if (deltaFromBaseline < -threshold && !state.tiltLocked) {
            state.tiltLocked = true;
            markSkip();
        }
    };

    window.addEventListener('deviceorientation', state.tiltHandler);
}

function setupDesktopControls() {
    const skipBtn = document.getElementById('desktop-skip-btn');
    const correctBtn = document.getElementById('desktop-correct-btn');

    // Remove old listeners if any
    const newSkipBtn = skipBtn.cloneNode(true);
    const newCorrectBtn = correctBtn.cloneNode(true);
    skipBtn.parentNode.replaceChild(newSkipBtn, skipBtn);
    correctBtn.parentNode.replaceChild(newCorrectBtn, correctBtn);

    // Add new listeners
    document.getElementById('desktop-skip-btn').addEventListener('click', markSkip);
    document.getElementById('desktop-correct-btn').addEventListener('click', markCorrect);
}

function markCorrect() {
    const card = state.currentCards[state.currentCardIndex];
    state.results.push({ card, result: 'correct' });
    state.correctCount++;
    document.getElementById('correct-count').textContent = state.correctCount;

    if (state.settings.audioEnabled) {
        playSound('correct');
    }

    nextCard();
}

function markSkip() {
    const card = state.currentCards[state.currentCardIndex];
    state.results.push({ card, result: 'skip' });
    state.skipCount++;
    document.getElementById('skip-count').textContent = state.skipCount;

    if (state.settings.audioEnabled) {
        playSound('skip');
    }

    nextCard();
}

function nextCard() {
    state.currentCardIndex++;

    if (state.timeRemaining > 0) {
        // Wait before showing next card and re-enabling tilt
        setTimeout(() => {
            showCurrentCard();
            setupDesktopControls();

            // Unlock tilt detection after card is displayed
            // This gives time for user to return to neutral position
            setTimeout(() => {
                state.tiltLocked = false;
                setupTiltControls();
            }, 500); // 500ms cooldown before accepting next tilt
        }, 300);
    }
}

function endRound() {
    clearInterval(state.timerInterval);

    // Remove tilt handler
    if (state.tiltHandler) {
        window.removeEventListener('deviceorientation', state.tiltHandler);
        state.tiltHandler = null;
    }
    state.tiltLocked = false;

    // Unlock orientation
    if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
    }

    if (state.settings.audioEnabled) {
        playSound('end');
    }

    showSummary();
}

function showSummary() {
    document.getElementById('summary-correct').textContent = state.correctCount;
    document.getElementById('summary-skip').textContent = state.skipCount;

    const cardResults = document.getElementById('card-results');
    cardResults.innerHTML = '';

    state.results.forEach(result => {
        const div = document.createElement('div');
        div.className = 'result-item';
        div.innerHTML = `
            <span class="result-icon">${result.result === 'correct' ? '✓' : '⊘'}</span>
            <span class="result-card">${result.card}</span>
        `;
        cardResults.appendChild(div);
    });

    showScreen('summary-screen');
}

// Settings
function loadSettingsScreen() {
    document.getElementById('timer-duration').value = state.settings.timerDuration;
    document.getElementById('audio-toggle').checked = state.settings.audioEnabled;
    document.getElementById('tilt-sensitivity').value = state.settings.tiltSensitivity;
}

function saveSettings() {
    state.settings.timerDuration = parseInt(document.getElementById('timer-duration').value);
    state.settings.audioEnabled = document.getElementById('audio-toggle').checked;
    state.settings.tiltSensitivity = document.getElementById('tilt-sensitivity').value;

    localStorage.setItem('settings', JSON.stringify(state.settings));
}

function loadSettings() {
    const saved = localStorage.getItem('settings');
    if (saved) {
        state.settings = JSON.parse(saved);
    }
}

// Audio
function playSound(type) {
    // Create simple beep sounds using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch (type) {
        case 'countdown':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'go':
            oscillator.frequency.value = 1000;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'correct':
            oscillator.frequency.value = 1200;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'skip':
            oscillator.frequency.value = 400;
            gainNode.gain.value = 0.2;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
        case 'warning':
            oscillator.frequency.value = 600;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
        case 'end':
            oscillator.frequency.value = 800;
            gainNode.gain.value = 0.3;
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.5);
            break;
    }
}

// Utilities
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Make functions available globally
window.editCustomDeck = editCustomDeck;
window.deleteCustomDeck = deleteCustomDeck;

// Start app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
