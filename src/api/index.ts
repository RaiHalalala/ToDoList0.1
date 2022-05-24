import axiosBase from 'axios';
import { Board } from 'types/board';
import { DataTask } from 'types/task';

export const axios = axiosBase.create({
  baseURL: process.env.REACT_APP_API_KEY,
  timeout: 10000,
});

export const fetchBoards = async (): Promise<Board[]> =>
  (await axios.get('/boards')).data;

export const fetchTasks = async <TypeParams>(
  params: TypeParams,
): Promise<DataTask[]> => (await axios.get(`/tasks?boardId=${params}`)).data;

export const fetchChangingTasks = async <TypeParams>({
  id,
  params,
}: {
  id: number;
  params: TypeParams;
}): Promise<{ success: boolean }> =>
  (await axios.patch(`/tasks/${id}`, params)).data;

export const fetchChangingBoard = async <TypeParams>({
  id,
  params,
}: {
  id: number;
  params: TypeParams;
}): Promise<{ success: boolean }> =>
  (await axios.patch(`/boards/${id}`, params)).data;

export const fetchAddGroupeOfTasks = async <TypeParams>({
  params,
}: {
  params: TypeParams;
}): Promise<{ success: boolean }> => (await axios.post(`/tasks`, params)).data;

export const fetchAddBoard = async <TypeParams>({
  params,
}: {
  params: TypeParams;
}): Promise<{ success: boolean }> => (await axios.post(`/boards`, params)).data;

export const fetchDeleteBoard = async <TypeParams>({
  boardID,
}: {
  boardID: TypeParams;
}): Promise<{ success: boolean }> =>
  (await axios.delete(`/boards/${boardID}`)).data;
