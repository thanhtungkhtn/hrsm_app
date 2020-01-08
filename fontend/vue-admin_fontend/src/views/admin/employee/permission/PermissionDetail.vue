<template>
  <b-row>
    <b-col cols="12" lg="12">
      <b-card no-header>
        <template slot="header">
          Permision id: {{ $route.params.id }}
        </template>
        <b-table
          :striped="true"
          small
          :fixed="false"
          responsive
          show-empty
          outlined
          :items="detailData($route.params.id)"
          :fields="fields"
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
              @click="deletePermissionDetail(row.item)"
              class="mr-1"
            >
              <i class="fa fa-remove fa-lg" />
            </b-button>
          </template>
        </b-table>

        <template slot="footer">
          <b-button @click="goBack">Back</b-button>
        </template>

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
            <label class="mr-sm-2" for="inlineInput1">Permission ID: </label>
            <b-input
              class="col-md-12"
              id="inlineInput1"
              type="text"
              :value="infoModal.content.permision_id"
              disabled
            >
              <!-- @input="setCurrentPermissionName" -->
            </b-input>
            <b-row>
              <b-col sm="6">
                <label class="mr-sm-2" for="inlineInput2">Action Name: </label>
                <b-input
                  class="col-md-12"
                  id="inlineInput2"
                  type="text"
                  placeholder="Action Name"
                  :value="infoModal.content.action_name"
                  @input="setCurrentPermissionDetailActionName"
                >
                </b-input>
              </b-col>
              <b-col sm="6">
                <label class="mr-sm-2" for="inlineInput3">Action Code: </label>
                <b-input
                  class="col-md-12"
                  id="inlineInput3"
                  type="text"
                  placeholder="Action Code"
                  :value="infoModal.content.action_code"
                  @input="setCurrentPermissionDetailActionCode"
                >
                </b-input>
              </b-col>
            </b-row>

            <b-form-group label="Check Action.">
              <!-- label="Gender:" label-for="gender" :label-cols="3" -->
              <b-form-select
                id="check_action"
                :plain="true"
                :multiple="false"
                :options="[1, 0]"
                value="0"
                @input="setCurrentPermissionDetailCheckAction"
              >
              </b-form-select>
            </b-form-group>
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
    </b-col>
  </b-row>
</template>

<script>
// import usersData from './UsersData'
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import router from "../../../../router";

export default {
  name: "User",
  props: {
    caption: {
      type: String,
      default: "Permission id"
    }
  },
  data: () => {
    return {
      // items: id => {
      //   // console.log(permissions)
      //   // const user = usersData.find( user => user.id.toString() === id)
      //   // const userDetails = user ? Object.entries(user) : [['id', 'Not found']]
      //   // return userDetails.map(([key, value]) => {return {key: key, value: value}})
      // },
      fields: [
        { key: "key", label: "Key" },
        { key: "id", label: "ID" },
        { key: "permision_id", label: "Permision ID" },
        { key: "action_name", label: "Action Name" },
        { key: "action_code", label: "Action Code" },
        { key: "check_action", label: "Check Action" },
        { key: "created_at", label: "Created At" },
        { key: "updated_at", label: "Updated At" },
        { key: "actions", label: "Actions" }
      ],
      infoModal: {
        id: "info-modal",
        title: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapState("permissions", ["permissions"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    // console.log(this.permissions)

    // this.fetchRelation();
    // this.timer = setInterval(this.fetchRelation, 1000)

    // // Set the initial number of items
    // this.totalRows = this.relations.results.length
  },
  methods: {
    ...mapMutations("permissions", [
      "setEditMode",
      "setNewPermissionName",
      "setCurrentPermissionName",
      "setCurrentPermissionDetailActionName",
      "setCurrentPermissionDetailActionCode",
      "setCurrentPermissionDetailCheckAction"
    ]),
    ...mapActions("permissions", [
      "fetchPermissions",
      "createPermission",
      "savePermission",
      "deletePermission",

      "savePermissionDetail",
      "deletePermissionDetail"
    ]),

    goBack() {
      this.$router.go(-1);
      // this.$router.replace({path: '/users'})
    },
    detailData(id) {
      // console.log(this.permissions)
      // console.log(id)
      const permission = this.permissions.results.find(
        permissions => permissions.id.toString() === id
      );

      const permissionDetails = permission
        ? Object.entries(permission.permisionDetail)
        : [["id", "Not found"]];
      // console.log(permissionDetails)
      return permissionDetails.map(([key, value]) => {
        // console.log(value)
        return {
          key: key,
          id: value.id,
          permision_id: value.permision_id,
          action_name: value.action_name,
          action_code: value.action_code,
          check_action: value.check_action,
          created_at: value.created_at,
          updated_at: value.updated_at
        };
      });
    },

    hideModal(infoModal) {
      console.log(infoModal);
      this.savePermissionDetail(infoModal);
      this.$bvModal.hide(this.infoModal.id);
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },

    detail(item, index, button) {
      // // console.log(item)
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
