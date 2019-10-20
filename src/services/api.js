import axios from 'axios';

const api = axios.create({
  //   baseURL: "http://localhost/ifciencia2018/"
  // ---
  // baseURL: "http://localhost/ifciencia2018/per/per_avalia.php"
  // baseURL: 'http://192.168.0.102:80/ifciencia2018/per/per_avalia.php'
  baseURL: 'http://192.168.0.102:80/ifciencia2018'
});

export default api;
