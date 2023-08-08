"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import LoginComponent from "@/components/Login/Login";
import BaseService from "services/api/baseApi";
import { Context as AppContext } from "@/context/appContext";
import { useRouter } from "next/dist/client/router";
import { getAccessToken } from "@/utils/storage";
import SharedMovieItems from "@/components/SharedMovieItems/SharedMovieItems";
import Layout from "@/components/Layout/Layout";
import { AuthProvider } from '@/context/authContext';

function Home() {
  const accessToken = useMemo(() => getAccessToken() || '', []);
  const [currentHost, setCurrentHost] = useState("");
  const urlApi = `${currentHost}api/`;
  const [isLogged, setIsLogged] = useState(accessToken ? true : false);
  const [videos, setVideos] = useState([]);

  const getSharedVideos = async () => {
    const url = `${urlApi}videos`;
    const api = new BaseService(url);
    const { data: result } = await api.get("");
    console.log("==== result", result);

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
      setVideos(dummyData);
    }
  }, [videos]);

  const getContextData = useCallback(() => {
    return {
      baseUrl: urlApi,
      isLogged: isLogged,
    };
  }, [isLogged]);

  const onLogged = useCallback(() => {
    setIsLogged(true);
  }, []);

  const onLogout = useCallback(() => {
    setIsLogged(false);
  }, []);

  const dummyData = [
    {
      description:
        "React Simplified Course: https://reactsimplified.com/?utm_source=youtube&utm_medium=video-description&utm_campaign=video-id-a7YYJVGBy6A\n" +
        "React Roadmap: https://reactsimplified.com/beginner-table-of-contents/?utm_source=youtube&utm_medium=video-description&utm_content=table-of-contents&utm_campaign=video-id-a7YYJVGBy6A\n" +
        "\n" +
        "Learning React is incredibly difficult. It is made even harder by the fact that React is constantly changing and the documentation is quite complex to follow. In this video I will show you exactly how I would learn React to land a job.\n" +
        "\n" +
        "\n" +
        "📚 Materials/References:\n" +
        "\n" +
        "React Simplified Course: https://reactsimplified.com/?utm_source=youtube&utm_medium=video-description&utm_campaign=video-id-a7YYJVGBy6A\n" +
        "JavaScript Roadmap Video: https://youtu.be/7L2RLBmEJmE\n" +
        "JavaScript Roadmap Site: https://javascriptsimplified.com/beginner-table-of-contents\n" +
        "\n" +
        "\n" +
        "🌎 Find Me Here:\n" +
        "\n" +
        "My Blog: https://blog.webdevsimplified.com\n" +
        "My Courses: https://courses.webdevsimplified.com\n" +
        "Patreon: https://www.patreon.com/WebDevSimplified\n" +
        "Twitter: https://twitter.com/DevSimplified\n" +
        "Discord: https://discord.gg/7StTjnR\n" +
        "GitHub: https://github.com/WebDevSimplified\n" +
        "CodePen: https://codepen.io/WebDevSimplified\n" +
        "\n" +
        "\n" +
        "⏱️ Timestamps:\n" +
        "\n" +
        "00:00 - Introduction\n" +
        "00:40 - Prerequisites\n" +
        "01:44 - Basics\n" +
        "09:13 - Advanced\n" +
        "\n" +
        "\n" +
        "#ReactJS #WDS #ReactJSRoadmap",
      shared_by: "duc.nguyenquang@zoi.tech",
      id: "a7YYJVGBy6A",
      title: "How I Would Learn React From Scratch In 2023",
    },
    {
      description:
        "In this video, I conduct a mock Google coding interview with a normal software engineer, Keerti Purswani, who's a software developer based in India. As a Google Software Engineer, I interviewed dozens of candidates. This is exactly the type of coding interview that you would get at Google or any other big tech company.\n" +
        "\n" +
        "Check out the other Google coding interview that we filmed on Keerti's channel: https://youtu.be/JHzX-57dgn0\n" +
        "\n" +
        "AlgoExpert: https://www.algoexpert.io/clem\n" +
        "SystemsExpert: https://www.systemsexpert.io/clem\n" +
        "My LinkedIn: https://www.linkedin.com/in/clementmihailescu\n" +
        "My Instagram: https://www.instagram.com/clement_mihailescu\n" +
        "My Twitter: https://twitter.com/clemmihai\n" +
        "\n" +
        'Prepping for coding interviews or systems design interviews? Practice with hundreds of video explanations of popular interview questions and a full-fledged coding workspace on AlgoExpert - https://www.algoexpert.io - and use the promo code "clem" for a discount on the platform!',
      shared_by: "duc.nguyenquang@zoi.tech",
      id: "rw4s4M3hFfs",
      title: "Google Coding Interview With A Normal Software Engineer",
    },
  ];
  console.log("==== videos", videos);

  return (
    <AuthProvider>
      <AppContext.Provider value={getContextData()}>
        <Layout>
          {/* <LoginComponent onLogged={onLogged} onLogout={onLogout} /> */}
          <SharedMovieItems videos={videos} />
        </Layout>
      </AppContext.Provider>
    </AuthProvider>
  );
}

export default Home;
