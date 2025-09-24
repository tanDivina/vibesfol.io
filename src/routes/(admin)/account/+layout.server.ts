import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = ({
  locals: { session },
  cookies,
}) => {
  // Session here is from authGuard hook

  return {
    session,
    cookies: cookies.getAll(),
  }
}
