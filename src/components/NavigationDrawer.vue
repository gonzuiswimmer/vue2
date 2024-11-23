<template>
  <div>
    <v-app-bar clipped-left fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon>
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-toolbar-title class="ml-2">
        <v-btn>{{ title }}</v-btn>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <!-- 管理者ユーザーのメニュー -->
      <v-list v-if="judgeAdmin">
        <v-list-item
          v-for="(item, i) in adminItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- 一般ユーザーのメニュー -->
      <v-list v-if="!judgeAdmin">
        <v-list-item
          v-for="(item, i) in userItems"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <!-- ログアウト -->
      <v-list v-if="$auth.loggedIn">
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              <v-btn role="button" @click="logout()"> Logout </v-btn>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      adminItems: [
        {
          icon: 'mdi-apps',
          title: 'Top',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'ユーザー検索',
          to: '/admin/users',
        },
        {
          icon: 'mdi-pencil',
          title: 'ユーザー登録',
          to: '/admin/users/create',
        },
        {
          icon: 'mdi-account-tie',
          title: '管理者一覧',
          to: '/admin/users/showRoles',
        },
        {
          icon: 'mdi-account-plus',
          title: '管理者登録',
          to: '/admin/users/registerAdminRole',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ブログ新規投稿',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'マイブログ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'お気に入りブログ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'QAトップ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '質問投稿',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'マイ質問',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'ユーザー検索',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: this.$auth.user ? this.$auth.user.name : '',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'プロフィール',
          to: '/inspire',
        },
        {
          icon: 'mdi-lock',
          title: 'パスワード変更',
          to: '/inspire',
        },
        {
          icon: 'mdi-chat-question',
          title: 'お問い合わせ',
          to: '/inspire',
        },
      ],
      userItems: [
        {
          icon: 'mdi-apps',
          title: 'Top',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '月報トップ',
          to: '/',
        },
        {
          icon: 'mdi-pencil',
          title: '月報編集',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'マイ月報',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ブログトップ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'ブログ新規投稿',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'マイブログ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'お気に入りブログ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'QAトップ',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: '質問投稿',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'マイ質問',
          to: '/',
        },
        {
          icon: 'mdi-magnify',
          title: 'ユーザー検索',
          to: '/',
        },
        {
          icon: 'mdi-account',
          title: this.$auth.user ? this.$auth.user.name : '',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'プロフィール',
          to: '/inspire',
        },
        {
          icon: 'mdi-lock',
          title: 'パスワード変更',
          to: '/inspire',
        },
        {
          icon: 'mdi-chat-question',
          title: 'お問い合わせ',
          to: '/inspire',
        },
      ],
      title: 'B-Dash',
    }
  },
  computed: {
    judgeAdmin() {
      return this.$store.getters['role/judgeAdmin']
    },
  },
  methods: {
    async logout() {
      try {
        const response = await this.$auth.logout()
        await this.resetUserRole()
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    },
    resetUserRole() {
      this.$store.commit('role/resetUserRole')
    },
  },
}
</script>

<style></style>
