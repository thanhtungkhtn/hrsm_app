<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col cols="12" xl="6">
        <b-card>
          <div slot="header">
            <strong>Permission Create</strong> Form
          </div>
          <!-- Bootstrap Vue has some problems with Inline forms that's why we use some standard bootstrap classes -->
          <b-form inline>
            <label class="mr-sm-2" for="inlineInput1">Name: </label>
            <b-input id="inlineInput1" class="col-10"
              type="text"
              placeholder="Permission Name"
              :value="value"
              @input="$emit('onInputName', $event)"
              @keyup.enter="$emit('create')"></b-input>
          </b-form>
          <div slot="footer">
            <b-button
              type="submit" size="sm"
              variant="primary"
              @click="$emit('create')"><i class="fa fa-dot-circle-o"></i> Submit</b-button>
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
    'value'
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
