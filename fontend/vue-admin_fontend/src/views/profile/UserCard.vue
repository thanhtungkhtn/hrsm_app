<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a href="#">
        <img
          class="card-img-top"
          v-bind:src="user.data.employee.avatar"
          media-simple="true"
          alt="..."
          width="100%"
          height="100%"
        />
      </a>
      <p></p>
      <h5 class="title" style="float:right;">ID: {{user.data.id}}</h5>
      <p class="description">
        <strong>
          Name:
          <i>{{user.data.employee.name}}</i>
        </strong>
        <br />
        <strong>Email:</strong>
        <i>{{user.data.email}}</i>
        <br />
      </p>
      <hr />
      <p class="description">
        <strong>Giới Tính:</strong>
        <i>{{user.data.employee.gender}}</i>
        <br />
        <strong>Ngày Sinh:</strong>
        <i>{{user.data.employee.day_of_birth}}</i>
        <br />
        <strong>Chứng Minh Nhân Dân:</strong>
        <i>{{user.data.employee.identity_card_number}}</i>
        <br />
        <strong>Điện Thoại:</strong>
        <i>{{user.data.employee.phone_number}}</i>
        <br />
        <strong>Địa Chỉ:</strong>
        <i>{{user.data.employee.address}}</i>
        <br />
        <strong>Quê Quán:</strong>
        <i>{{user.data.employee.native_place}}</i>
        <br />
        <strong>Dân Tộc:</strong>
        <i>{{user.data.employee.nationality}}</i>
        <br />
        <strong>Tình Trạng Hôn Nhân:</strong>
        <i>{{user.data.employee.marital_status}}</i>
        <br />
      </p>
    </div>
    <p></p>
    <hr />
    <p class="card-description">
      <i>Create at: {{user.data.employee.created_at}}</i>
      <br />
      <i>Update at: {{user.data.employee.updated_at}}</i>
    </p>
    <div slot="footer" class="button-container">
      <base-button icon round class="btn-facebook">
        <i class="fa fa-facebook"></i>
      </base-button>
      <base-button icon round class="btn-twitter">
        <i class="fa fa-twitter"></i>
      </base-button>
      <base-button icon round class="btn-google">
        <i class="fa fa-google-plus"></i>
      </base-button>
    </div>
  </card>
</template>
<script>
import BaseButton from "@/components/BaseButton.vue";
import Card from "@/components/Cards/Card.vue";

export default {
  components: {
    BaseButton,
    Card
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>
<style>
</style>
