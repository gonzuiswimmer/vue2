<template>
  <div>
    <v-card width="400px" class="mx-auto mt-5">
      <v-card-title>
        <h1 class="display-1">ログイン</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="login()">
          <v-text-field
            v-model="form.email"
            prepend-icon="mdi-account-circle"
            label="ユーザー名"
            type="email"
          />
          <v-text-field
            v-model="form.password"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          />
          <v-card-actions>
            <v-btn type="submit" class="info"> ログイン </v-btn>
            <v-btn class="ml-auto" text color="primary" to="forgotPassword">
              パスワードをお忘れの方はこちら
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      showPassword: false,
      form: {
        email: '',
        password: '',
      },
    }
  },
  mounted() {
    // csrf対策
    // nginxでRPする場合は/sanctumがapi側を見に行くようにしてください
    this.$axios.get('/sanctum/csrf-cookie')
  },
  methods: {
    async login() {
      try {
        const response = await this.$auth.loginWith('laravelSanctum', {
          data: this.form,
        })
        await this.setUserRole(response.data['role'])
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    setUserRole(role) {
      this.$store.commit('role/setUserRole', role)
    },
  },
}
</script>
