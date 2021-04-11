<template>
  <div class="photos">
    <img
      v-if="!blobURLs.length"
      class="loading"
      src="@/assets/icon-loading.gif"
    />
    <div v-for="(blobURL, index) in blobURLs" :key="index">
      <img :src="blobURL" />
    </div>
    <div v-if="blobURLs.length" @click="toBack" class="back">← Back</div>
  </div>
</template>

<script lang="ts">
import { S3 } from "aws-sdk";
import { replaceBlobURLsFromS3JpgObjectPathList } from "@/utils/s3Utils";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Photos extends Vue {
  @Prop({ type: Object, required: true }) s3Client!: S3;
  @Prop({ type: String, required: true }) bucket!: string;
  @Prop({ type: Array, required: true, default: () => [] }) pathlist!: string[];

  blobURLs: string[] = [];

  async created() {
    this.blobURLs = await replaceBlobURLsFromS3JpgObjectPathList(
      this.s3Client,
      this.bucket,
      this.pathlist
    );
  }
  toBack() {
    this.$emit("clear-current-view-directory");
  }
}
</script>
<style lang="scss" scoped>
p {
  font-weight: bold;
}
img {
  max-height: 80vh;
  max-width: 100%;
}
.loading {
  width: 30vw;
}
@media screen and (orientation: landscape) {
  img {
    max-height: 150vh;
    max-width: 90vw;
  }
  .photos {
    z-index: 1001;
    bottom: 135px;
    position: relative;
  }
  .back {
    display: block;
    font-size: 1.4rem;
    font-weight: bold;
    padding-top: 100px;
    color: #295191;
  }
}
</style>
