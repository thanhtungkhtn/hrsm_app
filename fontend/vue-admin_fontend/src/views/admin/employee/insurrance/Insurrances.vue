<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorInsurrance">
      <createInsurrance v-if="ishow" @show="ishow=false"
        @onInputTypeInsurrance="setNewInsurranceType"
        :type_insurrance="newInsurranceType"

        @onInputCardNumberInsurrance="setNewInsurranceCardNumber"
        :card_number="newInsurranceCardNumber"

        @onInputInsuredValueInsurrance="setNewInsurranceInsuredValue"
        :insured_value="newInsurranceInsuredValue"

        @onInputDayOfIssueInsurrance="setNewInsurranceDayOfIssue"
        :day_of_issue="newInsurranceDayOfIssue"

        @onInputExpirationDateInsurrance="setNewInsurranceExpirationDate"
        :expiration_date="newInsurranceExpirationDate"

        @onInputPlaceOfIssueInsurrance="setNewInsurrancePlaceOfIssue"
        :place_of_issue="newInsurrancePlaceOfIssue"

        @create="createInsurrance"
      ></createInsurrance>

      <transition name="slide">
      <b-card>
        <div slot="header" v-html="caption"></div>
        <b-row>
          <b-col lg="6" class="my-1">
            <b-button size="sm" variant="primary" class="float-left"  @click="ishow=true" v-if="!ishow">
              <i class="fa fa-child"></i>
              CREATE INSURRANCE
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
          :items="insurrances.results"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          @row-clicked="rowClicked"
        >
          <template v-slot:type="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:card_number="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:insurance_money="row">
            <div style="width: 150px">{{ row.value }}</div>
          </template>
          <template v-slot:day_of_issue="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>
          <template v-slot:day_of_issue="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>
          <template v-slot:expiration_date="row">
            <div style="width: 180px">{{ row.value }}</div>
          </template>
          <template v-slot:place_of_issue="row">
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
              <b-button @click="detail(row.item, row.index, $event.target)" size="sm" class="mr-1">
                <i class="fa fa-file-text-o fa-lg"/>
              </b-button>
              <b-button size="sm" class="mr-1" @click="edit(row.item, row.index, $event.target)">
                <i class="fa fa-edit fa-lg"/>
              </b-button>
              <b-button size="sm" @click="deleteInsurrance(row.item)" class="mr-1">
                <i class="fa fa-remove fa-lg"/>
              </b-button>
            </div>
          </template>

        </b-table>
        <nav>
          <b-pagination size="sm" :total-rows="getRowCount(insurrances.results)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
        </nav>

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
        <b-modal :id="infoModal.id" :title="infoModal.title" @hide="resetInfoModal">
          <!-- <pre>{{ infoModal.content }}</pre> -->
          <b-form>
            <label class="mr-sm-2" for="inlineInput1">Loai Bao Hiem: </label>
            <b-form-select id="type_insurrance"
              :plain="true"
              :multiple="false"
              :options="['Bảo Hiểm Y Tế', 'Bảo Hiểm Tai Nạn','Bảo Hiểm Xe Máy', 'Bảo Hiểm Oto']"
              :value="infoModal.content.type"
              @input="setCurrentInsurranceType">
            </b-form-select>

            <label class="mr-sm-2" for="inlineInput2">Card Number: </label>
            <b-input class="col-md-12" id="inlineInput2" type="number" placeholder="Card Number"
              :value="infoModal.content.card_number"
              @input="setCurrentInsurranceCardNumber"
            >
            </b-input>

            <label class="mr-sm-2">Insurance Money: </label>
            <b-input class="col-md-12" id="inlineInput3" type="number" placeholder="Insurance Money"
              :value="infoModal.content.insurance_money"
              @input="setCurrentInsurranceMoney"
            >
            </b-input>

            <label class="mr-sm-2">Day of Issue: </label>
            <b-input class="col-md-12" id="inlineInput4" type="date" placeholder="Day of Issue"
              :value="infoModal.content.day_of_issue"
              @input="setCurrentInsurranceDayOfIssue"
            >
            </b-input>

            <label class="mr-sm-2">Expiration Date: </label>
            <b-input class="col-md-12" id="inlineInput5" type="date" placeholder="Expiration Date"
              :value="infoModal.content.expiration_date"
              @input="setCurrentInsurranceExpirationDate"
            >
            </b-input>

            <label class="mr-sm-2">Place Of Issue: </label>
            <b-input class="col-md-12" id="inlineInput6" type="text" placeholder="Place Of Issue"
              :value="infoModal.content.place_of_issue"
              @input="setCurrentInsurrancePlaceOfIssue"
            >
            </b-input>

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
      <b-alert show variant="warning">{{errorInsurrance}}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
// import usersData from './UsersData'
import createInsurrance from './CreateInsurrance'
import router from '../../../../router'

export default {
  name: 'Insurrance',
  components:{
    createInsurrance
  },
  props: {
    caption: {
      type: String,
      default: 'Insurrances List'
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
      ishow: false,
      // items: usersData.filter((user) => user.id < 42),
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc'},
        { key: 'type', label: 'Type', sortable: true},
        { key: 'card_number', label: 'Card Number', sortable: true, sortDirection: 'desc'},
        { key: 'insurance_money', label: 'Insured Value', sortable: true, sortDirection: 'desc'},
        { key: 'day_of_issue', label: 'Day of issue', sortable: true, sortDirection: 'desc'},
        { key: 'expiration_date', label: 'Expiration Date', sortable: true},
        { key: 'place_of_issue', label: 'Place of issue', sortable: true},
        { key: 'created_at', label: 'Created At', sortable: true},
        { key: 'updated_at', label: 'Updated At', sortable: true},
        { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
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
    ...mapState('insurrances', [
      'insurrances',
      'newInsurranceType',
      'newInsurranceCardNumber',
      'newInsurranceInsuredValue',
      'newInsurranceDayOfIssue',
      'newInsurranceExpirationDate',
      'newInsurrancePlaceOfIssue',
      'errorInsurrance'
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/pages/login');
    }

    this.fetchInsurrances();
    this.timer = setInterval(this.fetchInsurrances, 180000)

    // this.totalRows = this.employee.results.length
  },
  methods: {
    ...mapMutations('insurrances', [
      'setEditMode',
      'setNewInsurranceType',
      'setNewInsurranceCardNumber',
      'setNewInsurranceInsuredValue',
      'setNewInsurranceDayOfIssue',
      'setNewInsurranceExpirationDate',
      'setNewInsurrancePlaceOfIssue',

      'setCurrentInsurranceType',
      'setCurrentInsurranceCardNumber',
      'setCurrentInsurranceMoney',
      'setCurrentInsurranceDayOfIssue',
      'setCurrentInsurranceExpirationDate',
      'setCurrentInsurrancePlaceOfIssue',
    ]),
    ...mapActions('insurrances', [
      'fetchInsurrances',
      'createInsurrance',
      'saveInsurrance',
      'deleteInsurrance'
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
      const userLink = this.userLink(item.id)
      this.$router.push({path: userLink})
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveInsurrance(infoModal)
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
