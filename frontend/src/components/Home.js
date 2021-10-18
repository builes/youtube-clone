import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { Link } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function getNotes() {
      try {
        const res = await axios.get("http://localhost:4000/api/videos");
        // console.log(res.data[0].filePath);
        setVideos(res.data);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, []);

  const deleteVideo = async (id) => {
    console.log(id);
    await axios.delete("http://localhost:3001/api/videos/" + id);
    window.location.href = "/";
  };

  return (
    <div className="row">
      {videos.map((video) => (
        <div key={video._id} className="col-md-6 p-2">
          <div className="card">
            <div className="card-header">
              <h5>{video.title}</h5>
            </div>
            <div className="card-body">
              <video src={`http://localhost:4000/${video.filePath}`}>
                sfdsd
              </video>
              <p>Uploaded {format(video.createdAt)}</p>
            </div>
            <div className="card-footer" onClick={() => deleteVideo(video._id)}>
              <button className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
