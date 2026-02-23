import { onest } from '@shared/fonts'
import { BackButton } from '@shared/ui/back-button'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { ProfileBlock } from '@shared/ui/profile-block'
import { SectionTitle } from '@shared/ui/section-title'
import { LanguageSelect } from '@widgets/language-select'
import styles from './page.module.scss'

export default function AccountPage() {
  return (
    <div className={`${styles.pageContent} ${onest.className}`}>
      <BackButton href="/profile" ariaLabel="Назад в профиль">
        Назад в профиль
      </BackButton>
      <SectionTitle>Аккаунт</SectionTitle>

      <div className={styles.sectionList}>
        <section className={styles.sectionRow} aria-labelledby="account-email-label">
          <ProfileBlock
            id="account-email-label"
            label="Почта"
            description="Почта, к которой привязан аккаунт"
          />
          <div className={styles.sectionControl}>
            <Input
              type="email"
              placeholder="sharebook.inc@gmail.com"
              aria-label="Почта"
            />
          </div>
        </section>

        <section className={styles.sectionRow} aria-labelledby="account-password-label">
          <ProfileBlock
            id="account-password-label"
            label="Пароль"
            description="Смените пароль для входа в аккаунт"
          />
          <div className={styles.sectionControl}>
            <Button variant="secondary">Изменить пароль</Button>
          </div>
        </section>

        <section className={styles.sectionRow} aria-labelledby="account-city-label">
          <ProfileBlock
            id="account-city-label"
            label="Город проживания"
            description="Нужен для подбора книг в вашем городе"
          />
          <div className={styles.sectionControl}>
            <Input
              type="text"
              variant="medium"
              placeholder="Санкт-Петербург"
              aria-label="Город проживания"
            />
          </div>
        </section>

        <section className={styles.sectionRow} aria-labelledby="account-language-label">
          <ProfileBlock
            id="account-language-label"
            label="Язык"
            description="Выберите язык интерфейса"
          />
          <div className={styles.sectionControl}>
            <LanguageSelect />
          </div>
        </section>

        <section className={styles.sectionRow} aria-labelledby="account-delete-label">
          <ProfileBlock
            id="account-delete-label"
            label="Удалить аккаунт"
            description="Удалив аккаунт, вы удалите все объявления и чаты, существующие на этом аккаунте. Восстановить аккаунт будет нельзя."
          />
          <div className={styles.sectionControl}>
            <Button variant="danger">Удалить аккаунт</Button>
          </div>
        </section>
      </div>

      <div className={styles.saveWrap}>
        <Button variant="primary">Сохранить</Button>
      </div>
    </div>
  )
}
