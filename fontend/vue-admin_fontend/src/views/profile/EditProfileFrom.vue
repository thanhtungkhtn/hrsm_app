<template>
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <card>
          <h5 slot="header" class="title">Edit Profile </h5>
          <div class="row">
            <div class="col-md-12 pr-md-1">
              <form>
                <div class="form-row">
                  <div class="col-md-4 mb-3">
                    <label for="">Full Name</label>
                    <input type="text" readonly class="form-control" id="validationDefault01" placeholder="Full name" v-model="user.data.employee.name" required>
                  </div>
                  <div class="col-md-8 mb-3">
                    <label for="validationDefaultUsername">Email</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroupPrepend2">@</span>
                      </div>
                      <input type="email" readonly class="form-control" id="validationDefaultEmail" placeholder="Email" aria-describedby="inputGroupPrepend2" v-model="user.data.employee.email" required>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label  for="validationDefault01">Gender</label>
                    <!-- <select id="inputState" class="form-control">
                      <option selected>{{user.data.employee.gender}}</option>
                      <option>MALE</option>
                      <option>FEMALE</option>
                    </select> -->
                    <input type="text" readonly class="form-control" id="validationDefault01" placeholder="Gender" v-model="user.data.employee.gender" required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationDefault02">Ngày Sinh</label>
                    <input type="text" readonly class="form-control" id="validationDefault02" placeholder="Ngày Sinh" v-model="user.data.employee.day_of_birth" required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationDefault02">Dân Tộc</label>
                    <input type="text" readonly class="form-control" id="validationDefault02" placeholder="Dân Tộc" v-model="user.data.employee.nationality" required>
                  </div>

                </div>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationDefault03">Số Chứng Minh Nhân Dân</label>
                    <input type="text" readonly class="form-control" id="validationDefault03" placeholder="Số Chứng Minh Nhân Dân" v-model="user.data.employee.identity_card_number" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="validationDefault04">Số Điện Thoại</label>
                    <input type="text"
                      class="form-control"
                      id="validationDefault04"
                      placeholder="Số Điện Thoại"
                      :value="user.data.employee.phone_number"
                      @input="setUserPhoneNumber($event.target.value)"
                      required>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-8 mb-3">
                    <label for="validationDefault03">Địa Chỉ</label>
                    <input type="text" class="form-control"
                      id="validationDefault03" placeholder="Địa Chỉ"

                      :value="user.data.employee.address"
                      @input="setUserAddress($event.target.value)"
                      required>
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationDefault04">Quê Quán</label>
                    <input type="text" readonly class="form-control" id="validationDefault04" placeholder="Quê Quán" v-model="user.data.employee.native_place" required>
                  </div>
                </div>

                <div class="form-row">
                  <div class="col-md-4 mb-3">
                    <label for="validationDefault03">Tình Trạng Hôn Nhân</label>
                    <input type="text" class="form-control"
                    id="validationDefault03" placeholder="Tình Trạng Hôn Nhân"

                    :value="user.data.employee.marital_status"
                    @input="setUserMaritalStatus($event.target.value)"
                    required>
                  </div>

                  <div class="col-md-4 mb-3">
                    <label for="validationDefault03">Hình Nhân Viên</label>
                    <b-form-group>
                      <b-form-file id="file-default"
                        accept="image/jpeg, image/png, image/jpg"
                        v-model="file"
                        @input="setUserAvatar(file.name)"
                      ></b-form-file>
                    </b-form-group>
                    <!-- <input type="file" class="form-control" id="validationDefault03" placeholder="Hình Nhân Viên" required> -->
                  </div>
                  <div class="col-md-4 mb-3">
                    <label for="validationDefault04">Hình Vân Tay</label>
                    <b-form-group>
                      <b-form-file id="file-default"
                        accept="image/jpeg, image/png, image/jpg"
                        v-model="file2"
                        @input="setUserFingerprintImage(file2.name)"
                      ></b-form-file>
                    </b-form-group>
                    <!-- <input type="file" class="form-control" id="validationDefault04" placeholder="Hình Vân Tay" required> -->
                  </div>

                </div>

                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck2" required>
                    <label class="form-check-label" for="invalidCheck2">
                      Agree to terms and conditions
                    </label>
                  </div>
                </div>
                <button class="btn btn-primary"
                  type="submit"
                  @click="saveUser(user.data.employee)"
                >Submit form</button>
              </form>


            </div>
          </div>
        </card>

      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
  import UserCard from './UserCard'
  import router from '../../router'
  import Card from '@/components/Cards/Card.vue'

  export default {
    name: 'Profile',
    props: [
      'isEditMode',
    ],
    components: {
      // EditProfileForm,
      UserCard,
      Card
    },
    mounted() {
      this.fetchUser();
      // this.timer = setInterval(this.fetchUser, 1000)

      if (!this.isLoggedIn) {
        return router.push('/pages/login');
      }
    },
    computed: {
      ...mapState('user', [
        'user',
      ]),
      ...mapGetters('authentication', [
        'isLoggedIn',
      ]),
    },
    methods: {
      ...mapMutations('user', [
        'setEditMode',
        'setUserEmail',
        'setUserPhoneNumber',
        'setUserAddress',
        'setUserMaritalStatus',
        'setUserAvatar',
        'setUserFingerprintImage'
      ]),
      ...mapActions('user', [
        'fetchUser',
        'saveUser'
      ]),
    },
    data() {
      return {
        timer: '',
        FingerprintImage: null,
        avatar: null,
        file: null,
        file2: null,
        name: 'user.data.id',
        model: {
          employee: 'this.user',
          company: 'Luckytel Telecom Inc.',
          email: 'mike@email.com',
          username:' this.user',
          firstName: 'this.user.data.id',
          lastName: 'Tung',
          address: 'Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09',
          city: 'Melbourne',
          country: 'Australia',
          about: 'Lamborghini Mercy, Your chick she so thirsty, I\'m in that two seat Lambo.'
        },
        users: {
          fullName: 'Thanh Tung',
          title: 'Ceo/Co-Founder',
          description: `Do not be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is...`,
        }
      }
    },
    beforeDestroy(){
      // clearInterval(this.timer)
    }
  }
</script>
<style>
</style>
