import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SvgUpload } from "../svg/SvgUpload";
import { useState } from "react";
import styles from "../createBook.module.scss";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

type Props = {
  single?: boolean;
};

export function AddFile({ single }: Props) {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [imageUrl, setImageUrl] = useState<string>();

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChangeSingle: UploadProps["onChange"] = async (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      try {
        const url = await getBase64(info.file.originFileObj as FileType);
        setImageUrl(url);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeMultiple: UploadProps["onChange"] = ({
    fileList: newFileList,
  }) => setFileList(newFileList);

  return (
    <>
      {single ? (
        <Upload
          name="cover"
          listType="picture-card"
          className={styles.coverUpload}
          showUploadList={false}
          onChange={handleChangeSingle}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="cover" className={styles.uploadCoverImg} />
          ) : (
            <button type="button" className={styles.uploadBtn}>
              {loading ? <LoadingOutlined /> : <SvgUpload />}
            </button>
          )}
        </Upload>
      ) : (
        <>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChangeMultiple}
          >
            <button className={styles.uploadBtn} type="button">
              <SvgUpload />
            </button>
          </Upload>
          {previewImage && (
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </>
      )}
    </>
  );
}
