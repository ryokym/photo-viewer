// NOTE: blob url schema の文字列を生成する。
export const getBlobURLByUnit8Array: (
  typedArray: Uint8Array
) => string = typedArray => {
  const blobURL = URL.createObjectURL(
    new Blob([typedArray], { type: "image/jpg" })
  );
  return blobURL;
};
