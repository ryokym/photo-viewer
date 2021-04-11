<template>
  <div class="wrapper">
    <div v-if="isloadedSuccess" class="container">
      <div :v-sticky="sticlyOptions" class="menu">
        <p @click="toTop" class="top">TOP</p>
        <template v-if="!currentViewDirectory">
          <div class="categories">
            <p
              v-for="(category, index) in photoCategories"
              :key="index"
              @click="setCurrentViewDirectory(category.dirname)"
            >
              {{ category.name }}
            </p>
          </div>
        </template>
        <template v-else>
          <p @click="toLibrary">back to index</p>
          <p>{{ getCategoryNameByCurrentDirectory }}</p>
        </template>
      </div>
      <photos
        v-if="currentViewDirectory"
        :s3-client="s3Client"
        :bucket="bucket"
        :pathlist="currentPathlist"
        @clear-current-view-directory="setCurrentViewDirectory"
      ></photos>
    </div>
    <div v-else>failed to load the resource.</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { S3 } from "aws-sdk";
import { photoCategories } from "@/photoCategories";
import Photos from "@/components/Photos.vue";
import {
  createObjectMapByS3ObjectList,
  getListObjects,
  getS3Client
} from "@/utils/s3Utils";
import { s3ObjectMap } from "@/types";

@Component({
  components: {
    Photos
  }
})
export default class Home extends Vue {
  currentViewDirectory = "";
  photoCategories = photoCategories;
  objectMap = new Map() as s3ObjectMap;
  s3Client = {} as S3;
  isloadedSuccess = true;
  sticlyOptions = {
    zIndex: 0,
    stickyTop: 0
  };

  get bucket(): string {
    return process.env.VUE_APP_S3_BUCKET_NAME;
  }

  get getCategoryNameByCurrentDirectory(): string {
    if (!this.currentViewDirectory) {
      return "";
    }
    const current = photoCategories.find(
      x => x.dirname === this.currentViewDirectory
    );
    if (!current) {
      return "";
    }
    return current.name;
  }

  get currentPathlist(): string[] {
    const category = photoCategories.find(
      p => p.dirname === this.currentViewDirectory
    );
    if (!category) {
      return [];
    }
    const pathlist = this.objectMap.get(category.dirname) || [];
    return pathlist.filter(l => !l.includes(".DS_Store"));
  }

  toTop() {
    this.$router.push("/");
  }

  toLibrary() {
    this.setCurrentViewDirectory("");
  }

  setCurrentViewDirectory(directory: string = "") {
    this.currentViewDirectory = directory;
  }

  async created() {
    this.s3Client = getS3Client();
    if (!(this.s3Client instanceof S3)) {
      return;
    }
    const objectList = await getListObjects(this.s3Client, this.bucket);
    if (!objectList) {
      this.isloadedSuccess = false;
      return;
    }
    this.objectMap = createObjectMapByS3ObjectList(objectList);
  }
}
</script>
<style scoped>
.wrapper {
  padding-bottom: 1.4rem;
  height: 100%;
}
.menu {
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: white;
  height: 135px;
}
.categories {
  display: inline-block;
  margin-bottom: 1.4rem;
}
p {
  line-height: 1.4rem;
}
.top {
  padding-top: 1rem;
}
</style>
