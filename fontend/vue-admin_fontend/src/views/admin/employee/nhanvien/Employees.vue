<template>
  <b-row>
    <!-- <b-col cols="12" xl="12">

    </b-col> -->
    <b-col cols="12" xl="12" v-if="employees">

      <CreateEmployee v-if="ishow" @show="ishow=false"
        @onInputNameEmployee="setNewEmployeeName"
        :name="newEmployeeName"

        @onInputGender="setNewEmployeeGender"
        :gender="newEmployeeGender"

        @onInputDayOfBirth="setNewEmployeeDayOfBirth"
        :day_of_birth="newEmployeeDayOfBirth"

        @onInputPhoneNumber="setNewEmployeePhoneNumber"
        :phone_number="newEmployeePhoneNumber"

         @onInputIdentityCardNumber="setNewEmployeeIdentityCardNumber"
        :identity_card_number="newEmployeeIdentityCardNumber"

        @onInputEmail="setNewEmployeeEmail"
        :email="newEmployeeEmail"

        @onInputAddress="setNewEmployeeAddress"
        :address="newEmployeeAddress"

         @onInputNativePlace="setNewEmployeeNativePlace"
        :native_place="newEmployeeNativePlace"

        @onInputNationality="setNewEmployeeNationality"
        :nationality="newEmployeeNationality"

         @onInputMaritalStatus="setNewEmployeeMaritalStatus"
        :marital_status="newEmployeeMaritalStatus"

        @onInputAvatar="setNewEmployeeAvatar"
        :avatar="newEmployeeAvatar"

        @onInputFingerprintImage="setNewEmployeeFingerprintImage"
        :fingerprint_image="newEmployeeFingerprintImage"

        @create="createEmployee"
      ></CreateEmployee>
      <transition name="slide">
      <b-card>
        <div slot="header" v-html="caption"></div>
        <b-row>
          <b-col lg="6" class="my-1">
            <b-button size="sm" variant="primary" class="float-left"  @click="ishow=true" v-if="!ishow">
              <i class="fa fa-user"></i>
              CREATE EMPLOYEE
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
                  <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
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
              class="mb-0">
              <b-form-checkbox-group v-model="filterOn" class="mt-1">
                <b-form-checkbox value="name">Name</b-form-checkbox>
                <b-form-checkbox value="address">Address</b-form-checkbox>
                <b-form-checkbox value="email">Email</b-form-checkbox>
                <b-form-checkbox value="native_place">Native Place</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>
        </b-row>
          <!-- {{filterOn}} -->
        <b-table
          show-empty
          :hover="!hover"
          :striped="striped"
          :bordered="bordered"
          :small="small"
          :fixed="fixed"
          outlined
          responsive
          :items="employees.results"
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

          <template v-slot:name="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:day_of_birth="row">
            <div style="width: 170px">{{ row.value }}</div>
          </template>
          <template v-slot:identity_card_number="row">
            <div style="width: 160px">{{ row.value }}</div>
          </template>
          <template v-slot:phone_number="row">
            <div style="width: 130px">{{ row.value }}</div>
          </template>
          <template v-slot:address="row">
            <div style="width: 200px">{{ row.value }}</div>
          </template>
          <template v-slot:native_place="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:nationality="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:email="row">
            <div style="width: 200px">{{ row.value }}</div>
          </template>
          <template v-slot:marital_status="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>
          <template v-slot:avatar="row">
            <div style="width: 200px">{{ row.value }}</div>
          </template>
          <template v-slot:fingerprint_image="row">
            <div style="width: 200px">{{ row.value }}</div>
          </template>
          <template v-slot:user_id="row">
            <div style="width: 80px">{{ row.value }}</div>
          </template>
          <template v-slot:permision_id="row">
            <div style="width: 110px">{{ row.value }}</div>
          </template>
          <template v-slot:created_at="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>
          <template v-slot:updated_at="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>

          <template v-slot:actions="row">
            <div style="width: 180px">
              <b-button @click="detail(row.item, row.index, $event.target)" size="sm" class="mr-1">
                <i class="fa fa-file-text-o fa-lg"/>
              </b-button>
              <b-button size="sm" class="mr-1" @click="edit(row.item, row.index, $event.target)">
                <i class="fa fa-edit fa-lg"/>
              </b-button>
              <b-button size="sm" @click="deleteEmployee(row.item)" class="mr-1">
                <i class="fa fa-remove fa-lg"/>
              </b-button>
            </div>
          </template>

        </b-table>

        <b-row>
          <b-col cols="12" xl="12">
            <nav>
              <b-pagination size="sm" :total-rows="getRowCount(employees.results)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
            </nav>
          </b-col>
        </b-row>

         <!-- Detail modal -->
        <b-modal id="detailModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
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
        <b-modal size="lg" :id="infoModal.id" :title="infoModal.title" @hide="resetInfoModal">
          <!-- <pre>{{ infoModal.content }}</pre> -->
          <b-form>
            <b-row>
              <b-col sm="3">
                <b-form-group label="ID">
                  <b-form-input :value="infoModal.content.id" readonly type="text"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="User ID">
                  <b-form-input :value="infoModal.content.user_id" readonly type="text"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="Permision ID">
                  <b-form-input :value="infoModal.content.permision_id" readonly type="text"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="Licensed">
                  <b-form-input :value="infoModal.content.licensed" readonly type="text"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Name Employee:">
                  <b-form-input :value="infoModal.content.name" @input="setCurrentEmployeeName" type="text"></b-form-input>
                </b-form-group>
              </b-col>

              <b-col sm="4">
                <b-form-group label="Gender:">
                  <b-form-input :value="infoModal.content.gender" @input="setCurrentEmployeeGender" type="text"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Day of Birth:">
                  <b-form-input :value="infoModal.content.day_of_birth" @input="setCurrentEmployeeDayOfBirth" type="date"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="6">
                <b-form-group label="Phone Number:">
                  <b-form-input :value="infoModal.content.phone_number" @input="setCurrentEmployeePhoneNumber" type="number"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="5">
                <b-form-group label="Identity Card Number:">
                  <b-form-input :value="infoModal.content.identity_card_number" @input="setCurrentEmployeeIdentityCardNumber" type="number"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="Native Place">
                  <b-form-input :value="infoModal.content.native_place" @input="setCurrentEmployeeNativePlace" type="text"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="3">
                <b-form-group label="Nationality">
                  <b-form-input :value="infoModal.content.nationality" @input="setCurrentEmployeeNationality" type="text"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="6">
                <b-form-group label="Email">
                  <b-form-input :value="infoModal.content.email" @input="setCurrentEmployeeEmail" type="email"></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Address">
                  <b-form-input :value="infoModal.content.address" @input="setCurrentEmployeeAddress" type="text"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col sm="4">
                <b-form-group label="Marital Status">
                  <b-form-select
                    :plain="true"
                    :value="infoModal.content.marital_status"
                    @input="setCurrentEmployeeMaritalStatus"
                    :options="['Độc Thân', 'Đã có gia đình']">
                  </b-form-select>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Avarta">
                  <b-form-file
                    :value="infoModal.content.avatar" @input="setCurrentEmployeeAvatar"
                  ></b-form-file>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Fingerprint Image">
                  <b-form-file
                    disabled v-model="infoModal.content.fingerprint_image" @input="setCurrentEmployeeFingerprintImage"
                  ></b-form-file>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <template v-slot:modal-footer={cancel}>

            <b-button
              variant="primary"
              size="sm"
              @click="hideModal(infoModal.content)"
            >
              Save
            </b-button>
            <b-button
              variant="danger"
              size="sm"
              @click="cancel()"
            >
              Cancel
            </b-button>

          </template>
        </b-modal>

      </b-card>
      </transition>
    </b-col>
    <b-col v-else>
      <b-alert show variant="warning">{{errorEmployee}}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import CreateEmployee from './CreateEmployee'

