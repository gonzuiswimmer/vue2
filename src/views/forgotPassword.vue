<template>
  <div>
    <v-card width="700px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">パスワードをお忘れですか？</h1>
        <p>
          メールアドレスを入力してください。新しいパスワードを選択できるパスワードリセットリンクをメールアドレスでお送りします。
        </p>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="resendVerifyEmail()">
          <v-text-field
            v-model="form.email"
            prepend-icon="mdi-email-outline"
            type="email"
            label="メールアドレス"
          />
          <v-card-actions>
            <v-btn type="submit" class="info">
              パスワードリセットリンクをメールで送信
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      form: {
        email: "",
      },
    };
  },
  mounted() {
    // csrf対策
    // nginxでRPする場合は/sanctumがapi側を見に行くようにしてください
    this.axios.get("/sanctum/csrf-cookie");
  },
  methods: {
    async resendVerifyEmail() {
      try {
        await this.axios
          .post("/forgot-password", this.form)
          .then((response) => {
            if (response.data[0] == "passwords.sent") {
              alert(
                "パスワードリセットメールを送信しました。メールを確認してパスワードリセットリンクをクリックしてください"
              );
            } else {
              alert(response.data.email);
            }
          });
      } catch (error) {
        alert(error.response.data.message);
      }
    },
    showMessage(message) {
      alert(message);
    },
  },
};
</script>
