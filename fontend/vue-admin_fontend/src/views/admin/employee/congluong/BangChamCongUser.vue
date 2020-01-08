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
              worksheet="BangChamCong Info"
              name="BangChamCongInfo.xls"
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
        :items="bangchamcongs.results"
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
          <div style="width: 20px">{{ row.value }}</div>
        </template>
        <template v-slot:employee_id="row">
          <div style="width: 100px">{{ row.value }}</div>
        </template>
        <template v-slot:date="row">
          <div style="width: 200px">{{ row.value }}</div>
        </template>
        <template v-slot:check_in="row">
          <div style="width: 100px">{{ row.value }}</div>
        </template>
        <template v-slot:check_out="row">
          <div style="width: 100px">{{ row.value }}</div>
        </template>
        <template v-slot:date_work="row">
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
            <!-- <b-button size="sm" class="mr-1" @click="edit(row.item, row.index, $event.target)">
              <i class="fa fa-edit fa-lg"/>
            </b-button> -->
          </div>
        </template>
      </b-table>
      <nav>
        <b-pagination
          size="sm"
          :total-rows="getRowCount(bangchamcongs.results)"
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

      <!-- Edit modal -->
      <b-modal
        size="lg"
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
      >
        <!-- <pre>{{ infoModal.content }}</pre> -->
        <b-form>
          <b-row>
            <b-col sm="6">
              <b-form-group label="ID">
                <b-form-input
                  :value="infoModal.content.id"
                  readonly
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group label="Employee ID">
                <b-form-input
                  :value="infoModal.content.employee_id"
                  readonly
                  type="text"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group label="Date:">
                <b-form-input
                  :value="infoModal.content.date"
                  @input="setCurrentCongDate"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="4">
              <b-form-group label="Check in:">
                <b-form-input
                  :value="infoModal.content.check_in"
                  @input="setCurrentCongCheckIn"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Check out:">
                <b-form-input
                  :value="infoModal.content.check_out"
                  @input="setCurrentCongCheckOut"
                  type="date"
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col sm="4">
              <b-form-group label="Công Làm:">
                <b-form-input
                  :value="infoModal.content.date_work"
                  @input="setCurrentCongDateWork"
                  type="number"
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>

        <template v-slot:modal-footer="{ cancel }">
          <b-button
            variant="primary"
            size="sm"
            @click="hideModal(infoModal.content)"
          >
            Save
          </b-button>
          <b-button variant="danger" size="sm" @click="cancel()">
            Cancel
          </b-button>
        </template>
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
        user_id: "user_id",
        employee_id: "employee_id",
        position_id: "position_id",
        office_id: "office_id",
        salary_id: "salary_id",
        literacy_id: "literacy_id",
        insurrance_employee_id: "insurrance_employee_id",
        NgayVaoLam: "NgayVaoLam",
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
        { key: "date", label: "Date", sortable: true, class: "text-center" },
        {
          key: "check_in",
          label: "Check-In",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_out",
          label: "Check-Out",
          sortable: true,
          class: "text-center"
        },
        {
          key: "date_work",
          label: "Work-Done Date",
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
    this.fetchBangChamCongs();
    this.json_data = this.bangchamcongs.results;

    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }
  },
  computed: {
    ...mapState("congs", ["bangchamcongs"]),
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
    ...mapMutations("congs", [
      "setEditMode",

      "setCurrentCongDate",
      "setCurrentCongCheckIn",
      "setCurrentCongCheckOut",
      "setCurrentCongDateWork"
    ]),
    ...mapActions("congs", ["fetchBangChamCongs", "saveBangChamCong"]),
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
      this.saveBangChamCong(infoModal);
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
