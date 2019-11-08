<template>
  <div class="app">
    <AppHeader fixed>
      <SidebarToggler class="d-lg-none" display="md" mobile />
      <b-link class="navbar-brand" to="#">
        <img class="navbar-brand-full" src="/logo.png" width="30" height="30" alt="Logo">
        <!-- <img class="navbar-brand-minimized" src="logo.png" width="30" height="30" alt="CoreUI Logo"> -->
        <b>&nbsp;HRMS</b>
      </b-link>
      <SidebarToggler class="d-md-down-none" display="lg" :defaultOpen=true />
      <b-navbar-nav class="d-md-down-none">
        <b-nav-item class="px-3" to="/dashboard">Dashboard</b-nav-item>
        <!-- <b-nav-item class="px-3" exact>Hợp đồng</b-nav-item>
        <b-nav-item class="px-3">Thân Nhân</b-nav-item>
        <b-nav-item class="px-3">Quyền</b-nav-item> -->
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="!isLoggedIn" class="d-md-down-none" to="/pages/login">
          <i class="icon-login"></i>
        </b-nav-item>

        <b-nav-item class="d-md-down-none" to="/messenger">
          <i class="icon-envelope"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>
        <b-nav-item class="d-md-down-none" to="">
          <i class="fa fa-tasks"></i>
          <b-badge pill variant="danger">5</b-badge>
        </b-nav-item>


        <b-nav-item class="d-md-down-none" to="/calendar">
          <i class="icon-calendar"></i>
        </b-nav-item>
        <!-- <b-nav-item class="d-md-down-none">
          <i class="icon-list"></i>
        </b-nav-item>
        <b-nav-item class="d-md-down-none">
          <i class="icon-location-pin"></i>
        </b-nav-item> -->
        <DefaultHeaderDropdownAccnt v-if="isLoggedIn"/>

      </b-navbar-nav>
      <AsideToggler class="d-none d-lg-block" />
      <!-- <AsideToggler class="d-lg-none" mobile /> -->
    </AppHeader>

<!-- Body -->
    <div class="app-body">
      <AppSidebar fixed>
        <SidebarHeader/>
        <SidebarForm/>
        <SidebarNav :navItems="nav"></SidebarNav>
        <SidebarFooter/>
        <SidebarMinimizer/>
      </AppSidebar>
      <main class="main">
        <Breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside fixed>
        <!--aside-->
        <DefaultAside/>
      </AppAside>
    </div>
    <TheFooter>
      <!--footer-->
      <div>
        <a href="https://reasonforfuture.herokuapp.com">HRMS-UI</a>
        <span class="ml-1">&copy; 2019 HCMUS.</span>
      </div>
      <div class="ml-auto">
        <span class="mr-1">Powered by</span>
        <a href="https://vuejs.org/">Vue.js</a>
      </div>
    </TheFooter>
  </div>
</template>

<script>
import nav from '@/_nav'
import { Header as AppHeader, SidebarToggler, Sidebar as AppSidebar, SidebarFooter, SidebarForm, SidebarHeader, SidebarMinimizer, SidebarNav, Aside as AppAside, AsideToggler, Footer as TheFooter, Breadcrumb } from '@coreui/vue'
import DefaultAside from './DefaultAside'
import DefaultHeaderDropdownAccnt from './DefaultHeaderDropdownAccnt'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'DefaultContainer',
  components: {
    AsideToggler,
    AppHeader,
    AppSidebar,
    AppAside,
    TheFooter,
    Breadcrumb,
    DefaultAside,
    DefaultHeaderDropdownAccnt,
    SidebarForm,
    SidebarFooter,
    SidebarToggler,
    SidebarHeader,
    SidebarNav,
    SidebarMinimizer
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched.filter((route) => route.name || route.meta.label )
    },
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
