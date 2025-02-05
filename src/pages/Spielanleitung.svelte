<script>
    // No special logic needed for the basic design
</script>

<div class="instructions-container">
    <div class="title">Wie funktioniert das Spiel?</div>
    <div class="description">
        Wähle zwei Tiere aus und erschaffe aus ihnen ein einzigartiges,
        furchtloses Wesen. Füttere deinen Hybriden, um ihm schärfere Zähne zu
        verleihen und seine Stärke zu steigern. Verwöhne ihn mit einer
        gründlichen Wäsche, damit sein Fell weicher und glänzender wird. Und
        zeige ihm deine Liebe – je mehr Zuneigung du ihm schenkst, desto
        glücklicher wird er und umso stärker wird eure Bindung. Nach 2 Minuten
        gibt es ein Level Up und dein Hybrid wächst. Aber pass auf! Wenn du
        deinen Hybriden vernachlässigst, wird er unglücklich und schwach, das
        passiert wenn der Fortschritsbalken unter 50% fällt.
    </div>

    <div class="steps">
        <div class="step">
            <span class="step-number">Schritt 1</span>
            <h3>Wähle Tiere aus</h3>
            <p>
                Erstelle deinen einzigartigen Hybriden, indem du zwei Tiere
                auswählst und sie miteinander kombinierst.
            </p>
        </div>
        <div class="step">
            <span class="step-number">Schritt 2</span>
            <h3>Füttere deinen Hybriden</h3>
            <p>
                Gib deinem Hybriden Nahrung, damit seine Zähne schärfer werden
                und er stärker wird.
            </p>
        </div>
        <div class="step">
            <span class="step-number">Schritt 3</span>
            <h3>Wasche deinen Hybriden</h3>
            <p>
                Reinige deinen Hybriden, damit sein Fell weicher wird und er
                sich besser fühlt.
            </p>
        </div>
        <div class="step">
            <span class="step-number">Schritt 4</span>
            <h3>Gib deinem Hybriden Liebe</h3>
            <p>
                Zeige deinem Hybriden Zuneigung, damit er glücklicher wird und
                eine starke Bindung zu dir aufbaut.
            </p>
        </div>
    </div>
</div>

<style>
    .instructions-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
        font-family: "Arial", sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .title {
        font-size: 2.5rem;
        font-weight: bold;
        text-align: center;
        color: #6a11cb;
        margin-bottom: 1rem;
    }

    .description {
        font-size: 1.2rem;
        color: #333;
        text-align: center;
        margin-bottom: 2rem;
        line-height: 1.6;
    }

    .steps {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 2rem;
        justify-content: center;
    }

    .step {
        width: 28%;
        background-color: #f9f9f9;
        border-radius: 10px;
        padding: 1.5rem;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        position: relative;
        transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
    }

    .step:hover {
        transform: translateY(-10px);
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
    }

    .step img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        border-radius: 10px;
        margin-bottom: 1rem;
    }

    .step h3 {
        font-size: 1.5rem;
        color: #2575fc;
        margin-bottom: 1rem;
        text-align: center;
    }

    .step p {
        font-size: 1rem;
        color: #555;
        text-align: center;
    }

    .step .step-number {
        font-size: 1.2rem;
        font-weight: bold;
        color: #2575fc;
        position: absolute;
        top: 10px;
        left: 10px;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .title {
            font-size: 2rem;
            margin-top: 4rem; /* Adjusted margin-top for more space */
        }

        .description {
            font-size: 1rem;
            margin-bottom: 1.5rem;
        }

        .steps {
            display: grid; /* Use grid for the mobile layout */
            grid-template-columns: 1fr 1fr; /* Two items per row */
            gap: 1.5rem; /* Space between items */
            justify-items: center; /* Center the items horizontally */
        }

        .step {
            width: 90%; /* Adjust width to fit better */
            padding: 1rem;
        }

        .step img {
            height: 150px; /* Smaller images on mobile devices */
        }

        .step h3 {
            font-size: 1.3rem;
        }

        .step p {
            font-size: 0.9rem;
        }
    }

    @media (max-width: 480px) {
        .steps {
            grid-template-columns: 1fr; /* One item per row on very small screens */
            gap: 1rem; /* Reduced gap */
        }

        .step {
            width: 90%; /* Even broader steps */
        }

        .step img {
            height: 120px; /* Even smaller images */
        }

        .step h3 {
            font-size: 1.2rem;
        }

        .step p {
            font-size: 0.85rem;
        }
    }
</style>
