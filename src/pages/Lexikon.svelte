<script>
    import { animals } from "../store/hybridsStore.js";
    import { writable } from "svelte/store";

    let animalList = [];
    let wikiInfo = writable("");

    $: animalList = $animals;

    function toggleFlip(index) {
        animalList[index].flipped = !animalList[index].flipped;
    }

    async function fetchWikiInfo(animalName) {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const url = "https://api.openai.com/v1/chat/completions";

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content:
                            "Du bist ein Experten-Tier-Wiki. Deine Antworten sollen kurz und prägnant sein.",
                    },
                    {
                        role: "user",
                        content: `Erzähle mir kurz mehr über ein ${animalName}.`,
                    },
                ],
            }),
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async function setAnimalInfo() {
        for (let animal of animalList) {
            animal.loading = true; // Set loading true for each animal
            const info = await fetchWikiInfo(animal.name);
            animal.wikiInfo = info;
            animal.loading = false; // Set loading false after the info is fetched
        }
    }

    import { onMount } from "svelte";
    onMount(() => {
        setAnimalInfo();
    });
</script>

<main>
    <h1>Alle Tiere</h1>

    <div class="animal-grid">
        {#each animalList as animal, index}
            <div class="animal-card" on:click={() => toggleFlip(index)}>
                <div class="card-inner" class:flipped={animal.flipped}>
                    <div class="card-front">
                        <img
                            src={animal.image}
                            alt={animal.name}
                            class="animal-image"
                        />
                        <h2>{animal.name}</h2>
                    </div>
                    <div class="card-back">
                        <h3>Informationen zu {animal.name}</h3>
                        {#if animal.loading}
                            <!-- Show loader while loading info -->
                            <div class="loader"></div>
                        {:else}
                            <p>{animal.wikiInfo}</p>
                            <!-- Wiki-Informationen -->
                        {/if}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        font-family: Arial, sans-serif;
        text-align: center;
        padding: 20px;
    }

    .animal-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 80px;
        padding: 0 20px;
    }

    .animal-card {
        perspective: 1000px;
        width: 300px;
        height: 400px;
        position: relative;
    }

    .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.5s;
    }

    .flipped {
        transform: rotateY(180deg);
    }

    .card-front,
    .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .card-front {
        background-color: #f9f9f9;
        border-radius: 12px;
        padding: 20px;
        text-align: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .card-back {
        background-color: #7c84f0;
        color: white;
        transform: rotateY(180deg);
        padding: 20px;
        text-align: center;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    .animal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
    }

    h2 {
        font-size: 1.5rem;
        margin-top: 15px;
    }

    h3 {
        font-size: 1.2rem;
    }

    /* Anpassung für den Text auf der Rückseite der Karte */
    .card-back p {
        font-size: 0.9rem;
        line-height: 1.4;
        margin: 0;
        text-align: justify;
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
    }

    /* Media Query für mobile Ansicht */
    @media (max-width: 768px) {
        .animal-grid {
            grid-template-columns: 1fr;
            gap: 60px;
        }

        .animal-card {
            width: 200px;
            height: 300px;
            margin: 0 auto;
        }
    }

    /* Styles for the loading spinner */
    .loader {
        border: 8px solid #f3f3f3; /* Light gray background */
        border-top: 8px solid #7c84f0; /* Blue color for spinner */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
        margin: 0 auto;
    }

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
