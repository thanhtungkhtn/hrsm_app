<template>
  <div class="file">
    <form method="POST" @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <input
          type="file"
          ref="file"
          name="image"
          @change="onSelect"
        />
      </div>
      <br>
      <div class="fields">
        <button size="lg"><i class="fa fa-calendar-check-o"></i><span>CHECK_IN</span></button>
      </div>
      <div class = "message">
        <h5>{{message}}</h5>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import axios from 'axios';
import HTTP from '../../https';
// import { async } from 'q';

export default {
  name: 'FileUpload',
  data() {
    return {
      file: '',
      message: '',
    };
  },
  computed: {
    ...mapState('cong', [
      'cong',
    ]),
  },
  methods: {
    ...mapActions('cong', [
      'fetchCong',
    ]),
    onSelect() {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = 'Only images are require!!';
      }
      if (file.size > 500000) {
        this.message = 'Too large, max size allowed is 500KB';
      }
    },
    async onSubmit() {

      try {
        // console.log(this.file)
        const formData = new FormData();
        formData.append('image', this.file);

        await HTTP().post('/account/upload', formData);
        this.message = 'Uploaded';

        this.fetchCong();

      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        // this.message = 'Something went wrong!!';
        this.message = err.response.data.error;
      }
    },
  },

};
</script>
