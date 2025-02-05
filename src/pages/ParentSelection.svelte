<script>
    import { animals, selectedParents } from "../store/./hybridsStore.js"; // Importiere den Store

    let selectedAnimals = []; // Liste der ausgewählten Tiere

    // Funktion zur Auswahl und Abwahl der Tiere
    function selectAnimal(animal) {
        if (selectedAnimals.includes(animal)) {
            selectedAnimals = selectedAnimals.filter((a) => a !== animal); // Entferne Tier, wenn es erneut ausgewählt wird
        } else if (selectedAnimals.length < 2) {
            selectedAnimals = [...selectedAnimals, animal]; // Füge Tier hinzu, wenn weniger als 2 Tiere ausgewählt sind
        }
    }

    $: isReadyToCreate = selectedAnimals.length === 2; // Überprüfe, ob genau zwei Tiere ausgewählt wurden

    // Funktion zum Weiterleiten
    function goToGameLogic() {
        if (isReadyToCreate) {
            selectedParents.set(selectedAnimals); // Speichere die ausgewählten Tiere im Store
            window.location.hash = "/gameLogic"; // Navigiere zum Hash-Link
        } else {
            alert("Bitte wähle genau zwei Tiere aus.");
        }
    }
</script>

<div>
    <h1>Wähle zwei Tiere als Eltern aus</h1>

    <div class="animal-grid">
        {#each $animals as animal}
            <div
                class="animal {selectedAnimals.includes(animal)
                    ? 'selected'
                    : ''}"
                on:click={() => selectAnimal(animal)}
            >
                <img
                    src={animal.image}
                    alt={animal.englishName}
                    class="animal-image"
                />
                <p class="animal-name">{animal.englishName}</p>
            </div>
        {/each}
    </div>

    <button
        on:click={goToGameLogic}
        disabled={!isReadyToCreate}
        class="create-button"
    >
        Erstelle Hybriden
    </button>
</div>

<style>
    h1 {
        font-size: 2rem;
        text-align: center;
        margin-top: 64px;
        margin-bottom: 0; /* Reduziert den Abstand nach unten */
    }

    .animal-grid {
        display: grid;
        grid-template-columns: repeat(
            3,
            1fr
        ); /* Drei Spalten auf größeren Bildschirmen */
        gap: 16px; /* Weniger Abstand zwischen den Elementen */
        padding: 40px 0; /* Weniger Padding oben und unten */
    }

    .animal {
        border: 2px solid #ccc; /* Dünnere Border */
        border-radius: 8px; /* Kleinere Ecken */
        padding: 12px; /* Weniger Padding für kleinere Container */
        text-align: center;
        cursor: pointer;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
    }

    .animal:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .animal.selected {
        border-color: #4caf50;
        background-color: #e8f5e9;
        transform: scale(1.1);
    }

    .animal-image {
        width: 80%; /* Etwas kleinere Bilder */
        height: auto;
        border-radius: 8px;
        margin-bottom: 8px;
    }

    .animal-name {
        font-size: 1.1rem; /* Kleinere Schriftgröße */
        font-weight: bold;
        margin-top: 8px;
    }

    .create-button {
        font-size: 1.25rem; /* Kleinere Schriftgröße */
        padding: 12px 20px; /* Kleinere Button-Größe */
        background-color: #4caf50;
        color: white;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition:
            background-color 0.3s,
            transform 0.2s;
        display: block;
        margin: 8px auto 16px; /* Button weiter nach oben verschieben */
    }

    .create-button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }

    .create-button:hover:enabled {
        background-color: #45a049;
        transform: scale(1.05);
    }

    /* Responsive Styles for smaller screens */
    @media (max-width: 768px) {
        h1 {
            font-size: 1.5rem; /* Kleinere Schriftgröße auf mobilen Geräten */
            margin-top: 62px; /* Weniger Abstand oben */
        }

        .animal-grid {
            grid-template-columns: repeat(
                2,
                1fr
            ); /* Zwei Spalten auf mittleren Bildschirmen */
            gap: 12px; /* Weniger Abstand */
            padding: 20px 0; /* Weniger Padding */
        }

        .animal {
            padding: 8px; /* Weniger Padding */
            border-radius: 6px; /* Kleinere Ecken */
        }

        .animal-image {
            width: 70%; /* Etwas kleinere Bilder */
        }

        .animal-name {
            font-size: 1rem; /* Kleinere Schriftgröße */
        }

        .create-button {
            font-size: 1rem; /* Kleinere Schriftgröße */
            padding: 10px 18px; /* Kleinere Button-Größe */
        }
    }

    @media (max-width: 480px) {
        .animal-grid {
            grid-template-columns: repeat(
                2,
                1fr
            ); /* Immer zwei Spalten auf sehr kleinen Bildschirmen */
            gap: 12px; /* Weniger Abstand zwischen den Elementen */
        }

        .animal-image {
            width: 90%; /* Noch größere Anpassung der Bildgröße */
        }

        .create-button {
            margin-top: -8px; /* Erhöhe den Abstand nach oben auf kleinen Bildschirmen */
        }
    }
</style>
