<template>
  <div class="rounded mx-auto Month p-4 bg-gray-100"  >
    <img v-if="person.profileSrc" class='object-cover Profile' :src="person.profileSrc" />
    <div class="flex Profile bg-gray-900" v-else><span class="m-auto text-6xl text-gray-100">?</span></div>
    <div class="h-18 align-bottom">
    <h3 class="h-12 mt-2 leading-relaxed border-dashed border-b-4 border-gray-500 text-3xl text-center">{{person.name}}</h3>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Candidate } from '@/store'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({})
export default class Polaroid extends Vue {
   @Prop() person: Candidate | undefined
}
</script>

<style scoped>
.Profile {
  width: 230px;
  height: 230px;
}

.Month {
  width: 262px;
}
</style>
