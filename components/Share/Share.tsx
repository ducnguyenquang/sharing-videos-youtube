"use client"
import React, { useEffect, useState } from "react";
import SharedMovieInputForm from "@/components/SharedMovieInputForm/SharedMovieInputForm";
import BaseService from "services/api/baseApi";
import { message } from "antd";
import { getCurrentUser } from "@/utils/storage";
import Layout from "@/components/Layout/Layout";
import { AuthProvider } from "@/context/authContext";

export default function Share() {
  const [currentHost, setCurrentHost] = useState("");
  const urlApi = `${currentHost}api/`;

  useEffect(() => {
    if (!currentHost) {
      const { protocol, host } = window.location;
      setCurrentHost(`${protocol}//${host}`);
    }
  }, [currentHost]);

  const onSharedMovie = async (videoUrl) => {
    const url = `${urlApi}videos/add`;
    const videoInformation = await getInformationMovie(videoUrl);
    const api = new BaseService(url);
    const { data: result } = await api.post({
      ...videoInformation,
      shared_by: getCurrentUser(),
    });
    if (result) {
      message.success("Shared video successful");
    }
  };

  const getInformationMovie = async (videoUrl) => {
    const url = `${urlApi}videos/`;
    const getYouTubeVideoInfoUrl = `${url}getYouTubeVideoInfo?id=${videoUrl}`;
    const api = new BaseService(getYouTubeVideoInfoUrl);
    const { data: result } = await api.get("");
    return result;
  };

  return (
    <AuthProvider>
      <Layout>
        <SharedMovieInputForm onSharedMovie={onSharedMovie} />
      </Layout>
    </AuthProvider>
  );
}
