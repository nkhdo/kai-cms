<template>
  <div id="app">
    <div id="sidebar">
      <sidebar/>
    </div>
    <div id="main">
      <div id="main-menu">
        Menu
      </div>
      <div id="main-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  },
  methods: {
    ...mapActions('models', ['fetchModels'])
  },
  mounted () {
    this.fetchModels();
  }
};
</script>


<style lang="scss">
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  #sidebar {
    width: 250px;
    border-right: 1px solid #f0f0f0;
  }
  #main {
    flex: 1;
    display: flex;
    flex-direction: column;
    &-menu {
      padding: 5px 10px;
      border-bottom: 1px solid #f0f0f0;
    }
    &-container {
      flex: 1;
      overflow: auto;
    }
  }
}
</style>
