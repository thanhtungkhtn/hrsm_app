<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" xl="12">
       <b-card>
          <div slot="header">
            <strong>Create Employee</strong> Form
          </div>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-input-group-prepend>
                    <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                  </b-input-group-prepend>
                  <b-form-input :value="name" @input="$emit('onInputNameEmployee', $event)" type="text" placeholder="Name"></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group description="Let us know your gender.">
                <b-form-select id="gender"
                  :plain="true"
                  :multiple="false"
                  :options="['MALE', 'FEMALE']"
                  :value="gender"
                  @input="$emit('onInputGender', $event)">

                </b-form-select>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="day_of_birth" @input="$emit('onInputDayOfBirth', $event)" type="date" placeholder="Day of Birth" autocomplete="dayofbirth"></b-form-input>
                  <b-input-group-append><b-input-group-text><i class="fa fa-calendar-check-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="phone_number" @input="$emit('onInputPhoneNumber', $event)" type="number" placeholder="Phone Number" autocomplete="phonenumber"></b-form-input>
                  <b-input-group-append><b-input-group-text><i class="fa fa-mobile-phone"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="identity_card_number" @input="$emit('onInputIdentityCardNumber', $event)" type="number" placeholder="Identity Card Number" autocomplete="identitycardnumber"></b-form-input>
                  <b-input-group-append><b-input-group-text><i class="fa fa-address-card-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="12">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="email" @input="$emit('onInputEmail', $event)" type="email" placeholder="Email" autocomplete="email"></b-form-input>
                  <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="address" @input="$emit('onInputAddress', $event)" type="text" placeholder="Address" autocomplete="address"></b-form-input>
                  <!-- <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append> -->
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="native_place" @input="$emit('onInputNativePlace', $event)" type="text" placeholder="Native Place" autocomplete="nativeplace"></b-form-input>
                  <!-- <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append> -->
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-input :value="nationality" @input="$emit('onInputNationality', $event)" type="text" placeholder="Nationality" autocomplete="nationality"></b-form-input>
                  <!-- <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append> -->
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="12">
              <b-form-group>
                <b-input-group>
                  <b-form-select placeholder="Marital Status" :value="marital_status" @input="$emit('onInputMaritalStatus', $event)" :options="['Độc Thân', 'Đã có gia đình']" ></b-form-select>
                  <!-- <b-input-group-append><b-input-group-text><i class="fa fa-envelope-o"></i></b-input-group-text></b-input-group-append> -->
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-file
                    :value="avatar"
                    placeholder="Choose a file for avatar..."
                    @input="$emit('onInputAvatar', $event)"
                  ></b-form-file>
                  <b-input-group-append><b-input-group-text><i class="fa fa-file-image-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col sm="6">
              <b-form-group>
                <b-input-group>
                  <b-form-file
                    :value="fingerprint_image"
                    placeholder="Choose a file for Fingerprint Image..."
                    @input="$emit('onInputFingerprintImage', $event)"
                  ></b-form-file>
                  <b-input-group-append><b-input-group-text><i class="fa fa-file-image-o"></i></b-input-group-text></b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>

          <div slot="footer">
            <b-button @click="$emit('create')" type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
    'name',
    'gender',
    'day_of_birth',
    'phone_number',
    'identity_card_number',
    'email',
    'address',
    'native_place',
    'nationality',
    'marital_status',
    'avatar',
    'fingerprint_image'
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
