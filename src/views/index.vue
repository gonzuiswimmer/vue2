<template>
  <v-container class="py-8 px-6" fluid>
    <v-row>
      <announcementsCard :announcements="announcements" />
      <RecentReportsCard :recent-reports="recentReports" />
      <ReportsOfFollowingUserCard
        :reports-of-following-user="reportsOfFollowingUser"
      />
    </v-row>
  </v-container>
</template>

<script>
import announcementsCard from "../components/announcementsCard.vue";
import RecentReportsCard from "../components/recentReportsCard.vue";
import ReportsOfFollowingUserCard from "../components/reportsOfFollowingUserCard.vue";
export default {
  name: "IndexPage",
  components: {
    announcementsCard,
    RecentReportsCard,
    ReportsOfFollowingUserCard,
  },
  data: () => ({
    announcements: {
      contentTitle: "お知らせ",
      data: [],
    },
    recentReports: {
      contentTitle: "最近投稿された月報",
      data: [],
    },
    reportsOfFollowingUser: {
      contentTitle: "フォローしているユーザーの月報",
      data: [],
    },
  }),
  created() {
    this.fetchTopInfo();
  },
  methods: {
    async fetchTopInfo() {
      const res = await this.axios.get("/api/top");
      // console.log(res.data);
      this.announcements.data = res.data[0];
      this.recentReports.data = res.data[1];
      this.reportsOfFollowingUser.data = res.data[2];
    },
  },
};
</script>
