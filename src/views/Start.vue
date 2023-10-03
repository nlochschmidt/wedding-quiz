<template>
  <div class="Start">
    <div class="Gallery">
      <img v-for="(candidate) in candidates" class="PreviewImg float-left" :key="candidate.id" :src="candidate.profileSrc">
    </div>
    <div class="Overlay absolute opacity-50 bg-black w-full h-screen" @click="$router.push({ name: 'calendar' })"></div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { useStore } from 'vuex-simple'
import { WeddingQuiz, Candidate } from '@/store'
import { Prop } from 'vue-property-decorator'
import { Dictionary } from 'vue-router/types/router'

@Component({})
export default class Lottery extends Vue {
  @Prop({}) public timeout!: number

  public store: WeddingQuiz = useStore(this.$store)

  public get candidates () { return [...this.store.candidates, ...this.store.months.filter(month => month.person.id !== -1).map(month => month.person)] }
}
</script>

<style scoped>
.Start {
  height: 100vh;
  overflow: hidden;
}

.Gallery {
  margin-right: -500px;
  margin-left: -500px;
}

.PreviewImg {
  height: calc(100vh / 4.0);
}

</style>
