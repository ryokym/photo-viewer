import { dirnameTypes } from "@/photoCategories";
import { s3ObjectMap } from "@/types";
import aws, { S3 } from "aws-sdk";
import { GetObjectRequest, ListObjectsRequest } from "aws-sdk/clients/s3";
import { getBlobURLByUnit8Array } from "./getBlobURLByUnit8Array";

export const getS3Client: () => S3 = () => {
  return new aws.S3({
    accessKeyId: process.env.VUE_APP_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.VUE_APP_S3_SECRET_ACCESS_KEY,
    region: process.env.VUE_APP_S3_REGION
  });
};

// NOTE: バケットの全て(ネストされたパスも含め)のオブジェクトを返す。
export const getListObjects: (
  s3Client: S3,
  bucket: string
) => Promise<S3.ObjectList | undefined> = async (s3Client, bucket) => {
  const params: ListObjectsRequest = {
    Bucket: bucket
  };
  const promise = s3Client.listObjects(params).promise();
  const objects = await promise
    .then(result => {
      if (result.Contents) {
        return result.Contents;
      }
      Promise.reject();
    })
    .catch(e => {
      console.error(e);
      return undefined;
    });
  return objects;
};

// NOTE: getListObjectsで取得したobject配列要素のパス文字列から ディレクトリ名 => パス[] のmapを生成して返す
// NOTE: return param: eg. Map(2) {"dir1" => Array(7), "dir2" => Array(5)}
export const createObjectMapByS3ObjectList: (
  objectList: S3.ObjectList
) => s3ObjectMap = objectList => {
  const objectMap = objectList.reduce(
    (objectMap: s3ObjectMap, object: aws.S3.Object) => {
      const path = object.Key;
      if (!path) {
        return objectMap;
      }
      const dirname = path.split("/")[0] as dirnameTypes;
      const existed = objectMap.get(dirname);
      if (existed) {
        existed.push(path);
        return objectMap;
      }
      objectMap.set(dirname, [path]);
      return objectMap;
    },
    new Map() as s3ObjectMap
  );
  return objectMap;
};

// NOTE: S3に格納されたjpg画像のオブジェクトパスのリストをブラウザ表示用途のBlobURLリストに変換して返す
export const replaceBlobURLsFromS3JpgObjectPathList: (
  s3Client: S3,
  bucket: string,
  pathList: string[]
) => Promise<string[]> = async (s3Client, bucket, pathList) => {
  const replaced = [];
  for (const path of pathList) {
    const blobURL = await getBlobURLByS3JpgObjectPath(s3Client, bucket, path);
    if (!blobURL) {
      continue;
    }
    replaced.push(blobURL);
  }
  return replaced;
};

// NOTE: S3に格納されたjpg画像のオブジェクトパスからブラウザ表示用途のBlobURLを取得する
// NOTE: パスからオブジェクトが見つからない場合はundefinedを返す
export const getBlobURLByS3JpgObjectPath: (
  s3Client: S3,
  bucket: string,
  path: string
) => Promise<string | undefined> = async (s3Client, bucket, path) => {
  const params: GetObjectRequest = {
    Bucket: bucket,
    Key: path
  };
  const promise = await s3Client.getObject(params).promise();
  const data = promise.$response.data;
  if (!data) {
    return;
  }
  return getBlobURLByUnit8Array(data.Body);
};

// NOTE: S3に格納されたjpg画像のオブジェクトパスからブラウザ表示用途の全てのBlobURLを取得する
export const generateBlobURLsFromS3ObjectMap: (
  s3Client: S3,
  bucket: string,
  objectMap: s3ObjectMap
) => Promise<s3ObjectMap> = async (s3Client, bucket, objectMap) => {
  for (const [dirname, s3objectPathlist] of Array.from(objectMap.entries())) {
    console.log(`directory ${dirname} is complete.`);
    const blobURLs = await replaceBlobURLsFromS3JpgObjectPathList(
      s3Client,
      bucket,
      s3objectPathlist
    );
    blobURLs;
    objectMap.set(dirname, blobURLs);
  }
  console.log("generate all blobURL complete!", objectMap);
  return objectMap;
};
