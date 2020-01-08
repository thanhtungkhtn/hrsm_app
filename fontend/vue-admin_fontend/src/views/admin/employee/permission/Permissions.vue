<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorPermission">
      <CreatePermission
        @onInputName="setNewPermissionName"
        :value="newPermissionName"
        @create="createPermission"
      ></CreatePermission>
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
                  worksheet="Permission Info"
                  name="PermissionInfo.xls"
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
            :items="permissions.results"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
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
                @click="deletePermission(row.item)"
                class="mr-1"
              >
                <i class="fa fa-remove fa-lg" />
              </b-button>
            </template>

            <template v-slot:row-details="row">
              <b-card>
                <ul>
                  <li v-for="(value, key) in row.item" :key="key">
                    {{ key }}: {{ value }}
                  </li>
                </ul>
              </b-card>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(permissions.results)"
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
                placeholder="Name"
                :value="infoModal.content.name_per"
                @input="setCurrentPermissionName"
              >
              </b-input>
              <hr />
              <h3 class="text-center">Permision's Detail</h3>
              <pre>{{ infoModal.content.permisionDetail }}</pre>
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
          <!-- {{permissions}} -->
        </b-card>
      </transition>
    </b-col>

    <b-col v-else>
      <b-alert show variant="warning">{{ errorPermission }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CreatePermission from "./CreatePermission";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "permissions",
  components: {
    CreatePermission
  },
  props: {
    caption: {
      type: String,
      default: "Permissions List"
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
        name_per: "name_per",
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
        { key: "name_per", label: "Name", sortable: true },
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
    ...mapState("permissions", [
      "permissions",
      "newPermissionName",

      "errorPermission"
    ]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchPermissions();
    // this.timer = setInterval(this.fetchPermissions, 1000)

    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations("permissions", [
      "setEditMode",
      "setNewPermissionName",
      "setCurrentPermissionName"
    ]),
    ...mapActions("permissions", [
      "fetchPermissions",
      "createPermission",
      "savePermission",
      "deletePermission"
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
      return `permissions/${id.toString()}`;
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
    relationClicked(relation) {
      this.setCurrentRelation(relation);
    },
    hideModal(infoModal) {
      console.log(infoModal);
      this.savePermission(infoModal);
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
