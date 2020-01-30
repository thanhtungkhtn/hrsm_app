<template>
  <b-container fluid v-if="!message">
    <b-row>
      <b-col cols="8">
        <b-row>
          <b-col>
            <b-card>
              <div class="text-center">
                <h5>
                  <i>Set your target and keep trying until you reach it.</i>
                </h5>
              </div>
              <hr />
              <b-row>
                <b-col cols="6" class="text-center">
                  <b-button
                    @click="checkin"
                    size="sm"
                    variant="vimeo"
                    class="mr-1 btn-brand"
                  >
                    <i class="fa fa-calendar-check-o"></i>
                    <span>CHECK_IN</span>
                  </b-button>
                </b-col>
                <b-col cols="6" class="text-center">
                  <b-button
                    @click="checkout"
                    size="sm"
                    variant="youtube"
                    class="mr-1 btn-brand"
                  >
                    <i class="fa fa-calendar-times-o"></i>
                    <span>CHECK_OUT</span>
                  </b-button>
                </b-col>
              </b-row>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-card>
              <div class="text-center">
                <strong>
                  <i>Check in by image</i>
                </strong>
              </div>
              <br />
              <div class="file">
                <form method="POST" enctype="multipart/form-data">
                  <div class="fields">
                    <input
                      type="file"
                      id="file"
                      ref="file"
                      name="image"
                      accept="image/*"
                      @change="onSelect"
                    />
                  </div>
                  <br />
                  <div class="fields">
                    <b-button
                      @click="onSubmit"
                      size="sm"
                      variant="vimeo"
                      class="mr-1 btn-brand"
                    >
                      <i class="fa fa-calendar-check-o"></i>
                      <span>CHECK_IN</span>
                    </b-button>
                  </div>
                  <div class="message">
                    <h5>{{ message }}</h5>
                  </div>
                </form>
              </div>
            </b-card>
          </b-col>
          <b-col>
            <b-card>
              <div class="text-center">
                <strong>
                  <i>Check out by image</i>
                </strong>
              </div>
              <br />
              <div class="file">
                <form method="POST" enctype="multipart/form-data">
                  <div class="fields">
                    <input
                      type="file"
                      ref="fileOut"
                      name="image"
                      @change="onSelectOut"
                    />
                  </div>
                  <br />
                  <div class="fields">
                    <b-button
                      @click="onSubmitOut"
                      size="sm"
                      variant="youtube"
                      class="mr-1 btn-brand"
                    >
                      <i class="fa fa-calendar-times-o"></i>
                      <span>CHECK_OUT</span>
                    </b-button>
                  </div>
                  <div class="message">
                    <h5>{{ message }}</h5>
                  </div>
                </form>
              </div>
            </b-card>
          </b-col>
        </b-row>
      </b-col>

      <b-col cols="4">
        <b-row>
          <b-col cols="7">
            <b-card-img
              class="card-img-top"
              height="300"
              v-bind:src="imagePreview"
              v-show="showPreview"
            ></b-card-img>
          </b-col>
          <b-col cols="5" v-show="showPreview">
            <p>
              Name:
              <b>{{ nameImg }}</b>
            </p>
            <p>
              Type:
              <b>{{ typeImg }}</b>
            </p>
            <p>
              Size:
              <b>{{ sizeImg }}</b> (bytes)
            </p>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <br />
    <b-row>
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
          :items="cong.results"
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
            <div style="width: 20px">{{ row.value }}</div>
          </template>
          <template v-slot:employee_id="row">
            <div style="width: 100px">{{ row.value }}</div>
          </template>
          <template v-slot:date="row">
            <div style="width: 200px">{{ row.value }}</div>
          </template>
          <template v-slot:check_in="row">
            <div style="width: 100px">{{ row.value }}</div>
          </template>
          <template v-slot:check_out="row">
            <div style="width: 100px">{{ row.value }}</div>
          </template>
          <template v-slot:date_work="row">
            <div style="width: 140px">{{ row.value }}</div>
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
            </div>
          </template>
        </b-table>
        <nav>
          <b-pagination
            size="sm"
            :total-rows="getRowCount(cong.results)"
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
            <div class="row"></div>
          </div>
        </b-modal>
      </b-card>
    </b-row>
  </b-container>
  <b-col v-else>
    <b-alert show variant="warning">{{ message }}</b-alert>
  </b-col>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import router from "../../router";
