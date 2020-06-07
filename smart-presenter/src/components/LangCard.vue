<template>
<section>
  <textarea rows="10" cols="40" v-model="data"></textarea>
  <ul v-for="(items, index) in result" :key="index">
    <li v-for="(item, index1) in items" :key="index1">
      {{ item }}
    </li>
  </ul>
</section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

@Component
export default class LangCard extends Vue {
  @Prop() private msg!: string;

  data = ""
  result = []

  @Watch('data')
  onChildChanged(val: string, oldVal: string) {
    let arrayOfRecords  = val.split(/,|\n/) ;
    let totalColumns = Math.round(Math.sqrt(arrayOfRecords.length));
    let newResult = [];
    for(let i = 0; i < arrayOfRecords.length/totalColumns; i++)
      newResult.push(arrayOfRecords.slice(totalColumns*i, totalColumns*i + totalColumns));
    this.result = newResult;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
