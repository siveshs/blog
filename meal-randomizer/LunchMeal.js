let rice_options = [
    {
        dishId: 'white_rice',
        dishName: 'white rice',
        dishImgUrl: './assets/rice_white.png',
    },
    {
        dishId: 'brown_rice',
        dishName: 'brown rice',
        dishImgUrl: './assets/rice_brown.png',
    },
    {
        dishId: 'kerala_rice',
        dishName: 'kerala rice',
        dishImgUrl: './assets/rice_kerala.png',
    },
];

let rice_gravies = [
    {
        dishId: 'paruppu',
        dishName: 'paruppu',
        dishImgUrl: './assets/paruppu.png',
    },
    {
        dishId: 'paruppu_koosu',
        dishName: 'paruppu kosu',
        dishImgUrl: './assets/paruppu_kosu.png',
    },
    {
        dishId: 'paruppu_with_keerai',
        dishName: 'paruppu with keerai',
        dishImgUrl: './assets/paruppu_keerai.png',
    },
    {
        dishId: 'keerai_kadanjathu',
        dishName: 'keerai kadanjathu',
        dishImgUrl: './assets/keerai_kadanjathu.png',
    },
    {
        dishId: 'pasipayir_kadanjathu',
        dishName: 'pasipayir kadanjathu',
        dishImgUrl: './assets/pasipayir_kadanjathu.png',
    },
    { dishId: 'kollu', dishName: 'kollu', dishImgUrl: './assets/kollu.png' },
    { dishId: 'koottu', dishName: 'koottu', dishImgUrl: './assets/koottu.png' },
    {
        dishId: 'bisibilabath',
        dishName: 'bisibilabath',
        dishImgUrl: './assets/bisibilabath.png',
    },
    {
        dishId: 'puliyotharai',
        dishName: 'puliyotharai',
        dishImgUrl: './assets/puliyotharai.png',
    },
    {
        dishId: 'lemon_rice',
        dishName: 'lemon rice',
        dishImgUrl: './assets/lemon_rice.png',
    },
    { dishId: 'pulao', dishName: 'pulao', dishImgUrl: './assets/pulao.png' },
];

let rasams = [
    {
        dishId: 'paruppu_rasam',
        dishName: 'paruppu rasam',
        dishImgUrl: './assets/rasam_paruppu.png',
    },
    {
        dishId: 'kollu_rasam',
        dishName: 'kollu rasam',
        dishImgUrl: './assets/rasam_kollu.png',
    },
];

let curds = {
    dishId: 'curds',
    dishName: 'curds',
    dishImgUrl: './assets/curds.png',
};

let sides = [
    {
        dishId: 'beans_poriyal',
        dishName: 'beans poriyal',
        dishImgUrl: './assets/poriyal_beans.png',
    },
    {
        dishId: 'carrot_poriyal',
        dishName: 'carrot poriyal',
        dishImgUrl: './assets/poriyal_carrot.png',
    },
    {
        dishId: 'carrot_and_beans_poriyal',
        dishName: 'carrot & beans poriyal',
        dishImgUrl: './assets/poriyal_carrot_beans.png',
    },
    {
        dishId: 'mushroom_poriyal',
        dishName: 'mushroom poriyal',
        dishImgUrl: './assets/poriyal_mushroom.png',
    },
    {
        dishId: 'avarakkai_poriyal',
        dishName: 'avarakkai poriyal',
        dishImgUrl: './assets/poriyal_avarakkai.png',
    },
    {
        dishId: 'kovakkai_poriyal',
        dishName: 'kovakkai poriyal',
        dishImgUrl: './assets/poriyal_kovakkai.png',
    },
    {
        dishId: 'bitter_gourd_poriyal',
        dishName: 'bitter gourd poriyal',
        dishImgUrl: './assets/poriyal_paavakkai.png',
    },
    {
        dishId: 'podalangai_poriyal',
        dishName: 'podalangai poriyal',
        dishImgUrl: './assets/poriyal_podalangai.png',
    },
];

