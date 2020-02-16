<template>
  <div id="app">
    <canvas id="canvas" class="desktop-only"></canvas>
    <nav class="mobile-only">
      <div id="nav">
        <router-link to="/">Title</router-link> |
        <router-link to="/spin">Spin</router-link> |
        <router-link to="/fire">Tuli</router-link>  |
        <router-link to="/firespinner">Tulenpyörittäjä</router-link>  |
        <router-link to="/poi">Tulipoi</router-link>  |
        <router-link to="/comet">Cometkeppi</router-link>  |
        <router-link to="/dragon">Dragonkeppi</router-link>  |
        <router-link to="/flamma">Flamma</router-link> |
        <router-link to="/travel">Travel</router-link> |
        <router-link to="/valkeakoski">Valkeakoski</router-link> |
        <router-link to="/theend">Theend</router-link>
      </div>
      <section class="nav-buttons">
        <button id="prev"> Prev slide </button>
        <button id="next"> Next slide </button>
      </section>
    </nav>
    <router-view />
  </div>
</template>

<style lang="stylus">
body
  overflow hidden
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  display flex
  flex-direction  row-reverse
  justify-content center
#canvas
  height 7em
  width 7em
  text-align  left

img
  height 88vh

button
	background none
	color inherit
	border none
	padding 0
	font inherit
	cursor pointer
	outline inherit

button
  background red
  border 1px solid darkred
  padding 1em

.nav-buttons
  display flex
  justify-content space-between
  margin-top 1em

.mobile-only
  display none

.desktop-only
  display block

@media screen and (max-width: 820px)
  #app
    flex-direction  column
  body
    font-size 3vh
  img
    display none
  button
    height 10vh
    font-size 3vh
  .mobile-only
    display block
  .desktop-only
    display none
</style>
