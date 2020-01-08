<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ this.data.data.employee.sum }}</h4>

            <p>Number Of Employee</p>
          </b-card-body>
          <card-line1-chart-example
            :data1="[
              this.data.data.employee.statistics[0].soluong,
              this.data.data.employee.statistics[1].soluong,
              this.data.data.employee.statistics[2].soluong,
              this.data.data.employee.statistics[3].soluong,
              this.data.data.employee.statistics[4].soluong,
              this.data.data.employee.statistics[5].soluong
            ]"
            :listLabel1="[]"
            chartId="card-chart-01"
            class="chart-wrapper px-3"
            style="height:150px;"
            :height="150"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12">
        <b-card header="Employee Statistical">
          <b-row class="d-flex justify-content-center">
            <b-col sm="12" lg="6">
              <hr class="mt-0" />
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-globe progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[0].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[0].soluong }}
                    <span class="text-muted small"
                      >({{
                        this.data.data.employee.statistics[0].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[0].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-social-facebook progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[1].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[1].soluong }}
                    <span class="text-muted small"
                      >({{
                        this.data.data.employee.statistics[1].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[1].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-social-twitter progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[2].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[2].soluong }}
                    <span class="text-muted small"
                      >({{
                        this.data.data.employee.statistics[2].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[2].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-social-linkedin progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[3].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[3].soluong }}
                    <span class="text-muted small"
                      >&nbsp;({{
                        this.data.data.employee.statistics[3].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[3].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-social-linkedin progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[4].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[4].soluong }}
                    <span class="text-muted small"
                      >&nbsp;({{
                        this.data.data.employee.statistics[4].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[4].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
              <div class="progress-group">
                <div class="progress-group-header">
                  <!-- <i class="icon-social-linkedin progress-group-icon"></i> -->
                  <span class="title">{{
                    this.data.data.employee.statistics[5].name
                  }}</span>
                  <span class="ml-auto font-weight-bold"
                    >{{ this.data.data.employee.statistics[5].soluong }}
                    <span class="text-muted small"
                      >&nbsp;({{
                        this.data.data.employee.statistics[5].account
                      }}%)</span
                    ></span
                  >
                </div>
                <div class="progress-group-bars">
                  <b-progress
                    height="{}"
                    class="progress-xs"
                    :value="this.data.data.employee.statistics[5].soluong"
                    variant="success"
                  ></b-progress>
                </div>
              </div>
            </b-col>
            <b-col sm="12" lg="5">
              <hr class="mt-0" />
              <div class="chart-wrapper">
                <b-card header="Bar Chart">
                  <div class="chart-wrapper">
                    <bar-example
                      chartId="chart-bar-01"
                      :data="[
                        this.data.data.employee.statistics[0].soluong,
                        this.data.data.employee.statistics[1].soluong,
                        this.data.data.employee.statistics[2].soluong,
                        this.data.data.employee.statistics[3].soluong,
                        this.data.data.employee.statistics[4].soluong,
                        this.data.data.employee.statistics[5].soluong
                      ]"
                    />
                  </div>
                </b-card>
              </div>
            </b-col>
          </b-row>
          <br />

          <div class="divider text-center">
            <b-button variant="link" size="sm" class="text-muted"
              ><i class="icon-options"></i
            ></b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ this.data.data.literacy.sum }}</h4>
            <p>App permissions</p>
          </b-card-body>
          <card-bar-chart-example
            :data4="[
              this.data.data.permision.statistics[5].soluong,
              this.data.data.permision.statistics[2].soluong,
              this.data.data.permision.statistics[4].soluong,
              this.data.data.permision.statistics[3].soluong,
              this.data.data.permision.statistics[1].soluong,
              this.data.data.permision.statistics[0].soluong
            ]"
            chartId="card-chart-04"
            class="chart-wrapper px-3"
            style="height:150px;"
            height="150"
          />
        </b-card>
      </b-col>
    </b-row>

    <b-row class="d-flex justify-content-center">
      <b-col cols="5">
        <b-card header="Gender">
          <ul class="horizontal-bars type-2">
            <div class="progress-group">
              <div class="progress-group-header">
                <i class="icon-user progress-group-icon"></i>
                <span class="title">Male</span>
                <span class="ml-auto font-weight-bold"
                  >{{ this.data.data.gender.statistics[0].account }}%</span
                >
              </div>

              <div class="progress-group-bars">
                <b-progress
                  height="{}"
                  class="progress-xs"
                  :value="this.data.data.gender.statistics[0].soluong"
                  variant="warning"
                ></b-progress>
              </div>
            </div>
            <div class="progress-group mb-5">
              <div class="progress-group-header">
                <i class="icon-user-female progress-group-icon"></i>
                <span class="title">Female</span>
                <span class="ml-auto font-weight-bold"
                  >{{ this.data.data.gender.statistics[1].account }}%</span
                >
              </div>
              <div class="progress-group-bars">
                <b-progress
                  height="{}"
                  class="progress-xs"
                  :value="this.data.data.gender.statistics[1].soluong"
                  variant="warning"
                ></b-progress>
              </div>
            </div>
          </ul>

          <div class="chart-wrapper">
            <pie-example
              chartId="chart-pie-01"
              :data="[
                this.data.data.gender.statistics[0].account,
                this.data.data.gender.statistics[1].account
              ]"
            />
          </div>
        </b-card>
      </b-col>
      <b-col cols="5">
        <b-card header="Permissions Chart">
          <div class="chart-wrapper">
            <doughnut-example
              chartId="chart-doughnut-01"
              :data="[
                this.data.data.permision.statistics[5].soluong,
                this.data.data.permision.statistics[2].soluong,
                this.data.data.permision.statistics[4].soluong,
                this.data.data.permision.statistics[3].soluong,
                this.data.data.permision.statistics[1].soluong,
                this.data.data.permision.statistics[0].soluong
              ]"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ this.data.data.position.sum }}</h4>
            <p>Position in the Company</p>
          </b-card-body>
          <card-line2-chart-example
            :data2="[
              this.data.data.position.statistics[0].soluong,
              this.data.data.position.statistics[1].soluong,
              this.data.data.position.statistics[2].soluong,
              this.data.data.position.statistics[3].soluong,
              this.data.data.position.statistics[4].soluong,
              this.data.data.position.statistics[5].soluong
            ]"
            chartId="card-chart-02"
            class="chart-wrapper px-3"
            style="height:150px;"
            :height="150"
          />
        </b-card>
      </b-col>
    </b-row>

    <b-row>
      <b-col sm="12" lg="12">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <h4 class="mb-0">{{ this.data.data.literacy.sum }}</h4>
            <p>Educational level at the company</p>
          </b-card-body>
          <card-line3-chart-example
            :data3="[
              this.data.data.literacy.statistics[0].soluong,
              this.data.data.literacy.statistics[1].soluong,
              this.data.data.literacy.statistics[2].soluong,
              this.data.data.literacy.statistics[3].soluong,
              this.data.data.literacy.statistics[4].soluong
            ]"
            chartId="card-chart-03"
            class="chart-wrapper"
            style="height:150px;"
            height="150"
          />
        </b-card>
      </b-col>
    </b-row>

    <b-row class="d-flex justify-content-center">
      <b-col cols="6">
        <b-card header="Position Radar Chart">
          <div class="chart-wrapper">
            <radar-example
              chartId="chart-radar-01"
              :data="[
                this.data.data.position.statistics[0].soluong,
                this.data.data.position.statistics[1].soluong,
                this.data.data.position.statistics[2].soluong,
                this.data.data.position.statistics[3].soluong,
                this.data.data.position.statistics[4].soluong,
                this.data.data.position.statistics[5].soluong
              ]"
            />
          </div>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card header="Polar Area Chart">
          <div class="chart-wrapper">
            <polar-area-example
              chartId="chart-polar-area-01"
              :data="[
                this.data.data.literacy.statistics[0].soluong,
                this.data.data.literacy.statistics[1].soluong,
                this.data.data.literacy.statistics[2].soluong,
                this.data.data.literacy.statistics[3].soluong,
                this.data.data.literacy.statistics[4].soluong
              ]"
            />
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import PieExample from "./charts/PieExample";
import BarExample from "./charts/BarExample";
import DoughnutExample from "./charts/DoughnutExample";
import PolarAreaExample from "./charts/PolarAreaExample";
import RadarExample from "./charts/RadarExample";

