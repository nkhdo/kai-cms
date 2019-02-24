<template>
  <div class="kd-sidebar">
    <div class="kd-sidebar-header">
      <vs-avatar text="KaiCMS"/> KaiCMS
    </div>
    <div class="kd-sidebar-body">
      <vs-list>
        <vs-list-header icon="supervisor_account" title="Group 1"></vs-list-header>
        <vs-list-item icon="check" title="Snickerdoodle" subtitle="An excellent companion"></vs-list-item>
        <vs-list-item icon="check" title="Sapporo Haru" subtitle="An excellent polish restaurant, quick delivery and hearty, filling meals"></vs-list-item>
        <vs-list-header icon="how_to_reg" title="Group 2" color="success"></vs-list-header>
        <vs-list-item icon="verified_user" title="Enid's" subtitle="At night a bar, during the day a delicious brunch spot."></vs-list-item>
        <vs-list-item icon="verified_user" title="Veronika Ossi" subtitle="Has not watched anything recently"></vs-list-item>
      </vs-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar'
}
</script>

<style scoped lang="scss">
.kd-sidebar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  &-header {
    padding: 5px 10px;
  }
  &-body {
    flex: 1;
    overflow: auto;
  }
}
</style>
