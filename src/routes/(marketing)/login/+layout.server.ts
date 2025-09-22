import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = ({
  locals: { session },
  cookies,
  url,
}) => {
  return {
    url: url.origin,
    cookies: cookies.getAll(),
    session,
  }
}
