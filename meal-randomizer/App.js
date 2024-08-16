import { h } from 'https://esm.sh/preact';
import { useState, useEffect } from 'https://esm.sh/preact/hooks';
import htm from 'https://esm.sh/htm';
const html = htm.bind(h); // Initialize htm with Preact

import { LunchMealCardSet } from './LunchMealCardSet.js';
import { LunchMeal, preloadImages } from './LunchMeal.js';

export function App() {
    const [lunchMeal, setLunchMeal] = useState(new LunchMeal());
    useEffect(() => {
        preloadImages();
    }, []);
    return html` <div class="container text-center">
        <${LunchMealCardSet}
            lunchMeal=${lunchMeal}
            setLunchMeal=${setLunchMeal}
        ><//>
    </div>`;
}
