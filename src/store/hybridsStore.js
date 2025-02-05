import { writable } from "svelte/store";

// Funktion zum Erstellen eines persistenten Stores
function createPersistentStore(key, initialValue) {
    const store = writable(JSON.parse(localStorage.getItem(key)) || initialValue);

    // Speichert Änderungen in localStorage
    store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

// 🛠 Hybriden-Store mit persistenter Speicherung
export const hybridsStore = createPersistentStore("hybridsStore", []);

// 🛠 Store für die Elternnamen mit persistenter Speicherung
export const parentsStore = writable({
    parent1: localStorage.getItem('parent1') || '',
    parent2: localStorage.getItem('parent2') || ''
});

// Beobachtet Änderungen der Elternnamen und speichert sie im LocalStorage
parentsStore.subscribe(value => {
    localStorage.setItem('parent1', value.parent1);
    localStorage.setItem('parent2', value.parent2);
});

// Andere Stores
export const animals = writable([
    { name: "Nilpferd", englishName: "Hippopotamus", image: "/assets/Nielpferd_Orginal.jpeg" },
    { name: "Tiger", englishName: "Tiger", image: "/assets/Tiger_Orginal.jpeg" },
    { name: "Elefant", englishName: "Elephant", image: "/assets/Elefant_Orginal.jpeg" },
    { name: "Delfin", englishName: "Dolphin", image: "/assets/Delfin_Orginal.jpeg" },
    { name: "Hyäne", englishName: "Hyena", image: "/assets/Hyäne_Orginal.jpeg" },
    { name: "Giraffe", englishName: "Giraffe", image: "/assets/Giraffe_Orginal.jpeg" },
]);

export const selectedParents = writable([]);

// Funktion zum Setzen der Eltern im Store
export function setParents(parent1Name, parent2Name) {
    parentsStore.set({
        parent1: parent1Name,
        parent2: parent2Name
    });
}
