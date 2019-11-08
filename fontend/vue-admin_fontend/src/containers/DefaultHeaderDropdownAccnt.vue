<template>
  <AppHeaderDropdown right no-caret>
    <template slot="header">
      <img
        src="img/avatars/avatar.jpg"
        class="img-avatar"
        alt="admin@admin.com" />
    </template>\
    <template slot="dropdown">
      <b-dropdown-header tag="div" class="text-center"><strong>Account</strong></b-dropdown-header>
      <!-- <b-dropdown-item><i class="fa fa-bell-o" /> Updates
        <b-badge variant="info">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <!-- <b-dropdown-item><i class="fa fa-comments" /> Comments
        <b-badge variant="warning">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->

      <b-dropdown-item to="/account/profile"><i class="fa fa-user"/> Profile
      </b-dropdown-item>

      <b-dropdown-item to="/account/lc"><i class="fa fa-vcard-o"/> Hợp Đồng
        <!-- <b-badge variant="success">{{ itemsCount }}</b-badge> -->
      </b-dropdown-item>

      <b-dropdown-item to="/account/rel"><i class="fa fa-users"/> Thân Nhân
        <!-- <b-badge variant="success">{{ itemsCount }}</b-badge> -->
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-calendar-check-o"/> Công Làm
        <!-- <b-badge variant="success">{{ itemsCount }}</b-badge> -->
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-money"/> Lương Tháng
        <!-- <b-badge variant="success">{{ itemsCount }}</b-badge> -->
      </b-dropdown-item>
      <b-dropdown-item to="/account/per"><i class="fa fa-key"/> Quyền
        <!-- <b-badge variant="success">{{ itemsCount }}</b-badge> -->
      </b-dropdown-item>
      <b-dropdown-header
        tag="div"
        class="text-center">
        <strong>Settings</strong>
      </b-dropdown-header>
      <b-dropdown-item><i class="fa fa-wrench" /> Settings</b-dropdown-item>
      <!-- <b-dropdown-item><i class="fa fa-usd" /> Payments
        <b-badge variant="secondary">{{ itemsCount }}</b-badge>
      </b-dropdown-item>
      <b-dropdown-item><i class="fa fa-file" /> Projects
        <b-badge variant="primary">{{ itemsCount }}</b-badge>
      </b-dropdown-item> -->
      <b-dropdown-divider />
      <b-dropdown-item><i class="fa fa-shield" /> Lock Account</b-dropdown-item>
      <b-dropdown-item v-if="isLoggedIn" @click="logout" >
        <i class="fa fa-lock" /> Logout
      </b-dropdown-item>
    </template>
  </AppHeaderDropdown>
</template>

<script>
import { HeaderDropdown as AppHeaderDropdown } from '@coreui/vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DefaultHeaderDropdownAccnt',
  components: {
    AppHeaderDropdown
  },
  data: () => {
    return { itemsCount: 42 }
  },
  computed: {
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
    methods: {
    ...mapActions('authentication', [
      'logout',
    ]),
  },
}
</script>
