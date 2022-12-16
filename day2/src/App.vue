<template>
  <div class="flex h-full w-full items-center justify-center">
    <div class="flex w-full max-w-xs flex-col items-center justify-center">
      <div
        v-if="question"
        class="w-3/4 self-start rounded-2xl bg-teal p-4 text-white"
        data-qa="question"
        v-text="question"
      />
      <div
        v-if="answered"
        class="mt-2 w-3/4 self-end rounded-2xl bg-red p-4 text-white"
        data-qa="response"
        v-text="response"
      />
      <button
        v-if="question && !answered"
        class="col-span-1 mx-auto mt-4 w-full rounded-lg bg-green py-2 hover:opacity-90"
        @click="answered = true"
      >
        Tell Me!
      </button>
      <button
        v-else-if="question && answered"
        class="col-span-1 mx-auto mt-4 w-full rounded-lg bg-green py-2 hover:opacity-90"
        @click="fetchQuestion"
      >
        Another
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      question: null,
      response: null,
      answered: false
    };
  },
  created() {
    this.fetchQuestion();
  },
  methods: {
    async fetchQuestion() {
      this.answered = false;
      this.question = null;
      this.response = null;

      try {
        const data = await (await fetch("https://v2.jokeapi.dev/joke/christmas")).json();
        this.question = data.setup;
        this.response = data.delivery;
      } catch (e) {
        alert(e.message);
      }
    }
  }
};
</script>
