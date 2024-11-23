<template>
  <div>
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">ユーザー登録</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registerUser()">
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="registerUserForm.name"
                label="氏名"
                :rules="[rules.required, rules.max255]"
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="registerUserForm.email"
                label="メールアドレス"
                :rules="[rules.required, rules.max255, rules.email]"
                :type="'email'"
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="registerUserForm.password"
                label="パスワード"
                :rules="[rules.required, rules.password]"
                :type="'password'"
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="registerUserForm.password_confirmation"
                label="パスワード確認"
                :rules="[
                  rules.required,
                  rules.password,
                  rules.password_confirm,
                ]"
                :type="'password'"
              />
            </v-col>

            <v-col cols="8">
              <div>
                入社日
                <date-picker
                  v-model="registerUserForm.entry_date"
                  type="date"
                  lang="ja"
                  format="YYYY-MM-DD"
                />
              </div>
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="registerUserForm.beginner_flg"
                :items="assignSituations"
                item-text="text"
                item-value="value"
                label="アサイン状況"
                required
              />
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="registerUserForm.department_id"
                :items="forSelectList"
                item-text="name"
                item-value="id"
                label="所属"
                aria-required=""
              />
            </v-col>

            <v-col cols="8">
              <v-radio-group
                v-model="registerUserForm.gender"
                :rules="[rules.required]"
              >
                <v-radio label="男性" value="1" />
                <v-radio label="女性" value="2" />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-btn type="submit" class="me-4"> REGISTER </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "AdminCreate",
  components: { DatePicker },
  data() {
    return {
      registerUserForm: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        entry_date: null,
        beginner_flg: null,
        department_id: null,
        gender: "",
      },
      assignSituations: [
        {
          text: "指定なし",
          value: null,
        },
        {
          text: "アサイン中",
          value: true,
        },
        {
          text: "待機中",
          value: false,
        },
      ],
      rules: {
        required: (v) => !!v || "必須項目です",
        max255: (v) => v.length <= 255 || "255文字以下で入力してください",
        password: (v) =>
          v.length >= 8 || "パスワードは8文字以上で入力してください",
        email: (v) => /.+@.+/.test(v) || "メールアドレス形式で入力してください",
        password_confirm: (v) =>
          v === this.registerUserForm.password || "パスワードが違います",
      },
    };
  },
  computed: {
    forSelectList() {
      return this.$store.getters["department/forSelectList"];
    },
  },
  mounted() {},
  methods: {
    async registerUser() {
      try {
        const response = await this.axios
          .post("api/admin/users/store", this.registerUserForm)
          .then((response) => {
            if (response.data.CreateUserResult) {
              alert("ユーザーを登録しました");
              this.$router.push("/admin/users/");
            } else {
              alert("登録に失敗しました");
              this.$router.push("/admin/users/create");
            }
          });
        console.log(response);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
  },
};
</script>

<style></style>
