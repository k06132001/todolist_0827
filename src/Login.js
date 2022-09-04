import "./Login.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./components/Context";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
function Login() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitEvent = (data) => {
    const _url = "https://todoo.5xcamp.us/users/sign_in";
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: data,
      }),
    })
      .then((res) => {
        console.log(res);
        if (res.status === 401) {
          throw new Error("登入失敗，請重新檢驗！");
        }
        setToken(res.headers.get("authorization"));
        localStorage.setItem("token", token);
        localStorage.setItem("email", data.email);
        console.log(data);
        return res.json();
      })
      .then((res) => {
        navigate("/todolist");
      })
      .catch((err) => {
        console.log(err);
        return MySwal.fire({
          title: err.message,
        });
      });
  };
  return (
    <div id="loginPage" className="bg-yellow">
      <div className="conatiner loginPage vhContainer ">
        <div className="side">
          <a href="#">
            <img
              className="logoImg"
              src="https://upload.cc/i1/2022/03/23/rhefZ3.png"
              alt=""
            />
          </a>
          <img
            className="d-m-n"
            src="https://upload.cc/i1/2022/03/23/tj3Bdk.png"
            alt="workImg"
          />
        </div>
        <div>
          <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
            <label className="formControls_label" htmlFor="email">
              Email
            </label>
            <input
              className="formControls_input"
              type="email"
              placeholder="請輸入email"
              {...register("email", {
                required: { value: true, message: "此欄位必填" },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message: "不符合email格式",
                },
              })}
            />
            <p className="redText">{errors.email?.message}</p>
            <span>此欄位不可留空</span>
            <label className="formControls_label" htmlFor="pwd">
              密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              placeholder="請輸入密碼"
              {...register("password", {
                required: { value: true, message: "此欄位必填" },
                minLength: { value: 6, message: "密碼至少6碼" },
              })}
            />
            <p className="redText">{errors.password?.message}</p>
            <input
              className="formControls_btnSubmit"
              type="submit"
              disabled={Object.keys(errors).length > 0}
              value="登入"
            />
            <a className="formControls_btnLink" href="#/register">
              註冊帳號
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