import CardLine1ChartExample from "./dashboard/CardLine1ChartExample";
import CardLine2ChartExample from "./dashboard/CardLine2ChartExample";
import CardLine3ChartExample from "./dashboard/CardLine3ChartExample";
import CardBarChartExample from "./dashboard/CardBarChartExample";
import MainChartExample from "./dashboard/MainChartExample";
import SocialBoxChartExample from "./dashboard/SocialBoxChartExample";
import CalloutChartExample from "./dashboard/CalloutChartExample";
import { Callout } from "@coreui/vue";

import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import router from "../router";

export default {
  name: "dashboard",
  components: {
    Callout,
    PieExample,
    BarExample,
    DoughnutExample,
    RadarExample,
    PolarAreaExample,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    CalloutChartExample
  },

  mounted() {
    if (!this.isLoggedIn) {
      return router.push("/pages/login");
    }
    this.fetchData();
  },
  computed: {
    ...mapState("dashboard", ["data"]),
    ...mapGetters("authentication", ["isLoggedIn"])
  },
  methods: {
    ...mapMutations("dashboard", []),
    ...mapActions("dashboard", ["fetchData"]),

    variant(value) {
      let $variant;
      if (value <= 25) {
        $variant = "info";
      } else if (value > 25 && value <= 50) {
        $variant = "success";
      } else if (value > 50 && value <= 75) {
        $variant = "warning";
      } else if (value > 75 && value <= 100) {
        $variant = "danger";
      }
      return $variant;
    },
    flag(value) {
      return "flag-icon flag-icon-" + value;
    }
  }
};
</script>

<style>
/* IE fix */
#card-chart-01,
#card-chart-02 {
  width: 100% !important;
}
</style>
