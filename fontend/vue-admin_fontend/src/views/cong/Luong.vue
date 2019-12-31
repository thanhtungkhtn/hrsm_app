<template>
  <b-container fluid>
    <b-card>
      <div slot="header" v-html="caption"></div>
      <b-table
        show-empty
        :hover="!hover"
        :striped="striped"
        :bordered="bordered"
        :small="small"
        :fixed="fixed"
        outlined
        responsive
        :items="luong.results"
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
        <template v-slot:aggregate_salary_id="row">
          <div style="width: 150px">{{ row.value }}</div>
        </template>
        <template v-slot:position_allowance="row">
          <div style="width: 150px">{{ row.value }}</div>
        </template>
        <template v-slot:insurrance_employee="row">
          <div style="width: 150px">{{ row.value }}</div>
        </template>
        <template v-slot:TienThuongPhat="row">
          <div style="width: 180px">{{ row.value }}</div>
        </template>
        <template v-slot:months_salary="row">
          <div style="width: 120px">{{ row.value }}</div>
        </template>
        <template v-slot:TongLuong="row">
          <div style="width: 180px">{{ row.value }}</div>
        </template>
        <template v-slot:created_at="row">
          <div style="width: 150px">{{ row.value }}</div>
        </template>
        <template v-slot:updated_at="row">
          <div style="width: 150px">{{ row.value }}</div>
        </template>

        <template v-slot:actions="row">
          <div style="width: 180px">
            <b-button @click="detail(row.item, row.index, $event.target)" size="sm" class="mr-1">
              <i class="fa fa-file-text-o fa-lg"/>
            </b-button>
          </div>
        </template>

      </b-table>
      <nav>
        <b-pagination size="sm" :total-rows="getRowCount(luong.results)" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>

      <b-modal id="detailModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <pre>{{ infoModal.content }}</pre>
        <div class="container">
          <div class="row">
          </div>
        </div>
      </b-modal>

    </b-card>
  </b-container>
  <!-- <div class="row" >
    {{luong}}

  </div> -->
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import router from '../../router'

export default {
  name: 'Luong',
  props: {
    caption: {
      type: String,
      default: '<b>Bảng Cập Nhật Lương Tháng</b>'
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
    },
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
        { key: 'employee_id', label: 'ID Employee', sortable: true, class: 'text-center' },
        { key: 'aggregate_salary_id', label: 'ID Aggregate Salary', sortable: true, class: 'text-center' },
        { key: 'position_allowance', label: 'Position Allowance', sortable: true, class: 'text-center' },
        { key: 'insurrance_employee', label: 'Insurrance Employee', sortable: true, class: 'text-center' },
        { key: 'TienThuongPhat', label: 'Reward and Punishment', sortable: true, class: 'text-center' },
        { key: 'months_salary', label: 'Months Salary', sortable: true, class: 'text-center' },
        { key: 'TongLuong', label: 'Salary Actual Receive', sortable: true, class: 'text-center' },

        { key: 'created_at', label: 'Create At', sortable: true, class: 'text-center' },
        { key: 'updated_at', label: 'Updated At', sortable: true, class: 'text-center' },
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
      }
    }
  },
  mounted() {
    this.fetchLuong();

    if (!this.isLoggedIn) {
      return router.push('/pages/login');
    }
  },
  computed: {
    ...mapState('luong', [
      'luong',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
  },
  methods: {
    ...mapMutations('luong', [
      'setEditMode',
    ]),
    ...mapActions('luong', [
      'fetchLuong',
    ]),
    getRowCount (items) {
      return items.length
    },
    rowClicked (item) {
      // const userLink = this.userLink(item.id)
      // this.$router.push({path: userLink})

      this.infoModal.title = `Item: ${item.id}`
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', 'detailModal')
    },
    // congClicked(cong) {
    //   this.setCurrentCong(cong)
    // },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveRelation(infoModal)
      this.$bvModal.hide(this.infoModal.id)
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    detail(item, index, button) {
      this.infoModal.title = `Index: ${index}`
      // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item
      this.$root.$emit('bv::show::modal', 'detailModal', button)
    },
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  }
}
</script>
