import styles from "./AboutMySelf.module.scss";
import {Button, Input} from "antd";


export const AboutMySelf = () => {
  return (
    <>
      <div className={styles.blockAvatar}>
        <img
          src="https://s3-alpha-sig.figma.com/img/51fb/3b5b/0c423f431e973462f167a024bb6c3624?Expires=1740355200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=n13ooca0X0BnGvUK837M-1OjQ040scQ4DaFQL67NIhsiug1fHgvUxHbHvXgyBKi8jF2MX~EdWj602TGm2ZXOaYulnYV3VtJiXZF0binVakLJbEIlUzhTRc2QdcVobohvTXi5S-4BNBMYRlpMiaeYIgnJKplk5fNX0XfyZC~e61ivaYcLlUitFYOu1zjiPDkeym6vgqKSXAZr5akXSZBvET7J3byEQeRishMZidia9OP2tz-PoF3IXodwzd4wqnj7eZQrDL4L5jjKGTzBlRnjXoZcqnhNUFp6U6elyziPfB01Dhds5dGFNctW7rPIYzD2t5JKozaUXZ2U8NPbJ7T7ow__"
          alt="avatar" className={styles.avatar}/>
        <div>
          <Button danger type="link">Удалить фото</Button>
          <Button type="link">Изменить фото</Button>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.formBlock}>
          <div>
            <span className={styles.titleOfInput}>Имя и имя пользователя</span>
            <div className={styles.blockOfNameAndLoginInput}>
              <Input type="text" placeholder="Имя"/>
              <Input type="text" placeholder="@Юзернейм"/>
            </div>
          </div>
          <div>
            <span className={styles.titleOfInput}>Расскажите о себе</span>
            <Input.TextArea rows={4} autoSize={{minRows: 5, maxRows: 5}}/>
          </div>
          <div className={styles.blockOfButton}>
            <Button type="primary">Сохранить</Button>
          </div>
        </div>
      </form>
    </>
  )
}