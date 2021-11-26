import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "./api";

export const Keluar = () => {
  const params = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (params.id) {
      Axios.get(API_URL + "/api/patient/keluar/" + params.id).then(() => {
        localStorage.removeItem("id");
        localStorage.removeItem("img");
        navigator("/");
      });
    }
  }, []);
  return <></>;
};

export const Masuk = () => {
  const params = useParams();
  const navigator = useNavigate();

  useEffect(() => {
    if (params.id) {
      Axios.get(API_URL + "/api/patient/masuk/" + params.id)
        .then((res) => res.data)
        .then((res) => {
          const data = res.data;
          localStorage.setItem("id", params.id);
          localStorage.setItem("img", data.image);
          navigator("/status");
        });
    }
  }, []);
  return <></>;
};
