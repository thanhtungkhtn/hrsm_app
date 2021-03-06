<template>
  <b-container fluid>
    <b-card>
      <div slot="header" v-html="caption"></div>
      <b-row>
        <b-col lg="12" class="my-1">
          <b-button size="sm" variant="warning" class="float-right">
            <download-excel
              class="btn btn-default float-right"
              :data="json_data"
              :fields="json_fields"
              worksheet="BangCong Info"
              name="BangCongInfo.xls"
            >
              Export Data
            </download-excel>
          </b-button>
        </b-col>
      </b-row>
      <b-table
        show-empty
        :hover="!hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        outlined
        responsive
        :items="bangcongs.results"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        @row-clicked="rowClicked"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:id="row">
          <div style="width: 10px">{{ row.value }}</div>
        </template>
        <template v-slot:employee_id="row">
          <div style="width: 100px">{{ row.value }}</div>
        </template>
        <template v-slot:date_work="row">
          <div style="width: 180px">{{ row.value }}</div>
        </template>
        <template v-slot:months_work="row">
          <div style="width: 140px">{{ row.value }}</div>
        </template>

        <template v-slot:created_at="row">
          <div style="width: 180px">{{ row.value }}</div>
        </template>
        <template v-slot:updated_at="row">
          <div style="width: 180px">{{ row.value }}</div>
        </template>

        <template v-slot:actions="row">
          <div style="width: 180px">
            <b-button
              @click="detail(row.item, row.index, $event.target)"
              size="sm"
              class="mr-1"
            >
              <i class="fa fa-file-text-o fa-lg" />
            </b-button>
          </div>
        </template>
      </b-table>
      <nav>
        <b-pagination
          size="sm"
          :total-rows="getRowCount(bangcongs.results)"
          :per-page="perPage"
          v-model="currentPage"
          prev-text="Prev"
          next-text="Next"
          hide-goto-end-buttons
        />
      </nav>

      <!-- Detail modal -->
      <b-modal
        id="detailModal"
        :title="infoModal.title"
        ok-only
        @hide="resetInfoModal"
      >
        <pre>{{ infoModal.content }}</pre>
        <div class="container">
          <div class="row"></div>
        </div>
      </b-modal>
    </b-card>
  </b-container>
  <!-- <div class="row" >
    {{cong}}

  </div> -->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "Cong",
  props: {
    caption: {
      type: String,
      default: "<b>Bảng chấm Công</b>"
    },
    hover: {
      type: Boolean,
      default: true
    },
    striped: {
      type: Boolean,
      default: true
    },
    bordered: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: true
    },
    fixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      json_fields: {
        id: "id",
        employee_id: "employee_id",
        date_work: "date_work",
        months_work: "months_work",

        created_at: "created_at",
        updated_at: "updated_at"
      },
      json_data: null,
      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8"
          }
        ]
      ],
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "employee_id",
          label: "ID Employee",
          sortable: true,
          class: "text-center"
        },
        {
          key: "date_work",
          label: "Sum Work-Done Date",
          sortable: true,
          class: "text-center"
        },
        {
          key: "months_work",
          label: "Work-Done Month",
          sortable: true,
          class: "text-center"
        },

        {
          key: "created_at",
          label: "Created At",
          sortable: true,
          class: "text-center"
        },
        {
          key: "updated_at",
          label: "Updated At",
          sortable: true,
          class: "text-center"
        },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],

      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  mounted() {
    this.fetchBangCongs();
    this.json_data = this.bangcongs.results;

    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }
  },
  computed: {
    ...mapState("congs", ["bangcongs"]),
    ...mapGetters("authentication", ["isLoggedIn"]),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    ...mapMutations("congs", ["setEditMode"]),
    ...mapActions("congs", ["fetchBangCongs"]),
    getRowCount(items) {
      return items.length;
    },
    rowClicked(item) {
      // const userLink = this.userLink(item.id)
      // this.$router.push({path: userLink})

      this.infoModal.title = `Item: ${item.id}`;
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal");
    },
    // congClicked(cong) {
    //   this.setCurrentCong(cong)
    // },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveRelation(infoModal);
      this.$bvModal.hide(this.infoModal.id);
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    detail(item, index, button) {
      this.infoModal.title = `Index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal", button);
    },
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>
