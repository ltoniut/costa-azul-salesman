<template>
    <div class="Destinations">
      <a>Selecctionar Ciudades Destino</a>
      <ul>
        <li v-for="city in cities" v-bind:key="city.id" style="list-style-type:none">
          <input type="checkbox" :value="city.id" v-model="selectedCities" @change="check()"> {{ city.name }}
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: ['cities', 'selectedCities'],
  name: 'Destinations',
  data(cities, origin) {
    return {
      title: 'Seleccionar ciudades',
      origin,
      selection: [],
    };
  },
  methods: {
    check() {
      console.log(JSON.stringify(this.selectedCities));
      this.$emit('selectionChanged', this.selectedCities);
    },
    uncheck(id) {
      setTimeout(function(){}, 500);
      this.$emit('selectionChanged', this.selectedCities);
    },
  },
  computed: {
    theTitle() {
      return this.title.toUppercase();
    },
    externalCities() {
      return this.cities.filter(c =>
        c !== origin,
      );
    },
  },
};
</script>
