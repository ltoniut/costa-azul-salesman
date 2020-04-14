<template>
  <div>
    <table style="border: 1px solid black;">
      <tr style="border: 1px solid;">
        <th></th>
        <th style="border: 1px solid black;" v-for="city in cities" v-bind:key="city.id"> {{ city.name }} </th>
      </tr style="border: 1px solid black;">
      <tr v-for="cityVertical in cities" v-bind:key="cityVertical.id">
        <td style="border: 1px solid black;"> {{ cityVertical.name }} </td>
        <td style="border: 1px solid black;" v-for="cityHorizontal in cities" v-bind:key="cityHorizontal.id">
          {{ returnPrice(cityVertical, cityHorizontal) }}
        </td>
      </tr>
    </table>
  </div>
</template>


<script>
export default {
  props: ['routes', 'cities'],
  name: 'Prices',
  methods: {
    returnPrice(city1, city2) {
      const routes = this.routes;
      for (let i = 0; i < routes.length; i++) {
        if ((routes[i].idOrigen === city1.id && routes[i].idDestino === city2.id)
        || (routes[i].idDestino === city1.id && routes[i].idOrigen === city2.id)) {
          if (routes[i].price < 5000) {
            return routes[i].price;
          }
        }
      }

      return '∞';
    },
  },
  computed: {
  },
};
</script>