export default {
  name: 'Users',
  components:{
    CreateEmployee
  },
  props: {
    caption: {
      type: String,
      default: 'Employees List'
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
      // items: usersData.filter((user) => user.id < 42),
      ishow: false,
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc'},
        { key: 'name', label: 'Name', sortable: true},
        { key: 'gender', label: 'Gender', sortable: true },
        { key: 'day_of_birth', label: 'Day of birth', sortable: true },
        { key: 'identity_card_number', label: 'Identity Card Number', sortable: true },
        { key: 'phone_number', label: 'Phone Number', sortable: true},
        { key: 'address', label: 'Address', sortable: true },
        { key: 'native_place', label: 'Native Place', sortable: true },
        { key: 'nationality', label: 'Nationality', sortable: true },
        { key: 'email', label: 'Email', sortable: true },
        { key: 'marital_status', label: 'Marital Status', sortable: true },
        { key: 'avatar', label: 'Avatar', sortable: true},
        { key: 'fingerprint_image', label: 'Fingerprint Image', sortable: true},

        { key: 'user_id', label: 'User ID', sortable: true, sortDirection: 'desc', class: 'text-center' },
        { key: 'permision_id', label: 'Permission ID', sortable: true,  class: 'text-center' },

        { key: 'created_at', label: 'Created At', sortable: true},
        { key: 'updated_at', label: 'Updated At', sortable: true},
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      timer: '',
    }
  },
  computed: {
    ...mapState('employees', [
      'employees',
      'errorEmployee',

      'newEmployeeName',
      'newEmployeeGender',
      'newEmployeeDayOfBirth',
      'newEmployeePhoneNumber',
      'newEmployeeIdentityCardNumber',
      'newEmployeeEmail',
      'newEmployeeAddress',
      'newEmployeeNativePlace',
      'newEmployeeNationality',
      'newEmployeeMaritalStatus',
      'newEmployeeAvatar',
      'newEmployeeFingerprintImage',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/pages/login');
    }

    this.fetchEmployees();
    this.timer = setInterval(this.fetchEmployees, 180000)
    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations('employees', [
      'setEditMode',
      'setNewEmployeeName',
      'setNewEmployeeGender',
      'setNewEmployeeDayOfBirth',
      'setNewEmployeePhoneNumber',
      'setNewEmployeeIdentityCardNumber',
      'setNewEmployeeEmail',
      'setNewEmployeeAddress',
      'setNewEmployeeNativePlace',
      'setNewEmployeeNationality',
      'setNewEmployeeMaritalStatus',
      'setNewEmployeeAvatar',
      'setNewEmployeeFingerprintImage',

      'setCurrentEmployeeName',
      'setCurrentEmployeeGender',
      'setCurrentEmployeeDayOfBirth',
      'setCurrentEmployeePhoneNumber',
      'setCurrentEmployeeIdentityCardNumber',
      'setCurrentEmployeeNativePlace',
      'setCurrentEmployeeNationality',
      'setCurrentEmployeeEmail',
      'setCurrentEmployeeAddress',
      'setCurrentEmployeeMaritalStatus',
      'setCurrentEmployeeAvatar',
      'setCurrentEmployeeFingerprintImage'
    ]),
    ...mapActions('employees', [
      'fetchEmployees',
      'createEmployee',
      'saveEmployee',
      'deleteEmployee'

    ]),

    getBadge (status) {
      return status === 'Active' ? 'success'
        : status === 'Inactive' ? 'secondary'
          : status === 'Pending' ? 'warning'
            : status === 'Banned' ? 'danger' : 'primary'
    },
    getRowCount (items) {
      return items.length
    },
    userLink (id) {
      return `users/${id.toString()}`
    },
    rowClicked (item) {
      // const userLink = this.userLink(item.id)
      // this.$router.push({path: userLink})

      this.infoModal.title = `Detail`
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', 'detailModal')
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveEmployee(infoModal)
      this.$bvModal.hide(this.infoModal.id)
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    detail(item, index, button) {
      // console.log(item)
      this.infoModal.title = `Index: ${index}`
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', 'detailModal', button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
  },
  beforeDestroy(){
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
