<template>
  <div class="kd-sidebar">
    <div class="kd-sidebar-header">
      KaiCMS
    </div>
    <div class="kd-sidebar-body">
      <vs-collapse type="margin">
        <vs-collapse-item class="kd-section">
          <div slot="header" class="kd-section-header">
            <vs-icon icon="folder"/> Models
          </div>
          <router-link
            v-for="model in models"
            :key="model.slug"
            tag="div"
            class="kd-section-item"
            :to="{ name: 'ModelDetails', params: { slug: model.slug }}">
            {{model.name}}
          </router-link>
        </vs-collapse-item>
        <vs-collapse-item class="kd-section">
          <div slot="header" class="kd-section-header">
            <vs-icon icon="note"/> Records
          </div>
          Hihi
        </vs-collapse-item>
      </vs-collapse>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Sidebar',
  computed: {
    ...mapState('models', ['models']),
  },
};
</script>

<style lang="scss">
.kd-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f5f7fb;
  &-header {
    padding: 5px 10px;
    font-weight: 600;
    border-bottom: 1px solid #f0f0f0;
  }
  &-body {
    flex: 1;
    overflow: auto;
    .kd-section {
      background-color: white;
      &-header {
        font-weight: 600;
      }
      &-item {
        padding: 5px 10px;
        &:hover {
          background-color: #fbfbfb;
        }
        &.router-link-active {
          font-weight: 600;
        }
      }
    }
  }
}
</style>
