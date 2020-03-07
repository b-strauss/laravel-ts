<template lang="pug">
  .lts-app
    h1
      | Hello World
    p
      | {{getUnitName}}
</template>

<style lang="sass" scoped>
.lts-app
  font-size: 12px
</style>

<script>
import {mapGetters} from 'vuex';

export default {
  name: 'LtsApp',
  components: {},
  props: {},
  data: () => ({}),
  computed: {
    ...mapGetters('config', [
      'getUnitName',
    ]),
  },
  watch: {},
  mounted () {
  },
  beforeDestroy () {
  },
  methods: {},
};
</script>
