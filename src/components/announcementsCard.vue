<template>
  <v-col cols="12">
    <v-card>
      <v-subheader>{{ announcements.contentTitle }}</v-subheader>
      <v-list two-line>
        <template v-for="(content, index) in announcements.data">
          <v-list-item  :key="index">
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ content.published_date }}
              </v-list-item-subtitle>
              <v-list-item-title>{{ content.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-divider v-if="index !== 3" :key="`divider-${index}`" inset />
        </template>
      </v-list>
    </v-card>
    <div class="d-flex flex-row justify-end mt-2">
      <v-btn text color="primary" to="index">
        {{ announcements.contentTitle }}一覧はこちら
      </v-btn>
    </div>
  </v-col>
</template>

<script>
export default {
  props: {
    announcements: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style></style>
