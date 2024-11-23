<template>
  <div>
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">ユーザー編集画面</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="updateUser()">
          <v-row>
            <v-col cols="8">
              <v-text-field
                v-model="updateUserForm.name"
                label="氏名"
                :rules="[rules.required, rules.max255]"
              />
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="updateUserForm.department_id"
                :items="forSelectList"
                item-text="name"
                item-value="id"
                label="所属"
                aria-required=""
              />
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="updateUserForm.beginner_flg"
                :items="assignSituations"
                item-text="text"
                item-value="value"
                label="アサイン状況"
                required
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="updateUserForm.email"
                label="メールアドレス"
                :rules="[rules.required, rules.max255, rules.email]"
                :type="'email'"
              />
            </v-col>

            <v-col cols="8">
              <div>
                入社日
                <date-picker
                  v-model="updateUserForm.entry_date"
                  type="date"
                  lang="ja"
                  format="YYYY-MM-DD"
                  value-type="YYYY-MM-DD"
                />
              </div>
            </v-col>

            <v-col cols="8">
              <v-radio-group
                v-model="updateUserForm.gender"
                :rules="[rules.required]"
              >
                <v-radio label="男性" value="1" />
                <v-radio label="女性" value="2" />
              </v-radio-group>
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="updateUserForm.blood_type"
                :items="blood_types"
                item-text="text"
                item-value="value"
                label="血液型"
                required
              />
            </v-col>

            <v-col cols="8">
              <div>
                誕生日
                <date-picker
                  v-model="updateUserForm.birthday"
                  type="date"
                  lang="ja"
                  format="YYYY-MM-DD"
                  value-type="YYYY-MM-DD"
                />
              </div>
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="updateUserForm.github_url"
                label="GitHubアカウント"
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="updateUserForm.qiita_url"
                label="Qiitaアカウント"
              />
            </v-col>

            <v-col cols="8">
              <v-text-field
                v-model="updateUserForm.self_introduction"
                label="自己紹介"
              />
            </v-col>
          </v-row>
          <v-btn type="submit" color="primary" class="me-4"> 保存 </v-btn>

          <!-- 削除ダイアログ -->
          <v-dialog v-model="dialog" persistent width="auto">
            <template #activator="{ on, attrs }">
              <v-btn
                color="red"
                class="me-4 white--text"
                v-bind="attrs"
                v-on="on"
              >
                退職
              </v-btn>
            </template>

            <v-card>
              <v-card-title class="text-h5"> 確認 </v-card-title>
              <v-card-text>
                ユーザーのステータスを”退職”にしますか？
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="green darken-1" text @click="dialog = false">
                  キャンセル
                </v-btn>
                <v-btn color="green darken-1" text @click="destroyUser()">
                  削除する
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  components: { DatePicker },
  name: "AdminUserEdit",
  data() {
    return {
      updateUserForm: {
        id: null,
        name: "",
        email: "",
        entry_date: "",
        beginner_flg: null,
        department_id: null,
        gender: "",
        blood_type: null,
        birthday: "",
        github_url: "",
        qiita_url: "",
        self_introduction: "",
      },
      followings: [],
      followers: [],
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
      blood_types: [
        {
          text: "未設定",
          value: 0,
        },
        {
          text: "A型",
          value: 1,
        },
        {
          text: "B型",
          value: 2,
        },
        {
          text: "O型",
          value: 3,
        },
        {
          text: "AB型",
          value: 4,
        },
      ],
      rules: {
        required: (v) => !!v || "必須項目です",
        max255: (v) => v.length <= 255 || "255文字以下で入力してください",
        email: (v) => /.+@.+/.test(v) || "メールアドレス形式で入力してください",
      },
      dialog: false,
    };
  },
  computed: {
    forSelectList() {
      return this.$store.getters["department/forSelectList"];
    },
  },
  mounted() {
    this.fetchUserEditInfo();
  },
  methods: {
    async updateUser() {
      try {
        await this.$axios
          .patch(
            `api/admin/users/update/${this.updateUserForm.id}`,
            this.updateUserForm
          )
          .then((response) => {
            if (response.data.UpdateUserResult) {
              alert("ユーザー情報を更新しました");
              this.$router.push("/admin/users/");
            } else {
              alert("更新に失敗しました");
              this.$router.push(`/admin/users/edit/${this.updateUserForm.id}`);
            }
          });
        // console.log(response);
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
    async destroyUser() {
      try {
        await this.$axios
          .patch(`/api/admin/users/destroy/${this.$route.params["id"]}`)
          .then((response) => {
            if (response.data.DestroyUserResult) {
              alert("ユーザー情報を削除しました");
              this.dialog = false;
              this.$router.push("/admin/users/");
            } else {
              alert("削除に失敗しました");
              this.$router.push(`/admin/users/edit/${this.updateUserForm.id}`);
            }
          });
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
    async fetchUserEditInfo() {
      try {
        await this.$axios
          .get(`/api/admin/users/edit/${this.$route.params["id"]}`)
          .then((response) => {
            // console.log(response.data.user_profile);
            this.updateUserForm.id = response.data.user.id;
            this.updateUserForm.name = response.data.user.name;
            this.updateUserForm.email = response.data.user.email;
            this.updateUserForm.entry_date = response.data.user.entry_date;
            this.updateUserForm.beginner_flg = response.data.user.beginner_flg;
            this.updateUserForm.department_id =
              response.data.user.department_id;
            this.updateUserForm.gender = String(response.data.user.gender);
            this.updateUserForm.blood_type =
              response.data.user_profile.blood_type;
            this.updateUserForm.birthday =
              response.data.user_profile.birthday ?? "";
            this.updateUserForm.github_url =
              response.data.user_profile.github_url ?? "";
            this.updateUserForm.qiita_url =
              response.data.user_profile.qiita_url ?? "";
            this.updateUserForm.self_introduction =
              response.data.user_profile.self_introduction ?? "";

            this.followings = response.data.followings;
            this.followers = response.data.followers;
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
