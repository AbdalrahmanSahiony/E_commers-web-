import axios from "axios";
import { useState } from "react";
import { baseURL, REGISTER } from "../../Api/Api";
import LoadingSubmite from "../../Components/Loading/Loading";
import Cookie from "cookie-universal";
import Form from "react-bootstrap/Form";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordcomfirm: "",
  });

  const [err, seterr] = useState("");
  const [Loading, setloading] = useState(false);

  const cookie = Cookie();

  function handleonchange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  }

  async function handlesubmit(e) {
    setloading(true);
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.passwordcomfirm,
      });
      setloading(false);
      window.location.pathname = "/";
      const token = res.data.data.token;
      cookie.set("e-commerc", token);
      console.log(res);
    } catch (err) {
      setloading(false);
      console.log(err);

      if (err.status === 422) {
        seterr("Email is alredy been taken");
      } else {
        seterr("Internal server ERR");
      }
    }
  }

  return (
    <div>
      {Loading && <LoadingSubmite />}
      <div className="container">
        <div className="row" style={{ height: "100vh" }}>
          <Form className="form" onSubmit={handlesubmit}>
            <div className="custem-form">
              <h2>Rigester Now</h2>

              <div className="register">
                <div className="mb-3 form-controls">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleonchange}
                      required
                      type="text"
                      placeholder="Name..."
                    />
                  </Form.Group>
                </div>

                <div className="mb-3 form-controls">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      name="email"
                      value={form.email}
                      onChange={handleonchange}
                      required
                      type="email"
                      placeholder="Email..."
                    />
                  </Form.Group>
                </div>

                <div className=" form-controls mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>password</Form.Label>
                    <Form.Control
                      name="password"
                      value={form.password}
                      onChange={handleonchange}
                      minLength={8}
                      required
                      type="password"
                      placeholder="password..."
                    />
                  </Form.Group>
                </div>

                <div className=" form-controls mb-3">
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>password confirm</Form.Label>
                    <Form.Control
                      name="passwordcomfirm"
                      value={form.passwordcomfirm}
                      onChange={handleonchange}
                      minLength={8}
                      required
                      type="password"
                      placeholder="password confirm..."
                    />
                  </Form.Group>
                </div>

                <button className="btn btn-primary" type="submit">
                  Register{" "}
                </button>
                {err != "" && <span className="error">{err}</span>}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
