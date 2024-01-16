import { IPost } from 'types/managerType';
import { ICategory } from 'types/postType';
import { sendDelete, sendGet, sendPost, sendPut } from './axios';

export const addUser = (payload: IPost) => sendPost('/manager/add-user', payload);

export const deleteUser = (id: number) => sendDelete(`/manager/user/${id}`);

export const editUser = (params: any, id:any) => sendPut(`/manager/edit-user/${id}`, params);
