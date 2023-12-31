import axios from 'axios';
import {Host} from '../utils/Host';

const laporanApi = axios.create({
  baseURL: Host,
});

export const laporanUrlEndpoint = 'laporan?limit=10';

export const getLaporan = () => {
  return laporanApi.get(laporanUrlEndpoint).then(res => res.data);
};

export const getLaporanPaginated = url => {
  return laporanApi.get(url).then(res => res.data.data);
};
