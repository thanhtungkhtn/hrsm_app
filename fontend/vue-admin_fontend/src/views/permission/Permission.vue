<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col lg="12">
        <c-table :table-data="permission.results" :fields="fields" caption="<i class='fa fa-align-justify'></i> Permission Table"></c-table>
      </b-col>
    </b-row><!--/.row-->

  </div>

</template>

<script>
import { shuffleArray } from '@/shared/utils'
import cTable from '../base/Table.vue'

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import router from '../../router'

// const m = () => permission.results.map(x => {
//   var rObj = {};
//   rObj['name_per'] = x.name_per;
//   rObj['action_name'] = x.action_name;
//   rObj['action_code'] = x.action_code;

//   return rObj;
// })
const x = [{name_per: 'permission.map(x => x.name_per)', action_name: '2012/01/21', action_code: 'Staff'}]

const someData = () => shuffleArray(x)

export default {
  name: 'Permission',
  props: [
    'isEditMode',
  ],
  components: {
    cTable
  },
  mounted() {
    this.fetchPermission();

    if (!this.isLoggedIn) {
      return router.push('/pages/login');
    }
  },
  computed: {
    ...mapState('permission', [
      'permission',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapMutations('permission', [
      'setEditMode',
    ]),
    ...mapActions('permission', [
      'fetchPermission',
    ]),
  },
  data: () => {
    return {
      items: someData,
      itemsArray: someData(),
      fields: [
        {key: 'name_per', label: 'Name'},
        {key: 'action_name', label: 'Action Name', sortable: true},
        {key: 'action_code', label: 'Action Code', sortable: true},
      ],
    }
  }
}
</script>
