import LoginComponent from "@/components/login/login";
import ShareMovieItem from "@/components/shareMovieItem/shareMovieItem";
// import ShareMovie from "@/components/shareMovie/shareMovie";
import { setAccessToken, setCurrentUser } from "@/utils/storage";
import { useEffect, useState } from "react";
import BaseService from "services/api/baseApi";

export async function getServerSideProps({ req }) {
  const currentHost =
    `${req.headers["x-forwarded-proto"]}://${req.headers.host}/` || "";

  return {
    props: {
      currentHost,
    },
  };
}

export default function Index({ currentHost }) {
  const urlApi = `${currentHost}api/`;
  const [ videos, setVideos ] = useState([])
  
  const onLogin = async (data) => {
    const url = `${urlApi}users/login`;
    const api = new BaseService(url);
    const { data: result } = await api.post(JSON.stringify(data));
    setAccessToken(result.token);
    setCurrentUser(data.email);
  };

  const getSharedVideos = async () => {
    const url = `${urlApi}videos`;
    const api = new BaseService(url);
    const { data: result } = await api.get('');
    setVideos(result);
  }

  useEffect(() => {
    getSharedVideos();
  }, [])

  console.log('==== videos', videos);
  

  return <>
    <LoginComponent onLogin={onLogin} />
    {videos && videos.map(item => {
      <ShareMovieItem item={item} />
    })

    }
  </>
}
