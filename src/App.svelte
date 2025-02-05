<script>
  import Router from "svelte-spa-router";
  import Navbar from "./components/Navbar.svelte";
  import Homepage from "./pages/Homepage.svelte";
  import Hybrids from "./pages/Hybrids.svelte";
  import HybridDetail from "./pages/HybridDetail.svelte";
  import Lexikon from "./pages/Lexikon.svelte";
  import Spielanleitung from "./pages/Spielanleitung.svelte";
  import ParentSelection from "./pages/ParentSelection.svelte";
  import gameLogic from "./pages/gameLogic.svelte";

  // Define routes
  const routes = {
    "/": Homepage,
    "/hybrids": Hybrids,
    "/hybrids/:id": HybridDetail, // Detailansicht für einen Hybrid
    "/lexikon": Lexikon,
    "/spielanleitung": Spielanleitung,
    "/parentselection": ParentSelection,
    "/gameLogic": gameLogic,
  };
</script>

<Navbar />

<main>
  <Router {routes} />
</main>
