<template>
  <div class='Consult'>
    <h1>Manejador de viajes - Costa Azul</h1>
    <hr>
    <prices :cities="cities" :routes="routes"></prices>
    <hr>
    <p> Seleccionar Origen</p>
    <select v-model="origin" @change="onChange($event)">
      <option v-for="city in cities" v-bind:value="city.id" v-bind:key="city.id">
        {{ city.name }}
      </option>
    </select>
    <hr>
    <destinations :cities="cities" :selectedCities="selectedCities" @selectionChanged="changeSelection($event)"></destinations>
    <button :disabled = "selectedCities.length < 4" v-on:click="calculatePath()">Programar Gira</button>
    <solution :path="solution" :cities="cities"></solution>
  </div>
</template>

<script>
import Destinations from './Destinations';
import Solution from './Solution';
import Prices from './Prices';

export default {
  name: 'Consult',
  data() {
    return {
      showme: true,
      showbind: false,
      origin: '',
      selectedCities: [],
      relevantRoutes: [],
      solution: [],
      cities: [
        { name: 'Mar de Plata', id: 1 },
        { name: 'Santa Clara', id: 2 },
        { name: 'Mar de Cobo', id: 3 },
        { name: 'Mar Chiquita', id: 4 },
        { name: 'Nahuel Ruca', id: 5 },
        { name: 'Canal 7', id: 6 },
        { name: 'Canal 5', id: 7 },
        { name: 'Arroyo Chico', id: 8 },
        { name: 'Mar Azul', id: 9 },
        { name: 'Villa Gesell', id: 10 },
        { name: 'Pinamar', id: 11 },
        { name: 'Madariaga', id: 12 },
        { name: 'Pta. Medanos', id: 13 },
        { name: 'Mar de Ajo', id: 14 },
        { name: 'S. Bernardo', id: 15 },
        { name: 'La Lucila', id: 16 },
        { name: 'Mar del Tuyu', id: 17 },
        { name: 'Sta Teresita', id: 18 },
        { name: 'Las Toninas', id: 19 },
        { name: 'San Clemente', id: 20 },
      ],
      routes: [
        { idOrigen: 1, idDestino: 2, price: 100 },
        { idOrigen: 1, idDestino: 3, price: 140 },
        { idOrigen: 1, idDestino: 4, price: 150 },
        { idOrigen: 1, idDestino: 5, price: 170 },
        { idOrigen: 1, idDestino: 6, price: 180 },
        { idOrigen: 1, idDestino: 7, price: 210 },
        { idOrigen: 1, idDestino: 8, price: 260 },
        { idOrigen: 1, idDestino: 9, price: 300 },
        { idOrigen: 1, idDestino: 10, price: 400 },
        { idOrigen: 1, idDestino: 11, price: 460 },
        { idOrigen: 1, idDestino: 12, price: 520 },
        { idOrigen: 1, idDestino: 13, price: 520 },
        { idOrigen: 1, idDestino: 14, price: 550 },
        { idOrigen: 1, idDestino: 15, price: 560 },
        { idOrigen: 1, idDestino: 16, price: 580 },
        { idOrigen: 1, idDestino: 17, price: 610 },
        { idOrigen: 1, idDestino: 18, price: 620 },
        { idOrigen: 1, idDestino: 19, price: 630 },
        { idOrigen: 1, idDestino: 20, price: 680 },
        { idOrigen: 2, idDestino: 3, price: 100 },
        { idOrigen: 2, idDestino: 4, price: 100 },
        { idOrigen: 2, idDestino: 5, price: 100 },
        { idOrigen: 2, idDestino: 6, price: 100 },
        { idOrigen: 2, idDestino: 7, price: 110 },
        { idOrigen: 2, idDestino: 8, price: 160 },
        { idOrigen: 2, idDestino: 9, price: 200 },
        { idOrigen: 2, idDestino: 10, price: 300 },
        { idOrigen: 2, idDestino: 11, price: 360 },
        { idOrigen: 2, idDestino: 12, price: 420 },
        { idOrigen: 2, idDestino: 13, price: 420 },
        { idOrigen: 2, idDestino: 14, price: 450 },
        { idOrigen: 2, idDestino: 15, price: 460 },
        { idOrigen: 2, idDestino: 16, price: 480 },
        { idOrigen: 2, idDestino: 17, price: 510 },
        { idOrigen: 2, idDestino: 18, price: 520 },
        { idOrigen: 2, idDestino: 19, price: 530 },
        { idOrigen: 2, idDestino: 20, price: 580 },
        { idOrigen: 3, idDestino: 4, price: 100 },
        { idOrigen: 3, idDestino: 5, price: 100 },
        { idOrigen: 3, idDestino: 6, price: 100 },
        { idOrigen: 3, idDestino: 7, price: 100 },
        { idOrigen: 3, idDestino: 8, price: 120 },
        { idOrigen: 3, idDestino: 9, price: 160 },
        { idOrigen: 3, idDestino: 10, price: 260 },
        { idOrigen: 3, idDestino: 11, price: 320 },
        { idOrigen: 3, idDestino: 12, price: 380 },
        { idOrigen: 3, idDestino: 13, price: 380 },
        { idOrigen: 3, idDestino: 14, price: 410 },
        { idOrigen: 3, idDestino: 15, price: 420 },
        { idOrigen: 3, idDestino: 16, price: 440 },
        { idOrigen: 3, idDestino: 17, price: 470 },
        { idOrigen: 3, idDestino: 18, price: 480 },
        { idOrigen: 3, idDestino: 19, price: 490 },
        { idOrigen: 3, idDestino: 20, price: 540 },
        { idOrigen: 4, idDestino: 5, price: 100 },
        { idOrigen: 4, idDestino: 6, price: 100 },
        { idOrigen: 4, idDestino: 7, price: 100 },
        { idOrigen: 4, idDestino: 8, price: 110 },
        { idOrigen: 4, idDestino: 9, price: 150 },
        { idOrigen: 4, idDestino: 10, price: 250 },
        { idOrigen: 4, idDestino: 11, price: 310 },
        { idOrigen: 4, idDestino: 12, price: 370 },
        { idOrigen: 4, idDestino: 13, price: 370 },
        { idOrigen: 4, idDestino: 14, price: 400 },
        { idOrigen: 4, idDestino: 15, price: 410 },
        { idOrigen: 4, idDestino: 16, price: 430 },
        { idOrigen: 4, idDestino: 17, price: 460 },
        { idOrigen: 4, idDestino: 18, price: 470 },
        { idOrigen: 4, idDestino: 19, price: 480 },
        { idOrigen: 4, idDestino: 20, price: 530 },
        { idOrigen: 5, idDestino: 6, price: 100 },
        { idOrigen: 5, idDestino: 7, price: 100 },
        { idOrigen: 5, idDestino: 8, price: 100 },
        { idOrigen: 5, idDestino: 9, price: 130 },
        { idOrigen: 5, idDestino: 10, price: 230 },
        { idOrigen: 5, idDestino: 11, price: 290 },
        { idOrigen: 5, idDestino: 12, price: 350 },
        { idOrigen: 5, idDestino: 13, price: 350 },
        { idOrigen: 5, idDestino: 14, price: 380 },
        { idOrigen: 5, idDestino: 15, price: 390 },
        { idOrigen: 5, idDestino: 16, price: 410 },
        { idOrigen: 5, idDestino: 17, price: 440 },
        { idOrigen: 5, idDestino: 18, price: 450 },
        { idOrigen: 5, idDestino: 19, price: 460 },
        { idOrigen: 5, idDestino: 20, price: 510 },
        { idOrigen: 6, idDestino: 7, price: 100 },
        { idOrigen: 6, idDestino: 8, price: 100 },
        { idOrigen: 6, idDestino: 9, price: 120 },
        { idOrigen: 6, idDestino: 10, price: 220 },
        { idOrigen: 6, idDestino: 11, price: 280 },
        { idOrigen: 6, idDestino: 12, price: 340 },
        { idOrigen: 6, idDestino: 13, price: 340 },
        { idOrigen: 6, idDestino: 14, price: 370 },
        { idOrigen: 6, idDestino: 15, price: 380 },
        { idOrigen: 6, idDestino: 16, price: 400 },
        { idOrigen: 6, idDestino: 17, price: 430 },
        { idOrigen: 6, idDestino: 18, price: 440 },
        { idOrigen: 6, idDestino: 19, price: 450 },
        { idOrigen: 6, idDestino: 20, price: 500 },
        { idOrigen: 7, idDestino: 8, price: 100 },
        { idOrigen: 7, idDestino: 9, price: 100 },
        { idOrigen: 7, idDestino: 10, price: 190 },
        { idOrigen: 7, idDestino: 11, price: 250 },
        { idOrigen: 7, idDestino: 12, price: 310 },
        { idOrigen: 7, idDestino: 13, price: 310 },
        { idOrigen: 7, idDestino: 14, price: 340 },
        { idOrigen: 7, idDestino: 15, price: 350 },
        { idOrigen: 7, idDestino: 16, price: 370 },
        { idOrigen: 7, idDestino: 17, price: 400 },
        { idOrigen: 7, idDestino: 18, price: 410 },
        { idOrigen: 7, idDestino: 19, price: 420 },
        { idOrigen: 7, idDestino: 20, price: 470 },
        { idOrigen: 8, idDestino: 9, price: 100 },
        { idOrigen: 8, idDestino: 10, price: 130 },
        { idOrigen: 8, idDestino: 11, price: 200 },
        { idOrigen: 8, idDestino: 12, price: 260 },
        { idOrigen: 8, idDestino: 13, price: 260 },
        { idOrigen: 8, idDestino: 14, price: 290 },
        { idOrigen: 8, idDestino: 15, price: 300 },
        { idOrigen: 8, idDestino: 16, price: 320 },
        { idOrigen: 8, idDestino: 17, price: 350 },
        { idOrigen: 8, idDestino: 18, price: 360 },
        { idOrigen: 8, idDestino: 19, price: 370 },
        { idOrigen: 8, idDestino: 20, price: 420 },
        { idOrigen: 9, idDestino: 10, price: 100 },
        { idOrigen: 9, idDestino: 11, price: 150 },
        { idOrigen: 9, idDestino: 12, price: 220 },
        { idOrigen: 9, idDestino: 13, price: 220 },
        { idOrigen: 9, idDestino: 14, price: 250 },
        { idOrigen: 9, idDestino: 15, price: 260 },
        { idOrigen: 9, idDestino: 16, price: 280 },
        { idOrigen: 9, idDestino: 17, price: 310 },
        { idOrigen: 9, idDestino: 18, price: 320 },
        { idOrigen: 9, idDestino: 19, price: 330 },
        { idOrigen: 9, idDestino: 20, price: 380 },
        { idOrigen: 10, idDestino: 11, price: 100 },
        { idOrigen: 10, idDestino: 12, price: 150 },
        { idOrigen: 10, idDestino: 13, price: 150 },
        { idOrigen: 10, idDestino: 14, price: 160 },
        { idOrigen: 10, idDestino: 15, price: 170 },
        { idOrigen: 10, idDestino: 16, price: 180 },
        { idOrigen: 10, idDestino: 17, price: 210 },
        { idOrigen: 10, idDestino: 18, price: 220 },
        { idOrigen: 10, idDestino: 19, price: 240 },
        { idOrigen: 10, idDestino: 20, price: 280 },
        { idOrigen: 11, idDestino: 12, price: 100 },
        { idOrigen: 11, idDestino: 13, price: 100 },
        { idOrigen: 11, idDestino: 14, price: 150 },
        { idOrigen: 11, idDestino: 15, price: 160 },
        { idOrigen: 11, idDestino: 16, price: 170 },
        { idOrigen: 11, idDestino: 17, price: 200 },
        { idOrigen: 11, idDestino: 18, price: 200 },
        { idOrigen: 11, idDestino: 19, price: 210 },
        { idOrigen: 11, idDestino: 20, price: 260 },
        { idOrigen: 12, idDestino: 13, price: 9999 },
        { idOrigen: 12, idDestino: 14, price: 9999 },
        { idOrigen: 12, idDestino: 15, price: 9999 },
        { idOrigen: 12, idDestino: 16, price: 9999 },
        { idOrigen: 12, idDestino: 17, price: 9999 },
        { idOrigen: 12, idDestino: 18, price: 9999 },
        { idOrigen: 12, idDestino: 19, price: 9999 },
        { idOrigen: 12, idDestino: 20, price: 9999 },
        { idOrigen: 13, idDestino: 14, price: 100 },
        { idOrigen: 13, idDestino: 15, price: 100 },
        { idOrigen: 13, idDestino: 16, price: 100 },
        { idOrigen: 13, idDestino: 17, price: 130 },
        { idOrigen: 13, idDestino: 18, price: 140 },
        { idOrigen: 13, idDestino: 19, price: 150 },
        { idOrigen: 13, idDestino: 20, price: 210 },
        { idOrigen: 14, idDestino: 15, price: 100 },
        { idOrigen: 14, idDestino: 16, price: 100 },
        { idOrigen: 14, idDestino: 17, price: 100 },
        { idOrigen: 14, idDestino: 18, price: 100 },
        { idOrigen: 14, idDestino: 19, price: 100 },
        { idOrigen: 14, idDestino: 20, price: 140 },
        { idOrigen: 15, idDestino: 16, price: 100 },
        { idOrigen: 15, idDestino: 17, price: 100 },
        { idOrigen: 15, idDestino: 18, price: 100 },
        { idOrigen: 15, idDestino: 19, price: 100 },
        { idOrigen: 15, idDestino: 20, price: 140 },
        { idOrigen: 16, idDestino: 17, price: 100 },
        { idOrigen: 16, idDestino: 18, price: 100 },
        { idOrigen: 16, idDestino: 19, price: 100 },
        { idOrigen: 16, idDestino: 20, price: 130 },
        { idOrigen: 17, idDestino: 18, price: 100 },
        { idOrigen: 17, idDestino: 19, price: 100 },
        { idOrigen: 17, idDestino: 20, price: 100 },
        { idOrigen: 18, idDestino: 19, price: 100 },
        { idOrigen: 18, idDestino: 20, price: 100 },
        { idOrigen: 19, idDestino: 20, price: 100 },
      ],
    };
  },
  methods: {
    onChange(selection) {
      this.selectedCities = [this.origin];
    },
    changeSelection(selection) {
      this.selectedCities = selection;
      this.setRelevant();
    },
    setRelevant() {
      const newList = [];
      if (!this.selectedCities.includes(this.origin)) {
        this.selectedCities.push(this.origin);
      }
      this.routes.forEach(r => {
        if (this.selectedCities.includes(r.idOrigen) && this.selectedCities.includes(r.idDestino)) {
          newList.push(r);
        }
      });

      this.relevantRoutes = newList;
    },
    calculatePath() {
      this.setRelevant();
      let path = [];
      const revert = this.revert;
      const start = this.origin;
      let relevant = this.relevantRoutes;
      console.log(JSON.stringify(this.selectedCities));

      this.selectedCities.forEach(function calculation(c) {
        if (path.length === 0) {
          for (let i = 0; i < relevant.length; i++) {
            if (relevant[i].idOrigen === start && relevant[i].idDestino === c) {
              path.push(relevant[i]);
              const reversed = revert(relevant[i]);
              path.push(reversed);
            }
            if (relevant[i].idOrigen === c && relevant[i].idDestino === start) {
              const reversed = revert(relevant[i]);
              path.push(reversed);
              path.push(relevant[i]);
            }
          }
        } else {
          let index;
          let newRouteOrigin;
          let newRouteDestination;
          let difference = 20000;

          for (let i = 0; i < path.length; i++) {
            let cut1;
            let cut2;

            for (let h = 0; h < relevant.length; h++) {
              if (relevant[h].idOrigen === path[i].idOrigen && relevant[h].idDestino === c) {
                cut1 = relevant[h];
              }
              if (relevant[h].idOrigen === c && relevant[h].idDestino === path[i].idOrigen) {
                cut1 = revert(relevant[h]);
              }
            }

            for (let h = 0; h < relevant.length; h++) {
              if (relevant[h].idOrigen === c && relevant[h].idDestino === path[i].idDestino) {
                cut2 = relevant[h];
              }
              if (relevant[h].idOrigen === path[i].idDestino && relevant[h].idDestino === c) {
                cut2 = revert(relevant[h]);
              }
            }

            if (((cut1.price + cut2.price) - path[i].price) < difference) {
              difference = (cut1.price + cut2.price) - path[i].price;
              index = i;
              newRouteOrigin = cut1;
              newRouteDestination = cut2;
            }
          }

          path.splice(index, 1, newRouteOrigin, newRouteDestination);
        }
      });

      path = this.ensureLast(path, start);
      this.solution = path;
    },
    revert(route) {
      const newRoute = {};
      newRoute.idDestino = route.idOrigen;
      newRoute.idOrigen = route.idDestino;
      newRoute.price = route.price;

      return newRoute;
    },
    orderTrail(path, start) {
      const newPath = [];
      let previousCity = path[0].idOrigen;
      const revert = this.revert;

      for (let i = 0; i < path.length; i++) {
        if (path[i].idOrigen === previousCity) {
          newPath.push(path[i]);
          previousCity = path[i].idDestino;
        } else if (path[i].idDestino === previousCity) {
          newPath.push(revert(path[i]));
          previousCity = path[i].idOrigen;
        } else {
          console.log('Error en el trayecto');
        }
      }

      for (let i = 0; i < newPath.length; i++) {
        if (path[0].idOrigen !== start) {
          const element = path.pop();
          path.unshift(element);
        }
      }

      return path;
    },
    ensureLast(path, start) {
      const newPath = path;
      const i = path.length - 1;
      const revert = this.revert;
      if (path[i].idDestino !== start) {
        newPath[i] = revert(path[i]);
      }

      return newPath;
    },
  },
  computed: {
    theTitle() {
      return this.title.toUpperCase();
    },
  },
  components: {
    destinations: Destinations,
    solution: Solution,
    prices: Prices,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
