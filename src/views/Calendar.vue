<template>
  <div class="flex h-screen bg-green-300">
    <div class="m-auto">
      <h1 class="h-32 tracking-wide underline font-serif text-6xl text-center text-green-900">Euer erstes Hochzeitsjahr</h1>
      <div class="flex Calendar">
        <div @click="assignCandidate(index)" class="flex-1 p-5" v-for="(month, index) in months.slice(0, 6)" :key="month.name">
          <h2 class="h-16 text-2xl text-center text-font-sophia">{{month.name}}</h2>
          <Polaroid class="shadow-xl" :person="month.person"/>
        </div>
      </div>
      <div class="flex Calendar">
        <div @click="assignCandidate(index+6)" class="flex-1 p-5" v-for="(month, index) in months.slice(6, 12)" :key="month.name">
          <h2 class="h-16 text-2xl text-center text-font-sophia">{{month.name}}</h2>
          <Polaroid class="shadow-xl" :person="month.person"/>
        </div>
      </div>
      <div class="flex mt-8">
        <button v-if="slotsRemaining" v-on:click="nextRound" :disabled="!!this.store.currentCandidate" class="m-auto bg-green-100 disabled:bg-gray-900 disabled:cursor-not-allowed hover:bg-green-300 rounded py-2 px-4 text-lg">Zur Lotterie</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { useStore } from 'vuex-simple'
import { WeddingQuiz } from '@/store'
import Polaroid from '@/components/Polaroid.vue'

@Component({
  components: { Polaroid }
})
export default class Calendar extends Vue {
  public store: WeddingQuiz = useStore(this.$store)

  public get months () { return this.store.months }

  public async nextRound () {
    await this.store.selectNextCandidate()
    if (this.store.nextCandidate) {
      this.$router.push({ name: 'lottery', query: { timeout: '1500' } })
    }
  }

  public get slotsRemaining () { return this.store.months.some(month => month.person.id === -1) }

  public async assignCandidate (monthIndex: number) {
    if (this.store.currentCandidate || this.store.nextCandidate) {
      this.store.assignCandidateTo({ monthIndex })
    } else {
      this.store.reAssignCandidateFrom({ monthIndex })
    }
  }
}
</script>

<style scoped>

.text-font-sophia {
  font-family: 'Tangerine';
  font-size: 3em;
  font-weight: 900;
}

</style>
