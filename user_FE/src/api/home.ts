import { sendGet } from './axios';

export const getAllUser = () => sendGet(`/all-user`);
