<script>
    import { hybridsStore } from "../store/hybridsStore.js";
    import { selectedParents } from "../store/hybridsStore.js";
    import { writable } from "svelte/store";
    import { onMount, onDestroy } from "svelte";

    let hybrid = writable(null);
    let id = null;
    let image = writable(""); // Image URL

    // State for hunger, hygiene, and love
    let hunger = writable(50); // Default values
    let hygiene = writable(50);
    let love = writable(50);

    // Loading state
    let loading = writable(false);

    // Age dictionary for hybrid growth stages
    const ageDictionary = {
        "0": "newborn baby",
        "1": "young child",
        "2": "adolescent",
        "3": "adult",
        "4": "elderly",
    };

    let autoGenerateTimer = null;

    onMount(() => {
        const urlHash = window.location.hash;
        const match = urlHash.match(/\/hybrids\/(\d+)/);

        if (match) {
            id = parseInt(match[1], 10);
        }

        if (id !== null) {
            hybridsStore.subscribe((hybridList) => {
                if (id >= 0 && id < hybridList.length) {
                    let selectedHybrid = hybridList[id];
                    hybrid.set(selectedHybrid);
                    image.set(selectedHybrid.image);
                }
            });
        }

        // Decrease stats every 20 seconds by 10%
        const decreaseStats = setInterval(() => {
            hunger.update((val) => Math.max(0, val - 10));
            hygiene.update((val) => Math.max(0, val - 5));
            love.update((val) => Math.max(0, val - 15));
        }, 20000);

        // Auto generate hybrid after 2 minutes
        autoGenerateTimer = setTimeout(() => {
            generateHybrid(); // Automatically generate the hybrid after 2 minutes
        }, 120000);

        // Cleanup interval and timeout when component is destroyed
        onDestroy(() => {
            clearInterval(decreaseStats);
            clearTimeout(autoGenerateTimer);
        });
    });

    function goBack() {
        window.location.hash = "/hybrids";
    }

    async function levelUp() {
        let age = $hybrid.age;
        let hybridStatus = checkHybridStatus();

        if (hybridStatus === "positive") {
            age = Math.min(age + 1, 4); // Increment age but not beyond 4 (elderly)
        } else if (hybridStatus === "negative") {
            age = Math.max(age - 1, 0); // Decrement age but not below 0 (newborn)
        }

        $hybrid.age = age;

        generateHybrid(); // Generate a new hybrid image after leveling up
    }

    function checkHybridStatus() {
        if ($hunger < 50 || $hygiene < 50 || $love < 50) {
            return "negative"; // If any stat is below 50, the hybrid's status is negative
        } else {
            return "positive"; // Otherwise, the hybrid's status is positive
        }
    }

    async function generateHybrid() {
        if ($selectedParents.length >= 2) {
            const parent1 = $selectedParents[0]?.englishName;
            const parent2 = $selectedParents[1]?.englishName;

            const prompt = `A whimsical and hyperrealistic cartoon-style Wolpertinger, a mythical creature combining traits of a ${parent1} and a ${parent2}. 
            The creature's body has detailed texture and large, expressive eyes. The features of both animals are seamlessly blended together. The creature 
            generally appears almost like a plush toy, with a childlike and fantastical presence.
            The Wolpertinger has been fed a bit too much and his proportions reflect that circumstance. 
            His health status looks accordingly. On a scale for how evil the Wolpertinger looks, where 0 means 
            "very bad and evil" and 10 meaning "peaceful and full of love", the Wolpertinger gets a 2. 
            The Wolpertinger's look and the surrounding scene is determined by these parameters. If the Wolpertinger 
            is healthy and loveable, the scene is an enchanted forest with warm sunlight filtering through the trees, 
            creating a harmonious and whimsical atmosphere. If the Wolpertinger is evil and hungry, it would be 
            surrounded by a harsh, abyssal rock landscape in the middle of a thunderstorm.`;

            loading.set(true);

            try {
                const response = await fetch(
                    "https://api.openai.com/v1/images/generations",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        },
                        body: JSON.stringify({
                            model: "dall-e-3",
                            prompt: prompt,
                            n: 1,
                            size: "1024x1024",
                        }),
                    },
                );

                const data = await response.json();
                if (data.data && data.data.length > 0) {
                    const newImage = data.data[0].url;

                    hybridsStore.update((currentHybrids) => {
                        const updatedHybrids = currentHybrids.map(
                            (hyb, index) => {
                                if (index === id) {
                                    hyb.image = newImage;
                                    hyb.age = $hybrid.age; // Update hybrid age
                                }
                                return hyb;
                            },
                        );
                        localStorage.setItem(
                            "hybrids",
                            JSON.stringify(updatedHybrids),
                        );
                        return updatedHybrids;
                    });

                    image.set(newImage);
                }
            } catch (error) {
                console.error("Error generating image:", error);
            } finally {
                loading.set(false);
            }
        } else {
            alert("Please select two animals first.");
        }
    }

    // Increase hunger, hygiene, or love stat
    function increaseStat(stat) {
        if (stat === "hunger") hunger.update((val) => Math.min(100, val + 10));
        if (stat === "hygiene")
            hygiene.update((val) => Math.min(100, val + 10));
        if (stat === "love") love.update((val) => Math.min(100, val + 10));
    }
