<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorLabourContract">
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
                  worksheet="LabourContracts Info"
                  name="LabourContractsInfo.xls"
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
            :items="labourcontracts.results"
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
            <template v-slot:user_id="row">
              <div style="width: 70px">{{ row.value }}</div>
            </template>
            <template v-slot:employee_id="row">
              <div style="width: 100px">{{ row.value }}</div>
            </template>
            <template v-slot:position_id="row">
              <div style="width: 90px">{{ row.value }}</div>
            </template>
            <template v-slot:office_id="row">
              <div style="width: 80px">{{ row.value }}</div>
            </template>
            <template v-slot:salary_id="row">
              <div style="width: 80px">{{ row.value }}</div>
            </template>
            <template v-slot:literacy_id="row">
              <div style="width: 90px">{{ row.value }}</div>
            </template>
            <template v-slot:insurrance_employee_id="row">
              <div style="width: 180px">
                {{ row.value ? row.value : "NaN" }}
              </div>
            </template>
            <template v-slot:NgayVaoLam="row">
              <div style="width: 180px">{{ row.value }}</div>
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
                <b-button
                  size="sm"
                  class="mr-1"
                  @click="edit(row.item, row.index, $event.target)"
                >
                  <i class="fa fa-edit fa-lg" />
                </b-button>
                <b-button
                  size="sm"
                  @click="deleteLabourContract(row.item)"
                  class="mr-1"
                >
                  <i class="fa fa-remove fa-lg" />
                </b-button>
              </div>
            </template>
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(labourcontracts.results)"
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
              <div class="row">
                <!-- <div class="col-4"><strong>ID:</strong></div>
              <div class="col">{{ infoModal.content.id }}</div>
              <div class="w-100"></div>
              <div class="col-4"><strong>Employee ID:</strong></div>
              <div class="col">{{ infoModal.content.employee_id}}</div>
              <div class="w-100"></div>
              <div class="col-4"><strong>Name:</strong></div>
              <div class="col">{{ infoModal.content.name }}</div>
              <div class="w-100"></div>
              <div class="col-4"><strong>Relationship:</strong></div>
              <div class="col">{{ infoModal.content.relationship }}</div>
              <div class="w-100"></div>
              <div class="col-4"><strong>Created At:</strong></div>
              <div class="col">{{ infoModal.content.created_at }}</div>
              <div class="w-100"></div>
              <div class="col-4"><strong>Updated At:</strong></div>
              <div class="col">{{ infoModal.content.updated_at }}</div> -->
              </div>
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
                <b-col sm="4">
                  <b-form-group label="ID">
                    <b-form-input
                      :value="infoModal.content.id"
                      readonly
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group label="User ID">
                    <b-form-input
                      :value="infoModal.content.user_id"
                      readonly
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
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
                <b-col sm="6">
                  <b-form-group label="Position ID">
                    <!-- <b-form-input :value="infoModal.content.position_id" @input="setCurrentLabourContractPosition" type="number"></b-form-input> -->
                    <b-form-select
                      id="position_id"
                      :options="[
                        { value: 1, text: 'Giám đốc' },
                        { value: 2, text: 'Phó Giám Đốc' },
                        { value: 3, text: 'Trưởng Phòng' },
                        { value: 4, text: 'Phó Phòng' },
                        { value: 5, text: 'Tổ Trưởng' },
                        { value: 6, text: 'Nhân Viên' }
                      ]"
                      @input="setCurrentLabourContractPosition"
                      :value="infoModal.content.position_id"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="6">
                  <b-form-group label="Office ID:">
                    <!-- <b-form-input :value="infoModal.content.office_id" @input="setCurrentLabourContractOffice" type="number"></b-form-input> -->
                    <b-form-select
                      id="office_id"
                      :options="[
                        { value: 1, text: 'Phòng Giám Đốc' },
                        { value: 2, text: 'Phòng Phó Giám Đốc' },
                        { value: 3, text: 'Phòng Kinh Doanh' },
                        { value: 4, text: 'Phòng Kế Toán' },
                        { value: 5, text: 'Phòng Kỹ Thuật' },
                        { value: 6, text: 'Phòng Nhân Sự' }
                      ]"
                      @input="setCurrentLabourContractOffice"
                      :value="infoModal.content.office_id"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row>
                <b-col sm="6">
                  <b-form-group label="Salary ID:">
                    <!-- <b-form-input :value="infoModal.content.salary_id" @input="setCurrentLabourContractSalary" type="number"></b-form-input> -->
                    <b-form-select
                      id="salary_id"
                      :plain="true"
                      :options="[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
                      :value="infoModal.content.salary_id"
                      @input="setCurrentLabourContractSalary"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="6">
                  <b-form-group label="Literacy ID:">
                    <!-- <b-form-input :value="infoModal.content.literacy_id" @input="setCurrentLabourContractLiteracy" type="number"></b-form-input> -->
                    <b-form-select
                      id="literacy_id"
                      :options="[
                        { value: 3, text: 'Trung Cấp' },
                        { value: 4, text: 'Cao Đẳng' },
                        { value: 6, text: 'Đại Học' },
                        { value: 7, text: 'Thạc Sĩ' },
                        { value: 10, text: 'Tiến Sĩ' }
                      ]"
                      @input="setCurrentLabourContractLiteracy"
                      :value="infoModal.content.literacy_id"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="6">
                  <b-form-group label="Insurrance Employee ID:">
                    <!-- <b-form-input :value="infoModal.content.insurrance_employee_id" @input="setCurrentLabourContractInsurranceEmployeeID" type="number"></b-form-input> -->
                    <b-form-select
                      id="literacy_id"
                      :options="[{ value: 1, text: 'Bảo Hiểm Y Tế' }]"
                      @input="setCurrentLabourContractInsurranceEmployeeID"
                      :value="infoModal.content.insurrance_employee_id"
                    >
                    </b-form-select>
                  </b-form-group>
                </b-col>

                <b-col sm="6">
                  <b-form-group label="Ngay Vao Lam:">
                    <b-form-input
                      :value="infoModal.content.NgayVaoLam"
                      readonly
                      type="text"
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
      </transition>
    </b-col>
    <b-col v-else>
      <b-alert show variant="warning">{{ errorLabourContract }}</b-alert>
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
  name: "LabourContracts",
  props: {
    caption: {
      type: String,
      default: "Labour Contracts List"
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
          key: "user_id",
          label: "User ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "employee_id",
          label: "Employee ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "position_id",
          label: "Position ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "office_id",
          label: "Office ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "salary_id",
          label: "Salary Id",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "literacy_id",
          label: "Literacy ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "insurrance_employee_id",
          label: "Insurrance Employee ID",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "NgayVaoLam",
          label: "Start End",
          sortable: true,
          sortDirection: "desc"
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
    ...mapState("labourcontracts", ["labourcontracts", "errorLabourContract"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchLabourContracts();
    this.json_data = this.labourcontracts.results;

    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations("labourcontracts", [
      "setEditMode",

      "setCurrentLabourContractPosition",
      "setCurrentLabourContractOffice",
      "setCurrentLabourContractSalary",
      "setCurrentLabourContractLiteracy",
      "setCurrentLabourContractInsurranceEmployeeID"
    ]),
    ...mapActions("labourcontracts", [
      "fetchLabourContracts",
      "saveLabourContract",
      "deleteLabourContract"
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
      // const userLink = this.userLink(item.id)
      // this.$router.push({path: userLink})

      this.infoModal.title = `Item: ${item.id}`;
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal");
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveLabourContract(infoModal);
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
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
