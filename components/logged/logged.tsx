
import { clear, getCurrentUser } from "@/utils/storage";
import { useRouter } from "next/dist/client/router";
import { useCallback, useMemo } from "react";

const Logged = () => {
  const router = useRouter()
  const currentUser = useMemo(() => getCurrentUser() as string, []);

  const onShareAMovie = () => {
    router.push('/share');
  }

  const onLogout = useCallback(() => {
    clear();
    router.push('/');
  }, [])

  return <div>
    <div>Welcome {currentUser}</div>
    <button type="button" onClick={onShareAMovie} >
      Share a movie
    </button>
    <button type="button" onClick={onLogout}>
      Logout
    </button>
  </div>
}

export default Logged;
