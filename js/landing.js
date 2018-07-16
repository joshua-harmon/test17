/*global Vue*/
/*global  $*/

'use strict';

Vue.config.devtools = true;
// Essentiel Var
const tarot = [{
    rank: "1",
    name: "Le Bateleur"
}, {
    rank: "2",
    name: "La Papesse"
}, {
    rank: "3",
    name: "L'Impératrice"
}, {
    rank: "4",
    name: "L'Empereur"
}, {
    rank: "5",
    name: "Le Pape"
}, {
    rank: "6",
    name: "L'Amoureux"
}, {
    rank: "7",
    name: "Le Chariot"
}, {
    rank: "8",
    name: "La Justice"
}, {
    rank: "9",
    name: "L'Hermite"
}, {
    rank: "10",
    name: "La Roue de Fortune"
}, {
    rank: "11",
    name: "La Force"
}, {
    rank: "12",
    name: "Le Pendu"
}, {
    rank: "13",
    name: "L'Arcane sans nom"
}, {
    rank: "14",
    name: "Tempérance"
}, {
    rank: "15",
    name: "Le Diable"
}, {
    rank: "16",
    name: "La Maison Dieu"
}, {
    rank: "17",
    name: "L'Étoile"
}, {
    rank: "18",
    name: "La Lune"
}, {
    rank: "19",
    name: "Le Soleil"
}, {
    rank: "20",
    name: "Le Jugement"
}, {
    rank: "21",
    name: "Le Monde"
}, {
    rank: "22",
    name: "Le Fol"
}];
// Components
/* Card */
Vue.component('card', {
    template: '<div class="card-wrap"' +
        '@mousemove="handleMouseMove"' +
        '@mouseenter="handleMouseEnter"' +
        '@mouseleave="handleMouseLeave"' +
        'ref="card">' +
        '<div class="card" :style="cardStyle">' +
        '<div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>' +
        '<div class="card-info">' +
        '<slot name="header"></slot>' +
        '<slot name="content"></slot>' +
        '</div>' +
        '</div>' +
        '</div>',
    mounted: function mounted() {
        this.width = this.$refs.card.offsetWidth;
        this.height = this.$refs.card.offsetHeight;
    },

    props: ['dataImage', 'dataCard'],
    data: function data() {
        return {
            width: 0,
            height: 0,
            mouseX: 0,
            mouseY: 0,
            mouseLeaveDelay: null
        };
    },
    computed: {
        mousePX: function mousePX() {
            return this.mouseX / this.width;
        },
        mousePY: function mousePY() {
            return this.mouseY / this.height;
        },
        cardStyle: function cardStyle() {
            var rX = this.mousePX * 30;
            var rY = this.mousePY * -30;
            return {
                transform: 'rotateY(' + rX + 'deg) rotateX(' + rY + 'deg)'
            };
        },
        cardBgTransform: function cardBgTransform() {
            var tX = this.mousePX * -40;
            var tY = this.mousePY * -40;
            return {
                transform: 'translateX(' + tX + 'px) translateY(' + tY + 'px)'
            };
        },
        cardBgImage: function cardBgImage() {
            return {
                backgroundImage: 'url("images/tarots/default/' + this.dataImage + '.png")'
            };
        }
    },
    methods: {
        handleMouseMove: function handleMouseMove(e) {
            this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width / 2;
            this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height / 2;
        },
        handleMouseEnter: function handleMouseEnter() {
            clearTimeout(this.mouseLeaveDelay);
        },
        handleMouseLeave: function handleMouseLeave() {
            var _this = this;

            this.mouseLeaveDelay = setTimeout(function() {
                _this.mouseX = 0;
                _this.mouseY = 0;
            }, 1000);
        }

    }
});
/**/
Vue.component('card-reading', {
    template: '<h1><slot name="title"></h1><article><slot name="content"></article>',
    props: ['name','content']
});
/* SignUp Form */
Vue.component('signup-form', {
    template: '<div class="form-container">' +
        '<form>' +
        '<h2>Form</h2>'+
        '</form>' +
        '</div>',
    mounted: function mounted() {},
    props: [],
    data: function data() {},
    computed: {},
    methods: {}
});

var app = new Vue({
    el: '#app',
    data: {
        theme: 'default',
        cards: [{
            id: 1,
            name: 'The Magecian',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }, {
            id: 2,
            name: 'The High Priestess',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }, {
            id: 3,
            name: 'The Empress',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }, {
            id: 9,
            name: 'The Hermit',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'
        }]
    },
    methods: {
        loadNext: function() {
            console.log('done');
        }
    }
});

var card = $('.card-wrap');

//card.on('click', showExpander );
card.on('click', function(e){
    console.log(e.pageX +' '+ e.pageY );
});

let expander = $('.deco-expander');

function showExpander(position, callback, background) {
    let expanderStyle = {
        opacity: 1,
        left: position.x,
        top: position.y,
        backgroundColor: background,
        scale: 0
    };
    let expanderAnimation = {
        scale: 2,
        backgroundColor: background
    };
    expander.css(expanderStyle);
    expander.animate(expanderAnimation, 500, function(){
        console.log('expender animation done.');
    });
}
