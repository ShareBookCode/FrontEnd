import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import {
  EMPTY_REGISTRATION_DRAFT,
  normalizeRegistrationDraft,
  RegistrationDraftPatch,
} from '@/entities/registration'
import { redis } from '@/shared/lib/redis'

const COOKIE_NAME = 'registration_draft_id'
const TTL_SECONDS = 60 * 20

const getRedisKey = (draftId: string) => `registration:${draftId}`

export const getOrCreateDraftId = async () => {
  const cookieStore = await cookies()
  let draftId = cookieStore.get(COOKIE_NAME)?.value

  if (!draftId) {
    draftId = crypto.randomUUID()

    cookieStore.set(COOKIE_NAME, draftId, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: TTL_SECONDS,
    })
  }

  return draftId
}

export const GET = async () => {
  const cookieStore = await cookies()
  const draftId = cookieStore.get(COOKIE_NAME)?.value

  if (!draftId) return NextResponse.json(EMPTY_REGISTRATION_DRAFT)

  const redisKey = getRedisKey(draftId)
  const draft = await redis.get<RegistrationDraftPatch>(redisKey)
  const normalizeDraft = normalizeRegistrationDraft(draft)

  return NextResponse.json(normalizeDraft)
}

export const PATCH = async (req: Request) => {
  const draftId = await getOrCreateDraftId()
  const redisKey = getRedisKey(draftId)

  const body = (await req.json()) as Partial<RegistrationDraftPatch>
  const currentDraft = await redis.get<RegistrationDraftPatch>(redisKey)

  const nextDraft = normalizeRegistrationDraft({
    ...currentDraft,
    ...body,
  })

  await redis.set(redisKey, nextDraft)
  await redis.expire(redisKey, TTL_SECONDS)

  return NextResponse.json(nextDraft)
}

export const DELETE = async () => {
  const cookieStore = await cookies()
  const draftId = cookieStore.get(COOKIE_NAME)?.value

  if (draftId) {
    const redisKey = getRedisKey(draftId)
    await redis.del(redisKey)
  }

  cookieStore.delete(COOKIE_NAME)
  return NextResponse.json({ ok: true })
}
