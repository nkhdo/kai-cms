<template>
  <div class="kd-model-details">
    <vs-table :data="fields" class="fields-table">
      <template slot="header">
        <h3>
          Schema
        </h3>
      </template>
      <template slot="thead">
        <vs-th>
          Field
        </vs-th>
        <vs-th>
          Type
        </vs-th>
        <vs-th>
          Required
        </vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].field">
            {{data[indextr].field}}
          </vs-td>
          <vs-td :data="data[indextr].type">
            {{data[indextr].type}}
          </vs-td>
          <vs-td :data="data[indextr].required">
            {{data[indextr].required}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
    <vs-table :data="model.indexes" class="indexes-table">
      <template slot="header">
        <h3>
          Indexes
        </h3>
      </template>
      <template slot="thead">
        <vs-th>
          Fields
        </vs-th>
        <vs-th>
          Options
        </vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].fields">
            {{data[indextr].fields}}
          </vs-td>
          <vs-td :data="data[indextr].options">
            {{data[indextr].options || '{}'}}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ModelDetails',
  computed: {
    ...mapGetters('models', ['getModelBySlug']),
    slug() {
      return this.$route.params.slug;
    },
    model() {
      return this.getModelBySlug(this.slug);
    },
    fields() {
      return _.reduce(this.model.schema, (acc, curr, field) => {
        acc.push({
          field,
          type: curr.type,
          required: !!curr.required,
        });
        return acc;
      }, []);
    },
  },
};
</script>

<style lang="scss">
.kd-model-details {
  padding: 10px;
  .fields-table {
    margin-bottom: 10px;
  }
}
</style>
