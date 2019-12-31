<template>
  <b-container fluid>
    <b-card>
      <div slot="header">
        <strong>New Relation</strong>
      </div>
      <!-- Bootstrap Vue has some problems with Inline forms that's why we use some standard bootstrap classes -->
      <b-form inline>
        <label class="mr-sm-2" for="inlineInput1">Name: </label>
        <b-input
        class="col-md-5"
         id="inlineInput1" type="text"
         placeholder="Name"
         :value="newRelationName"
         @input="setNewRelationName"
         >
         </b-input>
        <label class="mx-sm-2" for="inlineInput2">Relationship: </label>
        <b-input
        class="col-md-5"
        id="inlineInput2"
        type="text"
        placeholder="Relationship"
        :value="newRelationship"
        @input="setNewRelationship"
        ></b-input>
      </b-form>
      <div slot="footer">
        <b-button
        type="submit"
        size="sm"
        variant="primary"
        @click="createRelation"
        ><i class="fa fa-dot-circle-o"></i> Submit</b-button>
        <!-- <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button> -->
      </div>
    </b-card>

    <!-- Main table element -->
    <b-card>
      <div slot="header" v-html="caption"></div>
      <b-table
        show-empty
        small
        :fixed="fixed"
        stacked="md"

        :items="relations.results"

        :hover="hover"
        :striped="striped"

        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <!-- <template v-slot:name="row">
          {{ row.value.first }} {{ row.value.last }}
        </template> -->

        <template v-slot:actions="row">
          <!-- <b-button size="sm" v-if="row.detailsShowing" @click="row.toggleDetails" class="mr-1">
           <i class="fa fa-window-close-o fa-lg"></i>
          </b-button> -->

          <!-- <b-button v-else @click="row.toggleDetails" size="sm" class="mr-1">
            <i class="fa fa-file-text-o fa-lg"/>
          </b-button> -->
          <b-button @click="detail(row.item, row.index, $event.target)" size="sm" class="mr-1">
            <i class="fa fa-file-text-o fa-lg"/>
          </b-button>

          <!-- <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
            <i class="fa fa-edit fa-lg"/>
          </b-button> -->

          <b-button size="sm" class="mr-1" @click="edit(row.item, row.index, $event.target)">
            <i class="fa fa-edit fa-lg"/>
          </b-button>



          <b-button size="sm" @click="deleteRelation(row.item)" class="mr-1">
             <i class="fa fa-remove fa-lg"/>
          </b-button>
        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
            </ul>
          </b-card>
        </template>

      </b-table>


      <nav>
        <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" prev-text="Prev" next-text="Next" hide-goto-end-buttons/>
      </nav>

      <b-modal id="detailModal" :title="infoModal.title" ok-only @hide="resetInfoModal">
        <!-- <pre>{{ infoModal.content }}</pre> -->
        <div class="container">
          <div class="row">
            <div class="col-4"><strong>ID:</strong></div>
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
            <div class="col">{{ infoModal.content.updated_at }}</div>

          </div>
        </div>
      </b-modal>

      <!-- Info modal -->
      <b-modal
        :id="infoModal.id"
        :title="infoModal.title"
        @hide="resetInfoModal"
      >
        <!-- <pre>{{ infoModal.content.name }}</pre> -->
        <b-form>
          <label class="mr-sm-2" for="inlineInput1">Name: </label>
          <b-input
          class="col-md-12"
          id="inlineInput1" type="text"
          placeholder="Name"

          :value="infoModal.content.name"
          @input="setCurrentRelationName"

          >
          </b-input>
          <label class="mx-sm-2" for="inlineInput2">Relationship: </label>
          <b-input
          class="col-md-12"
          id="inlineInput2"
          type="text"
          placeholder="Relationship"
          :value="infoModal.content.relationship"
          @input="setCurrentRelationship"

          ></b-input>

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
  </b-container>
 </template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import router from '../../router'

  export default {
    name: 'Relation',
    props: [
      'isEditMode',
    ],
    data() {
      return {

        show: false,
        variants: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
        headerBgVariant: 'dark',
        headerTextVariant: 'light',
        bodyBgVariant: 'light',
        bodyTextVariant: 'dark',
        footerBgVariant: 'warning',
        footerTextVariant: 'dark',

        timer: '',
        items: [
          { isActive: true, age: 40, name: { first: 'Dickerson', last: 'Macdonald' } },
          { isActive: false, age: 21, name: { first: 'Larsen', last: 'Shaw' } },
          {
            isActive: false,
            age: 9,
            name: { first: 'Mini', last: 'Navarro' },
            _rowVariant: 'success'
          },
          { isActive: false, age: 89, name: { first: 'Geneva', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'Jami', last: 'Carney' } },
          { isActive: false, age: 27, name: { first: 'Essie', last: 'Dunlap' } },
          { isActive: true, age: 40, name: { first: 'Thor', last: 'Macdonald' } },
          {
            isActive: true,
            age: 87,
            name: { first: 'Larsen', last: 'Shaw' },
            _cellVariants: { age: 'danger', isActive: 'warning' }
          },
          { isActive: false, age: 26, name: { first: 'Mitzi', last: 'Navarro' } },
          { isActive: false, age: 22, name: { first: 'Genevieve', last: 'Wilson' } },
          { isActive: true, age: 38, name: { first: 'John', last: 'Carney' } },
          { isActive: false, age: 29, name: { first: 'Dick', last: 'Dunlap' } }
        ],
        fields: [
          { key: 'id', label: 'ID', sortable: true, sortDirection: 'desc' },
          { key: 'employee_id', label: 'ID Employee', sortable: true, class: 'text-center' },
          { key: 'name', label: 'Name', sortable: true, class: 'text-center' },

          { key: 'relationship', label: 'Relationship', sortable: true, class: 'text-center' },
          { key: 'created_at', label: 'Updated At', sortable: true, class: 'text-center' },
          { key: 'updated_at', label: 'Updated At', sortable: true, class: 'text-center' },

          // {
          //   key: 'isActive',
          //   label: 'is Active',
          //   formatter: (value, key, item) => {
          //     return value ? 'Yes' : 'No'
          //   },
          //   sortable: true,
          //   sortByFormatted: true,
          //   filterByFormatted: true
          // },
          { key: 'actions', label: 'Actions' }
        ],
        caption:'<b>Relative Table</b>',
        fixed: true,
        striped: true,
        hover: true,
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
    computed: {
      ...mapState('relation', [
        'relations',
        'newRelationName',
        'newRelationship',
        'currentRelation',
        'newRelationError'
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
    created() {

    },
    mounted() {
      if (!this.isLoggedIn) {
        return router.push('/pages/login');
      }

      this.fetchRelation();
      this.timer = setInterval(this.fetchRelation, 1000)

      // this.relations.results.length
      console.log(this.relations.results.length)
      // Set the initial number of items
      this.totalRows = this.relations.results.length
    },
    methods: {
      ...mapMutations('relation', [
        'setNewRelationName',
        'setNewRelationship',
        'setEditMode',
        'setRelationName',
        'setRelationship',
        'setCurrentRelation',
        'setCurrentRelationName',
        'setCurrentRelationship'

      ]),
      ...mapActions('relation', [
        'fetchRelation',
        'deleteRelation',
        'saveRelation',
        'createRelation'
      ]),
      relationClicked(relation) {
        this.setCurrentRelation(relation)
      },
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
    },
    beforeDestroy(){
      clearInterval(this.timer)
    }
  }
</script>
