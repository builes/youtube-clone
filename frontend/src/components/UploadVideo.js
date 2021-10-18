import React from "react";
import { useState } from "react";
import axios from "axios";

export default function UploadVideo() {
  const [data, setData] = useState({});
  const [video, setVideo] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("video", video);
    formData.append("title", data.title);
    formData.append("artist", data.artist);
    formData.append("description", data.description);
    formData.append("tags", data.tags);

    // formData.append("data", data);

    const res = await axios.post("http://localhost:4000/api/videos", formData);
    // const res = await axios.post("https://httpbin.org/anything", formData);
    // console.log(res);
    console.log(res);
    window.location.href = "/";
  };

  const onInputChange = (e) => {
    const newDate = { [e.target.name]: e.target.value };
    setData({ ...data, ...newDate });
  };

  const onFileChange = (e) => {
    console.log(e.target.files[0]);
    setVideo(e.target.files[0]);
  };

  return (
    <div className="col-md-4 offset-md-4 bg-light p-5 ">
      <h2>Upload Video</h2>

      <form onSubmit={onSubmit}>
        <div className="form-group mt-4">
          <input
            type="text"
            className="form-control mt-2"
            placeholder="title"
            name="title"
            required
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-2"
            placeholder="artist"
            name="artist"
            required
            onChange={onInputChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            className="form-control mt-2"
            placeholder="description"
            onChange={onInputChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="file"
            className="form-control mt-2"
            placeholder="artist"
            name="video"
            required
            accept="video/*"
            onChange={onFileChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-control mt-2"
            placeholder="tags"
            name="tags"
            onChange={onInputChange}
          />
        </div>
        <div id="" className="form-text">
          Enter a comma after each label
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Save
        </button>
      </form>
    </div>
  );
}