// import axios from "axios";
// import HTTP from "../../https";
// import { async } from "q";
// const path = require("path");
// const { spawn } = require("child_process");

export default {
  name: "Cong",
  components: {},
  props: {
    caption: {
      type: String,
      default: "<b>Bảng chấm Công</b>"
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
  data() {
    return {
      file: "",
      showPreview: false,
      imagePreview: "",
      nameImg: "",
      typeImg: "",
      sizeImg: "",
      message: "",
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "employee_id",
          label: "ID Employee",
          sortable: true,
          class: "text-center"
        },
        { key: "date", label: "Date", sortable: true, class: "text-center" },
        {
          key: "check_in",
          label: "Check-In",
          sortable: true,
          class: "text-center"
        },
        {
          key: "check_out",
          label: "Check-Out",
          sortable: true,
          class: "text-center"
        },
        {
          key: "date_work",
          label: "Work-Done Date",
          sortable: true,
          class: "text-center"
        },

        {
          key: "created_at",
          label: "Created At",
          sortable: true,
          class: "text-center"
        },
        {
          key: "updated_at",
          label: "Updated At",
          sortable: true,
          class: "text-center"
        },
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
  mounted() {
    this.fetchCong();
    this.timer = setInterval(this.fetchCong, 2000);

    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }
  },
  computed: {
    ...mapState("cong", ["cong"]),
    ...mapGetters("authentication", ["isLoggedIn"]),

    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key };
        });
    }
  },
  methods: {
    ...mapMutations("cong", ["setEditMode"]),
    ...mapActions("cong", [
      "fetchCong",
      "checkout",
      "checkin",
      "checkInByImage",
      "checkOutByImage"
    ]),
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

      const file = this.$refs.file.files[0];

      this.file = file;

      let reader = new FileReader();
      this.showPreview = true;

      reader.addEventListener(
        "load",
        function() {
          // this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.file) {
        this.nameImg = this.file.name;
        this.typeImg = this.file.type;
        this.sizeImg = this.file.size;

        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }

      if (!allowedTypes.includes(file.type)) {
        this.message = "Only images are require!!";
      }
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500KB";
      }
    },
    onSelectOut() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const fileOut = this.$refs.fileOut.files[0];

      this.file = fileOut;

      let reader = new FileReader();
      this.showPreview = true;

      reader.addEventListener(
        "load",
        function() {
          // this.showPreview = true;
          this.imagePreview = reader.result;
        }.bind(this),
        false
      );

      if (this.file) {
        if (/\.(jpe?g|png|gif)$/i.test(this.file.name)) {
          reader.readAsDataURL(this.file);
        }
      }
      if (!allowedTypes.includes(fileOut.type)) {
        this.message = "Only images are require!!";
      }
      if (fileOut.size > 500000) {
        this.message = "Too large, max size allowed is 500KB";
      }
    },
    async onSubmit() {
      try {
        this.showPreview = false;

        const formData = new FormData();
        formData.append("image", this.file);
        await this.checkInByImage(formData);
        // this.message = "Uploaded";
        // setTimeout(async () => {
        //     await this.fetchCong()
        // }, 3000);
      } catch (err) {
        this.message = err.response.data.error;
      }
    },
    async onSubmitOut() {
      try {
        this.showPreview = false;

        const formDataCheckOut = new FormData();
        formDataCheckOut.append("imageOut", this.file);
        await this.checkOutByImage(formDataCheckOut);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // this.message = 'Something went wrong!!';
        this.message = err.response.data.error;
      }
    },
    getRowCount(items) {
      return items.length;
    },
    rowClicked(item) {
      this.infoModal.title = `Item: ${item.id}`;
      // // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal");
    },
    // congClicked(cong) {
    //   this.setCurrentCong(cong)
    // },
    hideModal(infoModal) {
      // console.log(infoModal)
      this.saveRelation(infoModal);
      this.$bvModal.hide(this.infoModal.id);
    },
    edit(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    detail(item, index, button) {
      this.infoModal.title = `Index: ${index}`;
      // this.infoModal.content = JSON.stringify(item, null, 2)
      this.infoModal.content = item;
      this.$root.$emit("bv::show::modal", "detailModal", button);
    },
    // info(item, index, button) {
    //   this.infoModal.title = `Row index: ${index}`
    //   this.infoModal.content = JSON.stringify(item, null, 2)
    //   this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    // },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
