import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import eye from "../assets/eye.svg";
import eyeHide from "../assets/eye-hide.svg";

const Manager = () => {
  const passRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ site: "", username: "", pass: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const API = "https://password-manager-backend-p1v6.onrender.com"; // Change if deployed

  // Fetch passwords from backend
  useEffect(() => {
    axios
      .get(`${API}/passwords`)
      .then((res) => setPasswordArray(res.data))
      .catch(() => toast.error("Failed to load passwords"));
  }, []);

  useEffect(() => {
    if (passRef.current) {
      passRef.current.type = showPassword ? "text" : "password";
    }
  }, [showPassword]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDelete = (indexToDelete) => {
    const idToDelete = passwordArray[indexToDelete]._id;

    axios
      .delete(`${API}/delete/${idToDelete}`)
      .then(() => {
        const updated = passwordArray.filter((_, i) => i !== indexToDelete);
        setPasswordArray(updated);
        toast.info("Password deleted!");
        if (editIndex === indexToDelete) {
          setForm({ site: "", username: "", pass: "" });
          setEditIndex(null);
        }
      })
      .catch(() => toast.error("Delete failed"));
  };

  const savePassword = () => {
    if (!form.site.trim() && !form.username.trim() && !form.pass.trim()) {
      toast.warning("Empty form cannot be saved!");
      setForm({ site: "", username: "", pass: "" });
      setEditIndex(null);
      return;
    }

    if (editIndex !== null) {
      const idToUpdate = passwordArray[editIndex]._id;
      axios
        .put(`${API}/update/${idToUpdate}`, {
          url: form.site,
          username: form.username,
          password: form.pass,
        })
        .then((res) => {
          const updatedArray = [...passwordArray];
          updatedArray[editIndex] = res.data.data;
          setPasswordArray(updatedArray);
          toast.success("Password updated!");
          setForm({ site: "", username: "", pass: "" });
          setEditIndex(null);
        })
        .catch(() => toast.error("Update failed"));
    } else {
      axios
        .post(`${API}/add`, {
          url: form.site,
          username: form.username,
          password: form.pass,
        })
        .then((res) => {
          setPasswordArray([...passwordArray, res.data.data]);
          toast.success("Password added!");
          setForm({ site: "", username: "", pass: "" });
        })
        .catch(() => toast.error("Add failed"));
    }
  };

  const handleEdit = (index) => {
    const item = passwordArray[index];
    setForm({ site: item.url, username: item.username, pass: item.password });
    setEditIndex(index);
  };

  return (
    <>
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <div className="text-white flex flex-col p-4 bg-slate-800 max-w-2xl mx-auto mt-20">
        <div className="flex flex-col gap-2 p-2">
          <h1 className="font-extrabold text-center p-2">
            Your Own Password Manager &lt;/&gt;
          </h1>

          <input
            onChange={handleChange}
            value={form.site}
            name="site"
            placeholder="Paste your website link here"
            className="bg-amber-50 text-black rounded-full p-1.5 text-center"
            type="text"
          />

          <input
            onChange={handleChange}
            value={form.username}
            name="username"
            placeholder="Enter the username"
            className="bg-amber-50 text-black rounded-full p-1.5 text-center"
            type="text"
          />

          <div className="relative w-full">
            <input
              ref={passRef}
              onChange={handleChange}
              value={form.pass}
              name="pass"
              placeholder="Enter your password"
              className="bg-amber-50 text-black rounded-full p-1.5 pl-4 pr-10 w-full text-center"
              type="password"
            />
            <img
              src={showPassword ? eyeHide : eye}
              alt="Toggle visibility"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 cursor-pointer"
            />
          </div>

          <div className="flex mx-auto bg-green-500 text-slate-800 p-2 rounded-4xl w-fit items-center justify-center gap-2 hover:bg-green-400 font-semibold border-2 border-green-600">
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
              colors="primary:#000000"
            ></lord-icon>
            <button onClick={savePassword}>
              {editIndex !== null ? "Update Password" : "Add Password"}
            </button>
          </div>
        </div>

        {/* Password Table */}
        <div className="password mt-10 p-2">
          <h1 className="font-bold text-center mb-4">Your Passwords &lt;/&gt;</h1>
          {passwordArray.length === 0 ? (
            <div>No passwords to show</div>
          ) : (
            <div className="overflow-x-auto md:block">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="p-3 text-left">Site URL</th>
                    <th className="p-3 text-left">Username</th>
                    <th className="p-3 text-left">Password</th>
                    <th className="p-3 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-amber-50 text-blue-950">
                  {passwordArray.map((item, index) => (
                    <tr key={item._id} className="border-t border-green-600">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {item.url}
                          <lord-icon
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            onClick={() => {
                              navigator.clipboard.writeText(item.url);
                              toast.success("Site URL copied!");
                            }}
                            trigger="hover"
                            style={{ height: "20px", width: "20px", cursor: "pointer" }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {item.username}
                          <lord-icon
                            onClick={() => {
                              navigator.clipboard.writeText(item.username);
                              toast.success("Username copied!");
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ height: "20px", width: "20px", cursor: "pointer" }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          {/* Always show password as masked */}
                          <span>*****</span>
                          <lord-icon
                            onClick={() => {
                              navigator.clipboard.writeText(item.password);
                              toast.success("Password copied!");
                            }}
                            src="https://cdn.lordicon.com/depeqmsz.json"
                            trigger="hover"
                            style={{ height: "20px", width: "20px", cursor: "pointer" }}
                          ></lord-icon>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            Delete
                            <lord-icon
                              onClick={() => handleDelete(index)}
                              src="https://cdn.lordicon.com/skkahier.json"
                              trigger="hover"
                              style={{ height: "20px", width: "20px", cursor: "pointer" }}
                            ></lord-icon>
                          </span>
                          <span className="flex items-center gap-1">
                            Edit
                            <i
                              className="fa-solid fa-pen ml-1 cursor-pointer"
                              onClick={() => handleEdit(index)}
                            ></i>
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
