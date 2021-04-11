export type dirnameTypes =
  | "表示する"
  | "画像の"
  | "フォルダ名と"
  | "オブジェクト名の"
  | "マッピング";

type photoCategories = {
  name: string;
  dirname: dirnameTypes;
};
export const photoCategories: photoCategories[] = [
  {
    name: "object1",
    dirname: "表示する"
  },
  {
    name: "object2",
    dirname: "画像の"
  },
  {
    name: "object3",
    dirname: "フォルダ名と"
  },
  {
    name: "object4",
    dirname: "オブジェクト名の"
  },
  {
    name: "object5",
    dirname: "マッピング"
  }
];
