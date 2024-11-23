<template>
  <div>
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">ユーザー検索・一覧</h2>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="searchUser()">
          <v-row>
            <v-col cols="8">
              <v-radio-group v-model="searchForm.status">
                <v-radio label="在籍" value="working" />
                <v-radio label="退職済み" value="retired" />
              </v-radio-group>
            </v-col>

            <v-col cols="8">
              <v-text-field v-model="searchForm.name" label="氏名" />
            </v-col>

            <v-col cols="8">
              <div>
                入社日
                <date-picker
                  v-model="searchForm.hireMonth"
                  type="month"
                  lang="ja"
                  format="YYYY-MM"
                />
              </div>
            </v-col>

            <v-col cols="8">
              <v-select
                v-model="searchForm.department"
                :items="forSelectList"
                item-text="name"
                item-value="id"
                label="所属"
              />
            </v-col>
          </v-row>
          <v-btn type="submit" class="me-4"> 検索 </v-btn>
          <v-btn @click="clear"> リセット </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <!-- ユーザー一覧 -->
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">管理者トップ・ユーザー一覧/検索</h2>
      </v-card-title>
      <v-card-text v-if="users !== null">
        <v-list-item
          v-for="user in users"
          :key="user.id"
          :to="{ name: 'admin-users-edit-id', params: { id: user.id } }"
        >
          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ user.entry_date }} <span>【{{ user.department.name }}】</span>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <!-- ページネーション -->
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="lastPage"
            @input="getUsersPerPage"
          />
        </div>
      </v-card-text>

      <v-card-text v-else> 該当のユーザーは存在しません </v-card-text>
    </v-card>
  </div>
</template>

<script>
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

export default {
  name: "AdminIndex",
  components: { DatePicker },
  data() {
    return {
      searchForm: {
        name: "",
        hireMonth: null,
        department: null,
        status: "",
      },
      users: [],
      page: null, // ページ
      lastPage: null, // 最終ページ
    };
  },
  computed: {
    forSelectList() {
      return this.$store.getters["department/forSelectList"];
    },
  },
  methods: {
    clear() {
      this.searchForm.name = "";
      this.searchForm.hireMonth = null;
      this.searchForm.department = null;
      this.searchForm.status = "";
    },
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
    setPageInfo(params) {
      this.lastPage = params.last_page;
      this.page = params.current_page;
    },
    async getUsersPerPage(page) {
      try {
        await this.axios
          .get("/api/admin/users", { params: { page: parseInt(page) } }) // /api/admin/users?page=[page]になる
          .then((response) => {
            console.log(response);
            this.setUserInfo(response.data[0].data);
            this.setPageInfo(response.data[0]);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
