"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import BaseService from "services/api/baseApi";
import { Context as AppContext } from "@/context/appContext";
import { getAccessToken } from "@/utils/storage";
import SharedMovieItems from "@/components/SharedMovieItems/SharedMovieItems";
import Layout from "@/components/Layout/Layout";
import { AuthProvider } from '@/context/authContext';

function Index() {
  const accessToken = useMemo(() => getAccessToken() || '', []);
  const [currentHost, setCurrentHost] = useState("");
  const urlApi = `${currentHost}api/`;
  const [isLogged, setIsLogged] = useState(accessToken ? true : false);
  const [videos, setVideos] = useState([]);

  const getSharedVideos = async () => {
    const url = `${urlApi}videos`;
    const api = new BaseService(url);
    const { data: result } = await api.get("");
    setVideos(result);
  };

  useEffect(() => {
    if (!currentHost) {
      const { protocol, host } = window.location;
      setCurrentHost(`${protocol}//${host}`);
    }
  }, [currentHost]);

  useEffect(() => {
    if (videos.length === 0) {
      getSharedVideos();
    }
  }, [videos]);

  useEffect(() => {
    setIsLogged(accessToken ? true : false)
  }, [accessToken])

  const getContextData = useCallback(() => {
    return {
      baseUrl: urlApi,
      isLogged: isLogged,
    };
  }, [isLogged]);


  return (
    <AuthProvider>
      <AppContext.Provider value={getContextData()}>
        <Layout>
          <SharedMovieItems videos={videos} />
        </Layout>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default Index;
