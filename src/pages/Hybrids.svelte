<script>
    import { hybridsStore } from "../store/hybridsStore.js";

    function openHybrid(index) {
        window.location.hash = "/hybrids/" + index; // Sicherstellen, dass die ID korrekt als Zahl übergeben wird
    }
</script>

<div class="container">
    <h1>Deine Hybriden</h1>
    <section class="hybrids-list">
        {#each $hybridsStore as hybrid, index}
            <div class="hybrid" on:click={() => openHybrid(index)}>
                <h3>{hybrid.englishName}</h3>
                <img src={hybrid.image} alt={hybrid.englishName} />
            </div>
        {/each}
    </section>
</div>

<style>
    .container {
        max-width: 800px;
        margin: auto;
        padding: 16px;
        font-family: Arial, sans-serif;
    }

    .hybrids-list {
        display: grid;
        grid-template-columns: repeat(
            3,
            1fr
        ); /* 3 Spalten für größere Bildschirme */
        gap: 16px;
        justify-items: center; /* Zentriert die Karten in jeder Spalte */
    }

    .hybrid {
        text-align: center;
        margin: 8px; /* Weniger Abstand zwischen den Karten */
        width: 90%; /* Kleinere Breite innerhalb des Raster-Layouts */
        cursor: pointer;
    }

    .hybrid h3 {
        font-size: 18px; /* Größere Schriftgröße für die Namen */
        margin-top: 8px;
        font-weight: bold;
    }

    .hybrid img {
        width: 150px; /* Größere Bilder */
        height: 150px; /* Größere Höhe für die Bilder */
        object-fit: cover;
        border-radius: 8px; /* Kleinere Eckenradius */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Kleinere Box-Schatten */
    }

    .hybrid:hover {
        transform: scale(1.05);
        transition: 0.2s ease-in-out;
    }

    /* Mobile responsiveness */
    @media (max-width: 768px) {
        .hybrids-list {
            grid-template-columns: repeat(
                2,
                1fr
            ); /* 2 Spalten auf mittleren Geräten */
        }

        .hybrid {
            width: 80%; /* Kleinere Breite der Karten auf mobilen Geräten */
        }

        .hybrid h3 {
            font-size: 16px; /* Größere Schriftgröße für die Namen auf mobilen Geräten */
        }

        .hybrid img {
            width: 120px; /* Größere Bilder auf mobilen Geräten */
            height: 120px; /* Größere Höhe der Bilder */
        }
    }

    @media (max-width: 480px) {
        .hybrids-list {
            grid-template-columns: repeat(
                2,
                1fr
            ); /* 2 Spalten auf kleinen Geräten */
        }

        .hybrid {
            width: 80%; /* Noch kleinere Karten auf sehr kleinen Geräten */
        }

        .hybrid h3 {
            font-size: 14px; /* Noch größere Schriftgröße für die Namen auf sehr kleinen Geräten */
        }

        .hybrid img {
            width: 100px; /* Größere Bilder auf sehr kleinen Geräten */
            height: 100px; /* Größere Höhe der Bilder */
        }
    }
</style>
