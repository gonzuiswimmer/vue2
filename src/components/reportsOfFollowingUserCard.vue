<template>
  <v-col cols="12">
    <v-card>
      <v-subheader>{{ reportsOfFollowingUser.contentTitle }}</v-subheader>
      <v-list two-line>
        <template v-for="(content, index) in reportsOfFollowingUser.data">
          <v-list-item :key="index">
            <v-list-item-avatar color="grey darken-1" />

            <v-list-item-content>
              <v-list-item-title>
                {{ content.user.name
                }}<span
                  >【所属:{{ getDepartmentName(content.user.department_id) }}/{{
                    content.user.entry_date
                  }}入社】</span
                >
              </v-list-item-title>

              <v-list-item-subtitle>
                {{ content.business_content }}
              </v-list-item-subtitle>
              <div class="d-flex flex-row justify-end">
                <template v-for="(tag, tagIndex) in content.tags">
                  <v-chip
                    x-small
                    class="ma-2"
                    color="green"
                    text-color="white"
                    :key="tagIndex"
                  >
                    {{ tag.name }}
                  </v-chip>
                </template>
                <v-icon x-small> mdi-message </v-icon
                ><span class="ma-2" style="font-size: x-small">{{
                  content.comments_count
                }}</span>
                <v-icon x-small> mdi-thumb-up-outline </v-icon
                ><span class="ma-2" style="font-size: x-small">{{
                  content.likes_count
                }}</span>
              </div>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="index !== 3" :key="`divider-${index}`" inset />
        </template>
      </v-list>
    </v-card>
    <div class="d-flex flex-row justify-end mt-2">
      <v-btn text color="primary" to="index">
        {{ reportsOfFollowingUser.contentTitle }}一覧はこちら
      </v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    reportsOfFollowingUser: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getDepartmentName(id) {
      if (id === 1) {
        return "WEB";
      } else if (id === 2) {
        return "CL";
      } else if (id === 3) {
        return "ML";
      } else if (id === 4) {
        return "内勤";
      } else if (id === 5) {
        return "未設定";
      } else if (id === 6) {
        return "FR";
      } else if (id === 7) {
        return "QA";
      } else if (id === 8) {
        return "PHP";
      }
    },
  },
};
</script>

<style></style>
