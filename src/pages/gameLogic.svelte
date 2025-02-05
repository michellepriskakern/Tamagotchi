<script>
    import { selectedParents } from "../store/./hybridsStore.js"; // Importieren des Stores
    import { hybridsStore } from "../store/./hybridsStore.js";

    let hybridParents = [];
    let hunger = 50;
    let hygiene = 50;
    let love = 50;
    let newAnimal = null;
    let animalName = "";
    let isLoading = false;

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY; // API-Schlüssel aus .env-Datei

    async function generateHybrid() {
        if (hybridParents.length === 2) {
            isLoading = true;
            // Prompt für die Bildgenerierung des ersten Hybriden
            const prompt = `A whimsical and hyperrealistic cartoon-style Wolpertinger, a mythical creature combining traits of a ${hybridParents[0].englishName} and an ${hybridParents[1].englishName}. 
            The creature has the body of a ${hybridParents[0].englishName} with detailed, soft-striped fur and large, expressive eyes. It features the trunk and tusks of an ${hybridParents[1].englishName}, 
            blending seamlessly with the ${hybridParents[0].englishName}'s head and body. The Wolpertinger has a playful, magical expression to evoke charm and empathy. The scene is set in a detailed, enchanted 
            forest with warm sunlight filtering through the trees, creating a harmonious and whimsical atmosphere. The creature appears almost like a plush toy, with a childlike and fantastical presence.`;

            try {
                const response = await fetch(
                    "https://api.openai.com/v1/images/generations",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${apiKey}`,
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
                    newAnimal = {
                        englishName: `${hybridParents[0].englishName}-${hybridParents[1].englishName} Hybrid`,
                        image: data.data[0].url,
                    };

                    hybridsStore.update((currentHybrids) => {
                        const updatedHybrids = [...currentHybrids, newAnimal];
                        localStorage.setItem(
                            "hybrids",
                            JSON.stringify(updatedHybrids),
                        );
                        return updatedHybrids;
                    });
                }
            } catch (error) {
                console.error("Fehler bei der Bildgenerierung:", error);
            } finally {
                isLoading = false;
            }
        } else {
            alert("WÃ¤hlen Sie zuerst zwei Tiere aus.");
        }
    }

    $: hybridParents = $selectedParents;
</script>

<div class="container">
    <h1>Hybriden-Ersteller</h1>
    <!-- Hier wird die Auswahl der Eltern-Tiere angezeigt -->
    <section class="parents-section">
        <h2>Eltern des Hybriden:</h2>
        {#if hybridParents.length === 2}
            <div class="parents">
                <div class="parent">
                    <img
                        src={hybridParents[0].image}
                        alt={hybridParents[0].englishName}
                    />
                    <p>{hybridParents[0].englishName}</p>
                </div>
                <div class="parent">
                    <img
                        src={hybridParents[1].image}
                        alt={hybridParents[1].englishName}
                    />
                    <p>{hybridParents[1].englishName}</p>
                </div>
            </div>
        {/if}
    </section>

    <section class="hybrid-section">
        <h2>Neues Tier:</h2>
        <button
            on:click={generateHybrid}
            disabled={hybridParents.length !== 2 || isLoading}
        >
            {#if isLoading}
                Lade...
            {:else}
                Hybriden erstellen
            {/if}
        </button>

        {#if isLoading}
            <div class="loading-spinner"></div>
        {/if}

        {#if newAnimal}
            <div class="new-animal">
                <h3>{newAnimal.englishName}</h3>
                <img src={newAnimal.image} alt={newAnimal.englishName} />
            </div>
        {/if}
    </section>
</div>

<style>
    /* Allgemeine Gestaltung */
    body {
        font-family: "Arial", sans-serif;
        background-color: #f0f4f8;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
    }

    h1 {
        font-size: 2.5rem;
        color: #333;
        margin-bottom: 20px;
    }

    h2 {
        font-size: 1.8rem;
        color: #555;
        margin-bottom: 15px;
    }

    /* Eltern-Sektion */
    .parents-section {
        margin-bottom: 40px;
    }

    .parents {
        display: flex;
        justify-content: center;
        gap: 30px;
        margin-top: 20px;
    }

    .parent {
        max-width: 250px;
        text-align: center;
    }

    .parent img {
        width: 100%;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    .parent p {
        margin-top: 10px;
        font-size: 1.2rem;
        color: #333;
    }

    /* Hybriden-Sektion */
    .hybrid-section {
        margin-top: 40px;
    }

    button {
        background-color: #4caf50;
        color: white;
        padding: 15px 30px;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.2rem;
        transition: background-color 0.3s;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    button:hover:enabled {
        background-color: #45a049;
    }

    .new-animal {
        margin-top: 30px;
    }

    .new-animal img {
        width: 100%;
        max-width: 400px;
        margin-top: 20px;
    }
</style>
