<template>
  <div>
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">管理者登録ページ</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="searchUser()">
          <v-row>
            <v-col cols="8">
              <v-text-field v-model="searchForm.name" label="氏名" />
            </v-col>
          </v-row>
          <v-btn type="submit" class="me-4"> 検索 </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- ユーザー一覧 -->
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">ユーザー一覧</h2>
      </v-card-title>
      <v-card-text v-if="users !== null">
        <v-list-item v-for="user in users" :key="user.id">
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.entry_date }} <span>【{{ user.department.name }}】</span>
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon
                color="green lighten-1"
                @click="addAdminUsersRole(user.id)"
              >
                mdi-account-plus
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>

      <v-card-text v-else> 該当のユーザーは存在しません </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        name: "",
        status: "working",
      },
      users: [],
    };
  },
  computed: {},
  methods: {
    async searchUser() {
      try {
        const response = await this.axios
          .get("/api/admin/users", { params: this.searchForm })
          .then((response) => {
            this.setUserInfo(response.data[0].data);
            this.setPageInfo(response.data[0]);
          });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    setUserInfo(users) {
      this.users = users;
    },
    async addAdminUsersRole(id) {
      try {
        await this.axios
          .post(`/api/admin/users/roles/new/${id}`)
          .then((response) => {
            alert(response.data.addAdminUsersRoleResult);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
