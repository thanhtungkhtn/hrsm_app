<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" xl="12">
        <b-card>
          <div slot="header">
            <strong>Insurrance Create</strong> Form
          </div>
          <b-form>
            <b-form-group>
              <b-row>
                <b-col sm="4">
                  <b-form-group
                    description="Let us know your insurrances."
                    label="Type:"
                    label-for="type"
                    :label-cols="2"
                    >
                    <b-form-select id="type"
                      :plain="true"
                      :multiple="false"
                      :options="['Bảo Hiểm Y Tế', 'Bảo Hiểm Tai Nạn','Bảo Hiểm Xe Máy', 'Bảo Hiểm Oto']"
                      :value="type_insurrance"
                      @input="$emit('onInputTypeInsurrance', $event)">
                    </b-form-select>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="Card Number:"
                    label-for="cardnumber"
                    :label-cols="4"
                    >
                    <b-form-input id="cardnumber" placeholder="Card Number"
                      type="number" autocomplete="cardnumber"
                      :value="card_number"
                      @input="$emit('onInputCardNumberInsurrance', $event)">
                      </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="Insured Value:"
                    label-for="insuredvalue"
                    :label-cols="4"
                    >
                    <b-form-input id="insuredvalue" placeholder="Insured Value"
                      type="number" autocomplete="insuredvalue"
                      :value="insured_value"
                      @input="$emit('onInputInsuredValueInsurrance', $event)">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col sm="4">
                  <b-form-group
                    label="Day of issue:" label-for="dayofissue"
                    :label-cols="4"
                    >
                    <b-form-input type="date" id="dayofissue"
                      :value="day_of_issue"
                      @input="$emit('onInputDayOfIssueInsurrance', $event)"></b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="Expiration Date:" label-for="expirationdate"
                    :label-cols="4"
                    >
                    <b-form-input type="date" id="expirationdate"
                      :value="expiration_date"
                      @input="$emit('onInputExpirationDateInsurrance', $event)">
                    </b-form-input>
                  </b-form-group>
                </b-col>
                <b-col sm="4">
                  <b-form-group
                    label="Place of issue:"
                    label-for="placeofissue"
                    :label-cols="4"
                    >
                    <b-form-input id="placeofissue" type="text"
                      placeholder="Place of issue" autocomplete="placeofissue"
                      :value="place_of_issue"
                      @input="$emit('onInputPlaceOfIssueInsurrance', $event)">
                    </b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-form-group>
            </b-form>
          <div slot="footer">
            <b-button @click="$emit('create')" type="submit" size="sm" variant="primary"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
            <!-- <b-button type="reset" size="sm" variant="danger"><i class="fa fa-ban"></i> Reset</b-button> -->
            <b-button size="sm" class="float-right" variant="warning" @click="$emit('show', $event)"><i class="fa fa-ban"></i>Hide</b-button>
          </div>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'forms',
  props: [
    'type_insurrance',
    'card_number',
    'insured_value',
    'day_of_issue',
    'expiration_date',
    'place_of_issue'
  ],
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
