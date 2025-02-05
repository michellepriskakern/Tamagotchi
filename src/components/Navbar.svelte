<script>
    import { onMount } from "svelte";

    let activeUrl = window.location.hash || window.location.pathname; // Get current URL path
    let isOpen = false; // For hamburger menu

    // Add listener to track current URL path
    onMount(() => {
        const handleLocationChange = () => {
            activeUrl = window.location.hash || window.location.pathname;
        };

        // Event listeners for URL changes (for manual navigation)
        window.addEventListener("popstate", handleLocationChange);
        window.addEventListener("hashchange", handleLocationChange); // For hash changes

        return () => {
            window.removeEventListener("popstate", handleLocationChange);
            window.removeEventListener("hashchange", handleLocationChange);
        };
    });

    // Function to close the menu when a link is clicked
    function handleLinkClick() {
        // Keep the menu open on mobile when a link is clicked
        if (window.innerWidth <= 768) {
            isOpen = true;
        }
    }
</script>

<nav>
    <a href="/" class="brand">
        <span class="brand-name">Tamagotchis</span>
    </a>

    <!-- Hamburger Icon -->
    <div class="hamburger" on:click={() => (isOpen = !isOpen)}>
        &#9776; <!-- Hamburger Icon -->
    </div>

    <!-- Navigation Links -->
    <ul class="nav-links {isOpen ? 'open' : ''}">
        <li>
            <a
                href="/"
                class={activeUrl === "/" ? "active" : ""}
                on:click={handleLinkClick}>Home</a
            >
        </li>
        <li>
            <a
                href="/#/parentselection"
                class={activeUrl === "/#/parentselection" ? "active" : ""}
                on:click={handleLinkClick}>Parentselection</a
            >
        </li>
        <li>
            <a
                href="/#/spielanleitung"
                class={activeUrl === "/#/spielanleitung" ? "active" : ""}
                on:click={handleLinkClick}>Anleitung</a
            >
        </li>
        <li>
            <a
                href="/#/lexikon"
                class={activeUrl === "/#/lexikon" ? "active" : ""}
                on:click={handleLinkClick}>Lexikon</a
            >
        </li>
        <li>
            <a
                href="/#/hybrids"
                class={activeUrl === "/#/hybrids" ? "active" : ""}
                on:click={handleLinkClick}>Deine Hybriden</a
            >
        </li>
    </ul>
</nav>

<style>
    /* Basic navbar styling */
    nav {
        position: fixed; /* Fixed at the top */
        top: 0;
        left: 0;
        width: 100%;
        background: linear-gradient(
            45deg,
            #6a11cb,
            #2575fc
        ); /* Gradient from purple to blue */
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        z-index: 10;
        box-sizing: border-box;
        transition: all 0.3s ease;
    }

    /* Logo styling */
    .brand {
        display: flex;
        align-items: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .brand img {
        height: 40px;
        margin-right: 10px;
        transition: all 0.3s ease;
    }

    .brand-name {
        font-size: 1.4rem;
        font-weight: 700;
        letter-spacing: 1px;
        transition: all 0.3s ease;
    }

    /* Navigation links styling */
    .nav-links {
        display: flex;
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    .nav-links li {
        margin: 0 20px;
    }

    .nav-links a {
        color: white;
        text-decoration: none;
        font-size: 1.1rem;
        padding: 8px 16px;
        border-radius: 8px;
        transition: all 0.3s ease;
        position: relative;
    }

    /* Permanent underline for active links */
    .nav-links a.active::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: white; /* White underline */
    }

    /* Hover effect and active state */
    .nav-links a:hover,
    .nav-links a.active {
        background-color: rgba(255, 255, 255, 0.1); /* Lighter hover effect */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Hover shadow */
    }

    /* Hamburger menu styling */
    .hamburger {
        display: none;
        cursor: pointer;
        color: white;
        font-size: 2rem;
    }

    /* Mobile view media queries */
    @media (max-width: 768px) {
        .nav-links {
            display: none;
            flex-direction: column;
            align-items: center;
            width: 100%;
            margin-top: 20px;
        }

        .nav-links.open {
            display: flex;
        }

        .hamburger {
            display: block;
        }

        .nav-links li {
            margin: 10px 0;
        }

        .brand img {
            height: 30px;
        }

        .brand-name {
            font-size: 1.1rem;
        }
    }
</style>
