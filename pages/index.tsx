import LoginComponent from "@/components/login/login";
import ShareMovieItem from "@/components/shareMovieItem/shareMovieItem";
import { message } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import BaseService from "services/api/baseApi";
import { Context as AppContext } from "@/context/appContext";
import { getStringToObject } from "@/utils/string";

export async function getServerSideProps({ req }) {
  const currentHost =
    `${req.headers["x-forwarded-proto"]}://${req.headers.host}/` || "";

  return {
    props: {
      currentHost,
    },
  };
}

function Index({ currentHost }) {
  const urlApi = `${currentHost}api/`;
  const [isLogged, setIsLogged] = useState(false);

  const [videos, setVideos] = useState([]);
  
  const getSharedVideos = async () => {
    const url = `${urlApi}videos`;
    const api = new BaseService(url);
    const { data: result } = await api.get("");
    setVideos(result);
  };

  useEffect(() => {
    getSharedVideos();
  }, []);

  console.log("==== videos", videos);

  const getContextData = useCallback(() => {
    return {
      baseUrl: urlApi,
      isLogged: isLogged,
    };
  }, [isLogged]);


  const onLogged = useCallback(() => {
    setIsLogged(true);
  }, [])

  return (<AppContext.Provider value={getContextData()}>
    <LoginComponent onLogged={onLogged} />
    {/* TODO */}
    {/* {videos &&
      videos.map((item) => {
        <ShareMovieItem item={item} />;
      })} */}
  </AppContext.Provider>);
}

export default Index;
