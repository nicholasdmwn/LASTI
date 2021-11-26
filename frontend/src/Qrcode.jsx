import { useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "./api";
import { useNavigate } from "react-router-dom";

const Qrcode = () => {
  const [status, setStatus] = useState({ patient: {} });
  const navigator = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("img")) {
      Axios.get(API_URL + "/api/patient/" + localStorage.getItem("id"))
        .then((res) => res.data)
        .then((res) => {
          console.log(res.data);
          setStatus(res.data);
        })
        .catch(() => {
          localStorage.removeItem("id");
          localStorage.removeItem("img");
        });
    } else {
      navigator("/");
      localStorage.removeItem("id");
      localStorage.removeItem("img");
      return;
    }
  }, []);
  return (
    <div className="qrcode" style={{ textAlign: "center" }}>
      <h1>
        Hai, {status.patient.nama} ({status.patient.noTelp})!
      </h1>
      <p>
        {status && status.antrian
          ? "Anda masuk antrian ke-" + status.antrian
          : "Sekarang adalah giliran anda!"}
      </p>
      <img src={localStorage.getItem("img")} alt="" />
      <div>
        <p>
          {status && status.estimation != "?"
            ? `Estimasi ${Math.ceil(status.estimation / 1000)} detik`
            : "Tidak ada prediksi waktu."}
        </p>
      </div>
    </div>
  );
};

export default Qrcode;
