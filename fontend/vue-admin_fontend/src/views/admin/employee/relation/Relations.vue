<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorRelation">
      <transition name="slide">
        <b-card>
          <div slot="header" v-html="caption"></div>
          <b-row>
            <b-col lg="12" class="my-1">
              <b-button size="sm" variant="warning" class="float-right">
                <download-excel
                  class="btn btn-default float-right"
                  :data="json_data"
                  :fields="json_fields"
                  worksheet="relatives Info"
                  name="relativesInfo.xls"
                >
                  Export Data
                </download-excel>
              </b-button>
            </b-col>
          </b-row>
          <b-row>
            <b-col lg="6" class="my-1">
              <b-form-group
                label="Search:"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm-2"
                label-for="filterInput"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    type="search"
                    id="filterInput"
                    placeholder="Type to Search"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button :disabled="!filter" @click="filter = ''"
                      >Clear</b-button
                    >
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="6" class="my-1">
              <b-form-group
                label="Search On:"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                description="Leave all unchecked to filter on all data"
                class="mb-0"
              >
                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                  <b-form-checkbox value="id">ID Employee</b-form-checkbox>
                  <b-form-checkbox value="name">Name Relative</b-form-checkbox>
                </b-form-checkbox-group>
              </b-form-group>
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
            :items="relatives.results"
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
            <template v-slot:actions="row">
              <b-button
                @click="detail(row.item, row.index, $event.target)"
                size="sm"
                class="mr-1"
              >
                <i class="fa fa-file-text-o fa-lg" />
              </b-button>
              <!-- <b-button size="sm" class="mr-1" @click="edit(row.item, row.index, $event.target)">
              <i class="fa fa-edit fa-lg"/>
            </b-button> -->
              <b-button
                size="sm"
                @click="deleteRelative(row.item)"
                class="mr-1"
              >
                <i class="fa fa-remove fa-lg" />
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(relatives.results)"
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
      </transition>
    </b-col>

    <b-col v-else>
      <b-alert show variant="warning">{{ errorRelation }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "Relations",
  props: {
    caption: {
      type: String,
      default: "Relations List"
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
  data: () => {
    return {
      json_fields: {
        id: "id",
        employee_id: "employee_id",
        name: "name",
        relationship: "relationship",
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
        { key: "employee_id", label: "Employee ID", sortable: true },
        { key: "name", label: "Name", sortable: true },
        { key: "relationship", label: "Relationship", sortable: true },
        { key: "created_at", label: "Created At", sortable: true },
        { key: "updated_at", label: "Updated At", sortable: true },
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
      },
      timer: ""
    };
  },
  computed: {
    ...mapState("relatives", ["relatives", "errorRelation"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchRelatives();
    this.json_data = this.relatives.results;
  },
  methods: {
    ...mapMutations("relatives", ["setEditMode"]),
    ...mapActions("relatives", ["fetchRelatives", "deleteRelative"]),

    getBadge(status) {
      return status === "Active"
        ? "success"
        : status === "Inactive"
        ? "secondary"
        : status === "Pending"
        ? "warning"
        : status === "Banned"
        ? "danger"
        : "primary";
    },
    getRowCount(items) {
      return items.length;
    },
    userLink(id) {
      return `users/${id.toString()}`;
    },
    rowClicked(item) {
      this.infoModal.title = `Detail`;
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    detail(item, index, button) {
      // console.log(item)
      this.infoModal.title = `Index: ${index}`;
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal", button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    }
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
