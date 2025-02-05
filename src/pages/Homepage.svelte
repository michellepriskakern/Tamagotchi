<script>
    if (window.location.pathname === "/") {
        document.body.classList.add("homepage");
    }
</script>

<!-- Hintergrundbild Container -->
<div class="background-image"></div>

<div class="header">
    <h1>Willkommen im Wilden Tamagotchi Spiel!</h1>
    <p>Entwickle dein eigenen Hybriden und schau, was am Ende rauskommt!</p>
</div>

<!-- Neues Spiel erstellen -->
<div class="new-game-container">
    <button
        class="new-game-button"
        on:click={() => (window.location.href = "#/parentselection")}
    >
        <span class="new-game-text">Erstelle einen neuen Hybriden!</span>
    </button>
</div>

<style>
    /* Hintergrundbild nur auf der Homepage */
    .background-image {
        display: none; /* Standardmäßig unsichtbar */
        position: fixed; /* Bild bleibt fixiert */
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url("/assets/Generatives Objekt (2)@2x.png");
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        z-index: -1; /* Damit der Inhalt darüber bleibt */
    }

    /* Wenn auf der Homepage */
    :global(body.homepage) .background-image {
        display: block; /* Nur anzeigen, wenn wir auf der Homepage sind */
    }

    .header {
        padding: 32px;
        text-align: center;
        border-radius: 20px;
        margin-bottom: 24px;
        background-color: rgba(
            0,
            0,
            0,
            0.5
        ); /* Leichter transparenter Hintergrund */
        width: 100%;
        color: white; /* Weißer Text für h1 und p */
    }

    .header h1 {
        color: white; /* Weiß für h1 */
        font-size: 2rem; /* Default font size */
    }

    .header p {
        color: white; /* Weiß für p */
        font-size: 1.2rem; /* Default font size */
    }

    .new-game-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 32px;
    }

    .new-game-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 12px 24px; /* Smaller padding */
        background-color: #7c84f0;
        border: none;
        border-radius: 50px;
        font-size: 1.1rem; /* Smaller font size */
        font-weight: bold;
        color: #333;
        cursor: pointer;
        color: white;
        transition:
            transform 0.2s,
            box-shadow 0.2s;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .new-game-button:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    }

    .new-game-text {
        margin-left: 12px;
        font-size: 1.1rem; /* Smaller text */
    }

    /* Responsive Styles for smaller screens */
    @media (max-width: 768px) {
        .header {
            padding: 5px;
        }

        .header h1 {
            font-size: 1rem; /* Smaller font size for mobile */
        }

        .header p {
            font-size: 0.6rem; /* Smaller font size for mobile */
        }

        .new-game-container {
            flex-direction: column;
            gap: 8px;
            margin-top: 24px;
        }

        .new-game-button {
            font-size: 1rem; /* Even smaller button text */
            padding: 8px 16px; /* Even smaller padding */
        }

        .new-game-text {
            font-size: 1rem; /* Even smaller text */
        }
    }
</style>
