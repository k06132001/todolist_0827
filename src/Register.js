import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./components/Context";
import "./Register.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
function Register() {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmitEvent = (data) => {
    const _url = "https://todoo.5xcamp.us/users";
    console.log({
      user: data,
    });
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
        if (res.status === 422) {
          throw new Error("註冊失敗，請檢查email是否重複！");
        }
        setToken(res.headers.get("authorization"));
        localStorage.setItem("nickname", data.nickname);
        console.log(data.nickname);
        return res.json();
      })
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        return MySwal.fire({
          title: err.message,
        });
      });
  };
  return (
    <div id="signUpPage" className="bg-yellow">
      <div className="conatiner signUpPage vhContainer">
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
            <h2 className="formControls_txt">註冊帳號</h2>
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
            <label className="formControls_label" htmlFor="name">
              您的暱稱
            </label>

            <input
              className="formControls_input"
              type="text"
              placeholder="請輸入您的暱稱"
              {...register("nickname", {
                required: { value: true, message: "此欄位必填" },
              })}
            />
            <p className="redText">{errors.nickname?.message}</p>

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
            <label className="formControls_label" htmlFor="pwd">
              再次輸入密碼
            </label>
            <input
              className="formControls_input"
              type="password"
              placeholder="請輸入密碼"
              {...register("checkPassword", {
                required: { value: true, message: "此欄位必填" },
                minLength: { value: 6, message: "密碼至少6碼" },
              })}
            />
            <p className="redText">{errors.password?.message}</p>
            <input
              className="formControls_btnSubmit"
              type="submit"
              disabled={Object.keys(errors).length > 0}
              value="註冊"
            />
            <a className="formControls_btnLink" href="#/">
              登入
            </a>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
