<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" xl="6">
        <b-card>
          <div slot="header">
            <strong>Reward And Punishment</strong> Form
          </div>
          <b-form>
            <b-row>
              <b-col sm="6">
                <b-form-group>
                  <b-input-group>
                    <b-form-input type="number" placeholder="Employee ID"></b-form-input>
                    <b-input-group-append><b-input-group-text><i class="fa fa-user"></i></b-input-group-text></b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                label="Type:"
                label-for="type"
                :label-cols="3">
                    <b-form-select id="type"
                      :plain="true"
                      :options="['Thưởng', 'Phạt']"
                      value="Thưởng"
                      >
                    </b-form-select>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group>
                  <b-input-group>
                    <b-form-input type="number" placeholder="Money" autocomplete="money"></b-form-input>
                    <b-input-group-append><b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text></b-input-group-append>
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group>
                  <b-input-group>
                    <b-form-input type="text" placeholder="Reason" autocomplete="reason"></b-form-input>
                    <!-- <b-input-group-append><b-input-group-text><i class="fa fa-envelope"></i></b-input-group-text></b-input-group-append> -->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group>
                  <b-input-group>
                    <b-form-input type="date" placeholder="Date" autocomplete="date"></b-form-input>
                    <!-- <b-input-group-append><b-input-group-text><i class="fa fa-date"></i></b-input-group-text></b-input-group-append> -->
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
          <div slot="footer">
            <b-button type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <!-- <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button> -->
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'forms',
  data () {
    return {
      selected: [], // Must be an array reference!
      show: true
    }
  },
  methods: {
    click () {
      // do nothing
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
