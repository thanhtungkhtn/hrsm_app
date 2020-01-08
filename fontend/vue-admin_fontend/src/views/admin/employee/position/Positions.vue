<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorPosition">
      <createPosition
        v-if="ishow"
        @show="ishow = false"
        @onInputNamePosition="setNewPositionName"
        :name="newPositionName"
        @onInputBasicSalary="setNewPositionBasicSalary"
        :luong_co_ban="newPositionBasicSalary"
        @onInputHeSoChucVu="setNewPositionHeSoChucVu"
        :he_so_chuc_vu="newPositionHeSoChucVu"
        @onInputHeSoTrachNhiem="setNewPositionHeSoTrachNhiem"
        :he_so_trach_nhiem="newPositionHeSoTrachNhiem"
        @create="createPosition"
      ></createPosition>

      <transition name="slide">
        <b-card>
          <div slot="header" v-html="caption"></div>

          <b-row>
            <b-col lg="6" class="my-1">
              <b-button
                size="sm"
                variant="primary"
                class="float-left"
                @click="ishow = true"
                v-if="!ishow"
              >
                <i class="fa fa-user"></i>
                CREATE POSITION
              </b-button>
            </b-col>
            <b-col lg="6" class="my-1">
              <b-button size="sm" variant="warning" class="float-right">
                <download-excel
                  class="btn btn-default float-right"
                  :data="json_data"
                  :fields="json_fields"
                  worksheet="Positions Info"
                  name="PositionsInfo.xls"
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
            :items="positions.results"
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
                @click="deletePosition(row.item)"
                class="mr-1"
              >
                <i class="fa fa-remove fa-lg" />
              </b-button>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(positions.results)"
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
            <!-- <pre>{{ infoModal.content }}</pre> -->
            <b-form>
              <label class="mr-sm-2" for="inlineInput1"
                >Name Permission:
              </label>
              <b-input
                class="col-md-12"
                id="inlineInput1"
                type="text"
                placeholder="Name Position"
                :value="infoModal.content.name"
                @input="setCurrentPositionName"
              >
              </b-input>

              <label class="mr-sm-2" for="inlineInput2">Basic Salary: </label>
              <b-input
                class="col-md-12"
                id="inlineInput2"
                type="number"
                placeholder="Basic Salary"
                :value="infoModal.content.basic_salary"
                @input="setCurrentPositionBasicSalary"
              >
              </b-input>

              <label class="mr-sm-2">He So Chuc Vu: </label>
              <b-form-select
                id="hesochuvu"
                :plain="true"
                :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                :value="infoModal.content.position_coefficient"
                @input="setCurrentPositionHeSoChucVu"
              >
              </b-form-select>

              <label class="mr-sm-2">He So Trach Nhiem: </label>
              <b-form-select
                id="hesotrachnhiem"
                :plain="true"
                :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                :value="infoModal.content.responsibility_coefficient"
                @input="setCurrentPositionHeSoTrachNhiem"
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
      <b-alert show variant="warning">{{ errorPosition }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
// import usersData from "../../employee/UsersData";
import createPosition from "./CreatePosition";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "Positions",
  components: {
    createPosition
  },
  props: {
    caption: {
      type: String,
      default: "Positions List"
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
        basic_salary: "basic_salary",
        position_coefficient: "position_coefficient",
        responsibility_coefficient: "responsibility_coefficient",
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
      ishow: false,
      // items: usersData.filter((user) => user.id < 42),
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "name", label: "Name", sortable: true },
        { key: "basic_salary", label: "Salary Basic", sortable: true },
        {
          key: "position_coefficient",
          label: "Position Coefficient",
          sortable: true,
          class: "text-center"
        },
        {
          key: "responsibility_coefficient",
          label: "Responsibility Coefficient",
          sortable: true,
          class: "text-center"
        },
        { key: "created_at", label: "Created At", sortable: true },
        { key: "updated_at", label: "Updated At", sortable: true },
        { key: "actions", label: "Actions" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
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
    ...mapState("positions", [
      "positions",
      "newPositionName",
      "newPositionBasicSalary",
      "newPositionHeSoChucVu",
      "newPositionHeSoTrachNhiem",

      "errorPosition"
    ]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchPositions();
    this.timer = setInterval(this.fetchPositions, 180000);
    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations("positions", [
      "setEditMode",
      "setNewPositionName",
      "setNewPositionBasicSalary",
      "setNewPositionHeSoChucVu",
      "setNewPositionHeSoTrachNhiem",

      "setCurrentPositionName",
      "setCurrentPositionBasicSalary",
      "setCurrentPositionHeSoChucVu",
      "setCurrentPositionHeSoTrachNhiem"
    ]),
    ...mapActions("positions", [
      "fetchPositions",
      "createPosition",
      "savePosition",
      "deletePosition"
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
      this.savePosition(infoModal);
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
