<template>
  <div>
    <!-- お知らせ一覧 -->
    <v-card width="800px" class="mx-auto mt-5">
      <v-card-title>
        <h2 class="display-8">お知らせ一覧</h2>
      </v-card-title>
      <v-card-text v-if="inquiries !== null">
        <v-list three-line>
          <template v-for="(inquiry, index) in inquiries">
            <v-list-item :key="index">
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ inquiry.user.name }} /
                  {{
                    $dateFns.format(new Date(inquiry.created_at), "yyyy.MM.dd")
                  }}
                </v-list-item-subtitle>
                <v-list-item-title>{{ inquiry.body }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>

        <!-- ページネーション -->
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="lastPage"
            @input="getInquiriesPerPage"
          />
        </div>
      </v-card-text>

      <v-card-text v-else> 該当のお知らせは存在しません </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inquiries: [],
      page: null, // ページ
      lastPage: null, // 最終ページ
    };
  },
  created() {
    this.fetchInquiries();
  },
  methods: {
    setInquiryInfo(inquiries) {
      this.inquiries = inquiries;
    },
    setPageInfo(params) {
      this.lastPage = params.last_page;
      this.page = params.current_page;
    },
    async getInquiriesPerPage(page) {
      try {
        await this.$axios
          .get("/api/admin/inquiry/showAll", {
            params: { page: parseInt(page) },
          }) // /api/admin/inquiry/showAll?page=[page]になる
          .then((response) => {
            this.setInquiryInfo(response.data.inquiries.data);
            this.setPageInfo(response.data.inquiries);
          });
      } catch (error) {
        console.log(error);
      }
    },
    async fetchInquiries() {
      await this.$axios.get("/api/admin/inquiry/showAll").then((response) => {
        this.setInquiryInfo(response.data.inquiries.data);
        this.setPageInfo(response.data.inquiries);
      });
    },
  },
};
</script>

<style></style>
