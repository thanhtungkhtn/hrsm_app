<template>
  <div class="row" >
    <div class="col-md-8">
      <div class="animated fadeIn">
        <b-row>
          <b-col xs="12" lg="12">
            <b-card>
              <div slot="header">
                <i class="fa fa-vcard-o fa-lg"/> Labour Contract Information
              </div>
              <b-tabs v-model="tabIndex[0]">
                <b-tab active>
                  <template slot="title">
                    <i class="fa fa-user fa-lg"></i> {{tabs[0]}}
                  </template>
                  <br>
                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>ID User:</strong></div>
                      <div class="col">{{ labourcontract.results.user.id }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Email:</strong></div>
                      <div class="col">{{ labourcontract.results.user.email }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.user.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.user.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-user-plus fa-lg"></i> {{tabs[1]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>ID Employee:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.id }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Licensed:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.licensed }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Name:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.name }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Gender:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.gender }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Day of Birth:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.day_of_birth }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Identity Card Number:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.identity_card_number }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Phone Number:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.phone_number }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Address:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.address }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Native Place:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.native_place }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Nationality:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.nationality }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Email:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.email }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Marital Status:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.marital_status }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.employee.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-street-view fa-lg"></i> {{tabs[2]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>ID Position:</strong></div>
                      <div class="col">{{ labourcontract.results.position.id }}</div>
                      <!-- <div class="w-100"></div>
                      <div class="col-4"><strong>Position Code:</strong></div>
                      <div class="col">{{ labourcontract.results.position.position_code }}</div> -->
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Position Name:</strong></div>
                      <div class="col">{{ labourcontract.results.position.name }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Basic Salary Of Position:</strong></div>
                      <div class="col">{{ labourcontract.results.position.basic_salary }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Position Coefficient:</strong></div>
                      <div class="col">{{ labourcontract.results.position.position_coefficient }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Responsibility Coefficient:</strong></div>
                      <div class="col">{{ labourcontract.results.position.responsibility_coefficient }}</div>
                      <!-- <div class="w-100"></div>
                      <div class="col-4"><strong>Position Code:</strong></div>
                      <div class="col">{{ labourcontract.results.position.position_code }}</div> -->
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.position.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.position.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-object-group fa-lg"></i> {{tabs[3]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>ID Office:</strong></div>
                      <div class="col">{{ labourcontract.results.office.id }}</div>
                      <!-- <div class="w-100"></div>
                      <div class="col-4"><strong>Office Code:</strong></div>
                      <div class="col">{{ labourcontract.results.office.office_code }}</div> -->
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Office Name:</strong></div>
                      <div class="col">{{ labourcontract.results.office.name }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.office.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.office.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-money fa-lg"></i> {{tabs[4]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>ID Salary:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.id }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Salary Coefficient:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.salary_coefficient }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-graduation-cap fa-lg"></i> {{tabs[5]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>Literacy ID:</strong></div>
                      <div class="col">{{ labourcontract.results.literacy.id }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Level Name:</strong></div>
                      <div class="col">{{ labourcontract.results.literacy.name }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Professional Coefficient:</strong></div>
                      <div class="col">{{ labourcontract.results.literacy.professional_coefficient }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.salary.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                  <i class="fa fa-child fa-lg"></i> {{tabs[6]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row" v-if="labourcontract.results.insurrance_employee" >
                      <div class="col-4"><strong>Insurrance ID:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.id }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Insurrance Type:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.type }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Number Insurrance Card:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.card_number }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Insurrance Money:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.insurance_money }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Day Of Issue:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.day_of_issue }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Expiration Date:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.expiration_date }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Place Of Issue:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.place_of_issue }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.insurrance_employee.insurrance.updated_at }}</div>
                    </div>
                    <div v-else>
                      <b-alert show variant="secondary">NO DATA</b-alert>
                    </div>
                  </div>

                </b-tab>
                <b-tab>
                  <template slot="title">
                    <i class="fa fa-hourglass-start fa-lg"></i> {{tabs[7]}}
                  </template>
                  <br>

                  <div class="container">
                    <div class="row">
                      <div class="col-4"><strong>Ngày Vào Làm:</strong></div>
                      <div class="col">{{ labourcontract.results.NgayVaoLam }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Create at:</strong></div>
                      <div class="col">{{ labourcontract.results.created_at }}</div>
                      <div class="w-100"></div>
                      <div class="col-4"><strong>Update at:</strong></div>
                      <div class="col">{{ labourcontract.results.updated_at }}</div>
                    </div>
                  </div>

                </b-tab>
              </b-tabs>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
    <div class="col-md-4">
      <div>
        <!-- {{labourcontract.results.employee.avatar }}
        {{labourcontract.results.employee.fingerprint_image}} -->
        <b-card v-bind:img-src=labourcontract.results.employee.avatar img-alt="avatar" overlay></b-card>

        <!-- <b-card img-src="img/vantay/hinhvantay.png" img-alt="fingerprint_image" overlay></b-card> -->
      </div>
    </div>
    <!-- <div class="col-md-4">
      <user-card :user="user"></user-card>
    </div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import router from '../../router'

export default {
  name: 'tabs',
  props: [
    'isEditMode',
  ],
  data () {
    return {
      tabIndex: [0, 0],
      tabs: [
        'User',
        'Employee',
        'Position',
        'Office',
        'Salary',
        'Literacy',
        'Insurrace',
        'Start Day',
      ]
    }
  },

  mounted() {
    this.fetchLabourContract();
    if (!this.isLoggedIn) {
      return router.push('/pages/login');
    }
  },
  computed: {
    ...mapState('labourcontract', [
      'labourcontract',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods: {
    ...mapMutations('labourcontract', [
      'setEditMode',
    ]),
    ...mapActions('labourcontract', [
      'fetchLabourContract',
    ]),
  }
}
</script>