let crunchies = [
    {
        dishId: 'pappadam',
        dishName: 'pappadam',
        dishImgUrl: './assets/pappadam.png',
    },
    {
        dishId: 'vadagam',
        dishName: 'vadagam',
        dishImgUrl: './assets/vadagam.png',
    },
    {
        dishId: 'banana_chips',
        dishName: 'banana chips',
        dishImgUrl: './assets/banana_chips.png',
    },
];

export class LunchMeal {
    constructor() {
        this.randomize();
    }

    cloneMeal() {
        let newMeal = new LunchMeal();
        newMeal.rice_option = this.rice_option;
        newMeal.gravy1 = this.gravy1;
        newMeal.gravy2 = this.gravy2;
        newMeal.side1 = this.side1;
        newMeal.side2 = this.side2;
        newMeal.curds = this.curds;
        newMeal.crunchy = this.crunchy;
        return newMeal;
    }

    randomNewMeal(key) {
        if (key === undefined) {
            let newMeal = new LunchMeal();
            return newMeal;
        } else {
            let newMeal = this.cloneMeal();
            newMeal.randomize(key);
            return newMeal;
        }
    }

    randomize(key) {
        let prev_option;
        switch (key) {
            case undefined:
                this.rice_option = randomElement(rice_options);
                this.gravy1 = randomElement(rice_gravies);
                this.gravy2 = randomElement(rasams);
                this.side1 = randomElement(sides);
                this.side2 = randomElement(sides);
                this.curds = curds;
                this.crunchy = randomElement(crunchies);
                break;

            case 'rice_option':
                prev_option = this.rice_option;
                while (this.rice_option === prev_option) {
                    this.rice_option = randomElement(rice_options);
                }
                break;

            case 'gravy1':
                prev_option = this.gravy1;
                while (this.gravy1 === prev_option) {
                    this.gravy1 = randomElement(rice_gravies);
                }
                break;

            case 'gravy2':
                prev_option = this.gravy2;
                while (this.gravy2 === prev_option) {
                    this.gravy2 = randomElement(rasams);
                }
                break;

            case 'side1':
                prev_option = this.side1;
                while (this.side1 === prev_option) {
                    this.side1 = randomElement(sides);
                }
                break;

            case 'side2':
                prev_option = this.side2;
                while (this.side2 === prev_option) {
                    this.side2 = randomElement(sides);
                }
                break;

            case 'curds':
                // do nothing, always curds
                break;

            case 'crunchy':
                prev_option = this.crunchy;
                while (this.crunchy === prev_option) {
                    this.crunchy = randomElement(crunchies);
                }
                break;

            default:
                break;
        }
    }

    toString() {
        return `   rice_option: ${this.rice_option.dishName}
    gravy1: ${this.gravy1.dishName}
    gravy2: ${this.gravy2.dishName}
    side1: ${this.side1.dishName}
    side2: ${this.side2.dishName}
    curds: ${this.curds.dishName}
    crunchy: ${this.crunchy.dishName}`;
    }

    toSerializedString() {
        const keys = Object.keys(this);
        let str = '?';
        keys.forEach((key) => {
            str += `${key}=${this[key].dishId}&`;
        });
        str = str.substring(0, str.length - 1);
        return str;
    }

    updateFromSerializedString(str) {
        let newState = {};
        str = str.substring(1); // remove ?
        const keyValPairs = str.split('&'); // split search arguments
        keyValPairs.forEach((e) => {
            const [key, val] = e.split('='); // split key and value
            newState[key] = val;
        });
        this.rice_option = rice_options.find(
            (e) => e.dishId === newState.rice_option
        );
        this.gravy1 = rice_gravies.find((e) => e.dishId === newState.gravy1);
        this.gravy2 = rasams.find((e) => e.dishId === newState.gravy2);
        this.side1 = sides.find((e) => e.dishId === newState.side1);
        this.side2 = sides.find((e) => e.dishId === newState.side2);
        this.curds = curds;
        this.crunchy = crunchies.find((e) => e.dishId === newState.crunchy);
    }
}
