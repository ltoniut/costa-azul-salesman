<template>
  <div>
  <p>Camino:</p>
    <ul>
      <li v-for="route in parsedPath" v-bind:key="route"> {{ route.origin }} -> {{ route.destination }} - {{ route.price }} </li>
      <hr>
      <li> price = {{ totalPrice }}. Descuento = {{ discount }}. price con descuento = {{ totalPrice * (100 - discount) / 100 }}.</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['path', 'cities'],
  name: 'Solution',
  data(solution) {
    return {
      title: "Solution",
    };
  },
  computed: {
    parsedPath() {
      const myParsedPath = [];
      this.path.forEach((route) => {
        const originCityObj = this.cities.find(city =>
          city.id === route.idOrigen,
        );
        
        const originCity = originCityObj.name;
        const destinationCityObj = this.cities.find(city =>
          city.id === route.idDestino,
        );
        const destinationCity = destinationCityObj.name;
        const element = { origin: originCity, destination: destinationCity, price: route.price };
        console.log(JSON.stringify(destinationCityObj));
        myParsedPath.push(element);
      });
      return myParsedPath;
    },
    totalPrice() {
      let total = 0;
      this.path.forEach(function addRoute(route) {
        total += route.price;
      });
      return total;
    },
    discount() {
      let total = 0;
      const pathVar = this.path;

      if (pathVar.length > 3) {
        total = 15 + (5 * (pathVar.length - 3));
      }

      if (total > 40) {
        total = 40;
      }

      return total;
    },
    
  },
};
</script>
