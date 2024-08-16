import { h } from 'https://esm.sh/preact';
import htm from 'https://esm.sh/htm';
const html = htm.bind(h); // Initialize htm with Preact

export function LunchMealCardSet({ lunchMeal, setLunchMeal }) {
    const mealElements = [...Object.keys(lunchMeal)];
    return html`
        <div class="container text-center p-4">
            <h2 class="mb-3">
                Meal Ideas
                <span class=""> - South Indian Lunch</span>
            </h2>

            <div class="d-grid col-5 mx-auto">
                <button
                    class="btn btn-dark text-light mb-2"
                    onClick=${() => {
                        let newMeal = lunchMeal.randomNewMeal();
                        setLunchMeal(newMeal);
                    }}
                >
                    <i class="fa-solid fa-shuffle mx-2"></i>
                    Shuffle Meal Items
                </button>
            </div>
            <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4">
                <div class="col my-2">
                    <${DishCard}
                        key="rice_option"
                        id="rice_option"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>

                <div class="col my-2">
                    <${DishCard}
                        key="gravy1"
                        id="gravy1"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>
                <div class="col my-2">
                    <${DishCard}
                        key="gravy2"
                        id="gravy2"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>
                <div class="col my-2">
                    <${DishCard}
                        key="curds"
                        id="curds"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>

                <div class="col my-2">
                    <${DishCard}
                        key="side1"
                        id="side1"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>
                <div class="col my-2">
                    <${DishCard}
                        key="side2"
                        id="side2"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>
                <div class="col my-2">
                    <${DishCard}
                        key="crunchy"
                        id="crunchy"
                        lunchMeal=${lunchMeal}
                        setLunchMeal=${setLunchMeal}
                    ><//>
                </div>
            </div>
        </div>
    `;
}

function DishCard({ id, lunchMeal, setLunchMeal }) {
    const elem = lunchMeal[id];

    return html`<div
        class="card hover-pointer active-no-shadow"
        style="box-shadow: lightgray 2px 2px 10px"
        onClick=${() => {
            let newMeal = lunchMeal.randomNewMeal(id);
            setLunchMeal(newMeal);
        }}
    >
        <img src="${elem.dishImgUrl}" alt="" class="card-img-top img-fluid" />
        <div class="card-body card-body-color">
            <span class="card-title fs-6">${elem.dishName}</span>
        </div>
    </div>`;
}
