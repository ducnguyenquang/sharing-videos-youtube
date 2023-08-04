import ShareMovieInputForm from "@/components/shareMovieInputForm/shareMovieInputForm";
import BaseService from "services/api/baseApi";
import { message } from "antd";
import { getCurrentUser } from "@/utils/storage";

export async function getServerSideProps({ req }) {
  const currentHost =
    `${req.headers["x-forwarded-proto"]}://${req.headers.host}/` || "";

  return {
    props: {
      currentHost,
    },
  };
}

export default function SharePage({ currentHost }) {
  const urlApi = `${currentHost}api/`;

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

  return <ShareMovieInputForm onSharedMovie={onSharedMovie} />;
}
