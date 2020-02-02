<template>
  <div id="app">
    <canvas id="canvas"></canvas>
    <div id="nav">
      <router-link to="/">Title</router-link> |
      <router-link to="/intro">Introduction</router-link> |
      <router-link to="/motivation">Motivation</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
#canvas
  height 7em
  width 7em
</style>
