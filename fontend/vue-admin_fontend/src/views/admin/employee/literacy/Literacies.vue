<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorLiteracy">
      <createLiteracy
        @onInputNameLiteracy="setNewLiteracyName"
        :name="newLiteracyName"
        @onInputHeSoTrinhDo="setNewLiteracyHeSoTrinhDo"
        :he_so_trinh_do="newLiteracyHeSoTrinhDo"
        @create="createLiteracy"
      ></createLiteracy>

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
                  worksheet="Literacies Info"
                  name="LiteraciesInfo.xls"
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
            :items="literacies.results"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
          >
            <!-- @row-clicked="rowClicked" -->
            <template v-slot:actions="row">
              <b-button
                @click="detail(row.item, row.index, $event.target)"
                size="sm"
                class="mr-1"
              >
                <i class="fa fa-file-text-o fa-lg" />
              </b-button>
              <b-button
                size="sm"
                class="mr-1"
                @click="edit(row.item, row.index, $event.target)"
              >
                <i class="fa fa-edit fa-lg" />
              </b-button>
              <b-button
                size="sm"
                @click="deleteLiteracy(row.item)"
                class="mr-1"
              >
                <i class="fa fa-remove fa-lg" />
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(literacies.results)"
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
            :id="infoModal.id"
            :title="infoModal.title"
            @hide="resetInfoModal"
          >
            <pre>{{ infoModal.content }}</pre>
            <b-form>
              <label class="mr-sm-2" for="inlineInput1">Name Literacy: </label>
              <b-input
                class="col-md-12"
                id="inlineInput1"
                type="text"
                placeholder="Name Literacy"
                :value="infoModal.content.name"
                @input="setCurrentLiteracyName"
              >
              </b-input>

              <label class="mr-sm-2">Hệ Số trình độ: </label>
              <b-form-select
                id="hesotrinhdo"
                :plain="true"
                :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                :value="infoModal.content.professional_coefficient"
                @input="setCurrentLiteracyHeSoTrinhDo"
              >
              </b-form-select>
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
      </transition>
    </b-col>
    <b-col v-else>
      <b-alert show variant="warning">{{ errorLiteracy }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
// import usersData from './UsersData'
import createLiteracy from "./CreateLiteracy";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "Literacy",
  components: {
    createLiteracy
  },
  props: {
    caption: {
      type: String,
      default: "Literacies List"
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
        name: "name",
        professional_coefficient: "professional_coefficient",
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
        { key: "name", label: "Name", sortable: true },
        {
          key: "professional_coefficient",
          label: "Professional Coefficient",
          sortable: true,
          class: "text-center"
        },
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
    ...mapState("literacies", [
      "literacies",
      "newLiteracyName",
      "newLiteracyHeSoTrinhDo",

      "errorLiteracy"
    ]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchLiteracies();
    this.json_data = this.literacies.results;
    this.timer = setInterval(this.fetchLiteracies, 180000);
    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations("literacies", [
      "setEditMode",
      "setNewLiteracyName",
      "setNewLiteracyHeSoTrinhDo",

      "setCurrentLiteracyName",
      "setCurrentLiteracyHeSoTrinhDo"
    ]),
    ...mapActions("literacies", [
      "fetchLiteracies",
      "createLiteracy",
      "saveLiteracy",
      "deleteLiteracy"
    ]),

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
      const userLink = this.userLink(item.id);
      this.$router.push({ path: userLink });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveLiteracy(infoModal);
      this.$bvModal.hide(this.infoModal.id);
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
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
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
