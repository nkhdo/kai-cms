<template>
  <div class="kd-model-details">
    <vs-collapse accordion type="margin" v-if="model">
      <vs-collapse-item>
        <template slot="header">
          <h3>
            Schema
          </h3>
        </template>
        <vs-table :data="fields" stripe class="fields-table">
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
                <b>{{data[indextr].field}}</b>
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
      </vs-collapse-item>
      <vs-collapse-item>
        <template slot="header">
          <h3>
            Indexes
          </h3>
        </template>
        <vs-table :data="model.indexes" stripe class="indexes-table">
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
      </vs-collapse-item>
      <vs-collapse-item>
        <template slot="header">
          <h3>
            Records
          </h3>
        </template>
        <vs-table
          v-if="!loadingRecords"
          :data="records"
          :max-items="5"
          stripe
          pagination
          class="records-table"
          ref="records">
          <template slot="thead">
            <vs-th>
              _id
            </vs-th>
            <vs-th v-for="field in fields" :key="field.field">
              {{field.field}}
            </vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
              <vs-td :data="data[indextr]._id">
                <b>{{data[indextr]._id}}</b>
              </vs-td>
              <vs-td v-for="field in fields" :key="field.field" :data="data[indextr][field.field]">
                {{data[indextr][field.field]}}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </vs-collapse-item>
    </vs-collapse>
    <span v-else>
      Invalid model
    </span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import _ from 'lodash';

export default {
  name: 'ModelDetails',
  data() {
    return {
      loadingRecords: false,
    };
  },
  computed: {
    ...mapGetters('models', ['getModelBySlug', 'getModelRecords']),
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
    records() {
      return this.getModelRecords(this.slug);
    },
  },
  methods: {
    ...mapActions('models', ['fetchRecords']),
  },
  watch: {
    slug: {
      async handler(val) {
        if (this.model) {
          this.loadingRecords = true;
          try {
            await this.fetchRecords(val);
          } catch (err) {
            this.$vs.notify({
              title: 'Fetch records',
              text: 'Error fetching records',
              color: 'danger',
            });
          }
          this.loadingRecords = false;
        }
      },
      immediate: true,
    },
  },
};
</script>