</script>

{#if $hybrid}
    <div class="container">
        <h1>{$hybrid.englishName}</h1>
        <div class="image-container">
            <img src={$image} alt={$hybrid.englishName} class="hybrid-image" />
            <button on:click={levelUp} class="level-up-btn" disabled={$loading}>
                {#if $loading}
                    Generating...
                {:else}
                    Level-Up
                {/if}
            </button>
        </div>

        <div class="stats">
            <h2>Status:</h2>
            <div class="stat-item">
                <p>🍖 Hunger: {$hunger}%</p>
                <div class="progress-bar">
                    <div class="progress" style="width: {$hunger}%"></div>
                </div>
                <button
                    on:click={() => increaseStat("hunger")}
                    class="increase-btn">+10</button
                >
            </div>
            <div class="stat-item">
                <p>🧼 Hygiene: {$hygiene}%</p>
                <div class="progress-bar">
                    <div class="progress" style="width: {$hygiene}%"></div>
                </div>
                <button
                    on:click={() => increaseStat("hygiene")}
                    class="increase-btn">+10</button
                >
            </div>
            <div class="stat-item">
                <p>❤️ Love: {$love}%</p>
                <div class="progress-bar">
                    <div class="progress" style="width: {$love}%"></div>
                </div>
                <button
                    on:click={() => increaseStat("love")}
                    class="increase-btn">+10</button
                >
            </div>
        </div>

        <button on:click={goBack} class="back-btn">Back</button>
    </div>
{:else}
    <p>Hybrid not found!</p>
{/if}

<style>
    /* Container for the whole page */
    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }

    h1 {
        font-size: 2rem;
        color: #333;
        margin-top: 20px; /* Adjust the top margin */
    }

    /* Mobile devices */
    @media (max-width: 600px) {
        h1 {
            margin-top: 50px; /* Move the title further down on small screens */
        }
    }

    /* Eltern Info */
    .parents-info {
        margin-bottom: 20px;
        text-align: left;
    }

    .parents-info p {
        font-size: 1rem;
    }

    /* Image and level-up button */
    .image-container {
        position: relative;
        margin-bottom: 20px;
    }

    .hybrid-image {
        width: 100%;
        max-width: 400px;
        height: auto;
        border-radius: 12px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .level-up-btn {
        position: absolute;
        bottom: -60px; /* Default positioning for non-mobile screens */
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px;
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.3s ease;
    }

    /* Mobile view: adjust the button to be further down */
    @media (max-width: 600px) {
        .level-up-btn {
            bottom: -60px; /* Move the button lower on small screens */
        }
    }

    .level-up-btn:hover {
        background-color: #45a049;
    }

    .level-up-btn:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    /* Stats section */
    .stats {
        margin-top: 80px;
        text-align: left;
    }

    .stat-item {
        margin-bottom: 20px;
    }

    .stat-item p {
        font-size: 1.1rem;
        font-weight: bold;
    }

    .progress-bar {
        width: 100%;
        height: 10px;
        background-color: #f0f0f0;
        border-radius: 5px;
        overflow: hidden;
    }

    .progress {
        height: 100%;
        background-color: #4caf50;
    }

    /* Increase button */
    .increase-btn {
        margin-top: 5px;
        padding: 5px 15px;
        background-color: #f0a500;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s ease;
    }

    .increase-btn:hover {
        background-color: #e69100;
    }

    /* Back button */
    .back-btn {
        margin-top: 20px;
        padding: 10px 20px;
        background-color: #ccc;
        color: black;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.3s ease;
    }

    .back-btn:hover {
        background-color: #999;
    }
</style>
