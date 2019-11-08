<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" xl="12">
        <b-card>
          <div slot="header">
            <strong>Literacy Create</strong> Form
          </div>

          <b-form-group>
            <b-row>
              <b-col sm="7">
                <b-form-group>
                  <label>Name Literacy</label>
                  <b-input-group>
                    <b-input-group-prepend>
                      <b-input-group-text><i class="fa fa-user"></i></b-input-group-text>
                    </b-input-group-prepend>
                    <b-form-input type="text" placeholder="Name"
                      :value="name"
                      @input="$emit('onInputNameLiteracy', $event)"
                    ></b-form-input>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col sm="5">
                <b-form-group>
                  <label for="hesotrachnhiem">Hệ số trình độ:</label>
                  <b-form-select id="hesochuvu"
                    :plain="true"
                    :options="[1,2,3,4,5,6,7,8,9,10,11,12]"
                    :value="he_so_trinh_do"
                    @input="$emit('onInputHeSoTrinhDo', $event)"
                    >
                  </b-form-select>
                  <!-- <b-form-input type="number" id="hesotrachnhiem" placeholder="Hệ số trách nhiệm"></b-form-input> -->
                </b-form-group>
              </b-col>
            </b-row>
          </b-form-group>
          <div slot="footer">
            <b-button @click="$emit('create')" type="submit" size="sm" variant="success"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
  props: [
    'name',
    'he_so_trinh_do',
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
