<template>
  <div>
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">管理者一覧</h2>
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
                color="red lighten-1"
                @click="deleteAdminUsersRole(user.id)"
              >
                mdi-close-circle
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
      users: [],
    };
  },
  created() {
    this.fetchAdminUsers();
  },
  methods: {
    async deleteAdminUsersRole(id) {
      try {
        await this.axios
          .delete(`/api/admin/users/roles/delete/${id}`)
          .then((response) => {
            if (response.data.destroyAdminUserRoleResult) {
              this.fetchAdminUsers();
              alert("管理者からユーザーを削除しました");
            } else {
              alert("処理に失敗しました");
            }
          });
      } catch (error) {
        console.log(error);
        alert(error.response.data.message);
      }
    },
    async fetchAdminUsers() {
      try {
        await this.axios.get("/api/admin/users/roles").then((response) => {
          this.users = response.data.users;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
