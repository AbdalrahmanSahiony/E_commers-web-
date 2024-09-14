import axios from "axios";
import Cookie from "cookie-universal";
import { useState } from "react";
import { baseURL, REGISTER } from "../../Api/Api";
import LoadingSubmite from "../../Components/Loading/Loading";
import Form from "react-bootstrap/Form";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
      const res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        email: form.email,
        password: form.password,
      });
      console.log(res);
      setloading(false);
      const token = res.data.data.token;
      cookie.set("e-commerc", token);
      window.location.pathname = "/";
    } catch (err) {
      setloading(false);
      if (err.status === 401) {
        seterr("Wrong Email or Password");
      } else {
        seterr("Internal server ERR");
      }
    }
  }

  return (
    <div>
      {Loading && <LoadingSubmite />}
      <div className="container">
        <div className="row" style={{height:"100vh"}}>
          <Form className="form" onSubmit={handlesubmit}>
          <div className="custem-form">
              <h2>LogIn</h2>

              <div className="login-form">
              <div className="mb-3 form-controls">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
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
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control name="password"  
                  value={form.password}
                  onChange={handleonchange}
                  minLength={8}
                  required type="password" placeholder="password..." />
                </Form.Group>

                {/**<label htmlFor="password">Password:</label> */}
              </div>
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              {err !== "" && <span className="error">{err}</span>}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
