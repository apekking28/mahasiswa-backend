const axios = require("axios");

const axiosContoller = {
  getAll: async (req, res) => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      console.log(response);
      if (response.data.length === 0) {
        return res.status(200).json({
          message: "Data tidak ada",
          data: response.data,
        });
      }
      res.status(200).json({
        message: "Data dari public API",
        data: response.data,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  post: async (req, res) => {
    try {
      const response = await axios({
        method: "post",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: {
          title: req.body.title,
          body: req.body.body,
          userId: 1,
        },
      });
      res.status(201).json({
        message: "Berhasil menambahkan data",
        data: response.data,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await axios({
        method: "put",
        url: "https://jsonplaceholder.typicode.com/posts/" + id,
        data: {
          title: req.body.title,
          body: req.body.body,
          userId: 1,
        },
      });

      res.status(201).json({
        message: "Berhasil edit data",
        data: response.data,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const response = await axios({
        method: "delete",
        url: "https://jsonplaceholder.typicode.com/posts/" + id,
      });
      console.log(response);
      res.status(200).json({
        message: "Berhasil hapus data",
        data: response.data,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = axiosContoller;
