<template>
  <b-row>
    <b-col cols="12" xl="12" v-if="!errorRewardAndPunishments">
      <CreateKhenThuong></CreateKhenThuong>
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
                  worksheet="RewardPunishment Info"
                  name="RewardPunishmentInfo.xls"
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
            :items="rewardandpunishments.results"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            @row-clicked="rowClicked"
          >
          </b-table>
          <nav>
            <b-pagination
              size="sm"
              :total-rows="getRowCount(rewardandpunishments.results)"
              :per-page="perPage"
              v-model="currentPage"
              prev-text="Prev"
              next-text="Next"
              hide-goto-end-buttons
            />
          </nav>
        </b-card>
      </transition>
    </b-col>

    <b-col v-else>
      <b-alert show variant="warning">{{ errorRewardAndPunishments }}</b-alert>
    </b-col>
  </b-row>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import CreateKhenThuong from "./CreateKhenThuong";
import router from "../../../../router";
import Vue from "vue";
import JsonExcel from "vue-json-excel";

Vue.component("downloadExcel", JsonExcel);

export default {
  name: "RewardAndPunishments",
  components: {
    CreateKhenThuong
  },
  props: {
    caption: {
      type: String,
      default: "Reward And Punishments List"
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
        employee_id: "employee_id",
        type: "type",
        money: "money",
        reason: "reason",
        date: "date",
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
        { key: "employee_id", label: "Employee ID", sortable: true },
        { key: "type", label: "Type", sortable: true },
        { key: "money", label: "Money", sortable: true },
        { key: "reason", label: "Reason", sortable: true },
        { key: "date", label: "Date", sortable: true },
        { key: "created_at", label: "Created At", sortable: true },
        { key: "updated_at", label: "Updated At", sortable: true }
        // { key: 'actions', label: 'Actions' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: []
    };
  },
  computed: {
    ...mapState("raps", ["rewardandpunishments", "errorRewardAndPunishments"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }

    this.fetchRewardAndPunishments();
    this.json_data = this.rewardandpunishments.results;
  },
  methods: {
    ...mapMutations("raps", ["setEditMode"]),
    ...mapActions("raps", ["fetchRewardAndPunishments"]),

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
      const userLink = this.userLink(item.id);
      this.$router.push({ path: userLink });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<style scoped>
.card-body >>> table > tbody > tr > td {
  cursor: pointer;
}
</style>
