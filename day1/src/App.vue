<template>
  <div class="flex h-full w-full flex-col items-center justify-center gap-5">
    <h1 class="text-4xl font-bold">Gift Search Bar</h1>
    <input
      v-model="searchTerm"
      :disabled="isLoading"
      class="border-2 border-gray-dark p-2 disabled:opacity-40"
      placeholder="Start typing..."
    />
    <p
      v-if="isLoading"
      class="text-center text-lg"
    >
      Please wait...
    </p>
    <ul
      v-else-if="!isLoading && results.length > 0"
      class="list-disc"
    >
      <li
        v-for="(elem, i) in results"
        :key="i"
      >
        {{ elem.title }} - ${{ elem.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import {debounce} from "debounce";

export default {
  name: "App",
  data() {
    return {
      searchTerm: "",
      results: [],
      isLoading: false
    };
  },
  watch: {
    searchTerm(newTerm) {
      this.findProducts(newTerm);
    }
  },
  methods: {
    findProducts: debounce(async function (term) {
      if (term) {
        try {
          this.isLoading = true;
          const {products} = await (await fetch(`https://dummyjson.com/products/search?q=${term}&limit=5`)).json();
          this.results = products.map(({title, price}) => ({title, price}));
        } catch (e) {
          alert(e.message);
        } finally {
          this.isLoading = false;
        }
      } else if (term === "") this.results = [];
    }, 300)
  }
};
</script>
